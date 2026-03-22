import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, ShoppingCart } from 'lucide-react';
import { addToCart } from '../../api/cart';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  id: string | number;
  image: string;
  title: string;
  price: string | number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, title, price }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { refreshCartCount } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    try {
      const response = await addToCart(id, 1);
      if (response.data.status === 'success') {
        toast.success(response.data.message || 'Product added to cart!');
        refreshCartCount();
      } else {
        toast.error(response.data.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while adding to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link to={`/product/${id}`} className="block h-full">
      <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col cursor-pointer active:scale-95 h-full">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-50">
          <img 
            src={image?.startsWith('http') ? image : `http://127.0.0.1:8000${image}`} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow bg-white">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1 mb-2">
            {title}
          </h3>
          
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xl font-black text-slate-900">
              ${price}
            </span>
            <button 
              disabled={isAdding}
              onClick={handleAddToCart}
              className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 shadow-md transform hover:scale-110 active:scale-95"
            >
              {isAdding ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <ShoppingCart size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
