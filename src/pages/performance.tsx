import { useEffect, useState } from "react";
import { Award, BarChart3, Download, Gauge, Search, Sparkles, Target } from "lucide-react";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineFilterList } from "react-icons/md";
import { Main } from "../layout/main";
import { Dropdown } from "../utils/FilterDropdown";

const summaryCards = [
    {
        title: "Avg. review score",
        value: "4.6",
        detail: "Across current evaluation cycles",
        icon: Gauge,
        accent: "from-[#4f6bff] to-[#7388ff]",
        surface: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(115,136,255,0.03))]",
    },
    {
        title: "Top performers",
        value: "128",
        detail: "Employees above target benchmark",
        icon: Award,
        accent: "from-[#f1aa28] to-[#f8c962]",
        surface: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(248,201,98,0.03))]",
    },
    {
        title: "Goals on track",
        value: "84%",
        detail: "Current team objectives within plan",
        icon: Target,
        accent: "from-[#18b397] to-[#4cd4b7]",
        surface: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(76,212,183,0.03))]",
    },
];

const scoreDistribution = [
    { label: "5.0", value: 82, width: "w-[88%]" },
    { label: "4.5", value: 126, width: "w-[100%]" },
    { label: "4.0", value: 94, width: "w-[74%]" },
    { label: "3.5", value: 41, width: "w-[38%]" },
    { label: "3.0", value: 16, width: "w-[20%]" },
];

const topContributors = [
    { name: "Nadia Cruz", team: "People Ops", score: "4.9", trend: "+0.3" },
    { name: "Ian Miller", team: "Engineering", score: "4.8", trend: "+0.2" },
    { name: "Sophia Reyes", team: "Design", score: "4.8", trend: "+0.4" },
];

type PerformanceStatus = "On track" | "Exceeding" | "Needs review";

const performanceRows: {
    id: number;
    name: string;
    email: string;
    department: string;
    manager: string;
    score: string;
    status: PerformanceStatus;
    cycle: string;
}[] = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    email: `employee${i + 1}@company.com`,
    department: i % 4 === 0 ? "Finance" : i % 3 === 0 ? "People Ops" : i % 2 === 0 ? "Engineering" : "Design",
    manager: i % 3 === 0 ? "A. Santos" : i % 2 === 0 ? "M. Rivera" : "K. Brooks",
    score: i % 5 === 0 ? "4.9" : i % 4 === 0 ? "4.7" : i % 3 === 0 ? "4.4" : "4.2",
    status: i % 6 === 0 ? "Needs review" : i % 4 === 0 ? "Exceeding" : "On track",
    cycle: "Q1 2026",
}));

