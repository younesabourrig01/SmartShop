export interface User {
  id: number;
  name: string;
  email: string;
  adress: string;
  phone_number: string;
  role: string;
  image?: string;
}

export interface ProductImage {
  id: number;
  url: string;
}

export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: ProductImage[];
  category: ProductCategory;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  products_count: number;
  image?: string;
  url?: string;
  created_at?: string;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface Cart {
  cart_items: CartItem[];
}

export interface Ad {
  id: number;
  title: string;
  image?: string;
  position: "slider" | "banner";
  description?: string;
  url?: string;
  created_at?: string;
}

export interface Review {
  id: number;
  user: {
    name: string;
  };
  rating: number;
  review: string;
  created_at: string;
}

export interface OrderProduct {
  id: number;
  name: string;
  image: string;
  images: { url: string }[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: OrderProduct;
}

export interface BackendOrder {
  id: number;
  total: number;
  status: string;
  created_at: string;
  order_items: OrderItem[];
  user?: User;
}

export interface GroupedOrders {
  [date: string]: BackendOrder[];
}
