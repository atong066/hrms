import { useState } from "react";
import {
    BadgeCheck,
    BriefcaseBusiness,
    Download,
    Search,
    Sparkles,
    Target,
    UsersRound,
} from "lucide-react";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineFilterList } from "react-icons/md";
import { Main } from "../layout/main";
import { Dropdown } from "../utils/FilterDropdown";

const summaryCards = [
    {
        title: "Open roles",
        value: "18",
        detail: "Hiring demand across active departments",
        icon: BriefcaseBusiness,
        accent: "from-[#4f6bff] to-[#7388ff]",
        surface: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(115,136,255,0.03))]",
    },
    {
        title: "Candidates in review",
        value: "74",
        detail: "Profiles currently under screening",
        icon: UsersRound,
        accent: "from-[#f1aa28] to-[#f8c962]",
        surface: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(248,201,98,0.03))]",
    },
    {
        title: "Offer acceptance",
        value: "81%",
        detail: "Accepted offers this quarter",
        icon: BadgeCheck,
        accent: "from-[#18b397] to-[#4cd4b7]",
        surface: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(76,212,183,0.03))]",
    },
];

const hiringStages = [
    { label: "Sourced", count: 126, accent: "bg-[#eef2ff] text-[#5365f6]" },
    { label: "Screening", count: 74, accent: "bg-[#fff7e8] text-[#c78211]" },
    { label: "Interview", count: 31, accent: "bg-[#f4f7ff] text-[#4f6bff]" },
    { label: "Offer", count: 9, accent: "bg-[#f2fdf7] text-[#148a68]" },
];

const topRoles = [
    { role: "Senior Frontend Engineer", team: "Engineering", applicants: 28, progress: "7 in final round" },
    { role: "HR Business Partner", team: "People Ops", applicants: 19, progress: "3 manager interviews" },
    { role: "Product Designer", team: "Design", applicants: 24, progress: "Portfolio review ongoing" },
];

const pipelineRows = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    name: `Candidate ${i + 1}`,
    role: i % 3 === 0 ? "Senior Frontend Engineer" : i % 2 === 0 ? "Product Designer" : "HR Business Partner",
    department: i % 3 === 0 ? "Engineering" : i % 2 === 0 ? "Design" : "People Ops",
    stage: i % 5 === 0 ? "Offer" : i % 4 === 0 ? "Interview" : i % 3 === 0 ? "Screening" : "Sourced",
    owner: i % 2 === 0 ? "A. Santos" : "M. Rivera",
    updated: i % 4 === 0 ? "Today" : i % 3 === 0 ? "Yesterday" : "2 days ago",
}));

