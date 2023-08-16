import React from "react";
import { getNotificaions } from "../actions";
import NotificationPage from "../components/NotificationPage";
import { NotificationTypes } from "@/types";
import Header from "../components/structure/Header";

const Notification = async () => {
  //get notifications
  const userNotifications = (await getNotificaions()) as NotificationTypes[];

  return (
    <div className="text-white">
      <Header title="Notifications" />
      {userNotifications.length > 0 ? (
        <div>
          {userNotifications?.map((notification) => (
            <NotificationPage
              key={notification?.id}
              notificationData={notification}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-10">
          No notifications!
        </div>
      )}
    </div>
  );
};

export default Notification;
