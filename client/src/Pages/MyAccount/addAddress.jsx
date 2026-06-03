import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useContext } from "react";
import { MyContext } from "../../App";
import TextField from "@mui/material/TextField";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "react-international-phone/style.css";
import { Button } from "@mui/material";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const AddAddress = () => {
  const [phone, setPhone] = useState("");
  const [addressType, setAddressType] = useState("");

  const [formFields, setFormsFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    userId: "",
    addressType: "",
    landmark: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

  useEffect(() => {
    if (context?.userData?._id !== undefined) {
      setFormsFields((prevState) => ({
        ...prevState,
        userId: context?.userData?._id,
      }));
    }
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const handleChangeAddressType = (event) => {
    setAddressType(event.target.value);
    setFormsFields(() => ({
      ...formFields,
      addressType: event.target.value,
    }));
  };

  useEffect(() => {
    if (context?.addressMode === "edit") {
      fetchAddress(context?.addressId);
    }
  }, [context?.addressMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.address_line1 === "") {
      context.alertBox("error", "Please enter Address Line 1");
      return false;
    }

    if (formFields.city === "") {
      context.alertBox("error", "Please enter Your city name");
      return false;
    }

    if (formFields.state === "") {
      context.alertBox("error", "Please enter your state");
      return false;
    }

    if (formFields.pincode === "") {
      context.alertBox("error", "Please enter your pincode");
      return false;
    }

    if (formFields.country === "") {
      context.alertBox("error", "Please enter your country");
      return false;
    }

    if (phone === "" || phone?.length < 5) {
      context.alertBox("error", "Please enter your 10 digit mobile number a");
      return false;
    }

    if (formFields.landmark === "") {
      context.alertBox("error", "Please enter landmark");
      return false;
    }

    if (formFields.addressType === "") {
      context.alertBox("error", "Please select address type");
      return false;
    }

    if (context?.addressMode === "add") {
      setIsLoading(true);
      postData(`/api/address/add`, formFields, { withCredentials: true }).then(
        (res) => {
          console.log(res);
          if (res?.error !== true) {
            context.alertBox("success", res?.message);
            setTimeout(() => {
              context.setOpenAddressPanel(false);
              setIsLoading(false);
            }, 500);

            context.getUserDetails();

            setFormsFields({
              address_line1: "",
              city: "",
              state: "",
              pincode: "",
              country: "",
              mobile: "",
              userId: "",
              addressType: "",
              landmark: "",
            });

            setAddressType("");
            setPhone("");
          } else {
            context.alertBox("error", res?.message);
            setIsLoading(false);
          }
        },
      );
    }

    if (context?.addressMode === "edit") {
      setIsLoading(true);
      editData(`/api/address/${context?.addressId}`, formFields, {
        withCredentials: true,
      }).then((res) => {
        fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`,
        ).then((res) => {
          setTimeout(() => {
            setIsLoading(false);
            context.setOpenAddressPanel(false);
          }, 500);
          context?.getUserDetails(res.data);

          setFormsFields({
            address_line1: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            mobile: "",
            userId: "",
            addressType: "",
            landmark: "",
          });

          setAddressType("");
          setPhone("");
        });
      });
    }
  };

  const fetchAddress = (id) => {
    fetchDataFromApi(`/api/address/${id}`).then((res) => {
      setFormsFields({
        address_line1: res?.address?.address_line1,
        city: res?.address?.city,
        state: res?.address?.state,
        pincode: res?.address?.pincode,
        country: res?.address?.country,
        mobile: res?.address?.mobile,
        userId: res?.address?.userId,
        addressType: res?.address?.addressType,
        landmark: res?.address?.landmark,
      });

      const ph = `"${res?.address?.mobile}"`;
      setPhone(ph);
      setAddressType(res?.address?.addressType);
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] z-[99999] flex items-center justify-center p-4">
      <div className="bg-white w-full md:w-[700px] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(0,0,0,0.08)]">
          <h2 className="text-[22px] font-[700] text-[#111]">
            {context?.addressMode === "edit" ? "Edit Address" : "Add Address"}
          </h2>

          <button
            className="w-[35px] h-[35px] rounded-full bg-gray-100 hover:bg-red-100 text-[22px] flex items-center justify-center transition-all"
            onClick={() => context?.setOpenAddressPanel(false)}
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <form
          className="p-6 max-h-[80vh] overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* ADDRESS */}
            <div className="col-span-2">
              <TextField
                className="w-full"
                label="Address Line 1"
                variant="outlined"
                size="small"
                name="address_line1"
                onChange={onChangeInput}
                value={formFields.address_line1}
              />
            </div>

            {/* CITY */}
            <div>
              <TextField
                className="w-full"
                label="City"
                variant="outlined"
                size="small"
                name="city"
                onChange={onChangeInput}
                value={formFields.city}
              />
            </div>

            {/* STATE */}
            <div>
              <TextField
                className="w-full"
                label="State"
                variant="outlined"
                size="small"
                name="state"
                onChange={onChangeInput}
                value={formFields.state}
              />
            </div>

            {/* PINCODE */}
            <div>
              <TextField
                className="w-full"
                label="Pincode"
                variant="outlined"
                size="small"
                name="pincode"
                onChange={onChangeInput}
                value={formFields.pincode}
              />
            </div>

            {/* COUNTRY */}
            <div>
              <TextField
                className="w-full"
                label="Country"
                variant="outlined"
                size="small"
                name="country"
                onChange={onChangeInput}
                value={formFields.country}
              />
            </div>

            {/* PHONE */}
            <div className="col-span-2">
              <label className="text-[14px] font-[500] mb-2 block">
                Mobile Number
              </label>

              <PhoneInput
                defaultCountry="in"
                value={phone}
                onChange={(phone) => {
                  setPhone(phone);

                  setFormsFields((prevState) => ({
                    ...prevState,
                    mobile: phone,
                  }));
                }}
              />
            </div>

            {/* LANDMARK */}
            <div className="col-span-2">
              <TextField
                className="w-full"
                label="Landmark"
                variant="outlined"
                size="small"
                name="landmark"
                onChange={onChangeInput}
                value={formFields.landmark}
              />
            </div>
          </div>

          {/* ADDRESS TYPE */}
          <div className="mt-6">
            <FormControl>
              <FormLabel>Address Type</FormLabel>

              <RadioGroup
                row
                value={addressType}
                onChange={handleChangeAddressType}
              >
                <FormControlLabel
                  value="Home"
                  control={<Radio />}
                  label="Home"
                />

                <FormControlLabel
                  value="Office"
                  control={<Radio />}
                  label="Office"
                />
              </RadioGroup>
            </FormControl>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center justify-end gap-4 mt-8">
            <Button
              variant="outlined"
              onClick={() => context?.setOpenAddressPanel(false)}
            >
              Cancel
            </Button>

            <Button type="submit" className="btn-org btn-lg min-w-[180px]">
              {isLoading ? (
                <CircularProgress color="inherit" size={24} />
              ) : context?.addressMode === "edit" ? (
                "Update Address"
              ) : (
                "Save Address"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
