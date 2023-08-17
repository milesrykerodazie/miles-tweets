import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { getCurrentUser } from "@/app/lib/auth";
import SideButton from "./sideButton";
import { Notification } from "@/types";

const Sidebar = async ({ notification }: { notification: Notification }) => {
  //get current user
  const currentUser = await getCurrentUser();

  return (
    <div className="hidden sm:block sm:col-span-1 lg:pr-6  ">
      <div className="flex flex-col items-end md:items-start sticky top-0 h-screen">
        <div className="flex-1 space-y-2 lg:w-[230px]">
          <Logo />

          <SidebarItem currentUser={currentUser} notification={notification} />
          <SideButton />
        </div>
        <div className="text-white pb-5">session logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
