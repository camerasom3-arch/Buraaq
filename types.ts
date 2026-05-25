export type Language = 'so' | 'en' | 'ar';

export interface Product {
  id: string;
  name: string;
  nameSo: string;
  nameAr: string;
  description: string;
  descriptionSo: string;
  descriptionAr: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: 'fashion' | 'electronics' | 'home' | 'beauty';
  image: string;
  images: string[];
  options?: {
    colors?: string[];
    sizes?: string[];
  };
  countInStock: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'received' | 'preparing' | 'shipped' | 'delivered';
  date: string;
  shippingDetails: {
    fullName: string;
    phone: string;
    city: string;
    address: string;
  };
  paymentMethod: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
  productAction?: {
    type: 'add_to_cart';
    productId: string;
    productName: string;
  };
}
