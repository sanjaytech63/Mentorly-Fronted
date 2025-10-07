import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
// import UpdateAccount from "./UpdateAccount";
import Container from "./Container";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50 pt-52">
      <Container>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="flex-shrink-0 h-[55vh]">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <div className="flex-1 flex justify-center mt-6 md:mt-0 h-[65vh] overflow-y-auto">
            <div className="w-full max-w-4xl">
              {activeTab === "profile" && <Profile />}
              {activeTab === "change-password" && <ChangePassword />}
              {/* {activeTab === "update-account" && <UpdateAccount />} */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
