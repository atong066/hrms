import { useEffect, useMemo, useState } from "react";
import {
    CalendarRange,
    Clock3,
    Download,
    Search,
    ShieldCheck,
    TimerReset,
    UserCheck,
} from "lucide-react";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineFilterList } from "react-icons/md";
import { Main } from "../layout/main";
import { Dropdown } from "../utils/FilterDropdown";

const statCards = [
    {
        title: "Present today",
        value: "1,102",
        detail: "88% of scheduled staff checked in",
        icon: UserCheck,
        accent: "from-[#4f6bff] to-[#7388ff]",
        surface: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(115,136,255,0.03))]",
    },
    {
        title: "Late arrivals",
        value: "43",
        detail: "12 fewer than yesterday",
        icon: Clock3,
        accent: "from-[#f1aa28] to-[#f8c962]",
        surface: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(248,201,98,0.03))]",
    },
    {
        title: "Attendance health",
        value: "96.4%",
        detail: "Weekly consistency across all teams",
        icon: ShieldCheck,
        accent: "from-[#18b397] to-[#4cd4b7]",
        surface: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(76,212,183,0.03))]",
    },
];

type AttendanceRow = {
    id: number;
    name: string;
    email: string;
    department: string;
    shift: string;
    date: string;
    checkIn: string;
    checkOut: string;
    status: "Present" | "Late" | "Absent" | "Remote";
    hours: string;
};

const attendance: AttendanceRow[] = Array.from({ length: 42 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    email: `employee${i + 1}@company.com`,
    department: i % 4 === 0 ? "People Ops" : i % 3 === 0 ? "Finance" : i % 2 === 0 ? "Engineering" : "Design",
    shift: i % 5 === 0 ? "Mid shift" : "Day shift",
    date: "Mar 21, 2026",
    checkIn: i % 6 === 0 ? "--" : i % 5 === 0 ? "09:18 AM" : "08:57 AM",
    checkOut: i % 6 === 0 ? "--" : "06:03 PM",
    status: i % 7 === 0 ? "Absent" : i % 5 === 0 ? "Late" : i % 4 === 0 ? "Remote" : "Present",
    hours: i % 7 === 0 ? "0h 0m" : i % 4 === 0 ? "8h 05m" : "8h 12m",
}));

