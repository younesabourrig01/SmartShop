@php
    $path = public_path('logo/smartShopLogo.png');
    $type = pathinfo($path, PATHINFO_EXTENSION);
    $data = file_get_contents($path);
    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
    
    $totalSales = $orders->sum('total');
    $totalOrders = $orders->count();
    $completedOrders = $orders->where('status', 'delivered')->count();
@endphp

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Daily Orders Report - {{ \Carbon\Carbon::parse($date)->format('M d, Y') }}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
            color: #1e293b;
            margin: 0;
            padding: 20px;
            font-size: 13px;
        }

        .report-container {
            max-width: 1000px;
            margin: auto;
            background: #fff;
        }

        /* Header Layout */
        .header {
            display: table;
            width: 100%;
            margin-bottom: 30px;
            border-bottom: 2px solid #f0f2f5;
            padding-bottom: 15px;
        }

        .header td {
            vertical-align: middle;
        }

        .header-logo {
            max-height: 45px;
        }

        .header-title {
            text-align: right;
            color: #64748b;
        }

        .header-title h2 {
            margin: 0;
            color: #0f172a;
            font-size: 22px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .header-title p {
            margin: 5px 0 0 0;
            font-size: 13px;
            font-weight: bold;
        }

        /* Summary Cards */
        .summary {
            display: table;
            width: 100%;
            margin-bottom: 30px;
        }

        .summary td {
            width: 33.33%;
            padding: 0 10px;
        }

        .summary td:first-child { padding-left: 0; }
        .summary td:last-child { padding-right: 0; }

        .card {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 15px 20px;
            border-left: 4px solid #2563eb;
        }

        .card.sales { border-left-color: #10b981; }
        .card.completed { border-left-color: #8b5cf6; }

        .card-title {
            font-size: 11px;
            text-transform: uppercase;
            color: #64748b;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .card-value {
            font-size: 24px;
            font-weight: 900;
            color: #0f172a;
        }

        /* Table */
        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table.data-table th {
            background-color: #f1f5f9;
            color: #475569;
            padding: 12px 15px;
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 2px solid #cbd5e1;
        }

        table.data-table td {
            padding: 14px 15px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: top;
            color: #334155;
        }

        table.data-table tr:nth-child(even) td {
            background-color: #f8fafc;
        }

        .right { text-align: right !important; }
        .center { text-align: center !important; }

        .order-id {
            font-weight: bold;
            color: #2563eb;
        }

        .product-list {
            margin: 0;
            padding: 0;
            list-style: none;
            font-size: 12px;
            color: #64748b;
        }

        .product-list li {
            margin-bottom: 3px;
        }

        .product-list span.qty {
            font-weight: bold;
            color: #0f172a;
        }

        /* Badges */
        .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .status-badge.paid, .status-badge.delivered { background-color: #dcfce7; color: #166534; }
        .status-badge.pending { background-color: #fef9c3; color: #854d0e; }
        .status-badge.processing { background-color: #e0e7ff; color: #3730a3; }
        .status-badge.shipped { background-color: #e0f2fe; color: #075985; }
        .status-badge.cancelled { background-color: #ffe4e6; color: #9f1239; }

        /* Footer */
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
            border-top: 1px solid #f0f2f5;
            padding-top: 20px;
        }

    </style>
</head>
<body>

    <div class="report-container">
        
        <!-- Header -->
        <table class="header">
            <tr>
                <td style="width: 40%;">
                    <img src="{{ $base64 }}" alt="SmartShop" class="header-logo">
                </td>
                <td style="width: 60%;" class="header-title">
                    <h2>Daily Activity Report</h2>
                    <p>{{ \Carbon\Carbon::parse($date)->format('l, F j, Y') }}</p>
                </td>
            </tr>
        </table>

        <!-- Summary Statistics -->
        <table class="summary">
            <tr>
                <td>
                    <div class="card">
                        <div class="card-title">Total Orders</div>
                        <div class="card-value">{{ $totalOrders }}</div>
                    </div>
                </td>
                <td>
                    <div class="card completed">
                        <div class="card-title">Completed Orders</div>
                        <div class="card-value">{{ $completedOrders }}</div>
                    </div>
                </td>
                <td>
                    <div class="card sales">
                        <div class="card-title">Total Revenue</div>
                        <div class="card-value">{{ number_format($totalSales, 2) }} MAD</div>
                    </div>
                </td>
            </tr>
        </table>

        <!-- Order details table -->
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 5%;">#</th>
                    <th style="width: 15%;">Order ID</th>
                    <th style="width: 20%;">Customer</th>
                    <th style="width: 30%;">Item Breakdown</th>
                    <th style="width: 15%;" class="right">Amount</th>
                    <th style="width: 15%;" class="center">Status</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($orders as $order)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>
                        <span class="order-id">#{{ str_pad($order->id, 5, '0', STR_PAD_LEFT) }}</span>
                    </td>
                    <td>
                        <strong>{{ $order->user->name ?? 'Unknown Customer' }}</strong>
                    </td>
                    <td>
                        <ul class="product-list">
                            @foreach ($order->orderItems as $item)
                                <li>{{ $item->product->name ?? 'Unknown Product' }} <span class="qty">(x{{ $item->quantity }})</span></li>
                            @endforeach
                        </ul>
                    </td>
                    <td class="right" style="color:#0f172a; font-weight: bold;">
                        {{ number_format($order->total, 2) }} MAD
                    </td>
                    <td class="center">
                        <span class="status-badge {{ $order->status }}">
                            {{ str_replace('_', ' ', $order->status) }}
                        </span>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="6" class="center" style="padding: 40px; color: #94a3b8;">
                        No orders recorded for this date.
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>

        <div class="footer">
            <p>Generated by SmartShop System on {{ now()->format('M d, Y H:i:s') }}</p>
        </div>

    </div>

</body>
</html>
