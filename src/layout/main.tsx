import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
    FaCheckCircle,
    FaClipboardList,
    FaConciergeBell,
    FaIdBadge,
} from "react-icons/fa";
import { HiUsers, HiMenu } from "react-icons/hi";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { PiHouseFill } from "react-icons/pi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router";
import { CalendarDays, Search, Sparkles } from "lucide-react";

interface MainProps {
    children: ReactNode;
}

type NavItem = {
    to: string;
    icon: ReactNode;
    text: string;
    page: string;
};

export const Main = ({ children }: MainProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const page = location.pathname.split("/").pop() || "dashboard";
    const activePath = location.pathname || "/dashboard";
    const logoImage = `${import.meta.env.BASE_URL}images/logo.png`;
    const profileImage = `${import.meta.env.BASE_URL}images/nobita.jpg`;
    const navRef = useRef<HTMLElement | null>(null);
    const activeItemRef = useRef<HTMLDivElement | null>(null);

    const pageTitle =
        page.charAt(0).toUpperCase() + page.slice(1).replace("-", " ");

    const pageDescriptions: Record<string, string> = {
        dashboard: "Overview of workforce activity and company metrics",
        employee: "Manage team members, roles, and status",
        attendance: "Track check-ins, absences, and work hours",
        leave: "Manage leave balances, approvals, and requests",
        payroll: "Review compensation, payslips, and salary records",
        performance: "Monitor employee reviews and growth",
        recruitment: "Manage candidates and hiring pipeline",
        departments: "Organize departments, teams, and ownership",
        scheduling: "Coordinate shifts and workforce schedules",
        documents: "Review employee files and document records",
        training: "Track training, learning plans, and completions",
        assets: "Manage assigned company assets",
        announcements: "Share company-wide updates and notices",
        requests: "Review HR requests, tickets, and service issues",
        reports: "Analyze workforce reports and exports",
        settings: "Configure system preferences and access",
    };

    const workspaceLinks: NavItem[] = [
        { to: "/dashboard", icon: <PiHouseFill />, text: "Dashboard", page: "dashboard" },
        { to: "/employee", icon: <HiUsers />, text: "Employees", page: "employee" },
        { to: "/attendance", icon: <FaCheckCircle />, text: "Attendance", page: "attendance" },
        { to: "/leave", icon: <FaCheckCircle />, text: "Leave", page: "leave" },
        { to: "/payroll", icon: <MdPlaylistAddCheckCircle />, text: "Payroll", page: "payroll" },
        { to: "/performance", icon: <FaClipboardList />, text: "Performance", page: "performance" },
        { to: "/recruitment", icon: <FaIdBadge />, text: "Recruitment", page: "recruitment" },
    ];

    const managementLinks: NavItem[] = [
        { to: "/departments", icon: <HiUsers />, text: "Departments", page: "departments" },
        { to: "/scheduling", icon: <FaCheckCircle />, text: "Scheduling", page: "scheduling" },
        { to: "/documents", icon: <FaClipboardList />, text: "Documents", page: "documents" },
        { to: "/training", icon: <FaIdBadge />, text: "Training", page: "training" },
        { to: "/assets", icon: <MdPlaylistAddCheckCircle />, text: "Assets", page: "assets" },
    ];

    const communicationLinks: NavItem[] = [
        { to: "/announcements", icon: <IoIosNotifications />, text: "Announcements", page: "announcements" },
        { to: "/requests", icon: <FaConciergeBell />, text: "Requests / Tickets", page: "requests" },
    ];

    const systemLinks: NavItem[] = [
        { to: "/reports", icon: <FaClipboardList />, text: "Reports", page: "reports" },
        { to: "/settings", icon: <IoMdSettings />, text: "Settings", page: "settings" },
    ];
    const notificationItems = [
        {
            title: "Holiday policy updated",
            detail: "New leave carry-over rules are now available.",
            time: "10 min ago",
        },
        {
            title: "Payroll reminder",
            detail: "Finance needs salary adjustments by 3 PM.",
            time: "35 min ago",
        },
        {
            title: "Department note",
            detail: "People Ops posted this week's onboarding schedule.",
            time: "1 hour ago",
        },
    ];
    const requestItems = [
        {
            title: "COE request pending",
            detail: "2 employees are waiting for document release.",
            time: "5 min ago",
        },
        {
            title: "Payslip concern",
            detail: "Finance flagged one payroll clarification request.",
            time: "22 min ago",
        },
        {
            title: "Attendance correction",
            detail: "3 check-in adjustments need HR review today.",
            time: "48 min ago",
        },
    ];

    useEffect(() => {
        if (collapsed || !activeItemRef.current) return;

        activeItemRef.current.scrollIntoView({
            block: "center",
            inline: "nearest",
        });
    }, [activePath, collapsed]);

    return (
        <div className="flex h-[100dvh] w-full overflow-hidden bg-[#f4f7fb]">
            <style>{`
                @keyframes sidebarSelect {
                    0% {
                        opacity: 0.58;
                        transform: translateX(-10px) scale(0.985);
                    }
                    60% {
                        opacity: 1;
                        transform: translateX(3px) scale(1);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }

                @keyframes sidebarRail {
                    0% {
                        opacity: 0;
                        transform: scaleY(0.35);
                    }
                    100% {
                        opacity: 1;
                        transform: scaleY(1);
                    }
                }

                @keyframes sidebarContent {
                    0% {
                        opacity: 0.6;
                        transform: translateX(-6px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes collapsedDock {
                    0% {
                        opacity: 0;
                        transform: translateY(-6px) scale(0.96);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
            <aside
                className={`relative h-full shrink-0 overflow-hidden border-r border-[#dbe2fb]/20 bg-[linear-gradient(180deg,_#1b2250_0%,_#232b63_38%,_#322b81_100%)] transition-all duration-300 ${
                    collapsed ? "w-[1.02rem]" : "w-[2.72rem]"
                }`}
            >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(135,154,255,0.28),_transparent_26%),radial-gradient(circle_at_bottom,_rgba(115,78,255,0.18),_transparent_28%)]" />

                <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between px-[.18rem] py-[.18rem]">
                        {!collapsed ? (
                            <>
                                <div className="flex items-center gap-[.12rem]">
                                    <img
                                        className="h-[.44rem] w-[.44rem] rounded-[.14rem] object-cover ring-1 ring-white/15"
                                        src={logoImage}
                                        alt="HRMS Logo"
                                    />
                                    <div>
                                        <span className="block font-['Montserrat'] text-[.28rem] font-semibold tracking-[.01rem] text-white">
                                            HRMS
                                        </span>
                                        <span className="block text-[.11rem] uppercase tracking-[0.18em] text-white/45">
                                            Admin console
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setCollapsed(true)}
                                    className="rounded-[.12rem] border border-white/10 bg-white/6 p-[.06rem] text-white/82 transition hover:bg-white/12"
                                >
                                    <HiMenu size={20} />
                                </button>
                            </>
                        ) : (
                            <div className="mx-auto flex w-full flex-col items-center gap-[.12rem] animate-[collapsedDock_240ms_cubic-bezier(0.22,1,0.36,1)]">
                                <button
                                    onClick={() => setCollapsed(false)}
                                    className="flex h-[.34rem] w-[.34rem] items-center justify-center rounded-full border border-white/12 bg-white/8 text-white/82 transition hover:bg-white/14"
                                    title="Expand sidebar"
                                >
                                    <HiMenu size={16} />
                                </button>

                                <div className="relative flex h-[.56rem] w-[.56rem] items-center justify-center rounded-[.18rem] border border-white/12 bg-[linear-gradient(180deg,_rgba(255,255,255,0.16)_0%,_rgba(255,255,255,0.07)_100%)] shadow-[inset_0_0_0_.01rem_rgba(255,255,255,0.08),0_.08rem_.22rem_rgba(0,0,0,0.18)]">
                                    <span className="absolute right-[.06rem] top-[.06rem] h-[.07rem] w-[.07rem] rounded-full bg-emerald-300 ring-[.02rem] ring-[#20275d]" />
                                    <img
                                        className="h-[.3rem] w-[.3rem] object-cover"
                                        src={logoImage}
                                        alt="HRMS Logo"
                                    />
                                </div>

                                <div className="flex flex-col items-center gap-[.04rem] rounded-full border border-white/10 bg-white/6 px-[.08rem] py-[.07rem] text-white/55">
                                    <span className="h-[.05rem] w-[.05rem] rounded-full bg-white/55" />
                                    <span className="h-[.05rem] w-[.05rem] rounded-full bg-white/30" />
                                    <span className="h-[.05rem] w-[.05rem] rounded-full bg-white/30" />
                                </div>
                            </div>
                        )}
                    </div>

                    {!collapsed && (
                        <div className="relative mx-[.14rem] mb-[.18rem] rounded-[.22rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.12)_0%,_rgba(255,255,255,0.06)_100%)] px-[.14rem] py-[.14rem] backdrop-blur-sm shadow-[inset_0_0_0_.01rem_rgba(255,255,255,0.05)]">
                            <div className="flex items-center gap-[.12rem]">
                                <img
                                    className="h-[.58rem] w-[.58rem] rounded-full border border-white/25 object-cover"
                                    src={profileImage}
                                    alt="Profile"
                                />
                                <div className="text-white">
                                    <p className="text-[.18rem] font-semibold leading-[1.1]">
                                        Virgilio Galicia
                                    </p>
                                    <p className="mt-[.03rem] text-[.13rem] uppercase tracking-[0.12em] text-white/55">
                                        Admin
                                    </p>
                                </div>
                            </div>

                            <div className="mt-[.12rem] flex items-center justify-between rounded-[.14rem] bg-black/10 px-[.12rem] py-[.09rem] text-[.12rem] text-white/70">
                                <span>Workspace health</span>
                                <span className="font-medium text-emerald-300">Stable</span>
                            </div>
                        </div>
                    )}

                    <nav ref={navRef} className="relative flex flex-1 flex-col gap-[.16rem] overflow-y-auto px-[.1rem] pb-[.12rem]">
                        <div className="space-y-[.04rem]">
                            {!collapsed && (
                                <p className="px-[.14rem] pb-[.04rem] text-[.11rem] uppercase tracking-[0.18em] text-white/35">
                                    Workspace
                                </p>
                            )}

                            {workspaceLinks.map((item) => (
                                <SidebarItem
                                    key={item.to}
                                    collapsed={collapsed}
                                    to={item.to}
                                    icon={item.icon}
                                    status={activePath === item.to}
                                    text={item.text}
                                    itemRef={activePath === item.to ? activeItemRef : undefined}
                                />
                            ))}
                        </div>

                        <div className="space-y-[.04rem]">
                            {!collapsed && (
                                <p className="px-[.14rem] pb-[.04rem] text-[.11rem] uppercase tracking-[0.18em] text-white/35">
                                    Management
                                </p>
                            )}

                            {managementLinks.map((item) => (
                                <SidebarItem
                                    key={item.to}
                                    collapsed={collapsed}
                                    to={item.to}
                                    icon={item.icon}
                                    status={activePath === item.to}
                                    text={item.text}
                                    itemRef={activePath === item.to ? activeItemRef : undefined}
                                />
                            ))}
                        </div>

                        <div className="space-y-[.04rem]">
                            {!collapsed && (
                                <p className="px-[.14rem] pb-[.04rem] text-[.11rem] uppercase tracking-[0.18em] text-white/35">
                                    Communication
                                </p>
                            )}

                            {communicationLinks.map((item) => (
                                <SidebarItem
                                    key={item.to}
                                    collapsed={collapsed}
                                    to={item.to}
                                    icon={item.icon}
                                    status={activePath === item.to}
                                    text={item.text}
                                    itemRef={activePath === item.to ? activeItemRef : undefined}
                                />
                            ))}
                        </div>

                        <div className="space-y-[.04rem]">
                            {!collapsed && (
                                <p className="px-[.14rem] pb-[.04rem] text-[.11rem] uppercase tracking-[0.18em] text-white/35">
                                    System
                                </p>
                            )}

                            {systemLinks.map((item) => (
                                <SidebarItem
                                    key={item.to}
                                    collapsed={collapsed}
                                    to={item.to}
                                    icon={item.icon}
                                    status={activePath === item.to}
                                    text={item.text}
                                    itemRef={activePath === item.to ? activeItemRef : undefined}
                                />
                            ))}
                        </div>

                        <div className="mt-auto space-y-[.08rem]">
                            {!collapsed && (
                                <div className="mx-[.08rem] rounded-[.18rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.09)_0%,_rgba(255,255,255,0.04)_100%)] px-[.14rem] py-[.12rem] text-[.13rem] text-white/72">
                                    <p className="font-medium text-white/84">HR Management System</p>
                                    <p className="mt-[.04rem] leading-[1.45] text-white/48">
                                        Operations, payroll, and people data in one place.
                                    </p>
                                </div>
                            )}

                            {collapsed && (
                                <div className="mx-auto flex w-[.58rem] flex-col items-center gap-[.08rem] rounded-[.2rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.11)_0%,_rgba(255,255,255,0.04)_100%)] px-[.08rem] py-[.1rem] text-white/72 animate-[collapsedDock_240ms_cubic-bezier(0.22,1,0.36,1)]">
                                    <img
                                        className="h-[.24rem] w-[.24rem] rounded-full border border-white/20 object-cover"
                                        src={profileImage}
                                        alt="Profile"
                                    />
                                    <span className="h-[.05rem] w-[.05rem] rounded-full bg-emerald-300" />
                                </div>
                            )}

                            <SidebarItem
                                collapsed={collapsed}
                                to="/logout"
                                icon={<RiLogoutCircleRFill />}
                                status={page === "logout"}
                                text="Logout"
                                tone="danger"
                            />
                        </div>
                    </nav>
                </div>
            </aside>

            <main className="flex h-full w-full flex-col overflow-hidden">
                <header className="border-b border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] px-[.28rem] py-[.18rem]">
                    <div className="flex items-center justify-between gap-[.24rem]">
                        <div className="flex items-start gap-[.18rem]">
                            <div className="hidden h-[.52rem] w-[.52rem] items-center justify-center rounded-[.16rem] bg-[linear-gradient(135deg,_#eef2ff_0%,_#f7f9ff_100%)] text-[#5b6cff] ring-1 ring-[#dfe5fb] xl:flex">
                                <Sparkles className="h-[.22rem] w-[.22rem]" />
                            </div>

                            <div>
                                <div className="flex items-center gap-[.08rem]">
                                    <span className="rounded-full bg-[#eef2ff] px-[.1rem] py-[.04rem] text-[.11rem] font-medium uppercase tracking-[0.14em] text-[#5b6cff]">
                                        HR workspace
                                    </span>
                                    <span className="text-[.12rem] text-slate-400">
                                        Live today
                                    </span>
                                </div>

                                <h1 className="mt-[.06rem] text-[.38rem] font-semibold leading-none text-slate-800">
                                    {pageTitle}
                                </h1>
                                <p className="mt-[.06rem] text-[.17rem] text-slate-500">
                                    {pageDescriptions[page] || "Manage your HR workflow"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-[.12rem]">
                            <div className="hidden min-w-[3.4rem] items-center gap-[.1rem] rounded-[.16rem] border border-slate-200 bg-white px-[.14rem] py-[.11rem] text-slate-400 shadow-sm lg:flex xl:min-w-[4.1rem]">
                                <Search className="h-[.17rem] w-[.17rem]" />
                                <input
                                    className="w-full bg-transparent text-[.14rem] text-slate-700 outline-none placeholder:text-slate-400"
                                    placeholder="Search employees, payroll, requests"
                                />
                            </div>

                            <button className="hidden items-center gap-[.08rem] rounded-[.14rem] border border-[#dfe5fb] bg-[#f8faff] px-[.14rem] py-[.1rem] text-[.14rem] font-medium text-[#5b6cff] transition hover:bg-[#eef2ff] xl:inline-flex">
                                <CalendarDays className="h-[.16rem] w-[.16rem]" />
                                <span>April 2026</span>
                            </button>

                            <div className="flex items-center gap-[.08rem] rounded-[.18rem] border border-slate-200 bg-white/90 px-[.1rem] py-[.08rem] shadow-sm">
                                <HeaderPopoverButton
                                    icon={<FaConciergeBell />}
                                    badge="3"
                                    label="Requests / Tickets"
                                    title="Open requests"
                                    items={requestItems}
                                    onViewAll={() => navigate("/requests")}
                                />
                                <HeaderPopoverButton
                                    icon={<IoIosNotifications />}
                                    badge="3"
                                    label="Notifications"
                                    title="Latest announcements"
                                    items={notificationItems}
                                    onViewAll={() => navigate("/announcements")}
                                />
                                <HeaderIconButton
                                    icon={<IoMdSettings />}
                                    label="Settings"
                                    onClick={() => navigate("/settings")}
                                />
                            </div>

                            <div className="h-[.38rem] w-px bg-slate-200" />

                            <button className="flex items-center gap-[.12rem] rounded-[.18rem] border border-slate-200 bg-white px-[.1rem] py-[.08rem] shadow-sm transition hover:bg-slate-50">
                                <img
                                    className="size-[.48rem] rounded-full border border-slate-200 object-cover"
                                    src={profileImage}
                                    alt="User"
                                />
                                <div className="text-left leading-[1.1]">
                                    <div className="text-[.15rem] font-semibold text-slate-700">
                                        Virgilio Galicia
                                    </div>
                                    <div className="mt-[.03rem] text-[.12rem] uppercase tracking-[0.12em] text-slate-400">
                                        Admin
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </header>

                <section className="flex-1 overflow-auto p-[.24rem]">
                    <div className="h-full overflow-hidden rounded-[.18rem] border border-slate-200 bg-white shadow-[0_.04rem_.18rem_rgba(15,23,42,0.06)]">
                        {children}
                    </div>
                </section>
            </main>
        </div>
    );
};

interface SidebarProps {
    status: boolean;
    text: string;
    icon: ReactNode;
    to: string;
    collapsed: boolean;
    tone?: "default" | "danger";
    itemRef?: React.RefObject<HTMLDivElement | null>;
}

function SidebarItem({
    status,
    text,
    icon,
    to,
    collapsed,
    tone = "default",
    itemRef,
}: SidebarProps) {
    return (
        <Link to={to} title={collapsed ? text : undefined}>
            <div
                ref={itemRef}
                className={`group relative mx-[.04rem] flex cursor-pointer items-center rounded-[.16rem] transition-all duration-300 ${
                    collapsed
                        ? "justify-center px-[.08rem] py-[.09rem]"
                        : "justify-start gap-[.12rem] px-[.14rem] py-[.12rem]"
                } ${
                    status
                        ? "animate-[sidebarSelect_320ms_cubic-bezier(0.22,1,0.36,1)] bg-[linear-gradient(90deg,_rgba(255,255,255,0.16)_0%,_rgba(255,255,255,0.08)_100%)] text-white shadow-[inset_0_0_0_.01rem_rgba(255,255,255,0.14),0_.06rem_.18rem_rgba(0,0,0,0.14)]"
                        : tone === "danger"
                            ? "text-rose-100/78 hover:bg-rose-400/10 hover:text-white"
                            : "text-white/70 hover:bg-white/7 hover:text-white"
                }`}
            >
                <div
                    className={`relative flex items-center justify-center transition-transform duration-300 ${
                        collapsed
                            ? `h-[.42rem] w-[.42rem] rounded-[.14rem] border ${
                                  status
                                      ? "border-white/16 bg-white/10 shadow-[inset_0_0_0_.01rem_rgba(255,255,255,0.06)]"
                                      : tone === "danger"
                                          ? "border-transparent bg-transparent group-hover:border-rose-200/10 group-hover:bg-rose-400/10"
                                          : "border-transparent bg-transparent group-hover:border-white/8 group-hover:bg-white/8"
                              } text-[.2rem]`
                            : "text-[.2rem]"
                    } ${status ? "animate-[sidebarContent_260ms_cubic-bezier(0.22,1,0.36,1)]" : ""}`}
                >
                    {status && !collapsed && (
                        <span className="absolute -left-[.11rem] h-[.24rem] w-[.03rem] origin-center rounded-full bg-white/85 animate-[sidebarRail_260ms_cubic-bezier(0.22,1,0.36,1)]" />
                    )}
                    {status && collapsed && (
                        <span className="absolute -right-[.02rem] top-[.04rem] h-[.07rem] w-[.07rem] rounded-full bg-white/90 ring-[.02rem] ring-[#2b2f73]" />
                    )}
                    {icon}
                </div>

                {!collapsed && (
                    <span
                        className={`text-[.16rem] font-medium tracking-[0.01em] transition-transform duration-300 ${
                            status ? "animate-[sidebarContent_260ms_cubic-bezier(0.22,1,0.36,1)]" : ""
                        }`}
                    >
                        {text}
                    </span>
                )}

                {collapsed && (
                    <span className="pointer-events-none absolute left-[calc(100%+.12rem)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-[.12rem] border border-[#dfe5fb] bg-white px-[.1rem] py-[.07rem] text-[.12rem] font-medium text-[#34426c] shadow-[0_.08rem_.22rem_rgba(15,23,42,0.12)] group-hover:block">
                        {text}
                    </span>
                )}
            </div>
        </Link>
    );
}

function HeaderIconButton({
    icon,
    badge,
    label,
    onClick,
}: {
    icon: ReactNode;
    badge?: string;
    label: string;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            onClick={onClick}
            className="relative flex size-[.42rem] items-center justify-center rounded-[.12rem] border border-transparent bg-transparent text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
        >
            {badge && (
                <span className="absolute right-[.01rem] top-[.01rem] flex h-[.16rem] min-w-[.16rem] items-center justify-center rounded-full bg-[#ff5b6e] px-[.03rem] text-[.09rem] font-semibold leading-none text-white">
                    {badge}
                </span>
            )}
            <span className="text-[.18rem]">{icon}</span>
        </button>
    );
}

function HeaderPopoverButton({
    icon,
    badge,
    label,
    title,
    items,
    onViewAll,
}: {
    icon: ReactNode;
    badge?: string;
    label: string;
    title: string;
    items: { title: string; detail: string; time: string }[];
    onViewAll?: () => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                title={label}
                aria-label={label}
                onClick={() => setOpen((current) => !current)}
                className={`relative flex size-[.42rem] items-center justify-center rounded-[.12rem] border transition ${
                    open
                        ? "border-[#dbe4ff] bg-[#f4f7ff] text-[#5b6cff]"
                        : "border-transparent bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
            >
                {badge && (
                    <span className="absolute right-[.01rem] top-[.01rem] flex h-[.16rem] min-w-[.16rem] items-center justify-center rounded-full bg-[#ff5b6e] px-[.03rem] text-[.09rem] font-semibold leading-none text-white">
                        {badge}
                    </span>
                )}
                <span className="text-[.18rem]">{icon}</span>
            </button>

            <div
                className={`absolute right-0 top-full z-40 mt-[.08rem] flex h-auto max-h-[4.6rem] w-[3.2rem] origin-top-right flex-col overflow-hidden rounded-[.2rem] border border-[#e2e8f4] bg-white p-[.08rem] shadow-[0_.18rem_.4rem_rgba(15,23,42,0.14)] transition-all duration-200 ${
                    open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-[.03rem] opacity-0"
                }`}
            >
                <div className="flex items-center justify-between px-[.1rem] py-[.08rem]">
                    <div>
                        <p className="text-[.11rem] font-semibold uppercase tracking-[0.16em] text-[#8a96b7]">
                            {label}
                        </p>
                        <p className="mt-[.02rem] text-[.14rem] font-medium text-[#30406b]">
                            {title}
                        </p>
                    </div>
                    <span className="rounded-full bg-[#f4f7ff] px-[.08rem] py-[.04rem] text-[.11rem] font-semibold text-[#5b6cff]">
                        {badge ?? items.length}
                    </span>
                </div>

                <div className="mt-[.04rem] flex h-auto flex-col gap-[.06rem] overflow-y-auto">
                    {items.map((item) => (
                        <button
                            key={`${item.title}-${item.time}`}
                            type="button"
                            onClick={() => {
                                setOpen(false);
                                onViewAll?.();
                            }}
                            className="w-full rounded-[.14rem] border border-[#edf1f8] bg-[#fbfcff] px-[.12rem] py-[.1rem] text-left transition hover:border-[#dbe4ff] hover:bg-[#f6f8ff]"
                        >
                            <div className="flex items-start justify-between gap-[.1rem]">
                                <p className="text-[.135rem] font-medium text-[#31406c]">{item.title}</p>
                                <span className="shrink-0 text-[.11rem] text-[#93a0be]">{item.time}</span>
                            </div>
                            <p className="mt-[.03rem] text-[.12rem] leading-[1.5] text-[#7280a7]">{item.detail}</p>
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setOpen(false);
                        onViewAll?.();
                    }}
                    className="mt-[.08rem] inline-flex w-full items-center justify-center rounded-[.14rem] border border-[#dfe5fb] bg-[#f8faff] px-[.14rem] py-[.09rem] text-[.13rem] font-medium text-[#5b6cff] transition hover:bg-[#eef2ff]"
                >
                    {`View all ${label.toLowerCase()}`}
                </button>
            </div>
        </div>
    );
}
