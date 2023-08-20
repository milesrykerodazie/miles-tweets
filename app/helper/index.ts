import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { toast } from "react-hot-toast";

export const handleLike = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  userId: string,
  id: string,
  router: AppRouterInstance
) => {
  setIsLoading(true);
  try {
    if (!userId) {
      toast.error("Login to like.");
      return;
    }
    const response = await axios.post(`/api/like-post/${id}`, {
      userId: userId,
    });
    if (response?.data) {
      if (response?.data?.success === true) {
        setIsLoading(false);
        toast.success(response?.data?.message);
        router.refresh();
      }
      if (response?.data?.success === false) {
        toast.error(response?.data?.message);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const handleUserFollow = async (
  userId: string,
  followUser: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: AppRouterInstance
) => {
  try {
    setIsLoading(true);
    if (!userId) {
      toast.error("Login to follow!");
      return;
    }

    const response = await axios.post(`/api/follow-user/${followUser}`, {
      userId: userId,
    });
    if (response?.data) {
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        setIsLoading(false);
        router.refresh();
      }
      if (response?.data?.success === false) {
        toast.error(response?.data?.message);
      }
    }
  } catch (error) {
    toast.error("Something went wrong!");
  } finally {
    setIsLoading(false);
  }
};
