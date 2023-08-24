"use client";
import React, { useState } from "react";
import Avatar from "./Avatar";
import TextareaAutosize from "react-textarea-autosize";
import { BsCardImage } from "react-icons/bs";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { SinglePostTypes } from "@/types";
import Link from "next/link";
import { format } from "date-fns";

interface FormProps {
  placeholder: string;
  secondary?: boolean;
  userImage: string;
  postData: SinglePostTypes;
}

interface FormData {
  quote: string;
  quoteImages: string[];
}

const RepostForm: React.FC<FormProps> = ({
  placeholder,
  secondary,
  userImage,
  postData,
}) => {
  //next route
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); //states
  const [form, setForm] = useState<FormData>({
    quote: "",
    quoteImages: [],
  });

  const { quote, quoteImages } = form;

  const numOfImages = quoteImages?.length;

  const maxLength = 100;
  const truncatedBody = postData?.body
    ? postData.body.length > maxLength
      ? postData.body.slice(0, maxLength - 3) + "..."
      : postData.body
    : "Say something";

  // handle text on change
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // handle image onchange
  //handling the onChange of the images,
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedImages = Array.from(files);

      if (selectedImages?.length > 4) {
        toast.error("Only 4 images allowed.");
        return;
      }
      // Convert selected images to base64
      const imagePromises = selectedImages.map((image: File) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            resolve(base64String);
          };
          reader.readAsDataURL(image);
        });
      });

      // Wait for all images to be converted to base64
      Promise.all(imagePromises)
        .then((base64Images: string[]) => {
          setForm((prevFormData) => ({
            ...prevFormData,
            quoteImages: [...prevFormData.quoteImages, ...base64Images],
          }));
        })
        .catch((error) => {
          // Handle any errors that occurred during base64 conversion
          console.error("Error converting images to base64:", error);
        });
    }
  };

  //removing specific image fom the selected images
  const removeImage = (index: number) => {
    setForm((prevFormData) => {
      const updatedImages = [...prevFormData.quoteImages];
      updatedImages.splice(index, 1);
      return {
        ...prevFormData,
        quoteImages: updatedImages,
      };
    });
  };

  const canSubmit = quote !== "" || quoteImages.length > 0;

  // //post function
  const handleCreateRepost = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault;
    setIsLoading(true);
    if (!canSubmit) {
      toast.error("Empty post not allowed.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`/api/retweet/${postData?.id}`, {
        quote: quote ? quote : "",
        imageFiles: quoteImages?.length > 0 ? quoteImages : [],
      });
      if (response?.data) {
        if (response?.data?.success === true) {
          toast.success(response?.data?.message);
          setForm({
            quote: "",
            quoteImages: [],
          });

          router.back();
        }
        if (response?.data?.success === false) {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <div className={`${secondary ? "" : "hidden sm:block"}`}>
      <div className="flex flex-row gap-4 p-3">
        {/* profile pics */}
        <div>
          <Avatar image={userImage} size="md:h-10 md:w-10 h-7 w-7 trans" />
        </div>
        {/* text area section */}
        <div className="w-full">
          <TextareaAutosize
            name="quote"
            value={quote}
            onChange={handleChange}
            cacheMeasurements
            className="disabled:opacity-80 peer resize-none w-full mb-3 bg-black ring-0 outline-none text-sm lg:text-base placeholder-neutral-500 text-white overflow-y-hidden placeholder:text-sm placeholder:md:text-base"
            placeholder={placeholder}
          />

          {/* display images here */}
          <div
            className={`grid gap-3 pb-3 ${
              numOfImages === 1 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {quoteImages?.length > 0 &&
              quoteImages?.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-full  trans ${
                    quoteImages?.length === 1
                      ? "h-[400px] lg:h-[450px]"
                      : "h-44 md:h-60 lg:h-72"
                  }`}
                >
                  <Image
                    src={img}
                    alt="postimage"
                    fill
                    className="object-cover rounded-xl"
                  />
                  {/* close icon */}
                  <div className="cursor-pointer absolute top-2 right-1 flex items-center space-x-3">
                    <div
                      onClick={() => removeImage(index)}
                      className="w-10 h-10 rounded-full bg-black/70 flex justify-center items-center"
                    >
                      <IoMdClose className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* post to repost here  */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              router.push(
                `/tweet/${postData?.user?.username}/status/${postData?.id}`
              );
            }}
            className={`border border-neutral-800 rounded-xl ${
              quoteImages?.length > 0 ? "pb-3" : ""
            }`}
          >
            <div className="text-white flex flex-row gap-1 p-3">
              <div>
                <Avatar image={postData?.user?.image} size="h-5 w-5" />
              </div>
              {/* other attributes */}
              <div className="flex items-center justify-between ">
                <div className="flex items-center space-x-2 text-sm md:text-base trans">
                  <Link
                    href={`/profile/${postData?.user?.username}`}
                    className="text-white"
                  >
                    {postData?.user?.name}
                  </Link>
                  <Link
                    href={`/profile/${postData?.user?.username}`}
                    className="text-gray-600"
                  >
                    @{postData?.user?.username}
                  </Link>
                  <p className="text-gray-600">
                    . {format(postData?.createdAt, "MMM-dd")}
                  </p>
                </div>
              </div>
            </div>
            {/* the post text and images */}
            <div
              className={`flex ${
                quoteImages?.length > 0
                  ? "flex-row space-x-2 space-y-0"
                  : "flex-col space-y-1"
              }`}
            >
              <div
                className={`cursor-pointer text-white ${
                  quoteImages?.length > 0 ? "order-1 px-2 flex-1" : "p-3"
                }`}
              >
                {truncatedBody}
              </div>
              <div
                className={`grid gap-1 ${
                  postData?.postImages?.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-2"
                }`}
              >
                {postData?.postImages?.length > 0 &&
                  postData?.postImages?.map((img) => (
                    <div key={img?.id} className="relative">
                      <Image
                        src={img?.url}
                        alt="postimage"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={` w-[100%] ${
                          quoteImages?.length > 0
                            ? "h-16 rounded-lg"
                            : "rounded-b-lg h-52 lg:h-60"
                        }`}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-black z-20">
        <hr className="border-gray-700 mt-3" />
        <div className="flex flex-row items-center justify-between px-3 py-3">
          {/* attibutes of post */}
          <label htmlFor="quoteImages" className="">
            <BsCardImage className="h-4 w-4 md:h-5 md:w-5 trans text-white" />
          </label>
          <input
            id="quoteImages"
            type="file"
            accept="image/*"
            multiple
            disabled={isLoading}
            hidden
            onChange={handleFileChange}
          />
          {/* post button */}

          <button
            onClick={handleCreateRepost}
            type="button"
            disabled={isLoading}
            className={`trans disabled:opacity-30 disabled:cursor-not-allowed px-4 py-1 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer text-white text-sm md:text-base ${
              !canSubmit && "opacity-30 cursor-not-allowed"
            }`}
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Post"}
          </button>
        </div>
      </div>
      {secondary !== true && <hr className="border-gray-700 mt-1" />}
    </div>
  );
};

export default RepostForm;
