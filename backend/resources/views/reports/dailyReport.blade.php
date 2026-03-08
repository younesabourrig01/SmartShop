<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Daily Orders Report</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #333;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header img {
            width: 120px;
            margin-bottom: 10px;
        }

        h2 {
            margin: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        table,
        th,
        td {
            border: 1px solid #ddd;
        }

        th,
        td {
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .total {
            text-align: right;
            font-weight: bold;
            margin-top: 10px;
        }
    </style>
</head>

<body>
    <div class="header">
        <img src="{{ public_path('logo/smartShopLogo.png') }}" alt="Logo">
        <h2>Daily Orders Report</h2>
        <p>Date: {{ \Carbon\Carbon::parse($date)->format('d/m/Y') }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>User</th>
                <th>Products</th>
                <th>Total</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($orders as $index => $order)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $order->id }}</td>
                    <td>{{ $order->user->name }}</td>
                    <td>
                        @foreach ($order->orderItems as $item)
                            {{ $item->product->name }} (x{{ $item->quantity }})<br>
                        @endforeach
                    </td>
                    <td>{{ number_format($order->total, 2) }} DH</td>
                    <td>{{ ucfirst($order->status) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <p class="total">
        Total Sales: {{ number_format($orders->sum('total'), 2) }} DH
    </p>
</body>

</html>
