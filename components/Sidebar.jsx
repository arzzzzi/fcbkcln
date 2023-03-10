import { useSession } from 'next-auth/react';
import { UsersIcon, DesktopComputerIcon, ClockIcon, CalendarIcon } from '@heroicons/react/solid';
import { ChevronDownIcon, UserGroupIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import SidebarRow from './SidebarRow';

function Sidebar() {
  const { data: session, status } = useSession();

  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
      <SidebarRow Icon={UsersIcon} title="Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
      <SidebarRow Icon={CalendarIcon} title="Events" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  );
}

export default Sidebar;
