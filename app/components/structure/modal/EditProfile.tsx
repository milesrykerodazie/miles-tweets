"use client";

import { FormState, Profile } from "@/types";
import Image from "next/image";
import { FC, useCallback, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Avatar from "../../Avatar";
import { AiOutlineCamera } from "react-icons/ai";
import FormField from "../../FormField";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ModalProps {
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  userData: Profile;
}

const EditProfile: FC<ModalProps> = ({ setOpenEdit, userData }) => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showCount, setShowCount] = useState({
    name: false,
    bio: false,
  });
  const [form, setForm] = useState<FormState>({
    name: userData?.name,
    bio: userData?.bio,
    coverImage: "",
    userImage: "",
  });
  const [count, setCount] = useState({
    name: form?.name?.length > 0 ? form?.name?.length : 0,
    bio: form?.bio?.length > 0 ? form?.bio?.length : 0,
  });

  // show name count
  const toggleName = () => {
    setShowCount((prevState) => ({
      ...prevState,
      name: !prevState.name,
    }));
  };
  // show bio count
  const toggleBio = () => {
    setShowCount((prevState) => ({
      ...prevState,
      bio: !prevState.name,
    }));
  };

  //input on change
  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    // setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [fieldName]: value };
      if (fieldName === "name") {
        setCount((prev) => {
          const updatedCount = { ...prev, name: value.length };
          return updatedCount;
        });
      }
      if (fieldName === "bio") {
        setCount((prev) => {
          const updatedCount = { ...prev, bio: value.length };
          return updatedCount;
        });
      }
      return updatedForm;
    });
  };

  // profile image onchange
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormState
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setForm((prevFormData) => ({
          ...prevFormData,
          [field]: base64String,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const updateData = {
    name: form?.name,
    bio: form?.bio,
    userImage: form?.userImage,
    coverImage: form?.coverImage,
  };
  //edit function
  const handleEdit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await axios.patch(
          `/api/profile/${userData?.id}/edit`,
          updateData
        );

        if (response?.data) {
          if (response?.data?.success === true) {
            toast.success(response?.data?.message);
            setOpenEdit(false);
            route.push(`/profile/${response?.data?.username}`);
          }
          if (response?.data?.success === false) {
            toast.error(response?.data?.message);
          }
        }
      } catch (error: any) {
        console.log("error => ", error);
      } finally {
        setIsLoading(false);
        route.refresh();
      }
    },
    [form?.bio, form?.coverImage, form?.name, form?.userImage]
  );

  return (
    <div
      onBlur={(e) => {
        e.preventDefault();
        setShowCount({
          name: false,
          bio: false,
        });
      }}
      className="editModal"
    >
      <div className="edit_modal_wrapper">
        {/* head here */}
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center space-x-4">
            <button onClick={() => setOpenEdit(false)} className="">
              <IoMdClose className="text-white h-4 w-4 md:h-5 md:w-5 trans" />
            </button>
            <h4 className="font-semibold text-white text-sm md:text-base trans">
              Edit Profile
            </h4>
          </div>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleEdit}
            className="px-4 py-1 text-sm bg-white text-primary rounded-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            save
          </button>
        </div>
        {/* the form here */}
        <div className="mt-4">
          {/* the images */}
          <div className="bg-neutral-700 h-56 relative">
            <div className="">
              <Image
                src={
                  form?.coverImage
                    ? form?.coverImage
                    : userData?.coverImage
                    ? userData?.coverImage
                    : "/images/dummy.jpg"
                }
                fill
                alt="Cover Image"
                style={{ objectFit: "cover" }}
              />
              <div className="absolute top-16 left-[40%] right-[30%] flex items-center space-x-3">
                <label
                  htmlFor="coverImage"
                  className="w-8 h-8 trans md:w-12 md:h-12 rounded-full bg-black/40 flex justify-center items-center"
                >
                  <AiOutlineCamera className="h-4 w-4 md:h-5 md:w-5 trans" />
                </label>
                <input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  hidden
                  className="form_image-input"
                  onChange={(e) => handleChange(e, "coverImage")}
                />
                <div
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      coverImage: "",
                    }))
                  }
                  className="w-8 h-8 trans md:w-12 md:h-12 rounded-full bg-black/40 flex justify-center items-center"
                >
                  <IoMdClose className="h-4 w-4 md:h-5 md:w-5 trans" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-7 left-4">
              <div className="relative">
                <Avatar
                  image={
                    form?.userImage ? form?.userImage : userData?.userImage
                  }
                  size="trans w-16 h-16 md:h-20 md:w-20 "
                />
                <label
                  htmlFor="userImage"
                  className="absolute top-4 left-4 w-8 h-8 trans md:w-12 md:h-12 rounded-full bg-black/40 flex justify-center items-center cursor-pointer"
                >
                  <AiOutlineCamera className="h-4 w-4 md:h-5 md:w-5 trans" />
                </label>
                <input
                  id="userImage"
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  className="form_image-input"
                  onChange={(e) => handleChange(e, "userImage")}
                />
                {form?.userImage && (
                  <div
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        userImage: "",
                      }))
                    }
                    className="absolute top-0 right-0 w-6 h-6 rounded-full bg-black/60 flex justify-center items-center"
                  >
                    <IoMdClose className="w-3 h-3" />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* the inputs */}
          <div className="mt-10 px-3 space-y-10">
            {/* the name */}
            <FormField
              title="Name"
              count={count?.name}
              maxCount={50}
              showCount={showCount?.name}
              state={form?.name}
              setState={(value) => handleStateChange("name", value)}
              setShowCount={toggleName}
            />
            {/* the name */}
            <FormField
              title="Bio"
              count={count?.bio}
              maxCount={160}
              placeHolder={"Lets Know you."}
              showCount={showCount?.bio}
              state={form?.bio}
              setState={(value) => handleStateChange("bio", value)}
              setShowCount={toggleBio}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
