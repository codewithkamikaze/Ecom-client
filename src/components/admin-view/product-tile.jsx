import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Edit2, Trash } from "lucide-react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  if (!product) return null;

  const hasSalePrice = product?.salePrice > 0;

  const onDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone.",
    );

    if (confirmDelete) {
      handleDelete(product?._id);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="relative group">
        <div className="bg-gray-50 h-[300px] flex items-center justify-center p-4">
          <img
            src={product?.image}
            alt={product?.title}
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {hasSalePrice && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            SALE
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <h2
          className="text-lg font-bold text-gray-800 mb-3 truncate"
          title={product?.title}
        >
          {product?.title}
        </h2>

        <div className="flex flex-col">
          <span
            className={`font-semibold ${
              hasSalePrice
                ? "text-gray-400 line-through text-sm"
                : "text-blue-600 text-xl"
            }`}
          >
            ${product?.price}
          </span>

          {hasSalePrice && (
            <span className="text-xl font-black text-gray-900">
              ${product?.salePrice}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex gap-3">
        <Button
          className="flex-1 gap-2 rounded-xl h-11 font-bold"
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </Button>

        <Button
          variant="destructive"
          className="rounded-xl h-11 w-12 flex items-center justify-center"
          onClick={onDelete}
        >
          <Trash className="w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
