import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string | number;
  image: string;
  title: string;
  price: string | number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, title, price }) => {
  return (
    <Link to={`/product/${id}`} className="block h-full">
      <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col cursor-pointer active:scale-95 h-full">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-50">
          <img 
            src={image} 
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
            <button className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
