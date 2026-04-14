<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // show orders to admin grouped by day
    public function index()
    {
        $orders = Order::with(['orderItems.product', 'user'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy(function ($order) {
                return $order->created_at->format('Y-m-d');
            });
        return response()->json([
            'status' => 'success',
            'orders_by_day' => $orders,
        ]);
    }
    //filter orders by date 
    public function ordersByDate($date)
    {
        $orders = Order::with(['orderItems.product', 'user'])
            ->whereDate('created_at', $date)
            ->latest()
            ->get();
        return response()->json([
            'status' => 'success',
            'date' => $date,
            'orders' => $orders,
        ]);
    }
    // update status
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,paid,processing,shipped,delivered,cancelled'
        ]);

        $order = Order::findOrFail($id);

        $order->update([
            'status' => $request->status
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Order status updated',
            'order' => $order
        ]);
    }
    // methode for downloading the report in pdf
    public function downloadReport($date)
    {
        $orders = Order::with('user')
            ->whereDate('created_at', $date)
            ->get();

        $pdf = Pdf::loadView('dailyReport', [
            'orders' => $orders,
            'date' => $date,
        ])->setPaper('a4', 'portrait');

        return $pdf->download('orders-' . $date . '.pdf');
    }
    public function downloadInvoice(Request $request)
    {
        $user = $request->user();

        $lastOrder = $user->orders()->with('orderItems.product')->latest()->first();

        if (!$lastOrder) {
            return response()->json([
                'status' => 'error',
                'message' => 'No orders found for this user.'
            ], 404);
        }

        $subtotal = $lastOrder->orderItems->sum(function ($item) {
            return $item->quantity * $item->price;
        });

        $shippingCost = $lastOrder->total - $subtotal;

        $pdf = Pdf::loadView('invoice', [
            'order' => $lastOrder,
            'subtotal' => $subtotal,
            'shippingCost' => $shippingCost
        ])->setPaper('a4', 'portrait');

        $fileName = 'invoice_order_' . $lastOrder->id . '.pdf';

        return $pdf->download($fileName);
    }
    // create order
    public function checkout(Request $request)
    {
        $user = $request->user();
        $cart = $user->cart()->with('cartItems.product')->first();
        if (!$cart || $cart->cartItems->isEMpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'cart is empty'
            ]);
        }

        $cartTotal = $cart->getTotal();
        $baseShippingPrice = 103;
        $discount = $user->getShippingDiscount();
        $shippingPrice = $baseShippingPrice * (1 - $discount);
        $total = $cartTotal + $shippingPrice;

        try {
            return \Illuminate\Support\Facades\DB::transaction(function () use ($user, $cart, $total) {
                // Check stock for all items
                foreach ($cart->cartItems as $item) {
                    if ($item->product->stock < $item->quantity) {
                        throw new \Exception("Insufficient stock for product: {$item->product->name}");
                    }
                }

                $order = $user->orders()->create([
                    'user_id' => $user->id,
                    'total' => $total,
                ]);

                //create order items using cartItems
                foreach ($cart->cartItems as $item) {

                    $order->orderItems()->create([
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'price' => $item->product->price
                    ]);

                    // Reduce product stock
                    $item->product->decrement('stock', $item->quantity);

                }
                // return details of the command
                $order->load('orderItems.product');

                $cart->cartItems()->delete();

                return response()->json([
                    'status' => 'success',
                    'message' => 'Order created successfully',
                    'order' => $order
                ]);
            });
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 400);
        }
    }
    public function orderByUser(Request $request)
    {
        $user = $request->user();
        $orders = $user->orders()
            ->with('orderItems.product')
            ->latest()
            ->get()
            ->groupBy(function ($order) {
                return $order->created_at->format('Y-m-d');
            });

        return response()->json([
            'status' => 'success',
            'orders' => $orders,
        ]);
    }
}
