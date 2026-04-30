import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { ShoppingCart, Eye } from "lucide-react";

/**
 * ShoppingProductTile Component
 * FIX: Using 'object-contain' to prevent images from being cropped.
 * FIX: Added propagation stop to enable product dialog on card click.
 */
function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full group rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white relative">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer relative flex flex-col h-full"
      >
        {/* FIXED: Aspect Ratio Container ensures all cards have uniform size */}
        <div className="relative aspect-square w-full bg-[#f9f9f9] flex items-center justify-center overflow-hidden">
          {/* CRITICAL FIX: 'object-contain' prevents image cropping */}
          <img
            src={product?.image}
            alt={product?.title}
            className="absolute inset-0 w-full h-full object-contain p-6 sm:p-10 transition-transform duration-500 group-hover:scale-105"
          />
          {/* Status Badges Overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {product?.totalStock === 0 ? (
              <Badge className="bg-red-500 text-white border-none px-2 py-0.5 font-bold text-[9px] sm:text-xs">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="bg-orange-500 text-white border-none px-2 py-0.5 font-bold text-[9px] sm:text-xs">
                Only {product?.totalStock} left
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="bg-blue-600 text-white border-none px-2 py-0.5 font-bold text-[9px] sm:text-xs">
                Sale
              </Badge>
            ) : null}
          </div>
          {/* Quick View Icon Overlay (Hidden on small touch devices) */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center">
            <div className="bg-white/90 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <Eye className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        </div>

        {/* Product Details Area - Optimized Padding */}
        <CardContent className="p-4 sm:p-6 flex flex-col flex-grow gap-4">
          <h2 className="text-base sm:text-xl font-bold text-gray-900 leading-tight">
            {product?.title}
          </h2>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:items-center mb-3">
            <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded self-start">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[9px] sm:text-xs font-bold text-blue-500 truncate">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-auto">
            {product?.salePrice > 0 ? (
              <>
                <span className="text-base sm:text-2xl font-black text-gray-900 leading-none">
                  ${product?.salePrice}
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-300 line-through">
                  ${product?.price}
                </span>
              </>
            ) : (
              <span className="text-base sm:text-2xl font-black text-gray-900 leading-none">
                ${product?.price}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      {/* Action Area */}
      <CardFooter className="p-3 sm:p-5 pt-0">
        <Button
          onClick={(e) => {
            // STOP propagation so card click doesn't open the dialog
            e.stopPropagation();
            handleAddtoCart(product?._id, product?.totalStock);
          }}
          disabled={product?.totalStock === 0}
          className={`w-full h-10 sm:h-12 rounded-xl sm:rounded-2xl font-bold gap-2 transition-all shadow-md active:scale-95 text-xs sm:text-sm ${
            product?.totalStock === 0
              ? "bg-gray-100 text-gray-400"
              : "bg-blue-600 shadow-blue-100"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {product?.totalStock === 0 ? "Out Of Stock" : "Add to cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
