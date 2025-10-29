import { useState } from 'react';
import { Card, Button, Container } from '../index';
import { useAuth } from '../hooks/useAuth';
import { sidebarMenu } from '../constants/items';
import { IoIosCloseCircleOutline, IoMdLogOut } from 'react-icons/io';
import { FiMenu } from 'react-icons/fi';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const { user, handleLogout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="p-4 md:hidden flex justify-between items-center bg-white border-b border-gray-300 rounded-2xl">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center justify-center p-2  text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-all duration-300"
          aria-label="Open menu"
        >
          <FiMenu size={24} />
        </div>
      </div>

      <Card
        className={`fixed md:static z-[9999] top-0 left-0 sm:w-64 w-full rounded-none sm:rounded-2xl h-screen md:h-full flex flex-col justify-between transform transition-transform duration-300
                ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        padding="sm"
      >
        <div className="md:hidden absolute top-2 right-3" onClick={() => setOpen(false)}>
          <IoIosCloseCircleOutline
            size={24}
            className="text-gray-700 hover:bg-gray-100 transition-all duration-300"
          />
        </div>

        <div className="sm:pt-0 pt-10">
          <div className="flex flex-col items-center gap-2 mb-4">
            <img
              src={user?.avatar}
              alt={user?.fullName}
              className="w-20 h-20 rounded-full border-2 border-indigo-500 object-fit"
            />
            <h2 className="font-semibold text-gray-800 capitalize">{user?.fullName}</h2>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>

          <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {sidebarMenu?.map(item => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setOpen(false);
                  }}
                  className={`flex items-center cursor-pointer space-x-2 pl-2 py-2 rounded-md text-sm font-medium transition-all duration-300 group
                                ${
                                  activeTab === item.id
                                    ? 'text-indigo-600 bg-indigo-50 font-semibold'
                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'
                                }`}
                >
                  <IconComponent size={15} />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-4 left-0 w-full px-5">
          <Button className="w-full flex items-center justify-center " onClick={handleLogout}>
            <IoMdLogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Sidebar;
