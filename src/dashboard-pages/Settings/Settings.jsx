import React, { useState } from "react";
import AccountSettings from "./AccountSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b pb-3 mb-6">
        <button
          onClick={() => setActiveTab("account")}
          className={`px-4 py-2 font-medium rounded-t ${
            activeTab === "account"
              ? "bg-white border-t border-l border-r border-gray-300"
              : "bg-gray-100"
          }`}
        >
          Account
        </button>
        <button
          onClick={() => setActiveTab("appearance")}
          className={`px-4 py-2 font-medium rounded-t ${
            activeTab === "appearance"
              ? "bg-white border-t border-l border-r border-gray-300"
              : "bg-gray-100"
          }`}
        >
          Appearance
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-4 py-2 font-medium rounded-t ${
            activeTab === "notifications"
              ? "bg-white border-t border-l border-r border-gray-300"
              : "bg-gray-100"
          }`}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab("privacy")}
          className={`px-4 py-2 font-medium rounded-t ${
            activeTab === "privacy"
              ? "bg-white border-t border-l border-r border-gray-300"
              : "bg-gray-100"
          }`}
        >
          Privacy
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-white p-6 rounded-md shadow-md">
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "appearance" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            <p>Toggle dark mode or change theme color.</p>
          </div>
        )}
        {activeTab === "notifications" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Notification Settings
            </h2>
            <p>Manage email and app notification preferences.</p>
          </div>
        )}
        {activeTab === "privacy" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Privacy & Security</h2>
            <p>Control visibility and security options.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
