import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  // Logic to add or update an address
  function handleManageAddress(event) {
    event.preventDefault();

    // Limit users to a maximum of 3 addresses
    if (addressList?.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "Address limit reached",
        description: "You can add a maximum of 3 addresses.",
        variant: "destructive",
      });
      return;
    }

    if (currentEditedId !== null) {
      dispatch(
        editAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData,
        }),
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setCurrentEditedId(null);
          setFormData(initialAddressFormData);
          toast({ title: "Address updated successfully" });
        }
      });
    } else {
      dispatch(
        addNewAddress({
          ...formData,
          userId: user?.id,
        }),
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setFormData(initialAddressFormData);
          toast({ title: "Address added successfully" });
        }
      });
    }
  }

  // Handle address deletion
  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({
        userId: user?.id,
        addressId: getCurrentAddress._id,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({ title: "Address deleted successfully" });
      }
    });
  }

  // Populate form for editing
  function handleEditAddress(currentAddress) {
    setCurrentEditedId(currentAddress?._id);
    setFormData({
      address: currentAddress?.address || "",
      city: currentAddress?.city || "",
      phone: currentAddress?.phone || "",
      pincode: currentAddress?.pincode || "",
      notes: currentAddress?.notes || "",
    });
  }

  // Basic form validation
  function isFormValid() {
    return Object.values(formData).every(
      (val) => typeof val === "string" && val.trim() !== "",
    );
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddresses(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <Card className="border-none shadow-none bg-transparent">
      {/* Address List Grid */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {addressList && addressList.length > 0 ? (
          addressList.map((singleAddressItem) => (
            <AddressCard
              key={singleAddressItem._id}
              selectedId={selectedId}
              handleDeleteAddress={handleDeleteAddress}
              addressInfo={singleAddressItem}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm italic col-span-full text-center py-4">
            No addresses found. Please add one below.
          </p>
        )}
      </div>

      {/* Add/Edit Form Section */}
      <Card className="rounded-2xl border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b">
          <CardTitle className="text-lg font-bold text-gray-800">
            {currentEditedId !== null
              ? "Update Address"
              : "Add New Shipping Address"}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={
              currentEditedId !== null ? "Update Address" : "Save Address"
            }
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}
          />
        </CardContent>
      </Card>
    </Card>
  );
}

export default Address;