export const AttendanceOverview = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [shiftFilter, setShiftFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const rowsPerPage = 10;

    const filteredAttendance = useMemo(() => {
        const normalizedQuery = searchTerm.trim().toLowerCase();

        return attendance.filter((item) => {
            const matchesDepartment = !departmentFilter || item.department === departmentFilter;
            const matchesShift = !shiftFilter || item.shift === shiftFilter;
            const matchesStatus = !statusFilter || item.status === statusFilter;
            const matchesDate =
                !dateFilter ||
                (dateFilter === "Today" && item.date === "Mar 21, 2026") ||
                (dateFilter === "Yesterday" && item.date === "Mar 20, 2026") ||
                (dateFilter === "This week" && ["Mar 21, 2026", "Mar 20, 2026", "Mar 19, 2026"].includes(item.date)) ||
                item.date === dateFilter;

            const matchesSearch =
                !normalizedQuery ||
                item.name.toLowerCase().includes(normalizedQuery) ||
                item.email.toLowerCase().includes(normalizedQuery) ||
                item.department.toLowerCase().includes(normalizedQuery) ||
                item.shift.toLowerCase().includes(normalizedQuery);

            return matchesDepartment && matchesShift && matchesStatus && matchesDate && matchesSearch;
        });
    }, [dateFilter, departmentFilter, searchTerm, shiftFilter, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredAttendance.length / rowsPerPage));
    const indexLast = currentPage * rowsPerPage;
    const indexFirst = indexLast - rowsPerPage;
    const currentAttendance = filteredAttendance.slice(indexFirst, indexLast);
    const visibleEnd = Math.min(indexLast, filteredAttendance.length);

    const statusCounts = useMemo(
        () => ({
            present: filteredAttendance.filter((item) => item.status === "Present").length,
            late: filteredAttendance.filter((item) => item.status === "Late").length,
            remote: filteredAttendance.filter((item) => item.status === "Remote").length,
            absent: filteredAttendance.filter((item) => item.status === "Absent").length,
        }),
        [filteredAttendance]
    );

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return (
        <Main>
            <section className="h-full overflow-auto bg-[linear-gradient(180deg,_#f8faff_0%,_#f5f7fb_100%)] p-[.28rem]">
                <div className="flex min-h-full flex-col gap-[.18rem]">
                    <div className="rounded-[.24rem] border border-[#e5e9f5] bg-[linear-gradient(135deg,_#ffffff_0%,_#f7f9ff_100%)] p-[.2rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex items-start justify-between gap-[.18rem]">
                            <div className="max-w-[6.2rem]">
                                <p className="text-[.14rem] font-medium uppercase tracking-[0.18em] text-[#6c78a6]">
                                    Attendance operations
                                </p>
                                <h2 className="mt-[.06rem] font-['Montserrat'] text-[.38rem] font-semibold leading-[1.08] text-[#232b57]">
                                    Daily presence, check-ins, and shift coverage
                                </h2>
                                <p className="mt-[.08rem] text-[.16rem] leading-[1.6] text-[#6c7598]">
                                    Review attendance status, identify late arrivals, and track logged hours from one operational view.
                                </p>
                            </div>

                            <div className="flex items-center gap-[.1rem] rounded-[.18rem] border border-[#dfe5f5] bg-white px-[.14rem] py-[.12rem] shadow-[0_.06rem_.18rem_rgba(15,23,42,0.05)]">
                                <div className="flex h-[.42rem] w-[.42rem] items-center justify-center rounded-[.14rem] bg-[#eef2ff] text-[#5b6cff]">
                                    <CalendarRange className="h-[.18rem] w-[.18rem]" />
                                </div>
                                <div>
                                    <p className="text-[.11rem] font-semibold uppercase tracking-[0.16em] text-[#8b97b7]">
                                        Current period
                                    </p>
                                    <p className="mt-[.03rem] text-[.15rem] font-medium text-[#34426b]">
                                        {dateFilter || "March 2026"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-[.18rem] grid gap-[.12rem] xl:grid-cols-3">
                            {statCards.map((card) => {
                                const Icon = card.icon;

                                return (
                                    <div
                                        key={card.title}
                                        className={`rounded-[.18rem] border border-[#e7ebf6] p-[.16rem] ${card.surface}`}
                                    >
                                        <div className="flex items-start justify-between gap-[.12rem]">
                                            <div>
                                                <p className="text-[.14rem] font-medium text-[#6c7598]">{card.title}</p>
                                                <p className="mt-[.06rem] font-['Montserrat'] text-[.34rem] font-semibold text-[#232b57]">
                                                    {card.value}
                                                </p>
                                            </div>
                                            <div className={`flex h-[.46rem] w-[.46rem] items-center justify-center rounded-[.14rem] bg-gradient-to-br ${card.accent} text-white shadow-[0_.08rem_.18rem_rgba(59,91,219,0.18)]`}>
                                                <Icon className="h-[.22rem] w-[.22rem]" />
                                            </div>
                                        </div>
                                        <p className="mt-[.08rem] text-[.13rem] text-[#7280a7]">{card.detail}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex flex-wrap items-center gap-[.1rem] border-b border-[#edf1f8] px-[.18rem] py-[.14rem]">
                            <Dropdown
                                label="Department"
                                options={["Engineering", "People Ops", "Finance", "Design"]}
                                icon={<GoListUnordered />}
                                value={departmentFilter}
                                onChange={(value) => {
                                    setDepartmentFilter(value);
                                    setCurrentPage(1);
                                }}
                            />
                            <Dropdown
                                label="Shift"
                                options={["Day shift", "Mid shift", "Night shift"]}
                                icon={<TimerReset />}
                                value={shiftFilter}
                                onChange={(value) => {
                                    setShiftFilter(value);
                                    setCurrentPage(1);
                                }}
                            />
                            <Dropdown
                                label="Date"
                                options={["Today", "Yesterday", "Mar 21, 2026", "Mar 20, 2026", "This week"]}
                                icon={<CalendarRange />}
                                value={dateFilter}
                                onChange={(value) => {
                                    setDateFilter(value);
                                    setCurrentPage(1);
                                }}
                            />
                            <Dropdown
                                label="Status"
                                options={["Present", "Late", "Remote", "Absent"]}
                                icon={<MdOutlineFilterList />}
                                value={statusFilter}
                                onChange={(value) => {
                                    setStatusFilter(value);
                                    setCurrentPage(1);
                                }}
                            />

                            <div className="ml-auto flex min-w-[3.3rem] items-center gap-[.1rem] rounded-[.14rem] border border-[#e2e8f4] bg-[#fbfcff] px-[.14rem] py-[.1rem] text-[#8d97b4]">
                                <Search className="h-[.16rem] w-[.16rem]" />
                                <input
                                    value={searchTerm}
                                    onChange={(event) => {
                                        setSearchTerm(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full bg-transparent text-[.14rem] text-slate-700 outline-none placeholder:text-[#98a1bc]"
                                    placeholder="Search employee, team, or shift"
                                />
                            </div>

                            <button className="inline-flex h-[.42rem] items-center gap-[.08rem] rounded-[.14rem] border border-[#e2e8f4] bg-white px-[.14rem] text-[.14rem] font-medium text-[#5c6b93] transition hover:bg-[#f8faff]">
                                <Download className="h-[.16rem] w-[.16rem]" />
                                <span>Export</span>
                            </button>
                        </div>

                        <div className="flex flex-col gap-[.12rem] p-[.18rem]">
                            <div className="flex flex-wrap items-center gap-[.08rem]">
                                <AttendanceChip tone="good" label={`${statusCounts.present} present`} />
                                <AttendanceChip tone="warning" label={`${statusCounts.late} late`} />
                                <AttendanceChip tone="info" label={`${statusCounts.remote} remote`} />
                                <AttendanceChip tone="danger" label={`${statusCounts.absent} absent`} />
                            </div>

                            <div className="overflow-hidden rounded-[.18rem] border border-[#edf1f8] bg-white">
                                <div className="max-h-[4.55rem] overflow-auto">
                                    <table className="w-full table-fixed text-left">
                                        <thead className="sticky top-0 z-10 bg-[#f8faff]">
                                            <tr className="border-b border-[#edf1f8] text-[.13rem] font-medium uppercase tracking-[0.08em] text-[#7c86a8]">
                                                <th className="w-[2.55rem] px-[.12rem] py-[.1rem]">Employee</th>
                                                <th className="w-[1.2rem] px-[.12rem] py-[.1rem]">Department</th>
                                                <th className="w-[1rem] px-[.12rem] py-[.1rem]">Shift</th>
                                                <th className="w-[1rem] px-[.12rem] py-[.1rem]">Date</th>
                                                <th className="w-[.95rem] px-[.12rem] py-[.1rem]">Check in</th>
                                                <th className="w-[.95rem] px-[.12rem] py-[.1rem]">Check out</th>
                                                <th className="w-[.95rem] px-[.12rem] py-[.1rem]">Status</th>
                                                <th className="w-[.85rem] px-[.12rem] py-[.1rem] text-right">Hours</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {currentAttendance.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-[#edf1f8] bg-white transition hover:bg-[#fbfcff] last:border-b-0"
                                                >
                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center gap-[.09rem]">
                                                            <img
                                                                src={`https://i.pravatar.cc/56?img=${item.id}`}
                                                                className="h-[.42rem] w-[.42rem] rounded-full border border-[#dde3f5]"
                                                                alt={item.name}
                                                            />
                                                            <div className="min-w-0 leading-[1.08]">
                                                                <div className="truncate text-[.145rem] font-semibold text-[#24305b]">
                                                                    {item.name}
                                                                </div>
                                                                <div className="truncate text-[.12rem] text-[#7b86a8]">
                                                                    {item.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center">
                                                            <span className="inline-flex rounded-full bg-[#eef3ff] px-[.09rem] py-[.04rem] text-[.12rem] font-medium text-[#5365f6]">
                                                                {item.department}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">
                                                            {item.shift}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">
                                                            {item.date}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">
                                                            {item.checkIn}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">
                                                            {item.checkOut}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center">
                                                            <StatusPill status={item.status} />
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center justify-end text-right text-[.14rem] font-semibold text-[#24305b]">
                                                            {item.hours}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-between border-t border-[#edf1f8] bg-[#fbfcff] px-[.14rem] py-[.1rem]">
                                    <div className="text-[.13rem] text-[#7b86a8]">
                                        {filteredAttendance.length === 0 ? "0-0" : `${indexFirst + 1}-${visibleEnd}`} of {filteredAttendance.length}
                                    </div>

                                    <div className="flex items-center gap-[.04rem]">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage((page) => page - 1)}
                                            className="h-[.3rem] rounded-[.08rem] border border-[#dde4f5] px-[.1rem] text-[.13rem] text-[#5b678f] transition hover:bg-white disabled:opacity-40"
                                        >
                                            Prev
                                        </button>

                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentPage(index + 1)}
                                                className={`h-[.3rem] min-w-[.3rem] rounded-[.08rem] border px-[.08rem] text-[.13rem] transition ${
                                                    currentPage === index + 1
                                                        ? "border-[#5b6cff] bg-[#5b6cff] text-white"
                                                        : "border-[#dde4f5] bg-white text-[#5b678f] hover:bg-[#f8faff]"
                                                }`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}

                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage((page) => page + 1)}
                                            className="h-[.3rem] rounded-[.08rem] border border-[#dde4f5] px-[.1rem] text-[.13rem] text-[#5b678f] transition hover:bg-white disabled:opacity-40"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Main>
    );
};

function AttendanceChip({
    label,
    tone,
}: {
    label: string;
    tone: "good" | "warning" | "info" | "danger";
}) {
    const classes =
        tone === "good"
            ? "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]"
            : tone === "warning"
                ? "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]"
                : tone === "info"
                    ? "border-[#d9e2ff] bg-[#f4f7ff] text-[#5365f6]"
                    : "border-[#ffd8dd] bg-[#fff5f6] text-[#cc4a60]";

    return (
        <span className={`inline-flex items-center rounded-full border px-[.1rem] py-[.05rem] text-[.12rem] font-medium ${classes}`}>
            {label}
        </span>
    );
}

function StatusPill({ status }: { status: AttendanceRow["status"] }) {
    const classes =
        status === "Present"
            ? "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]"
            : status === "Late"
                ? "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]"
                : status === "Remote"
                    ? "border-[#d9e2ff] bg-[#f4f7ff] text-[#5365f6]"
                    : "border-[#ffd8dd] bg-[#fff5f6] text-[#cc4a60]";

    const dot =
        status === "Present" ? "bg-[#22b07d]" : status === "Late" ? "bg-[#f1aa28]" : status === "Remote" ? "bg-[#5b6cff]" : "bg-[#ef6b7f]";

    return (
        <span className={`inline-flex items-center gap-[.04rem] rounded-full border px-[.085rem] py-[.03rem] text-[.115rem] font-semibold leading-none ${classes}`}>
            <span className={`h-[.055rem] w-[.055rem] rounded-full ${dot}`} />
            {status}
        </span>
    );
}
