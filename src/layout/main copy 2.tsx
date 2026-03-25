import type { ReactNode } from "react";
import { useState } from "react";
import { FaCheckCircle, FaClipboardList, FaConciergeBell, FaIdBadge } from "react-icons/fa";
import { FcAbout, FcComments } from "react-icons/fc";
import { HiOutlineDotsHorizontal, HiUsers } from "react-icons/hi";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { PiHouseFill } from "react-icons/pi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { Link } from "react-router";
import { HiMenu } from "react-icons/hi";

interface MainProps {
    children: ReactNode;
}

export const Main = ({ children }: MainProps) => {

    const [collapsed, setCollapsed] = useState(false);

    const page = window.location.pathname.split("/").pop();

    return (

        <div className="w-full h-[100dvh] flex overflow-hidden">

            {/* SIDEBAR */}
            <div
                className={`h-full bg-[url('/images/sidebarBG.png')] bg-cover bg-center transition-all duration-300
                ${collapsed ? "w-20" : "w-64"}`}
            >

                {/* LOGO */}
                <div className="flex items-center justify-between text-white px-4 py-5">

                    {!collapsed && (
                        <div className="flex gap-2 items-center">
                            <img className="size-10" src="/images/logo.png" />
                            <span className="font-semibold text-xl">HRMS</span>
                        </div>
                    )}

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-white"
                    >
                        <HiMenu size={26} />
                    </button>

                </div>

                {/* USER */}
                {!collapsed && (
                    <div className="flex items-center gap-3 px-4 pb-4">
                        <img className="size-12 rounded-full" src="/images/nobita.jpg" />
                        <div className="text-white">
                            <div className="font-medium">Virgilio Galicia</div>
                            <div className="text-sm opacity-80">Admin</div>
                        </div>
                    </div>
                )}

                {/* MENU */}
                <div className="text-white flex flex-col gap-2 px-2">

                    <SidebarItem collapsed={collapsed} to="/dashboard" icon={<PiHouseFill />} status={page === "dashboard"} text="Dashboard" />
                    <SidebarItem collapsed={collapsed} to="/employee" icon={<HiUsers />} status={page === "employee"} text="Employees" />
                    <SidebarItem collapsed={collapsed} to="/attendance" icon={<FaCheckCircle />} status={page === "attendance"} text="Attendance" />
                    <SidebarItem collapsed={collapsed} to="/payroll" icon={<MdPlaylistAddCheckCircle />} status={page === "payroll"} text="Payroll" />
                    <SidebarItem collapsed={collapsed} to="/performance" icon={<FaClipboardList />} status={page === "performance"} text="Performance" />
                    <SidebarItem collapsed={collapsed} to="/recruitment" icon={<FaIdBadge />} status={page === "recruitment"} text="Recruitment" />
                    <SidebarItem collapsed={collapsed} to="/more" icon={<HiOutlineDotsHorizontal />} status={page === "more"} text="More" />
                    <SidebarItem collapsed={collapsed} to="/settings" icon={<IoMdSettings />} status={page === "settings"} text="Settings" />
                    <SidebarItem collapsed={collapsed} to="/logout" icon={<RiLogoutCircleRFill />} status={page === "logout"} text="Logout" />

                </div>

            </div>


            {/* MAIN CONTENT */}
            <div className="flex-1 bg-slate-100 flex flex-col">

                {/* TOP BAR */}
                <div className="border-b border-slate-200 h-16 flex items-center px-6 bg-white">

                    <div className="font-semibold text-xl text-slate-700 w-1/4">
                        Dashboard
                    </div>

                    {/* SEARCH */}
                    <div className="border rounded flex items-center px-3 bg-white shadow w-2/4">
                        <IoSearchOutline className="text-slate-600 size-5" />
                        <input
                            className="p-2 outline-none w-full"
                            placeholder="Search..."
                        />
                    </div>

                    {/* RIGHT */}
                    <div className="flex justify-end items-center gap-3 w-1/4">

                        <IconButton icon={<FcAbout />} />
                        <IconButton icon={<FaConciergeBell />} />
                        <IconButton icon={<FcComments />} />
                        <IconButton icon={<IoIosNotifications />} />

                        <span className="font-medium">Virgilio</span>

                        <img
                            className="size-10 rounded-full"
                            src="/images/nobita.jpg"
                        />

                    </div>

                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-auto">
                    {children}
                </div>

            </div>

        </div>

    );
};


interface SidebarProps {
    status: boolean;
    text: string;
    icon: ReactNode;
    to: string;
    collapsed: boolean;
}

function SidebarItem({ status, text, icon, to, collapsed }: SidebarProps) {

    return (

        <Link to={to}>

            <div
                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-white/10
                ${status ? "bg-white/10 border border-white/20" : ""}`}
            >

                <div className="text-2xl">
                    {icon}
                </div>

                {!collapsed && (
                    <span className="text-md">{text}</span>
                )}

            </div>

        </Link>

    );

}


function IconButton({ icon }: { icon: ReactNode }) {

    return (
        <div className="size-9 cursor-pointer border flex items-center justify-center bg-white border-slate-200 shadow rounded">
            {icon}
        </div>
    );

}