export const RecruitmentOverview = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 8;
    const totalPages = Math.max(1, Math.ceil(pipelineRows.length / rowsPerPage));
    const indexLast = currentPage * rowsPerPage;
    const indexFirst = indexLast - rowsPerPage;
    const currentRows = pipelineRows.slice(indexFirst, indexLast);
    const visibleEnd = Math.min(indexLast, pipelineRows.length);

    return (
        <Main>
            <section className="h-full overflow-auto bg-[linear-gradient(180deg,_#f8faff_0%,_#f5f7fb_100%)] p-[.28rem]">
                <div className="flex min-h-full flex-col gap-[.18rem]">
                    <div className="rounded-[.24rem] border border-[#e5e9f5] bg-[linear-gradient(135deg,_#ffffff_0%,_#f7f9ff_100%)] p-[.2rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex items-start justify-between gap-[.18rem]">
                            <div className="max-w-[6.3rem]">
                                <p className="text-[.14rem] font-medium uppercase tracking-[0.18em] text-[#6c78a6]">
                                    Recruitment pipeline
                                </p>
                                <h2 className="mt-[.06rem] font-['Montserrat'] text-[.38rem] font-semibold leading-[1.08] text-[#232b57]">
                                    Candidate flow, open roles, and hiring momentum
                                </h2>
                                <p className="mt-[.08rem] text-[.16rem] leading-[1.6] text-[#6c7598]">
                                    Review candidate progress, track active openings, and monitor hiring stages from one recruiting workspace.
                                </p>
                            </div>

                            <div className="flex items-center gap-[.1rem] rounded-[.18rem] border border-[#dfe5f5] bg-white px-[.14rem] py-[.12rem] shadow-[0_.06rem_.18rem_rgba(15,23,42,0.05)]">
                                <div className="flex h-[.42rem] w-[.42rem] items-center justify-center rounded-[.14rem] bg-[#eef2ff] text-[#5b6cff]">
                                    <Sparkles className="h-[.18rem] w-[.18rem]" />
                                </div>
                                <div>
                                    <p className="text-[.11rem] font-semibold uppercase tracking-[0.16em] text-[#8b97b7]">
                                        Weekly pulse
                                    </p>
                                    <p className="mt-[.03rem] text-[.15rem] font-medium text-[#34426b]">Hiring active</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-[.18rem] grid gap-[.12rem] xl:grid-cols-3">
                            {summaryCards.map((card) => {
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

                    <div className="grid gap-[.18rem] xl:grid-cols-[1.05fr_1.15fr]">
                        <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white p-[.18rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                            <div className="flex items-end justify-between gap-[.12rem]">
                                <div>
                                    <h3 className="text-[.2rem] font-semibold text-[#253158]">Pipeline stages</h3>
                                    <p className="mt-[.04rem] text-[.13rem] text-[#7481a4]">
                                        Candidates grouped by current hiring step.
                                    </p>
                                </div>
                                <Target className="h-[.18rem] w-[.18rem] text-[#7d89ab]" />
                            </div>

                            <div className="mt-[.14rem] grid gap-[.1rem] sm:grid-cols-2">
                                {hiringStages.map((stage) => (
                                    <div
                                        key={stage.label}
                                        className="rounded-[.16rem] border border-[#eef2fa] bg-[#fbfcff] px-[.14rem] py-[.12rem]"
                                    >
                                        <span className={`inline-flex rounded-full px-[.08rem] py-[.04rem] text-[.12rem] font-medium ${stage.accent}`}>
                                            {stage.label}
                                        </span>
                                        <p className="mt-[.1rem] text-[.28rem] font-semibold text-[#24305b]">{stage.count}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white p-[.18rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                            <div className="flex items-end justify-between gap-[.12rem]">
                                <div>
                                    <h3 className="text-[.2rem] font-semibold text-[#253158]">Priority roles</h3>
                                    <p className="mt-[.04rem] text-[.13rem] text-[#7481a4]">
                                        Roles with the highest application activity.
                                    </p>
                                </div>
                                <BriefcaseBusiness className="h-[.18rem] w-[.18rem] text-[#7d89ab]" />
                            </div>

                            <div className="mt-[.14rem] space-y-[.09rem]">
                                {topRoles.map((role) => (
                                    <div
                                        key={role.role}
                                        className="rounded-[.16rem] border border-[#eef2fa] bg-[#fbfcff] px-[.14rem] py-[.12rem]"
                                    >
                                        <div className="flex items-center justify-between gap-[.12rem]">
                                            <div>
                                                <p className="text-[.14rem] font-medium text-[#31406c]">{role.role}</p>
                                                <p className="mt-[.03rem] text-[.12rem] text-[#7a86a7]">{role.team}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[.15rem] font-semibold text-[#24305b]">{role.applicants}</p>
                                                <p className="mt-[.02rem] text-[.12rem] text-[#7a86a7]">Applicants</p>
                                            </div>
                                        </div>
                                        <p className="mt-[.08rem] text-[.12rem] text-[#5b6cff]">{role.progress}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex flex-wrap items-center gap-[.1rem] border-b border-[#edf1f8] px-[.18rem] py-[.14rem]">
                            <Dropdown label="Department" options={["Engineering", "People Ops", "Finance", "Design"]} icon={<GoListUnordered />} />
                            <Dropdown label="Stage" options={["Sourced", "Screening", "Interview", "Offer"]} icon={<MdOutlineFilterList />} />
                            <Dropdown label="Owner" options={["A. Santos", "M. Rivera", "K. Brooks"]} icon={<UsersRound />} />

                            <div className="ml-auto flex min-w-[3.3rem] items-center gap-[.1rem] rounded-[.14rem] border border-[#e2e8f4] bg-[#fbfcff] px-[.14rem] py-[.1rem] text-[#8d97b4]">
                                <Search className="h-[.16rem] w-[.16rem]" />
                                <input className="w-full bg-transparent text-[.14rem] text-slate-700 outline-none placeholder:text-[#98a1bc]" placeholder="Search candidate or role" />
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
                                                <th className="w-[1.75rem] px-[.12rem] py-[.1rem]">Candidate</th>
                                                <th className="w-[1.7rem] px-[.12rem] py-[.1rem]">Role</th>
                                                <th className="w-[1.1rem] px-[.12rem] py-[.1rem]">Department</th>
                                                <th className="w-[1rem] px-[.12rem] py-[.1rem]">Stage</th>
                                                <th className="w-[.95rem] px-[.12rem] py-[.1rem]">Owner</th>
                                                <th className="w-[.9rem] px-[.12rem] py-[.1rem]">Updated</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {currentRows.map((row) => (
                                                <tr key={row.id} className="border-b border-[#edf1f8] bg-white transition hover:bg-[#fbfcff] last:border-b-0">
                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center gap-[.09rem]">
                                                            <div className="flex h-[.42rem] w-[.42rem] items-center justify-center rounded-full bg-[#eef2ff] text-[.14rem] font-semibold text-[#5b6cff]">
                                                                {row.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                                                            </div>
                                                            <div className="min-w-0 leading-[1.08]">
                                                                <div className="truncate text-[.145rem] font-semibold text-[#24305b]">{row.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-[.12rem] py-[.08rem]"><div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">{row.role}</div></td>
                                                    <td className="px-[.12rem] py-[.08rem]"><div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">{row.department}</div></td>
                                                    <td className="px-[.12rem] py-[.08rem]"><div className="flex min-h-[.44rem] items-center"><StagePill stage={row.stage} /></div></td>
                                                    <td className="px-[.12rem] py-[.08rem]"><div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">{row.owner}</div></td>
                                                    <td className="px-[.12rem] py-[.08rem]"><div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#7b86a8]">{row.updated}</div></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-between border-t border-[#edf1f8] bg-[#fbfcff] px-[.14rem] py-[.1rem]">
                                    <div className="text-[.13rem] text-[#7b86a8]">{indexFirst + 1}-{visibleEnd} of {pipelineRows.length}</div>
                                    <div className="flex items-center gap-[.04rem]">
                                        <button disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)} className="h-[.3rem] rounded-[.08rem] border border-[#dde4f5] px-[.1rem] text-[.13rem] text-[#5b678f] transition hover:bg-white disabled:opacity-40">Prev</button>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <button key={index} onClick={() => setCurrentPage(index + 1)} className={`h-[.3rem] min-w-[.3rem] rounded-[.08rem] border px-[.08rem] text-[.13rem] transition ${currentPage === index + 1 ? "border-[#5b6cff] bg-[#5b6cff] text-white" : "border-[#dde4f5] bg-white text-[#5b678f] hover:bg-[#f8faff]"}`}>{index + 1}</button>
                                        ))}
                                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => page + 1)} className="h-[.3rem] rounded-[.08rem] border border-[#dde4f5] px-[.1rem] text-[.13rem] text-[#5b678f] transition hover:bg-white disabled:opacity-40">Next</button>
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

function StagePill({ stage }: { stage: string }) {
    const classes =
        stage === "Offer"
            ? "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]"
            : stage === "Interview"
                ? "border-[#d9e2ff] bg-[#f4f7ff] text-[#5365f6]"
                : stage === "Screening"
                    ? "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]"
                    : "border-[#e4e8f6] bg-[#f8faff] text-[#667392]";

    return <span className={`inline-flex rounded-full border px-[.085rem] py-[.03rem] text-[.115rem] font-semibold leading-none ${classes}`}>{stage}</span>;
}
