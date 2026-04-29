import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { ShoppingCart, Eye } from "lucide-react";

/**
 * ShoppingProductTile Component
 * Displays a summary of a product in a grid layout, handling navigation to details and quick add-to-cart.
 */
function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto group rounded-2xl overflow-hidden border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer relative"
      >
        {/* Product Image Container */}
        <div className="relative h-[300px] bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />

          {/* Status Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product?.totalStock === 0 ? (
              <Badge className="bg-red-600 hover:bg-red-700 text-white border-none px-3 py-1 font-bold">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none px-3 py-1 font-bold">
                {`Only ${product?.totalStock} left`}
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-none px-3 py-1 font-bold">
                Sale
              </Badge>
            ) : null}
          </div>

          {/* Quick View Icon Overlay (Visible on Hover) */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/90 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <Eye className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        </div>

        {/* Product Details Area */}
        <CardContent className="p-5">
          <h2 className="text-lg font-black text-gray-800 mb-1 truncate group-hover:text-blue-600 transition-colors">
            {product?.title}
          </h2>

          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-xs font-bold text-blue-500">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {product?.salePrice > 0 ? (
              <>
                <span className="text-xl font-black text-blue-600">
                  ${product?.salePrice}
                </span>
                <span className="text-sm font-medium text-gray-300 line-through">
                  ${product?.price}
                </span>
              </>
            ) : (
              <span className="text-xl font-black text-gray-900">
                ${product?.price}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      {/* Action Area */}
      <CardFooter className="p-5 pt-0">
        {product?.totalStock === 0 ? (
          <Button
            disabled
            className="w-full h-11 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed border-none"
          >
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full h-11 rounded-xl font-bold gap-2 shadow-md shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
