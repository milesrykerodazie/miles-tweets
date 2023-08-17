import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { getCurrentUser } from "@/app/lib/auth";
import SideButton from "./sideButton";
import { Notification } from "@/types";
import Avatar from "../Avatar";
import { BsThreeDots } from "react-icons/bs";
import Logout from "./modal/Logout";

const Sidebar = async ({ notification }: { notification: Notification }) => {
  //get current user
  const currentUser = await getCurrentUser();

  return (
    <div className="hidden sm:block sm:col-span-1 lg:pr-6">
      <div className=" w-full flex flex-col items-end md:items-start sticky top-0 h-screen">
        <div className="flex-1 space-y-2 lg:w-[230px]">
          <Logo />

          <SidebarItem currentUser={currentUser} notification={notification} />
          <SideButton />
        </div>

        {/* logout session */}

        {currentUser && <Logout currentUser={currentUser} />}
      </div>
    </div>
  );
};

export default Sidebar;
