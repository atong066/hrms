import { useEffect, useRef, useState } from "react";
import {
    BadgeCheck,
    BriefcaseBusiness,
    Check,
    ChevronDown,
    Download,
    Eye,
    Plus,
    Search,
    Sparkles,
    Target,
    UsersRound,
    X,
} from "lucide-react";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineFilterList } from "react-icons/md";
import { Main } from "../layout/main";
import { Dropdown } from "../utils/FilterDropdown";
import { Modal } from "../utils/modal";

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

const pipelineRows = Array.from({ length: 14 }, (_, i) => {
    const role =
        i % 4 === 0
            ? "Senior Frontend Engineer"
            : i % 3 === 0
                ? "Product Designer"
                : i % 2 === 0
                    ? "HR Business Partner"
                    : "Finance Analyst";
    const department =
        role === "Senior Frontend Engineer"
            ? "Engineering"
            : role === "Product Designer"
                ? "Design"
                : role === "HR Business Partner"
                    ? "People Ops"
                    : "Finance";
    const applicants = 12 + ((i * 3) % 18);

    return {
        id: i + 1,
        role,
        department,
        stage: i % 5 === 0 ? "Offer" : i % 4 === 0 ? "Interview" : i % 3 === 0 ? "Screening" : "Sourced",
        owner: i % 2 === 0 ? "A. Santos" : "M. Rivera",
        updated: i % 4 === 0 ? "Today" : i % 3 === 0 ? "Yesterday" : "2 days ago",
        employmentType: i % 2 === 0 ? "Full-time" : "Hybrid",
        headcount: i % 3 === 0 ? 2 : 1,
        applicants,
        hiringManager: i % 2 === 0 ? "Lea Villanueva" : "Paolo Dizon",
        location: i % 2 === 0 ? "Makati City" : "Quezon City",
        candidates: Array.from({ length: 4 + (i % 3) }, (_, candidateIndex) => ({
            id: `${i + 1}-${candidateIndex + 1}`,
            name: `Candidate ${i + 1}-${candidateIndex + 1}`,
            email: `candidate${i + 1}${candidateIndex + 1}@talentflow.com`,
            phone: candidateIndex % 2 === 0 ? "+63 917 555 0101" : "+63 905 441 0202",
            experience: candidateIndex % 2 === 0 ? "4 years" : "6 years",
            source: candidateIndex % 2 === 0 ? "LinkedIn" : "Referral",
            status:
                candidateIndex % 4 === 0
                    ? "Final interview"
                    : candidateIndex % 3 === 0
                        ? "Screening"
                        : candidateIndex % 2 === 0
                            ? "Assessment"
                            : "Reviewed",
            credentials: [
                "Updated resume.pdf",
                candidateIndex % 2 === 0 ? "Portfolio link verified" : "HR screening notes.pdf",
                candidateIndex % 3 === 0 ? "Technical assessment.pdf" : "Government ID copy.pdf",
            ],
        })),
    };
});

