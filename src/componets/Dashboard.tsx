import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import Container from './Container';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-0">
      <Container className="">
        <div className="flex flex-col md:flex-row min-h-screen sm:pt-40 pt-0">
          <div className="flex-shrink-0 h-auto sm:!h-[500px]">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="flex-1 h-screen md:h-auto overflow-y-auto mt-6 md:mt-0">
            <div className="w-full max-w-4xl mx-auto ">
              {activeTab === 'profile' && <Profile />}
              {activeTab === 'change-password' && <ChangePassword />}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
