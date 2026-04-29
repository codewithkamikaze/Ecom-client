import { FileIcon, UploadCloudIcon, XIcon, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";

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

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) inputRef.current.value = "";
  }

  useEffect(() => {
    async function uploadImageToCloudinary() {
      try {
        if (!imageFile) return;
        setImageLoadingState(true);

        const data = new FormData();
        data.append("my_file", imageFile);

        const API = import.meta.env.VITE_API_URL;
        const response = await axios.post(
          `${API}/api/admin/products/upload-image`,
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

    if (imageFile && !uploadedImageUrl) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-sm font-bold text-gray-700 mb-3 block">
        Product Image
      </Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-6 transition-all duration-300
          ${isEditMode ? "opacity-50 cursor-not-allowed bg-gray-50" : "bg-white hover:border-blue-400 hover:bg-blue-50/30"}
          ${!imageFile ? "border-gray-200" : "border-blue-200 bg-blue-50/20"}
        `}
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
            className="flex flex-col items-center justify-center h-40 cursor-pointer group"
          >
            <div className="bg-blue-50 p-4 rounded-full group-hover:scale-110 transition-transform">
              <UploadCloudIcon className="w-8 h-8 text-blue-600" />
            </div>
            <span className="mt-4 font-medium text-gray-600">
              Drag & drop or click to upload
            </span>
            <span className="text-xs text-gray-400 mt-1">
              Supports: JPG, PNG, WEBP
            </span>
          </Label>
        ) : imageLoadingState ? (
          <div className="flex flex-col items-center justify-center h-40">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="mt-2 text-sm font-medium text-gray-600">
              Uploading to cloud...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <FileIcon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs font-semibold text-gray-700 truncate max-w-[150px]">
                  {imageFile.name}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveImage}
                className="hover:bg-red-50 hover:text-red-600 rounded-full"
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>

            {uploadedImageUrl && (
              <div className="relative group rounded-xl overflow-hidden border-2 border-white shadow-md">
                <img
                  src={uploadedImageUrl}
                  alt="preview"
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full">
                    Preview
                  </p>
                </div>
              </div>
            )}

            <Button
              variant="outline"
              onClick={handleRemoveImage}
              className="w-full border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 rounded-xl font-bold py-5"
            >
              Remove and Change
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
