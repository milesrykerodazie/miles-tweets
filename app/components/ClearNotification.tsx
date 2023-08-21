"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const ClearNotification = () => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  //handle clear notifications
  const clearNotifications = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setDeleting(true);
    try {
      const response = await axios.delete("/api/clear-notifications");
      if (response?.data) {
        if (response?.data?.success === true) {
          toast.success(response?.data?.message);
          setDeleting(false);
          router.refresh();
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <button
      type="button"
      disabled={deleting}
      onClick={clearNotifications}
      className="text-sm text-red-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    >
      {deleting ? (
        <FaSpinner className="text-red-500 animate-spin w-5 h-5 opacity-50" />
      ) : (
        "Clear"
      )}
    </button>
  );
};

export default ClearNotification;
