import type { ReactNode } from "react";
import { FaCheckCircle, FaClipboardList, FaConciergeBell, FaIdBadge } from "react-icons/fa";
import { FcAbout, FcComments } from "react-icons/fc";
import { HiOutlineDotsHorizontal, HiUsers } from "react-icons/hi";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { PiHouseFill } from "react-icons/pi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { Link } from "react-router";


interface MainProps {
    children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
    const page = window.location.pathname.split("/").pop();
    console.log(page);
    return (
        <div className="w-full h-[100dvh]  flex overflow-hidden">
            <div className="w-1/7  h-full bg-[url('/images/sidebarBG.png')] bg-cover bg-center bg-no-repeat">
                <div className="flex gap-2 items-center text-white  items-center justify-center py-5">
                    <img className="size-10" src="/images/logo.png" alt="logo" /><span className="font-semibold text-2xl">HRMS</span><span className="text-2xl">PORTAL</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <img className="size-15 rounded-full" src="/images/nobita.jpg" alt="logo" />
                    <div className="flex flex-col text-slate-100">
                        <span className="font-medium text-lg">Galicia, Virgilio S. JR</span>
                        <span>Admin</span>
                    </div>
                </div>
                <div className="text-slate-100   px-4 py-1 mt-2 flex flex-col gap-2">
                    {/* <span className="font-medium flex gap-1 items-center border w-full p-2 px-5 rounded-md bg-white/10  backdrop-blur-md   border border-white/20"><PiHouseFill className="size-7" /><span className="text-lg">Dashboard</span></span> */}
                    <Sidebaritem to={'/dashboard'} icon={<PiHouseFill className="size-7" />} status={page === 'dashboard'} text={"Dashboard"} />
                    <Sidebaritem to={'/employee'} icon={<HiUsers className="size-7" />} status={page === 'employee'} text={"Employees"} />
                    <Sidebaritem to={'/attendance'} icon={<FaCheckCircle className="size-7" />} status={page === 'attendance'} text={"Attendance"} />
                    <Sidebaritem to={'/payroll'} icon={<MdPlaylistAddCheckCircle className="size-7" />} status={page === 'payroll'} text={"Payroll"} />
                    <Sidebaritem to={'/performance'} icon={<FaClipboardList className="size-7" />} status={page === 'performance'} text={"Performance"} />
                    <Sidebaritem to={'/recruitment'} icon={<FaIdBadge className="size-7" />} status={page === 'recruitment'} text={"Recruitment"} />
                    <Sidebaritem to={'/more'} icon={<HiOutlineDotsHorizontal className="size-7" />} status={page === 'more'} text={"More"} />
                    <Sidebaritem to={'/settings'} icon={<IoMdSettings className="size-7" />} status={page === 'settings'} text={"Settings"} />
                    <Sidebaritem to={'/logout'} icon={<RiLogoutCircleRFill className="size-7" />} status={page === 'logout'} text={"Logout"} />
                </div>
            </div>
            <div className="w-6/7 h-full bg-slate-100">
                <div className="border-b border-slate-200  h-1/12 flex items-center px-4">
                    <label htmlFor="" className="font-medium text-2xl text-slate-700 w-1/10">Dashboard</label>
                    <div className="border border-slate-400 rounded w-6/10 flex items-center px-2 bg-white shadow">
                        <IoSearchOutline className="text-slate-600 size-5 cursor-pointer" />
                        <input className="p-2 outline-none w-full" placeholder="Search..." type="text" />
                    </div>
                    <div className="flex justify-end  w-2/10 p-2 items-center gap-3">
                        <div className="size-9 cursor-pointer border flex items-center justify-center text-slate-600 bg-white border-slate-200 shadow p-1 rounded">
                            <FcAbout className="size-9" />
                        </div>
                        <div className="size-9 cursor-pointer border flex items-center justify-center text-slate-600 bg-white border-slate-200 shadow p-1 rounded">
                            <FaConciergeBell className="size-9" />
                        </div>
                        <div className="size-8 cursor-pointer border flex items-center justify-center text-slate-600 bg-white border-slate-200 shadow p-1 rounded">
                            <FcComments className="size-8" />
                        </div>
                        <div className="size-9 cursor-pointer border flex items-center justify-center text-slate-600 bg-white border-slate-200 shadow p-1 rounded">
                            <IoIosNotifications className="size-9" />
                        </div>
                        <span className="text-slate-700 font-medium">Virgilio</span>
                        <img className="size-11 rounded-full" src="/images/nobita.jpg" alt="logo" />
                    </div>
                </div>
                <div className="h-11/12">
                    {children}
                </div>

            </div>

        </div>
    );
};


interface Sidebar {
    status: boolean;
    text: string;
    icon?: any;
    to: string;
}
function Sidebaritem({ status, text, icon, to }: Sidebar) {
    return (
        <Link to={to}>
            <span className={`font-medium flex gap-1 items-center cursor-pointer  w-full p-2 px-5  ${status && 'border rounded-md bg-white/10  backdrop-blur-md   border border-white/20'}`}><span>{icon}</span><span className="text-lg">{text}</span></span>
        </Link>


    )
}