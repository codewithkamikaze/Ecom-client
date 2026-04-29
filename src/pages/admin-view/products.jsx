import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { PlusCircle, PackageSearch } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    const action =
      currentEditedId !== null
        ? editProduct({ id: currentEditedId, formData })
        : addNewProduct({ ...formData, image: uploadedImageUrl });

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
        setImageFile(null);
        setUploadedImageUrl("");

        toast({
          title: currentEditedId !== null ? "Product updated" : "Product added",
          variant: "success",
        });
      }
    });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: "Product deleted",
          variant: "destructive",
        });
      }
    });
  }

  function isFormValid() {
    return (
      Object.keys(formData)
        .filter(
          (currentKey) =>
            currentKey !== "averageReview" && currentKey !== "salePrice",
        )
        .map((key) => formData[key] !== "")
        .every((item) => item) && !imageLoadingState
    );
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-8 w-full flex items-center justify-between p-2">
        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <PackageSearch className="w-7 h-7 text-blue-600" />
          Inventory
        </h1>
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="rounded-xl shadow-lg shadow-blue-100 flex gap-2 font-bold"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Product
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-gray-50 rounded-[2rem] border-2 border-dashed">
            <p className="text-gray-400 font-bold">
              No products found. Start adding some!
            </p>
          </div>
        )}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto w-full sm:max-w-[540px] rounded-l-[2rem]"
        >
          <SheetHeader className="border-b pb-4 mb-4">
            <SheetTitle className="text-2xl font-black">
              {currentEditedId !== null
                ? "Update Product"
                : "Create New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedId !== null ? "Save Changes" : "Create Product"
              }
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