export const RecruitmentOverview = () => {
    const [addHiringOpen, setAddHiringOpen] = useState(false);
    const [positions, setPositions] = useState(pipelineRows);
    const [selectedPositionId, setSelectedPositionId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 8;
    const totalPages = Math.max(1, Math.ceil(positions.length / rowsPerPage));
    const indexLast = currentPage * rowsPerPage;
    const indexFirst = indexLast - rowsPerPage;
    const currentRows = positions.slice(indexFirst, indexLast);
    const visibleEnd = Math.min(indexLast, positions.length);
    const selectedPosition = positions.find((position) => position.id === selectedPositionId) ?? null;

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
                                        className="flex flex-col rounded-[.16rem] border border-[#eef2fa] bg-[#fbfcff] px-[.14rem] py-[.12rem]"
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
                                <input className="w-full bg-transparent text-[.14rem] text-slate-700 outline-none placeholder:text-[#98a1bc]" placeholder="Search position or department" />
                            </div>

                            <button
                                onClick={() => setAddHiringOpen(true)}
                                className="inline-flex h-[.42rem] items-center gap-[.08rem] rounded-[.14rem] border border-[#d8e0ff] bg-[#eef2ff] px-[.14rem] text-[.14rem] font-semibold text-[#4f63f6] transition hover:bg-[#e6ecff]"
                            >
                                <Plus className="h-[.16rem] w-[.16rem]" />
                                <span>Add hiring</span>
                            </button>

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
                                                <th className="w-[1.75rem] px-[.12rem] py-[.1rem]">Position</th>
                                                <th className="w-[1.1rem] px-[.12rem] py-[.1rem]">Department</th>
                                                <th className="w-[1rem] px-[.12rem] py-[.1rem]">Stage</th>
                                                <th className="w-[.95rem] px-[.12rem] py-[.1rem]">Owner</th>
                                                <th className="w-[.9rem] px-[.12rem] py-[.1rem]">Applicants</th>
                                                <th className="w-[.9rem] px-[.12rem] py-[.1rem]">Updated</th>
                                                <th className="w-[.9rem] px-[.12rem] py-[.1rem]">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {currentRows.map((row) => (
                                                <tr key={row.id} className="border-b border-[#edf1f8] bg-white transition hover:bg-[#fbfcff] last:border-b-0">
                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center gap-[.09rem]">
                                                            <div className="flex h-[.42rem] w-[.42rem] items-center justify-center rounded-full bg-[#eef2ff] text-[.14rem] font-semibold text-[#5b6cff]">
                                                                {row.role.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                                                            </div>
                                                            <div className="min-w-0 leading-[1.08]">
                                                                <div className="truncate text-[.145rem] font-semibold text-[#24305b]">{row.role}</div>
                                                                <div className="mt-[.03rem] text-[.12rem] text-[#7b86a8]">
                                                                    {row.employmentType} · {row.headcount} opening{row.headcount > 1 ? "s" : ""}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-[.12rem] py-[.08rem]"><div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">{row.department}</div></td>
                                                    <td className="px-[.12rem] py-[.08rem]"><div className="flex min-h-[.44rem] items-center"><StagePill stage={row.stage} /></div></td>
                                                    <td className="px-[.12rem] py-[.08rem]"><div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">{row.owner}</div></td>
                                                    <td className="px-[.12rem] py-[.08rem]"><div className="flex min-h-[.44rem] items-center text-[.13rem] font-medium text-[#24305b]">{row.applicants}</div></td>
                                                    <td className="px-[.12rem] py-[.08rem]"><div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#7b86a8]">{row.updated}</div></td>
                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center">
                                                            <button
                                                                onClick={() => setSelectedPositionId(row.id)}
                                                                className="inline-flex items-center gap-[.06rem] rounded-[.11rem] border border-[#dfe6fb] bg-[#f8faff] px-[.12rem] py-[.08rem] text-[.13rem] font-medium text-[#5365f6] transition hover:bg-[#eef2ff]"
                                                            >
                                                                <Eye className="h-[.14rem] w-[.14rem]" />
                                                                <span>View</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-between border-t border-[#edf1f8] bg-[#fbfcff] px-[.14rem] py-[.1rem]">
                                    <div className="text-[.13rem] text-[#7b86a8]">{indexFirst + 1}-{visibleEnd} of {positions.length}</div>
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

            <AddHiringModal open={addHiringOpen} onClose={() => setAddHiringOpen(false)} />
            <PositionViewModal
                position={selectedPosition}
                onClose={() => setSelectedPositionId(null)}
                onUpdateCandidateStatus={(candidateId, status) => {
                    if (selectedPositionId === null) return;

                    setPositions((current) =>
                        current.map((position) =>
                            position.id === selectedPositionId
                                ? {
                                      ...position,
                                      candidates: position.candidates.map((candidate) =>
                                          candidate.id === candidateId ? { ...candidate, status } : candidate
                                      ),
                                  }
                                : position
                        )
                    );
                }}
            />
        </Main>
    );
};

const positionTabs = [
    { id: "details", label: "Position details" },
    { id: "candidates", label: "Candidates" },
] as const;

type PositionTabId = (typeof positionTabs)[number]["id"];

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

function AddHiringModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    return (
        <Modal open={open}>
            <div className="w-[6.2rem] rounded-[.26rem] border border-[#dfe5f5] bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] shadow-[0_.28rem_.72rem_rgba(15,23,42,0.18)]">
                <div className="flex items-start justify-between border-b border-[#edf1f8] px-[.22rem] py-[.18rem]">
                    <div>
                        <p className="text-[.11rem] font-semibold uppercase tracking-[0.16em] text-[#8a95b6]">
                            New hiring request
                        </p>
                        <h3 className="mt-[.04rem] text-[.28rem] font-semibold text-[#253158]">
                            Add hiring
                        </h3>
                        <p className="mt-[.04rem] text-[.14rem] text-[#7481a4]">
                            Create a new opening with role, owner, and recruiting details.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-[.36rem] w-[.36rem] items-center justify-center rounded-full border border-[#e1e7f4] bg-white text-[#7e8bad] transition hover:bg-[#f8faff]"
                    >
                        <X className="h-[.18rem] w-[.18rem]" />
                    </button>
                </div>

                <div className="grid gap-[.14rem] px-[.22rem] py-[.18rem] md:grid-cols-2">
                    {[
                        ["Role title", "Senior Frontend Engineer"],
                        ["Department", "Engineering"],
                        ["Hiring manager", "Ana Santos"],
                        ["Recruiter owner", "Marco Rivera"],
                        ["Employment type", "Full-time"],
                        ["Open headcount", "2"],
                    ].map(([label, placeholder]) => (
                        <label key={label} className="flex flex-col gap-[.07rem]">
                            <span className="text-[.13rem] font-medium text-[#5f6d93]">{label}</span>
                            <input
                                className="h-[.44rem] rounded-[.14rem] border border-[#e2e8f4] bg-[#fbfcff] px-[.14rem] text-[.14rem] text-[#31406c] outline-none transition focus:border-[#cfd8ff] focus:bg-white"
                                placeholder={placeholder}
                            />
                        </label>
                    ))}

                    <label className="flex flex-col gap-[.07rem] md:col-span-2">
                        <span className="text-[.13rem] font-medium text-[#5f6d93]">Hiring notes</span>
                        <textarea
                            className="min-h-[1.15rem] rounded-[.16rem] border border-[#e2e8f4] bg-[#fbfcff] px-[.14rem] py-[.12rem] text-[.14rem] text-[#31406c] outline-none transition focus:border-[#cfd8ff] focus:bg-white"
                            placeholder="Add context, priority, or screening expectations..."
                        />
                    </label>
                </div>

                <div className="flex items-center justify-end gap-[.08rem] border-t border-[#edf1f8] bg-[#fbfcff] px-[.22rem] py-[.16rem]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center rounded-[.14rem] border border-[#dfe5f3] bg-white px-[.16rem] py-[.1rem] text-[.14rem] font-medium text-[#5f6d93] transition hover:bg-[#f7faff]"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center rounded-[.14rem] bg-[linear-gradient(135deg,_#4f63f6_0%,_#6883ff_100%)] px-[.18rem] py-[.1rem] text-[.14rem] font-semibold text-white shadow-[0_.12rem_.24rem_rgba(79,99,246,0.24)] transition hover:brightness-105"
                    >
                        Save hiring request
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function PositionViewModal({
    position,
    onClose,
    onUpdateCandidateStatus,
}: {
    position: (typeof pipelineRows)[number] | null;
    onClose: () => void;
    onUpdateCandidateStatus: (
        candidateId: (typeof pipelineRows)[number]["candidates"][number]["id"],
        status: (typeof pipelineRows)[number]["candidates"][number]["status"]
    ) => void;
}) {
    const [tab, setTab] = useState<PositionTabId>("details");
    const [selectedCandidate, setSelectedCandidate] = useState<(typeof pipelineRows)[number]["candidates"][number] | null>(null);

    if (!position) return null;

    return (
        <Modal open={Boolean(position)}>
            <div className="flex h-[6.7rem] w-[7rem] flex-col overflow-hidden rounded-[.26rem] border border-[#dfe5f5] bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] shadow-[0_.28rem_.72rem_rgba(15,23,42,0.18)]">
                <div className="border-b border-[#edf1f8] px-[.22rem] py-[.18rem]">
                    <div className="flex items-start justify-between gap-[.16rem]">
                        <div className="flex items-center gap-[.14rem]">
                            <div className="flex h-[.8rem] w-[.8rem] items-center justify-center rounded-[.22rem] bg-[#eef2ff] text-[.22rem] font-semibold text-[#5365f6]">
                                {position.role.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                            </div>
                            <div>
                                <p className="text-[.11rem] font-semibold uppercase tracking-[0.16em] text-[#8a95b6]">
                                    Position overview
                                </p>
                                <h3 className="mt-[.04rem] text-[.28rem] font-semibold text-[#253158]">
                                    {position.role}
                                </h3>
                                <p className="mt-[.03rem] text-[.14rem] text-[#7481a4]">
                                    {position.department} · {position.employmentType} · {position.headcount} opening{position.headcount > 1 ? "s" : ""}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-[.36rem] w-[.36rem] items-center justify-center rounded-full border border-[#e1e7f4] bg-white text-[#7e8bad] transition hover:bg-[#f8faff]"
                        >
                            <X className="h-[.18rem] w-[.18rem]" />
                        </button>
                    </div>

                    <div className="mt-[.16rem] flex items-center gap-[.08rem]">
                        {positionTabs.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setTab(item.id)}
                                className={`rounded-full px-[.14rem] py-[.08rem] text-[.14rem] font-medium transition ${
                                    tab === item.id
                                        ? "bg-[#eef2ff] text-[#5365f6]"
                                        : "text-[#6f7ca0] hover:bg-[#f7faff] hover:text-[#44537d]"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-auto px-[.22rem] py-[.18rem]">
                    {tab === "details" ? (
                        <div className="grid gap-[.14rem] lg:grid-cols-[1.05fr_.95fr]">
                            <div className="space-y-[.14rem]">
                                <div className="rounded-[.18rem] border border-[#e7ecf7] bg-white p-[.16rem]">
                                    <h4 className="text-[.16rem] font-semibold text-[#2d395f]">Position details</h4>
                                    <div className="mt-[.12rem] grid gap-[.08rem]">
                                        <InfoRow label="Department" value={position.department} />
                                        <InfoRow label="Hiring manager" value={position.hiringManager} />
                                        <InfoRow label="Recruiter owner" value={position.owner} />
                                        <InfoRow label="Work location" value={position.location} />
                                        <InfoRow label="Employment type" value={position.employmentType} />
                                        <InfoRow label="Current stage" value={position.stage} />
                                        <InfoRow label="Applicant volume" value={`${position.applicants} candidates`} />
                                    </div>
                                </div>

                                <div className="rounded-[.18rem] border border-[#e7ecf7] bg-white p-[.16rem]">
                                    <h4 className="text-[.16rem] font-semibold text-[#2d395f]">Role notes</h4>
                                    <div className="mt-[.12rem] space-y-[.08rem]">
                                        {[
                                            "Priority opening for the current hiring cycle.",
                                            "Shortlist should be ready for manager review this week.",
                                            "Coordinate with stakeholders before moving to offer stage.",
                                        ].map((item) => (
                                            <div key={item} className="rounded-[.14rem] border border-[#eef2fa] bg-[#fbfcff] px-[.12rem] py-[.11rem] text-[.13rem] text-[#617097]">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-[.14rem]">
                                <div className="rounded-[.18rem] border border-[#e7ecf7] bg-white p-[.16rem]">
                                    <div className="flex items-center justify-between gap-[.12rem]">
                                        <h4 className="text-[.16rem] font-semibold text-[#2d395f]">Hiring summary</h4>
                                        <StagePill stage={position.stage} />
                                    </div>
                                    <div className="mt-[.12rem] grid gap-[.08rem] sm:grid-cols-2">
                                        <MiniInfoCard label="Updated" value={position.updated} />
                                        <MiniInfoCard label="Department" value={position.department} />
                                        <MiniInfoCard label="Role" value={position.role} />
                                        <MiniInfoCard label="Owner" value={position.owner} />
                                    </div>
                                </div>

                                <div className="rounded-[.18rem] border border-[#e7ecf7] bg-white p-[.16rem]">
                                    <h4 className="text-[.16rem] font-semibold text-[#2d395f]">Coverage</h4>
                                    <div className="mt-[.12rem] grid gap-[.08rem]">
                                        <InfoRow label="Open headcount" value={`${position.headcount}`} />
                                        <InfoRow label="Employment type" value={position.employmentType} />
                                        <InfoRow label="Work setup" value={position.location} />
                                        <InfoRow label="Active applicants" value={`${position.candidates.length} shortlisted in modal`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-[.14rem]">
                            <div className="rounded-[.18rem] border border-[#e7ecf7] bg-white p-[.16rem]">
                                <div className="flex items-center justify-between gap-[.12rem]">
                                    <div>
                                        <h4 className="text-[.16rem] font-semibold text-[#2d395f]">Applied candidates</h4>
                                        <p className="mt-[.03rem] text-[.125rem] text-[#7c89ab]">
                                            Review the current applicants attached to this position.
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-[#eef2ff] px-[.1rem] py-[.05rem] text-[.12rem] font-semibold text-[#5365f6]">
                                        {position.candidates.length} candidates
                                    </span>
                                </div>

                                <div className="mt-[.12rem] overflow-hidden rounded-[.16rem] border border-[#eef2fa]">
                                    <table className="w-full text-left">
                                        <thead className="bg-[#f8faff]">
                                            <tr className="text-[.12rem] uppercase tracking-[0.08em] text-[#7c86a8]">
                                                <th className="px-[.12rem] py-[.1rem] font-medium">Candidate</th>
                                                <th className="px-[.12rem] py-[.1rem] font-medium">Status</th>
                                                <th className="px-[.12rem] py-[.1rem] font-medium">Experience</th>
                                                <th className="px-[.12rem] py-[.1rem] font-medium">Source</th>
                                                <th className="px-[.12rem] py-[.1rem] font-medium">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {position.candidates.map((candidate) => (
                                                <tr key={candidate.id} className="border-t border-[#eef2fa] bg-white text-[.13rem] text-[#4d5b83]">
                                                    <td className="px-[.12rem] py-[.11rem]">
                                                        <div>
                                                            <p className="font-medium text-[#31406c]">{candidate.name}</p>
                                                            <p className="mt-[.03rem] text-[.12rem] text-[#7a86a7]">{candidate.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-[.12rem] py-[.11rem]">
                                                        <span className="rounded-full border border-[#dfe6fb] bg-white px-[.08rem] py-[.04rem] text-[.11rem] font-medium text-[#5365f6]">
                                                            {candidate.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-[.12rem] py-[.11rem]">{candidate.experience}</td>
                                                    <td className="px-[.12rem] py-[.11rem]">{candidate.source}</td>
                                                    <td className="px-[.12rem] py-[.11rem]">
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedCandidate(candidate)}
                                                            className="inline-flex items-center gap-[.06rem] rounded-[.11rem] border border-[#dfe6fb] bg-[#f8faff] px-[.1rem] py-[.07rem] text-[.12rem] font-medium text-[#5365f6] transition hover:bg-[#eef2ff]"
                                                        >
                                                            <Eye className="h-[.13rem] w-[.13rem]" />
                                                            <span>View</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end gap-[.08rem] border-t border-[#edf1f8] bg-[#fbfcff] px-[.22rem] py-[.16rem]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center rounded-[.14rem] border border-[#dfe5f3] bg-white px-[.16rem] py-[.1rem] text-[.14rem] font-medium text-[#5f6d93] transition hover:bg-[#f7faff]"
                    >
                        Close
                    </button>
                </div>
            </div>
            <CandidateDetailModal
                candidate={selectedCandidate}
                onClose={() => setSelectedCandidate(null)}
                onUpdateStatus={onUpdateCandidateStatus}
            />
        </Modal>
    );
}

function CandidateDetailModal({
    candidate,
    onClose,
    onUpdateStatus,
}: {
    candidate: (typeof pipelineRows)[number]["candidates"][number] | null;
    onClose: () => void;
    onUpdateStatus: (
        candidateId: (typeof pipelineRows)[number]["candidates"][number]["id"],
        status: (typeof pipelineRows)[number]["candidates"][number]["status"]
    ) => void;
}) {
    const [nextStatus, setNextStatus] = useState<
        (typeof pipelineRows)[number]["candidates"][number]["status"]
    >("Reviewed");
    const [statusOpen, setStatusOpen] = useState(false);
    const statusRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (candidate) {
            setNextStatus(candidate.status);
            setStatusOpen(false);
        }
    }, [candidate]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
                setStatusOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!candidate) return null;

    return (
        <Modal open={Boolean(candidate)}>
            <div className="flex h-[5.9rem] w-[6.2rem] flex-col overflow-hidden rounded-[.24rem] border border-[#dfe5f5] bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] shadow-[0_.26rem_.64rem_rgba(15,23,42,0.18)]">
                <div className="border-b border-[#edf1f8] px-[.2rem] py-[.18rem]">
                    <div className="flex items-start justify-between gap-[.16rem]">
                        <div>
                            <p className="text-[.11rem] font-semibold uppercase tracking-[0.16em] text-[#8a95b6]">
                                Candidate details
                            </p>
                            <h4 className="mt-[.04rem] text-[.26rem] font-semibold text-[#253158]">
                                {candidate.name}
                            </h4>
                            <p className="mt-[.03rem] text-[.14rem] text-[#7481a4]">
                                {candidate.email} · {candidate.phone}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-[.36rem] w-[.36rem] items-center justify-center rounded-full border border-[#e1e7f4] bg-white text-[#7e8bad] transition hover:bg-[#f8faff]"
                        >
                            <X className="h-[.18rem] w-[.18rem]" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto px-[.2rem] py-[.18rem]">
                    <div className="grid gap-[.14rem] lg:grid-cols-[.95fr_1.05fr]">
                        <div className="rounded-[.18rem] border border-[#e7ecf7] bg-white p-[.16rem]">
                            <h5 className="text-[.16rem] font-semibold text-[#2d395f]">Profile</h5>
                            <div className="mt-[.12rem] grid gap-[.08rem]">
                                <InfoRow label="Current status" value={candidate.status} />
                                <InfoRow label="Experience" value={candidate.experience} />
                                <InfoRow label="Source" value={candidate.source} />
                                <InfoRow label="Phone" value={candidate.phone} />
                                <InfoRow label="Email" value={candidate.email} />
                            </div>
                        </div>

                        <div className="rounded-[.18rem] border border-[#e7ecf7] bg-white p-[.16rem]">
                            <div className="flex items-start justify-between gap-[.12rem]">
                                <div>
                                    <p className="text-[.11rem] font-semibold uppercase tracking-[0.12em] text-[#8a95b6]">
                                        Workflow
                                    </p>
                                    <h5 className="mt-[.03rem] text-[.16rem] font-semibold text-[#2d395f]">Update status</h5>
                                </div>
                                <span className="rounded-full border border-[#dfe6fb] bg-[#f8faff] px-[.09rem] py-[.04rem] text-[.11rem] font-medium text-[#5365f6]">
                                    {nextStatus}
                                </span>
                            </div>
                            <p className="mt-[.05rem] text-[.12rem] text-[#7c89ab]">
                                Move this candidate to the next recruiting step.
                            </p>
                            <div className="mt-[.08rem]">
                                <label className="flex flex-col gap-[.05rem]">
                                    <span className="text-[.11rem] font-medium uppercase tracking-[0.12em] text-[#8a95b6]">
                                        Candidate stage
                                    </span>
                                    <div ref={statusRef} className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setStatusOpen((current) => !current)}
                                            className={`group flex h-[.42rem] w-full items-center gap-[.08rem] rounded-[.14rem] border px-[.14rem] text-left transition duration-200 ${
                                                statusOpen
                                                    ? "border-[#b9c8ff] bg-[#f6f8ff] shadow-[0_.08rem_.2rem_rgba(83,101,246,0.12)]"
                                                    : "border-[#dfe6fb] bg-[linear-gradient(180deg,_#fbfcff_0%,_#f4f7ff_100%)] hover:border-[#d4def9]"
                                            }`}
                                        >
                                            <div className="min-w-0 flex-1 truncate text-[.145rem] font-medium text-[#24305b]">
                                                {nextStatus}
                                            </div>
                                            <ChevronDown
                                                className={`ml-auto h-[.16rem] w-[.16rem] flex-none text-[#8090b5] transition duration-200 ${
                                                    statusOpen ? "rotate-180 text-[#5b6cff]" : ""
                                                }`}
                                            />
                                        </button>

                                        <div
                                            className={`absolute left-0 right-0 top-full z-30 mt-[.06rem] origin-top overflow-hidden rounded-[.16rem] border border-[#e4eaf7] bg-white p-[.06rem] shadow-[0_.16rem_.38rem_rgba(21,32,68,0.12)] transition-all duration-200 ${
                                                statusOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-[.03rem] opacity-0"
                                            }`}
                                        >
                                            {(["Reviewed", "Screening", "Assessment", "Final interview"] as const).map((status) => {
                                                const isSelected = nextStatus === status;

                                                return (
                                                    <button
                                                        key={status}
                                                        type="button"
                                                        onClick={() => {
                                                            setNextStatus(status);
                                                            setStatusOpen(false);
                                                        }}
                                                        className={`flex w-full items-center gap-[.08rem] rounded-[.12rem] px-[.12rem] py-[.09rem] text-left text-[.14rem] transition ${
                                                            isSelected
                                                                ? "bg-[#f4f7ff] font-medium text-[#4254da]"
                                                                : "text-[#5d6b92] hover:bg-[#f8faff] hover:text-[#33436b]"
                                                        }`}
                                                    >
                                                        <span className="flex h-[.16rem] w-[.16rem] items-center justify-center">
                                                            {isSelected ? <Check className="h-[.14rem] w-[.14rem]" /> : null}
                                                        </span>
                                                        <span>{status}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="rounded-[.18rem] border border-[#e7ecf7] bg-white p-[.16rem]">
                            <h5 className="text-[.16rem] font-semibold text-[#2d395f]">Credentials</h5>
                            <div className="mt-[.12rem] space-y-[.08rem]">
                                {candidate.credentials.map((credential) => (
                                    <div
                                        key={credential}
                                        className="flex items-center justify-between gap-[.12rem] rounded-[.14rem] border border-[#eef2fa] bg-[#fbfcff] px-[.12rem] py-[.11rem]"
                                    >
                                        <div>
                                            <p className="text-[.135rem] font-medium text-[#31406c]">{credential}</p>
                                            <p className="mt-[.03rem] text-[.12rem] text-[#7a86a7]">Candidate-submitted file</p>
                                        </div>
                                        <button className="rounded-[.11rem] border border-[#dfe6fb] bg-white px-[.08rem] py-[.05rem] text-[.11rem] font-medium text-[#5365f6] transition hover:bg-[#f8faff]">
                                            View
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-[.08rem] border-t border-[#edf1f8] bg-[#fbfcff] px-[.2rem] py-[.16rem]">
                    <button
                        type="button"
                        onClick={() => {
                            onUpdateStatus(candidate.id, nextStatus);
                            onClose();
                        }}
                        className="inline-flex items-center rounded-[.14rem] bg-[linear-gradient(135deg,_#4f63f6_0%,_#6883ff_100%)] px-[.16rem] py-[.1rem] text-[.14rem] font-semibold text-white shadow-[0_.12rem_.24rem_rgba(79,99,246,0.22)] transition hover:brightness-105"
                    >
                        Save status
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center rounded-[.14rem] border border-[#dfe5f3] bg-white px-[.16rem] py-[.1rem] text-[.14rem] font-medium text-[#5f6d93] transition hover:bg-[#f7faff]"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function InfoRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between gap-[.12rem] rounded-[.14rem] border border-[#eef2fa] bg-[#fbfcff] px-[.12rem] py-[.1rem]">
            <span className="text-[.13rem] text-[#7c89ab]">{label}</span>
            <span className="text-right text-[.13rem] font-medium text-[#31406c]">{value}</span>
        </div>
    );
}

function MiniInfoCard({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-[.14rem] border border-[#eef2fa] bg-[#fbfcff] px-[.12rem] py-[.11rem]">
            <p className="text-[.11rem] font-semibold uppercase tracking-[0.12em] text-[#8a95b6]">{label}</p>
            <p className="mt-[.04rem] text-[.14rem] font-medium text-[#31406c]">{value}</p>
        </div>
    );
}
