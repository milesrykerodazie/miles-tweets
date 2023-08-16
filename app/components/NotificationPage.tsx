"use client";
import { NotificationTypes } from "@/types";
import React, { FC } from "react";
import Avatar from "./Avatar";
import { BsThreeDots } from "react-icons/bs";
import { format } from "date-fns";
import Header from "./structure/Header";

interface NotificationPropTypes {
  notificationData: NotificationTypes;
}

const NotificationPage: FC<NotificationPropTypes> = ({ notificationData }) => {
  return (
    <div className="border-t border-neutral-800">
      <div className="flex space-x-2 p-3">
        {/* user image */}
        <div>
          <Avatar image={notificationData?.notifierImage} size="h-8 w-8" />
        </div>

        {/* other details */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-white">{notificationData?.notifierName}</p>
              <p className="text-gray-600">
                {notificationData?.notifierusername}
              </p>
              <p className="text-gray-600">
                . {format(notificationData?.createdAt, "MMM-dd")}
              </p>
            </div>
            <div>
              <BsThreeDots className="text-gray-600" />
            </div>
          </div>
          <div className="mt-1 text-sm">{notificationData?.body}</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
