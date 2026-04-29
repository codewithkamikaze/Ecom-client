import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, UploadCloud, Images } from "lucide-react";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  function handleDeleteImage(id) {
    dispatch(deleteFeatureImage(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* UPLOAD SECTION */}
      <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
          <CardTitle className="flex items-center gap-3 text-xl font-black">
            <UploadCloud className="w-6 h-6 text-blue-600" />
            Feature Banners Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isCustomStyling={true}
          />
          <Button
            onClick={handleUploadFeatureImage}
            className="mt-6 w-full h-12 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-100"
            disabled={!uploadedImageUrl || imageLoadingState}
          >
            {imageLoadingState ? "Uploading..." : "Add to Homepage Banner"}
          </Button>
        </CardContent>
      </Card>

      {/* GALLERY SECTION */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-2">
          <Images className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-black text-gray-800">
            Current Active Banners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureImageList && featureImageList.length > 0 ? (
            featureImageList.map((featureImgItem) => (
              <Card
                key={featureImgItem._id}
                className="group relative overflow-hidden rounded-[2rem] border-none shadow-lg transition-all hover:shadow-2xl"
              >
                <img
                  src={featureImgItem.image}
                  alt="Feature Banner"
                  className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="lg"
                    className="rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform"
                    onClick={() => handleDeleteImage(featureImgItem._id)}
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete Banner
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium text-lg">
                No active banners found. Start by uploading one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
