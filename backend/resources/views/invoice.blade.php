<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice #{{ $order->id }}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        
        /* Premium Invoice Styles */
        .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }
        
        .header {
            display: table;
            width: 100%;
            margin-bottom: 40px;
            border-bottom: 2px solid #f0f2f5;
            padding-bottom: 20px;
        }

        .header td {
            vertical-align: top;
        }

        .header .logo-img {
            max-height: 50px;
            width: auto;
            margin: 0;
            padding: 0;
        }

        .header .company-details {
            text-align: right;
            font-size: 12px;
            color: #64748b;
            line-height: 1.6;
        }

        .invoice-title {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 30px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .invoice-details {
            display: table;
            width: 100%;
            margin-bottom: 40px;
            font-size: 14px;
        }

        .invoice-details td {
            width: 50%;
            vertical-align: top;
        }

        .details-box {
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin-right: 10px;
        }
        .details-box.right {
            margin-right: 0;
            margin-left: 10px;
            background-color: #f0f5ff;
        }

        .details-box h3 {
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 16px;
            color: #2563eb;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .details-box.right h3 {
            border-bottom: 1px solid #bfdbfe;
        }

        .details-box p {
            margin: 5px 0;
            color: #475569;
            line-height: 1.5;
        }

        .details-box strong {
            color: #1e293b;
        }

        /* Items Table */
        table.items {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
        }

        table.items th {
            background-color: #2563eb;
            color: #fff;
            padding: 12px 15px;
            text-align: left;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        table.items th.right {
            text-align: right;
        }

        table.items th.center {
            text-align: center;
        }

        table.items td {
            padding: 15px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 14px;
            color: #334155;
        }
        
        table.items td.right {
            text-align: right;
            font-weight: bold;
        }

        table.items td.center {
            text-align: center;
        }

        table.items tr.total-row td {
            border-bottom: none;
            padding-top: 25px;
        }

        .total-box {
            float: right;
            width: 300px;
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 8px;
        }

        .total-box table {
            width: 100%;
            border-collapse: collapse;
        }

        .total-box td {
            padding: 8px 0;
            font-size: 14px;
            color: #475569;
        }

        .total-box td.right {
            text-align: right;
            color: #1e293b;
            font-weight: bold;
        }

        .total-box .grand-total td {
            border-top: 2px solid #cbd5e1;
            padding-top: 15px;
            margin-top: 5px;
            font-size: 20px;
            font-weight: 900;
            color: #2563eb;
        }

        .footer {
            clear: both;
            margin-top: 60px;
            text-align: center;
            color: #94a3b8;
            font-size: 12px;
            border-top: 1px solid #f0f2f5;
            padding-top: 20px;
            line-height: 1.6;
        }

        /* Status Badge */
        .status {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 10px;
        }

        .status.paid, .status.delivered { background-color: #dcfce7; color: #166534; }
        .status.pending { background-color: #fef9c3; color: #854d0e; }
        .status.processing { background-color: #e0e7ff; color: #3730a3; }
        .status.shipped { background-color: #e0f2fe; color: #075985; }
        .status.cancelled { background-color: #ffe4e6; color: #9f1239; }

    </style>
</head>
<body>

    <div class="invoice-box">
        @php
            $path = public_path('logo/smartShopLogo.png');
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        @endphp
        <!-- Header -->
        <table class="header">
            <tr>
                <td style="width: 50%;">
                    <img src="{{ $base64 }}" alt="SmartShop Logo" style="max-height: 50px;">
                </td>
                <td style="width: 50%;" class="company-details">
                    <strong>SmartShop Inc.</strong><br>
                    Agadir, Morocco<br>
                    support@smartshop.com
                </td>
            </tr>
        </table>

        <div class="invoice-title">INVOICE</div>

        <!-- Details -->
        <table class="invoice-details">
            <tr>
                <td style="padding-right: 15px;">
                    <div class="details-box">
                        <h3>Billed To</h3>
                        <p><strong>{{ $order->user->name ?? 'Customer' }}</strong></p>
                        <p>{{ $order->user->email ?? '' }}</p>
                        <p>Customer ID: #{{ $order->user_id }}</p>
                    </div>
                </td>
                <td style="padding-left: 15px;">
                    <div class="details-box right">
                        <h3>Order Details</h3>
                        <p><strong>Invoice No:</strong> #INV-{{ str_pad($order->id, 5, '0', STR_PAD_LEFT) }}</p>
                        <p><strong>Issue Date:</strong> {{ $order->created_at->format('M d, Y h:i A') }}</p>
                        <p><strong>Order Status:</strong> 
                            <span class="status {{ $order->status }}">{{ str_replace('_', ' ', $order->status) }}</span>
                        </p>
                    </div>
                </td>
            </tr>
        </table>

        <!-- Items Table -->
        <table class="items">
            <thead>
                <tr>
                    <th style="border-top-left-radius: 6px;">#</th>
                    <th>Product Description</th>
                    <th class="center">Qty</th>
                    <th class="right">Unit Price</th>
                    <th class="right" style="border-top-right-radius: 6px;">Amount</th>
                </tr>
            </thead>
            <tbody>
                @foreach($order->orderItems as $index => $item)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>
                        <strong>{{ $item->product->name ?? 'Unknown Product' }}</strong>
                    </td>
                    <td class="center">{{ $item->quantity }}</td>
                    <td class="right">{{ number_format($item->price, 2) }} MAD</td>
                    <td class="right">{{ number_format($item->quantity * $item->price, 2) }} MAD</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <!-- Summary -->
        <div class="total-box">
            <table>
                <tr>
                    <td>Subtotal</td>
                    <td class="right">{{ number_format($subtotal, 2) }} MAD</td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td class="right">{{ number_format($shippingCost, 2) }} MAD</td>
                </tr>
                <tr>
                    <td>Tax</td>
                    <td class="right">Included</td>
                </tr>
                <tr class="grand-total">
                    <td>Grand Total</td>
                    <td class="right">{{ number_format($order->total, 2) }} MAD</td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <p><strong>Thank you for your business!</strong></p>
            <p>If you have any questions concerning this invoice, please contact our support team.<br>
            SmartShop - Premium Digital Experiences</p>
        </div>
    </div>

</body>
</html>
