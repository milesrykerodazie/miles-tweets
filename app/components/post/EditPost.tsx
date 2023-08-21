"use client";
import React, { FC, useCallback, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { BsCardImage } from "react-icons/bs";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import Avatar from "../Avatar";
import { PostTypes } from "@/types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface EditPostPropTypes {
  userImage: string;
  postData: PostTypes;
}

interface FormData {
  postText: string;
  postImages: string[];
}

const EditPost: FC<EditPostPropTypes> = ({ userImage, postData }) => {
  //next route
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); //states
  const [post, setPost] = useState<FormData>({
    postText: postData?.body,
    postImages: [],
  });

  const { postText, postImages } = post;

  const numOfImages = postImages?.length;

  // handle text on change
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPost((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //handling the onChange of the images,
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedImages = Array.from(files);

      if (selectedImages?.length + numOfImages > 4) {
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
          setPost((prevFormData) => ({
            ...prevFormData,
            postImages: [...prevFormData.postImages, ...base64Images],
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
    setPost((prevFormData) => {
      const updatedImages = [...prevFormData.postImages];
      updatedImages.splice(index, 1);
      return {
        ...prevFormData,
        postImages: updatedImages,
      };
    });
  };

  const canSubmit = postText !== "" || postImages.length > 0;

  // //post function
  const handleCreatePost = async (
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
      const response = await axios.post("/api/post/create", {
        post: postText ? postText : "",
        imageFiles: postImages?.length > 0 ? postImages : [],
      });
      if (response?.data) {
        if (response?.data?.success === true) {
          toast.success(response?.data?.message);
          setPost({
            postText: "",
            postImages: [],
          });
          router.refresh();
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

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="">
      {/* top */}
      <div className="sticky top-0 bg-black z-40">
        <div className="flex flex-row items-center justify-between px-3 py-2">
          <button type="button" onClick={onDismiss} className="">
            <IoMdClose className="text-white w-6 h-6" />
          </button>
          {/* attibutes of post */}
          <label htmlFor="postImages" className="">
            <BsCardImage className="h-4 w-4 md:h-5 md:w-5 trans text-white" />
          </label>
          <input
            id="postImages"
            type="file"
            accept="image/*"
            multiple
            disabled={isLoading}
            hidden
            onChange={handleFileChange}
          />

          {/* post button */}
          <button
            onClick={handleCreatePost}
            type="button"
            disabled={isLoading}
            className={`trans disabled:opacity-30 disabled:cursor-not-allowed px-4 py-1 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer text-white text-sm md:text-base ${
              !canSubmit && "opacity-30 cursor-not-allowed"
            }`}
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Update"}
          </button>
        </div>
        <hr className="border-gray-700 mt-3 mb-2" />
      </div>
      {/* section 1 */}
      <div className="flex flex-col pb-3">
        {/* text area section */}
        <div className="w-full">
          <TextareaAutosize
            name="postText"
            value={postText}
            onChange={handleChange}
            cacheMeasurements
            className="disabled:opacity-80 peer resize-none w-full mb-5 bg-black ring-0 outline-none text-sm lg:text-base placeholder-neutral-500 text-white overflow-y-hidden placeholder:text-sm placeholder:md:text-base"
            placeholder="hi"
          />
          {/* display images here */}
          <div
            className={`grid gap-3 ${
              numOfImages === 1 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {postImages?.length > 0 &&
              postImages?.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-full h-48 md:h-60 lg:h-72 trans ${
                    numOfImages === 1 && "h-72"
                  }`}
                >
                  <Image
                    src={img}
                    alt="postimage"
                    fill
                    className="object-cover rounded-xl"
                  />
                  {/* close icon */}
                  <div className="absolute top-2 right-1 flex items-center space-x-3">
                    <div
                      onClick={() => removeImage(index)}
                      className="w-10 h-10 rounded-full bg-black/80 flex justify-center items-center text-white"
                    >
                      <IoMdClose className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* display post images */}
          <div className={postImages?.length > 0 ? "hidden" : ""}>
            <Carousel infiniteLoop={true} showThumbs={false}>
              {postData?.postImages?.map((image) => (
                <div
                  key={image?.id}
                  className="w-full h-[550px] xl:h-[650px] trans"
                >
                  <img
                    src={image?.url}
                    alt="postimage"
                    className="object-contain w-full h-full"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
