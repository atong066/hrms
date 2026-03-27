import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { CalendarDays, MessageSquareText, Phone, Send, Sparkles, Video } from "lucide-react";

interface MainProps {
    children: ReactNode;
}

type NavItem = {
    to: string;
    icon: ReactNode;
    text: string;
    page: string;
};

type ChatThread = {
    id: number;
    name: string;
    team: string;
    message: string;
    time: string;
    unread: number;
    avatar: number;
};

type ChatMessage = {
    id: string;
    text: string;
    sender: "self" | "other";
    timestamp?: string;
};

export const Main = ({ children }: MainProps) => {
    const SIDEBAR_SCROLL_KEY = "hrms-sidebar-scroll";
    const [collapsed, setCollapsed] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [chatMinimized, setChatMinimized] = useState(false);
    const [activeThreadId, setActiveThreadId] = useState(1);
    const [messageDraft, setMessageDraft] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const page = location.pathname.split("/").pop() || "dashboard";
    const activePath = location.pathname || "/dashboard";
    const sidebarCollapsed = collapsed && !mobileNavOpen;
    const logoImage = `${import.meta.env.BASE_URL}images/logo.png`;
    const profileImage = `${import.meta.env.BASE_URL}images/nobita.jpg`;
    const navRef = useRef<HTMLElement | null>(null);
    const activeItemRef = useRef<HTMLDivElement | null>(null);
    const hasAlignedSidebarRef = useRef(false);

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
    const [messageThreads, setMessageThreads] = useState<ChatThread[]>([
        {
            id: 1,
            name: "Mika Santos",
            team: "People Ops",
            message: "Need approval on the revised onboarding checklist before 4 PM.",
            time: "2m",
            unread: 2,
            avatar: 26,
        },
        {
            id: 2,
            name: "Finance Team",
            team: "Payroll",
            message: "Overtime adjustments are ready for final review.",
            time: "18m",
            unread: 3,
            avatar: 41,
        },
        {
            id: 3,
            name: "Lia Gomez",
            team: "Recruitment",
            message: "Candidate feedback for the HR Coordinator role is posted.",
            time: "46m",
            unread: 0,
            avatar: 48,
        },
        {
            id: 4,
            name: "Operations Lead",
            team: "Scheduling",
            message: "Can we confirm the weekend shift coverage list?",
            time: "1h",
            unread: 0,
            avatar: 12,
        },
    ]);
    const [chatMessages, setChatMessages] = useState<Record<number, ChatMessage[]>>({
        1: [
            {
                id: "1-other-1",
                sender: "other",
                text: "Need approval on the revised onboarding checklist before 4 PM.",
            },
            {
                id: "1-self-1",
                sender: "self",
                text: "Payroll sign-off is on track. I just need the final checklist from your side.",
            },
            {
                id: "1-meta",
                sender: "other",
                text: "Feb 12, 2026, 9:49 PM",
                timestamp: "meta",
            },
            {
                id: "1-other-2",
                sender: "other",
                text: "Hindi, may event kaming hinahandaan kaya naka meeting lang, ongoing pa dn",
            },
            {
                id: "1-other-3",
                sender: "other",
                text: "Tol ok na bakit?",
            },
        ],
        2: [
            { id: "2-other-1", sender: "other", text: "Overtime adjustments are ready for final review." },
            { id: "2-self-1", sender: "self", text: "Received. I will review the payroll exceptions in 15 minutes." },
        ],
        3: [
            { id: "3-other-1", sender: "other", text: "Candidate feedback for the HR Coordinator role is posted." },
            { id: "3-self-1", sender: "self", text: "Perfect. Please queue the shortlisted profiles for tomorrow." },
        ],
        4: [
            { id: "4-other-1", sender: "other", text: "Can we confirm the weekend shift coverage list?" },
            { id: "4-self-1", sender: "self", text: "Yes, send me the final names and I will lock the schedule." },
        ],
    });
    const activeThread = messageThreads.find((thread) => thread.id === activeThreadId) ?? messageThreads[0];
    const activeMessages = activeThread ? (chatMessages[activeThread.id] ?? []) : [];

    useLayoutEffect(() => {
        if (collapsed) {
            hasAlignedSidebarRef.current = false;
            return;
        }

        if (!navRef.current) return;

        const savedScrollTop = window.sessionStorage.getItem(SIDEBAR_SCROLL_KEY);

        if (savedScrollTop !== null) {
            navRef.current.scrollTop = Number(savedScrollTop);
            hasAlignedSidebarRef.current = true;
            return;
        }

        if (hasAlignedSidebarRef.current || !activeItemRef.current) return;

        hasAlignedSidebarRef.current = true;

        const activeRect = activeItemRef.current.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        const isAbove = activeRect.top < navRect.top;
        const isBelow = activeRect.bottom > navRect.bottom;

        if (isAbove || isBelow) {
            activeItemRef.current.scrollIntoView({
                block: "nearest",
                inline: "nearest",
            });
        }
    }, [activePath, collapsed]);

    useEffect(() => {
        const navElement = navRef.current;
        if (!navElement) return;

        const handleScroll = () => {
            window.sessionStorage.setItem(SIDEBAR_SCROLL_KEY, String(navElement.scrollTop));
        };

        navElement.addEventListener("scroll", handleScroll);
        return () => navElement.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileNavOpen(false);
    }, [activePath]);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        if (mobileNavOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = originalOverflow;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [mobileNavOpen]);

    const handleSelectThread = (threadId: number) => {
        setActiveThreadId(threadId);
        setChatMinimized(false);
        setMessageThreads((current) =>
            current.map((thread) =>
                thread.id === threadId ? { ...thread, unread: 0 } : thread,
            ),
        );
    };

    const handleSendMessage = () => {
        const trimmed = messageDraft.trim();
        if (!trimmed || !activeThread) return;

        const nextMessage: ChatMessage = {
            id: `${activeThread.id}-${Date.now()}`,
            sender: "self",
            text: trimmed,
        };

        setChatMessages((current) => ({
            ...current,
            [activeThread.id]: [...(current[activeThread.id] ?? []), nextMessage],
        }));
        setMessageThreads((current) =>
            current.map((thread) =>
                thread.id === activeThread.id
                    ? { ...thread, message: trimmed, time: "now" }
                    : thread,
            ),
        );
        setMessageDraft("");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
    };

    return (
        <div className="flex h-[100dvh] w-full overflow-hidden bg-[#f4f7fb]">
            <style>{`
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
            {mobileNavOpen ? (
                <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={() => setMobileNavOpen(false)}
                    className="absolute inset-0 z-40 bg-[#0f172a]/42 backdrop-blur-[2px] xl:hidden"
                />
            ) : null}

            <aside
                className={`absolute inset-y-0 left-0 z-50 w-[2.72rem] overflow-hidden border-r border-[#dbe2fb]/20 bg-[linear-gradient(180deg,_#1b2250_0%,_#232b63_38%,_#322b81_100%)] transition-all duration-300 xl:relative xl:z-auto xl:translate-x-0 ${
                    sidebarCollapsed ? "xl:w-[1.02rem]" : "xl:w-[2.72rem]"
                } ${
                    mobileNavOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
                }`}
            >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(135,154,255,0.28),_transparent_26%),radial-gradient(circle_at_bottom,_rgba(115,78,255,0.18),_transparent_28%)]" />

                <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between px-[.18rem] py-[.18rem]">
                        {!sidebarCollapsed ? (
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
                                    className="hidden rounded-[.12rem] border border-white/10 bg-white/6 p-[.06rem] text-white/82 transition hover:bg-white/12 xl:block"
                                >
                                    <HiMenu size={20} />
                                </button>
                            </>
                        ) : (
                            <div className="mx-auto hidden w-full flex-col items-center gap-[.12rem] animate-[collapsedDock_240ms_cubic-bezier(0.22,1,0.36,1)] xl:flex">
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

                    {!sidebarCollapsed && (
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
                            {!sidebarCollapsed && (
                                <p className="px-[.14rem] pb-[.04rem] text-[.11rem] uppercase tracking-[0.18em] text-white/35">
                                    Workspace
                                </p>
                            )}

                            {workspaceLinks.map((item) => (
                                <SidebarItem
                                    key={item.to}
                                    collapsed={sidebarCollapsed}
                                    to={item.to}
                                    icon={item.icon}
                                    status={activePath === item.to}
                                    text={item.text}
                                    itemRef={activePath === item.to ? activeItemRef : undefined}
                                />
                            ))}
                        </div>

                        <div className="space-y-[.04rem]">
                            {!sidebarCollapsed && (
                                <p className="px-[.14rem] pb-[.04rem] text-[.11rem] uppercase tracking-[0.18em] text-white/35">
                                    Management
                                </p>
                            )}

                            {managementLinks.map((item) => (
                                <SidebarItem
                                    key={item.to}
                                    collapsed={sidebarCollapsed}
                                    to={item.to}
                                    icon={item.icon}
                                    status={activePath === item.to}
                                    text={item.text}
                                    itemRef={activePath === item.to ? activeItemRef : undefined}
                                />
                            ))}
                        </div>

                        <div className="space-y-[.04rem]">
                            {!sidebarCollapsed && (
                                <p className="px-[.14rem] pb-[.04rem] text-[.11rem] uppercase tracking-[0.18em] text-white/35">
                                    Communication
                                </p>
                            )}

                            {communicationLinks.map((item) => (
                                <SidebarItem
                                    key={item.to}
                                    collapsed={sidebarCollapsed}
                                    to={item.to}
                                    icon={item.icon}
                                    status={activePath === item.to}
                                    text={item.text}
                                    itemRef={activePath === item.to ? activeItemRef : undefined}
                                />
                            ))}
                        </div>

                        <div className="space-y-[.04rem]">
                            {!sidebarCollapsed && (
                                <p className="px-[.14rem] pb-[.04rem] text-[.11rem] uppercase tracking-[0.18em] text-white/35">
                                    System
                                </p>
                            )}

                            {systemLinks.map((item) => (
                                <SidebarItem
                                    key={item.to}
                                    collapsed={sidebarCollapsed}
                                    to={item.to}
                                    icon={item.icon}
                                    status={activePath === item.to}
                                    text={item.text}
                                    itemRef={activePath === item.to ? activeItemRef : undefined}
                                />
                            ))}
                        </div>

                        <div className="mt-auto space-y-[.08rem]">
                            {!sidebarCollapsed && (
                                <div className="mx-[.08rem] rounded-[.18rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.09)_0%,_rgba(255,255,255,0.04)_100%)] px-[.14rem] py-[.12rem] text-[.13rem] text-white/72">
                                    <p className="font-medium text-white/84">HR Management System</p>
                                    <p className="mt-[.04rem] leading-[1.45] text-white/48">
                                        Operations, payroll, and people data in one place.
                                    </p>
                                </div>
                            )}

                            {sidebarCollapsed && (
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
                                collapsed={sidebarCollapsed}
                                to="/"
                                icon={<RiLogoutCircleRFill />}
                                status={false}
                                text="Logout"
                                tone="danger"
                                onClick={handleLogout}
                            />
                        </div>
                    </nav>
                </div>
            </aside>

            <div className="flex min-w-0 flex-1">
                <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
                    <header className="border-b border-slate-200/80 bg-[linear-gradient(180deg,_#fcfdff_0%,_#f6f9ff_100%)] px-[.12rem] py-[.12rem] md:px-[.18rem] md:py-[.14rem] xl:px-[.26rem]">
                        <div className="flex flex-col gap-[.1rem] md:gap-[.12rem]">
                            <div className="rounded-[.22rem] border border-[#e3e9f7] bg-[linear-gradient(135deg,_rgba(255,255,255,0.94)_0%,_rgba(246,249,255,0.96)_48%,_rgba(239,244,255,0.92)_100%)] px-[.1rem] py-[.1rem] shadow-[0_.1rem_.26rem_rgba(15,23,42,0.05)] backdrop-blur-xl md:rounded-[.22rem] md:px-[.12rem] md:py-[.12rem] md:shadow-[0_.08rem_.22rem_rgba(15,23,42,0.045)]">
                                <div className="flex items-start justify-between gap-[.1rem] md:gap-[.12rem] xl:flex-nowrap">
                                <div className="flex min-w-0 flex-1 items-start gap-[.1rem] md:gap-[.14rem]">
                                    <button
                                        type="button"
                                        onClick={() => setMobileNavOpen(true)}
                                    className="inline-flex h-[.4rem] w-[.4rem] shrink-0 items-center justify-center rounded-[.14rem] border border-[#dfe5fb] bg-[linear-gradient(180deg,_#ffffff_0%,_#f6f8ff_100%)] text-[#5b6cff] shadow-[0_.04rem_.12rem_rgba(15,23,42,0.04)] transition hover:bg-[#f8faff] xl:hidden"
                                >
                                    <HiMenu size={18} />
                                </button>

                                <div className="hidden h-[.48rem] w-[.48rem] shrink-0 items-center justify-center rounded-[.16rem] bg-[linear-gradient(135deg,_#eef2ff_0%,_#f6f8ff_100%)] text-[#5b6cff] ring-1 ring-[#dfe5fb] xl:flex">
                                    <Sparkles className="h-[.2rem] w-[.2rem]" />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-[.05rem] md:gap-[.08rem]">
                                        <span className="rounded-full border border-[#dfe6fb] bg-white/84 px-[.08rem] py-[.035rem] text-[.095rem] font-semibold uppercase tracking-[0.16em] text-[#5b6cff] shadow-[inset_0_0_0_.01rem_rgba(255,255,255,0.6)] md:px-[.09rem] md:text-[.105rem]">
                                            HR workspace
                                        </span>
                                        <span className="rounded-full border border-[#e3e8fb] bg-[#fbfcff] px-[.07rem] py-[.03rem] text-[.095rem] font-medium text-slate-500 md:hidden">
                                            Live today
                                        </span>
                                        <span className="hidden text-[.12rem] text-slate-400 lg:inline">
                                            Live today
                                        </span>
                                    </div>
                                    <div className="mt-[.055rem] flex min-w-0 flex-col gap-[.035rem] md:flex-row md:items-end md:gap-[.12rem]">
                                        <h1 className="truncate font-['Montserrat'] text-[.3rem] font-semibold leading-none tracking-[-0.03em] text-[#1f2848] md:text-[.3rem] xl:text-[.34rem]">
                                            {pageTitle}
                                        </h1>
                                        <p className="line-clamp-2 max-w-[4.8rem] text-[.122rem] leading-[1.42] text-[#667392] md:pb-[.02rem] xl:hidden">
                                            {pageDescriptions[page] || "Manage your HR workflow"}
                                        </p>
                                        <p className="hidden truncate pb-[.02rem] text-[.14rem] text-[#667392] 2xl:block">
                                            {pageDescriptions[page] || "Manage your HR workflow"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                                <div className="flex shrink-0 items-center gap-[.08rem]">
                                    <div className="flex items-center gap-[.02rem] rounded-[.16rem] border border-[#dfe5f2] bg-[linear-gradient(180deg,_#ffffff_0%,_#f8faff_100%)] px-[.04rem] py-[.04rem] shadow-[0_.04rem_.12rem_rgba(15,23,42,0.04)] backdrop-blur-sm md:gap-[.08rem] md:rounded-[.18rem] md:px-[.1rem] md:py-[.08rem]">
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

                                    <button className="shrink-0 rounded-[.16rem] border border-[#dfe5f2] bg-[linear-gradient(180deg,_#ffffff_0%,_#f8faff_100%)] px-[.07rem] py-[.05rem] shadow-[0_.04rem_.12rem_rgba(15,23,42,0.04)] transition hover:bg-[#f8faff] md:rounded-[.18rem] md:px-[.1rem] md:py-[.08rem]">
                                        <div className="flex items-center gap-[.1rem]">
                                            <img
                                                className="size-[.38rem] rounded-full border border-slate-200 object-cover md:size-[.44rem]"
                                                src={profileImage}
                                                alt="User"
                                            />
                                            <div className="hidden text-left leading-[1.1] 2xl:block">
                                                <div className="text-[.145rem] font-semibold text-slate-700">
                                                    Virgilio Galicia
                                                </div>
                                                <div className="mt-[.03rem] text-[.115rem] uppercase tracking-[0.12em] text-slate-400">
                                                    Admin
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            </div>

                            <div className="flex items-center justify-between gap-[.08rem] md:hidden">
                                <button className="inline-flex items-center gap-[.08rem] rounded-[.14rem] border border-[#dfe5fb] bg-white px-[.12rem] py-[.09rem] text-[.125rem] font-medium text-[#5b6cff] shadow-[0_.04rem_.12rem_rgba(15,23,42,0.04)] transition hover:bg-[#f8faff]">
                                    <CalendarDays className="h-[.15rem] w-[.15rem]" />
                                    <span>April 2026</span>
                                </button>

                                <div className="rounded-full border border-[#e1e7fb] bg-white px-[.09rem] py-[.05rem] text-[.11rem] font-medium uppercase tracking-[0.14em] text-[#6f7caa]">
                                    Live today
                                </div>
                            </div>

                            <div className="hidden w-full shrink-0 flex-wrap items-center justify-end gap-[.08rem] md:flex xl:w-auto xl:flex-nowrap">
                                <button className="hidden items-center gap-[.08rem] rounded-[.16rem] border border-[#dfe5fb] bg-white px-[.13rem] py-[.1rem] text-[.135rem] font-medium text-[#5b6cff] shadow-[0_.04rem_.12rem_rgba(15,23,42,0.04)] transition hover:bg-[#f8faff] md:inline-flex">
                                    <CalendarDays className="h-[.16rem] w-[.16rem]" />
                                    <span>April 2026</span>
                                </button>

                            </div>
                        </div>
                    </header>

                    <section className="flex-1 overflow-auto p-[.12rem] md:p-[.18rem] xl:p-[.24rem]">
                        <div className="h-full overflow-hidden rounded-[.14rem] border border-slate-200 bg-white shadow-[0_.04rem_.18rem_rgba(15,23,42,0.06)] md:rounded-[.18rem]">
                            {children}
                        </div>
                    </section>
                </main>

                <aside className="relative hidden h-full w-[3.02rem] shrink-0 border-l border-[#dde4f2] bg-[linear-gradient(180deg,_#fbfcff_0%,_#f4f7fd_100%)] 2xl:flex 2xl:flex-col">
                    <div className="border-b border-[#e6ebf5] px-[.18rem] py-[.18rem]">
                        <div className="flex items-center justify-between gap-[.12rem]">
                            <h2 className="text-[.2rem] font-semibold text-[#25315c]">
                                Contacts
                            </h2>
                            <div className="flex items-center gap-[.06rem] text-[#7d89a8]">
                                <button className="inline-flex h-[.34rem] w-[.34rem] items-center justify-center rounded-full transition hover:bg-white">
                                    <MessageSquareText className="h-[.16rem] w-[.16rem]" />
                                </button>
                                <button className="inline-flex h-[.34rem] w-[.34rem] items-center justify-center rounded-full text-[.18rem] leading-none transition hover:bg-white">
                                    …
                                </button>
                            </div>
                        </div>

                        <div className="mt-[.14rem] rounded-[.18rem] border border-[#e2e8f5] bg-white px-[.12rem] py-[.12rem]">
                            <p className="text-[.11rem] font-semibold uppercase tracking-[0.14em] text-[#8a96b7]">
                                Birthdays
                            </p>
                            <div className="mt-[.08rem] flex items-start gap-[.09rem] text-[.125rem] leading-[1.5] text-[#53648f]">
                                <span className="text-[.2rem] leading-none">🎁</span>
                                <p>
                                    <span className="font-semibold text-[#25315c]">Beth Blanco</span> and
                                    <span className="font-semibold text-[#25315c]"> Rj Nickosh Gabatino</span> have birthdays today.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto px-[.14rem] py-[.14rem] pb-[2.3rem]">
                        <div className="space-y-[.04rem]">
                            {messageThreads.map((thread) => (
                                <button
                                    key={`${thread.name}-${thread.time}`}
                                    type="button"
                                    onClick={() => handleSelectThread(thread.id)}
                                    className={`flex w-full items-center gap-[.1rem] rounded-[.16rem] px-[.1rem] py-[.08rem] text-left transition ${
                                        activeThreadId === thread.id ? "bg-white shadow-[0_.06rem_.14rem_rgba(15,23,42,0.06)]" : "hover:bg-white/92"
                                    }`}
                                >
                                    <div className="relative shrink-0">
                                        <img
                                            src={`https://i.pravatar.cc/56?img=${thread.avatar}`}
                                            className="h-[.38rem] w-[.38rem] rounded-full border border-[#dbe2f2] object-cover"
                                            alt={thread.name}
                                        />
                                        <span className="absolute bottom-0 right-0 h-[.09rem] w-[.09rem] rounded-full bg-[#19b48a] ring-[.02rem] ring-[#f7f9ff]" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[.14rem] font-medium text-[#33436b]">
                                            {thread.name}
                                        </p>
                                    </div>
                                    {thread.unread > 0 && (
                                        <span className="flex h-[.18rem] min-w-[.18rem] items-center justify-center rounded-full bg-[#ff4c68] px-[.03rem] text-[.09rem] font-semibold text-white">
                                            {thread.unread}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                        <div className="pointer-events-none absolute bottom-[.12rem] left-[.08rem] right-[.08rem]">
                            <div className="pointer-events-auto ml-auto w-[2.62rem] overflow-hidden rounded-[.18rem] border border-[#d7ddf0] bg-white shadow-[0_.14rem_.34rem_rgba(15,23,42,0.16)]">
                            <button
                                type="button"
                                onClick={() => setChatMinimized((current) => !current)}
                                className="flex w-full items-center justify-between gap-[.08rem] bg-[linear-gradient(135deg,_#f7f9ff_0%,_#eef2ff_100%)] px-[.1rem] py-[.08rem] text-left"
                            >
                                <div className="flex min-w-0 items-center gap-[.08rem]">
                                    <img
                                        src={`https://i.pravatar.cc/56?img=${activeThread.avatar}`}
                                        className="h-[.28rem] w-[.28rem] rounded-full border border-[#dbe2f2] object-cover"
                                        alt={activeThread.name}
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate text-[.128rem] font-semibold text-[#25315c]">
                                            {activeThread.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-[.04rem] text-[#6b53ff]">
                                    {!chatMinimized && (
                                        <>
                                            <span className="inline-flex h-[.26rem] w-[.26rem] items-center justify-center rounded-full transition hover:bg-white/75">
                                                <Phone className="h-[.12rem] w-[.12rem]" />
                                            </span>
                                            <span className="inline-flex h-[.26rem] w-[.26rem] items-center justify-center rounded-full transition hover:bg-white/75">
                                                <Video className="h-[.12rem] w-[.12rem]" />
                                            </span>
                                        </>
                                    )}
                                    <span className="inline-flex h-[.26rem] w-[.26rem] items-center justify-center rounded-full text-[.14rem] leading-none transition hover:bg-white/75">
                                        {chatMinimized ? "▴" : "▾"}
                                    </span>
                                </div>
                            </button>

                            {!chatMinimized && (
                                <div className="flex h-[3.82rem] flex-col bg-[#ffffff]">
                                    <div className="min-h-0 flex-1 overflow-y-auto px-[.1rem] py-[.1rem]">
                                        {activeMessages.map((message) =>
                                            message.timestamp === "meta" ? (
                                                <p
                                                    key={message.id}
                                                    className="mt-[.1rem] text-center text-[.102rem] text-[#97a2bc]"
                                                >
                                                    {message.text}
                                                </p>
                                            ) : (
                                                <div
                                                    key={message.id}
                                                    className={`mt-[.08rem] ${message.sender === "self" ? "ml-auto max-w-[1.74rem]" : "max-w-[1.82rem]"}`}
                                                >
                                                    <div
                                                        className={`rounded-[.14rem] px-[.09rem] py-[.08rem] text-[.118rem] leading-[1.45] ${
                                                            message.sender === "self"
                                                                ? "rounded-tr-[.06rem] bg-[linear-gradient(135deg,_#8a38ff_0%,_#5b6cff_100%)] text-white"
                                                                : "rounded-tl-[.06rem] bg-[#f2f4fa] text-[#53648f]"
                                                        }`}
                                                    >
                                                        {message.text}
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>

                                    <div className="shrink-0 border-t border-[#e7ebf5] px-[.08rem] py-[.08rem]">
                                        <div className="flex items-center gap-[.06rem]">
                                            <div className="flex min-w-0 flex-1 items-center gap-[.06rem] rounded-full bg-[#f2f4fa] px-[.1rem] py-[.07rem]">
                                                <input
                                                    value={messageDraft}
                                                    onChange={(event) => setMessageDraft(event.target.value)}
                                                    onKeyDown={(event) => {
                                                        if (event.key === "Enter") {
                                                            event.preventDefault();
                                                            handleSendMessage();
                                                        }
                                                    }}
                                                    className="w-full bg-transparent text-[.12rem] text-[#33436b] outline-none placeholder:text-[#8f9bbb]"
                                                    placeholder="Aa"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleSendMessage}
                                                    className="inline-flex h-[.24rem] w-[.24rem] items-center justify-center rounded-full bg-[#5b6cff] text-white"
                                                >
                                                    <Send className="h-[.11rem] w-[.11rem]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>
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
    tone?: "default" | "danger";
    itemRef?: React.RefObject<HTMLDivElement | null>;
    onClick?: () => void;
}

function SidebarItem({
    status,
    text,
    icon,
    to,
    collapsed,
    tone = "default",
    itemRef,
    onClick,
}: SidebarProps) {
    const content = (
        <div
            ref={itemRef}
            className={`group relative mx-[.04rem] flex cursor-pointer items-center rounded-[.16rem] transition-all duration-300 ${
                collapsed
                    ? "justify-center px-[.08rem] py-[.09rem]"
                    : "justify-start gap-[.12rem] px-[.14rem] py-[.12rem]"
            } ${
                status
                    ? "bg-[linear-gradient(90deg,_rgba(255,255,255,0.16)_0%,_rgba(255,255,255,0.08)_100%)] text-white shadow-[inset_0_0_0_.01rem_rgba(255,255,255,0.14),0_.06rem_.18rem_rgba(0,0,0,0.14)]"
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
                }`}
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
                    className="text-[.16rem] font-medium tracking-[0.01em] transition-transform duration-300"
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
    );

    if (onClick) {
        return (
            <button
                type="button"
                title={collapsed ? text : undefined}
                onClick={onClick}
                className="w-full text-left"
            >
                {content}
            </button>
        );
    }

    return (
        <Link to={to} title={collapsed ? text : undefined}>
            {content}
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
            className="relative flex size-[.38rem] items-center justify-center rounded-[.12rem] border border-transparent bg-transparent text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 md:size-[.42rem]"
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
                className={`relative flex size-[.38rem] items-center justify-center rounded-[.12rem] border transition md:size-[.42rem] ${
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
                className={`absolute right-0 top-full z-40 mt-[.08rem] flex h-auto max-h-[4.6rem] w-[min(3.2rem,calc(100vw-.28rem))] origin-top-right flex-col overflow-hidden rounded-[.2rem] border border-[#e2e8f4] bg-white p-[.08rem] shadow-[0_.18rem_.4rem_rgba(15,23,42,0.14)] transition-all duration-200 ${
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
