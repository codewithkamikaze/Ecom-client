import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import PropTypes from "prop-types";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  // Select image
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }

    setImageFile(selectedFile);
  }

  // Drag over
  function handleDragOver(event) {
    event.preventDefault();
  }

  // Drop image
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];

    if (!droppedFile) return;

    if (!droppedFile.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    setImageFile(droppedFile);
  }

  // Remove image
  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  // Upload image
  useEffect(() => {
    async function uploadImageToCloudinary() {
      try {
        if (!imageFile || !(imageFile instanceof File)) return;

        setImageLoadingState(true);

        const data = new FormData();
        data.append("my_file", imageFile);

        const response = await axios.post(
          "http://localhost:5000/api/admin/products/upload-image",
          data,
        );

        if (response?.data?.success) {
          setUploadedImageUrl(response.data.result.url);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setImageLoadingState(false);
      }
    }

    if (imageFile) {
      uploadImageToCloudinary();
    }
  }, [imageFile, setImageLoadingState, setUploadedImageUrl]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60 pointer-events-none" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-32 cursor-pointer ${
              isEditMode ? "cursor-not-allowed" : ""
            }`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <div className="w-full animate-pulse space-y-4">
            {/* Header skeleton */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gray-200" />
              <div className="h-4 w-40 bg-gray-200 rounded" />
            </div>

            {/* Image skeleton */}
            <div className="w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg" />

            {/* Text skeleton */}
            <div className="space-y-2">
              <div className="h-3 w-3/4 bg-gray-200 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
            </div>

            {/* Button skeleton */}
            <div className="h-10 w-full bg-gray-200 rounded-lg" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileIcon className="w-8 text-primary mr-2 h-8" />
                <p className="text-sm font-medium">{imageFile.name}</p>
              </div>

              <Button variant="ghost" size="icon" onClick={handleRemoveImage}>
                <XIcon className="w-4 h-4" />
              </Button>
            </div>

            {uploadedImageUrl && (
              <img
                src={uploadedImageUrl}
                alt="uploaded"
                className="w-full h-auto object-contain rounded"
              />
            )}

            <Button variant="destructive" onClick={handleRemoveImage}>
              Remove Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

ProductImageUpload.propTypes = {
  imageFile: PropTypes.instanceOf(File),
  setImageFile: PropTypes.func.isRequired,
  imageLoadingState: PropTypes.bool,
  uploadedImageUrl: PropTypes.string,
  setUploadedImageUrl: PropTypes.func.isRequired,
  setImageLoadingState: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool,
  isCustomStyling: PropTypes.bool,
};

export default ProductImageUpload;
