import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { MapPin, Phone, Notebook, Edit3, Trash2 } from "lucide-react";

/**
 * AddressCard Component
 * Displays individual address details with edit/delete actions and selection state.
 */
function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  // Check if this specific card is the one currently selected
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : undefined
      }
      className={`cursor-pointer transition-all duration-300 rounded-2xl overflow-hidden border-2 ${
        isSelected
          ? "border-blue-600 bg-blue-50/30 ring-2 ring-blue-100 shadow-md"
          : "border-gray-100 hover:border-gray-300 bg-white"
      }`}
    >
      <CardContent className="grid p-5 gap-3">
        {/* Address Header with Icon */}
        <div className="flex items-start gap-3">
          <MapPin
            className={`w-5 h-5 mt-0.5 ${isSelected ? "text-blue-600" : "text-gray-400"}`}
          />
          <div className="flex flex-col gap-1">
            <Label className="font-bold text-gray-800 leading-tight">
              {addressInfo?.address}
            </Label>
            <span className="text-sm text-gray-500">
              {addressInfo?.city}, {addressInfo?.pincode}
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Phone className="w-4 h-4 text-gray-400" />
          <span>{addressInfo?.phone}</span>
        </div>

        {/* Additional Notes */}
        {addressInfo?.notes && (
          <div className="flex items-start gap-3 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-100">
            <Notebook className="w-4 h-4 mt-0.5" />
            <p className="italic leading-snug">{addressInfo?.notes}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        {/* Edit Button */}
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl h-9 text-xs font-bold gap-2 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card selection when clicking edit
            handleEditAddress(addressInfo);
          }}
        >
          <Edit3 className="w-3.5 h-3.5" />
          Edit
        </Button>

        {/* Delete Button */}
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl h-9 text-xs font-bold gap-2 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card selection when clicking delete
            handleDeleteAddress(addressInfo);
          }}
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