export const PerformanceOverview = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const totalPages = Math.max(1, Math.ceil(performanceRows.length / rowsPerPage));
    const indexLast = currentPage * rowsPerPage;
    const indexFirst = indexLast - rowsPerPage;
    const visibleEnd = Math.min(indexLast, performanceRows.length);
    const paginatedRows = performanceRows.slice(indexFirst, indexLast);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return (
        <Main>
            <section className="h-full overflow-auto bg-[linear-gradient(180deg,_#f8faff_0%,_#f5f7fb_100%)] p-[.28rem]">
                <div className="flex min-h-full flex-col gap-[.18rem]">
                    <div className="rounded-[.22rem] border border-[#e5e9f5] bg-[linear-gradient(135deg,_#ffffff_0%,_#f8faff_100%)] px-[.18rem] py-[.15rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex flex-col gap-[.14rem] xl:flex-row xl:items-end xl:justify-between">
                            <div className="max-w-[5.7rem]">
                                <p className="text-[.118rem] font-medium uppercase tracking-[0.18em] text-[#6c78a6]">
                                    Performance review
                                </p>
                                <div className="mt-[.03rem] flex flex-col gap-[.05rem] xl:flex-row xl:items-end xl:gap-[.12rem]">
                                    <h2 className="font-['Montserrat'] text-[.28rem] font-semibold leading-[1.08] text-[#232b57]">
                                        Review scores and growth signals
                                    </h2>
                                    <div className="flex items-center gap-[.08rem] pb-[.02rem]">
                                        <div className="flex h-[.3rem] w-[.3rem] items-center justify-center rounded-[.1rem] bg-[#eef2ff] text-[#5b6cff]">
                                            <Sparkles className="h-[.14rem] w-[.14rem]" />
                                        </div>
                                        <div className="text-[.125rem] text-[#6c7598]">
                                            <span className="font-medium text-[#34426b]">Active cycle:</span> Q1 2026
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-[.05rem] max-w-[5rem] text-[.132rem] leading-[1.5] text-[#6c7598]">
                                    Track review cycles, identify standout contributors, and keep team performance health visible in one workspace.
                                </p>
                            </div>

                            <div className="grid gap-[.08rem] sm:grid-cols-3 xl:min-w-[5rem] xl:max-w-[5.9rem] xl:flex-1">
                                {summaryCards.map((card) => {
                                    const Icon = card.icon;

                                    return (
                                        <div
                                            key={card.title}
                                            className={`rounded-[.16rem] border border-[#e7ebf6] px-[.11rem] py-[.1rem] ${card.surface}`}
                                        >
                                            <div className="flex items-start justify-between gap-[.1rem]">
                                                <div className="min-w-0">
                                                    <p className="truncate text-[.105rem] uppercase tracking-[0.08em] text-[#7d86a8]">{card.title}</p>
                                                    <p className="mt-[.035rem] font-['Montserrat'] text-[.22rem] font-semibold leading-none text-[#232b57]">
                                                        {card.value}
                                                    </p>
                                                </div>
                                                <div className={`flex h-[.34rem] w-[.34rem] shrink-0 items-center justify-center rounded-[.11rem] bg-gradient-to-br ${card.accent} text-white shadow-[0_.08rem_.18rem_rgba(59,91,219,0.14)]`}>
                                                    <Icon className="h-[.16rem] w-[.16rem]" />
                                                </div>
                                            </div>
                                            <p className="mt-[.035rem] text-[.108rem] leading-[1.4] text-[#7280a7]">{card.detail}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-[.12rem] flex flex-wrap items-center gap-[.08rem] border-t border-[#edf1f8] pt-[.11rem]">
                            <span className="inline-flex items-center gap-[.05rem] rounded-full border border-[#d9e2ff] bg-[#f4f7ff] px-[.09rem] py-[.045rem] text-[.115rem] font-semibold text-[#5365f6]">
                                <span className="h-[.055rem] w-[.055rem] rounded-full bg-[#5b6cff]" />
                                Review cadence stable
                            </span>
                            <span className="text-[.12rem] text-[#7883a4]">
                                3 calibration sessions pending this week and 84% of goal check-ins remain on plan.
                            </span>
                        </div>
                    </div>

                    <div className="grid gap-[.18rem] xl:grid-cols-[1.35fr_.95fr]">
                        <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white p-[.18rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                            <div className="flex items-end justify-between gap-[.12rem]">
                                <div>
                                    <h3 className="text-[.2rem] font-semibold text-[#253158]">Score distribution</h3>
                                    <p className="mt-[.04rem] text-[.13rem] text-[#7481a4]">
                                        Snapshot of current review ratings across the company.
                                    </p>
                                </div>
                                <div className="rounded-[.14rem] border border-[#e4eaf7] bg-[#fbfcff] px-[.12rem] py-[.08rem] text-[.12rem] font-medium text-[#607096]">
                                    Last sync 10 min ago
                                </div>
                            </div>

                            <div className="mt-[.16rem] space-y-[.12rem]">
                                {scoreDistribution.map((item) => (
                                    <div key={item.label} className="grid grid-cols-[.5rem_1fr_.45rem] items-center gap-[.1rem]">
                                        <div className="text-[.13rem] font-medium text-[#4d5c86]">{item.label}</div>
                                        <div className="h-[.12rem] overflow-hidden rounded-full bg-[#eef2fb]">
                                            <div className={`h-full rounded-full bg-[linear-gradient(90deg,_#5b6cff_0%,_#7d86ff_100%)] ${item.width}`} />
                                        </div>
                                        <div className="text-right text-[.12rem] text-[#7a86a7]">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white p-[.18rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                            <div className="flex items-end justify-between gap-[.12rem]">
                                <div>
                                    <h3 className="text-[.2rem] font-semibold text-[#253158]">Top contributors</h3>
                                    <p className="mt-[.04rem] text-[.13rem] text-[#7481a4]">
                                        Highest review scores in the current cycle.
                                    </p>
                                </div>
                                <BarChart3 className="h-[.18rem] w-[.18rem] text-[#7d89ab]" />
                            </div>

                            <div className="mt-[.14rem] space-y-[.09rem]">
                                {topContributors.map((person, index) => (
                                    <div
                                        key={person.name}
                                        className="flex items-center justify-between gap-[.12rem] rounded-[.16rem] border border-[#eef2fa] bg-[#fbfcff] px-[.14rem] py-[.12rem]"
                                    >
                                        <div className="flex items-center gap-[.1rem]">
                                            <div className="flex h-[.38rem] w-[.38rem] items-center justify-center rounded-[.12rem] bg-[#eef2ff] text-[.14rem] font-semibold text-[#5b6cff]">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="text-[.14rem] font-medium text-[#31406c]">{person.name}</p>
                                                <p className="mt-[.03rem] text-[.12rem] text-[#7a86a7]">{person.team}</p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-[.15rem] font-semibold text-[#24305b]">{person.score}</p>
                                            <p className="mt-[.02rem] text-[.12rem] text-[#148a68]">{person.trend}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex flex-wrap items-center gap-[.1rem] border-b border-[#edf1f8] px-[.18rem] py-[.14rem]">
                            <Dropdown
                                label="Department"
                                options={["Engineering", "People Ops", "Finance", "Design"]}
                                icon={<GoListUnordered />}
                            />
                            <Dropdown
                                label="Cycle"
                                options={["Q1 2026", "Q4 2025", "Q3 2025"]}
                                icon={<BarChart3 />}
                            />
                            <Dropdown
                                label="Status"
                                options={["On track", "Exceeding", "Needs review"]}
                                icon={<MdOutlineFilterList />}
                            />

                            <div className="ml-auto flex min-w-[3.3rem] items-center gap-[.1rem] rounded-[.14rem] border border-[#e2e8f4] bg-[#fbfcff] px-[.14rem] py-[.1rem] text-[#8d97b4]">
                                <Search className="h-[.16rem] w-[.16rem]" />
                                <input
                                    className="w-full bg-transparent text-[.14rem] text-slate-700 outline-none placeholder:text-[#98a1bc]"
                                    placeholder="Search employee, manager, or team"
                                />
                            </div>

                            <button className="inline-flex h-[.42rem] items-center gap-[.08rem] rounded-[.14rem] border border-[#e2e8f4] bg-white px-[.14rem] text-[.14rem] font-medium text-[#5c6b93] transition hover:bg-[#f8faff]">
                                <Download className="h-[.16rem] w-[.16rem]" />
                                <span>Export</span>
                            </button>
                        </div>

                        <div className="flex flex-col gap-[.12rem] p-[.18rem]">
                            <div className="overflow-hidden rounded-[.18rem] border border-[#edf1f8] bg-white">
                                <div className="max-h-[4.6rem] overflow-auto">
                                    <table className="w-full table-fixed text-left">
                                        <thead className="sticky top-0 z-10 bg-[#f8faff]">
                                            <tr className="border-b border-[#edf1f8] text-[.13rem] font-medium uppercase tracking-[0.08em] text-[#7c86a8]">
                                                <th className="w-[2.45rem] px-[.12rem] py-[.1rem]">Employee</th>
                                                <th className="w-[1.1rem] px-[.12rem] py-[.1rem]">Department</th>
                                                <th className="w-[1rem] px-[.12rem] py-[.1rem]">Manager</th>
                                                <th className="w-[.9rem] px-[.12rem] py-[.1rem]">Cycle</th>
                                                <th className="w-[.85rem] px-[.12rem] py-[.1rem]">Score</th>
                                                <th className="w-[1rem] px-[.12rem] py-[.1rem]">Status</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {paginatedRows.map((row) => (
                                                <tr
                                                    key={row.id}
                                                    className="border-b border-[#edf1f8] bg-white transition hover:bg-[#fbfcff] last:border-b-0"
                                                >
                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center gap-[.09rem]">
                                                            <div className="flex h-[.42rem] w-[.42rem] items-center justify-center rounded-full bg-[#eef2ff] text-[.14rem] font-semibold text-[#5b6cff]">
                                                                {row.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                                                            </div>
                                                            <div className="min-w-0 leading-[1.08]">
                                                                <div className="truncate text-[.145rem] font-semibold text-[#24305b]">
                                                                    {row.name}
                                                                </div>
                                                                <div className="truncate text-[.12rem] text-[#7b86a8]">
                                                                    {row.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">
                                                            {row.department}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">
                                                            {row.manager}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">
                                                            {row.cycle}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center text-[.14rem] font-semibold text-[#24305b]">
                                                            {row.score}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center">
                                                            <StatusPill status={row.status} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-[.12rem] rounded-[.16rem] border border-[#edf1f8] bg-[#fbfcff] px-[.16rem] py-[.12rem]">
                                <p className="text-[.13rem] text-[#7580a2]">
                                    Showing <span className="font-semibold text-[#2f3c69]">{indexFirst + 1}</span> to{" "}
                                    <span className="font-semibold text-[#2f3c69]">{visibleEnd}</span> of{" "}
                                    <span className="font-semibold text-[#2f3c69]">{performanceRows.length}</span> reviews
                                </p>

                                <div className="flex items-center gap-[.08rem]">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                        disabled={currentPage === 1}
                                        className="inline-flex h-[.36rem] items-center justify-center rounded-[.12rem] border border-[#dfe5f5] bg-white px-[.12rem] text-[.13rem] font-medium text-[#5c6b93] transition hover:bg-[#f5f8ff] disabled:cursor-not-allowed disabled:opacity-45"
                                    >
                                        Previous
                                    </button>

                                    <div className="rounded-[.12rem] border border-[#d9e2ff] bg-[#f4f7ff] px-[.12rem] py-[.08rem] text-[.13rem] font-semibold text-[#5365f6]">
                                        Page {currentPage} of {totalPages}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                                        disabled={currentPage === totalPages}
                                        className="inline-flex h-[.36rem] items-center justify-center rounded-[.12rem] border border-[#dfe5f5] bg-white px-[.12rem] text-[.13rem] font-medium text-[#5c6b93] transition hover:bg-[#f5f8ff] disabled:cursor-not-allowed disabled:opacity-45"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Main>
    );
};

function StatusPill({ status }: { status: "On track" | "Exceeding" | "Needs review" }) {
    const classes =
        status === "Exceeding"
            ? "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]"
            : status === "On track"
                ? "border-[#d9e2ff] bg-[#f4f7ff] text-[#5365f6]"
                : "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]";

    const dot = status === "Exceeding" ? "bg-[#22b07d]" : status === "On track" ? "bg-[#5b6cff]" : "bg-[#f1aa28]";

    return (
        <span className={`inline-flex items-center gap-[.04rem] rounded-full border px-[.085rem] py-[.03rem] text-[.115rem] font-semibold leading-none ${classes}`}>
            <span className={`h-[.055rem] w-[.055rem] rounded-full ${dot}`} />
            {status}
        </span>
    );
}
