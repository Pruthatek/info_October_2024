import { Home, NotebookText, Pen, Settings, User } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white flex flex-col fixed shadow-md rounded-r-sm">
      <div className="p-4 text-2xl font-bold border-b border-gray-700 text-[#f05225]">
        Blog Management
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="p-4">
          <li className="mb-2">
            <a
              href="/dashboard"
              className="flex items-center p-2 text-[#f05225] hover:bg-[#f05225]/80 hover:text-white rounded"
            >
              <Home className="mr-3" />
              All Post
            </a>
          </li>
          <li className="mb-2">
            <a
              href="/dashboard/latest"
              className="flex items-center p-2 text-[#f05225] hover:bg-[#f05225]/80 hover:text-white rounded"
            >
              <NotebookText className="mr-3" />
              Latest Post
            </a>
          </li>
          <li className="mb-2">
            <a
              href="/dashboard/editor"
              className="flex items-center p-2 text-[#f05225] hover:bg-[#f05225]/80 hover:text-white rounded"
            >
              <Pen className="mr-3" />
              Upload
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
