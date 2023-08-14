import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { getCurrentUser } from "@/app/lib/auth";
import SideButton from "./sideButton";

const Sidebar = async () => {
  //get current user
  const currentUser = await getCurrentUser();

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <Logo />

          <SidebarItem currentUser={currentUser} />
          <SideButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
