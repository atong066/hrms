import { useMemo, useState } from "react";
import {
    BanknoteArrowDown,
    CalendarRange,
    CreditCard,
    Download,
    Landmark,
    ReceiptText,
    Search,
    ShieldCheck,
} from "lucide-react";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineFilterList } from "react-icons/md";
import { Main } from "../layout/main";
import { Dropdown } from "../utils/FilterDropdown";

const summaryCards = [
    {
        title: "Payroll released",
        value: "$842,500",
        detail: "Processed for the current payroll cycle",
        icon: BanknoteArrowDown,
        accent: "from-[#4f6bff] to-[#7388ff]",
        surface: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(115,136,255,0.03))]",
    },
    {
        title: "Pending approvals",
        value: "18",
        detail: "Records waiting for payroll review",
        icon: ReceiptText,
        accent: "from-[#f1aa28] to-[#f8c962]",
        surface: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(248,201,98,0.03))]",
    },
    {
        title: "Successful transfers",
        value: "96.8%",
        detail: "Bank payout accuracy this month",
        icon: ShieldCheck,
        accent: "from-[#18b397] to-[#4cd4b7]",
        surface: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(76,212,183,0.03))]",
    },
];

type PayrollRow = {
    id: number;
    name: string;
    email: string;
    department: string;
    month: string;
    paidOn: string;
    status: "Paid" | "Pending" | "Scheduled";
    netPay: string;
    method: string;
};

const payrollRows: PayrollRow[] = Array.from({ length: 42 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    email: `employee${i + 1}@company.com`,
    department: i % 4 === 0 ? "Finance" : i % 3 === 0 ? "People Ops" : i % 2 === 0 ? "Engineering" : "Design",
    month: i % 3 === 0 ? "February 2026" : "March 2026",
    paidOn: i % 5 === 0 ? "Apr 02, 2026" : i % 4 === 0 ? "Apr 01, 2026" : "Mar 29, 2026",
    status: i % 6 === 0 ? "Pending" : i % 5 === 0 ? "Scheduled" : "Paid",
    netPay: i % 4 === 0 ? "$7,500" : i % 3 === 0 ? "$6,900" : i % 2 === 0 ? "$8,200" : "$7,150",
    method: i % 3 === 0 ? "Bank transfer" : "Payroll wallet",
}));

export const PayrollOverview = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const totalPages = Math.max(1, Math.ceil(payrollRows.length / rowsPerPage));
    const indexLast = currentPage * rowsPerPage;
    const indexFirst = indexLast - rowsPerPage;
    const currentData = payrollRows.slice(indexFirst, indexLast);
    const visibleEnd = Math.min(indexLast, payrollRows.length);

    const statusCounts = useMemo(
        () => ({
            paid: payrollRows.filter((item) => item.status === "Paid").length,
            pending: payrollRows.filter((item) => item.status === "Pending").length,
            scheduled: payrollRows.filter((item) => item.status === "Scheduled").length,
        }),
        []
    );

    return (
        <Main>
            <section className="h-full overflow-auto bg-[linear-gradient(180deg,_#f8faff_0%,_#f5f7fb_100%)] p-[.28rem]">
                <div className="flex min-h-full flex-col gap-[.18rem]">
                    <div className="rounded-[.24rem] border border-[#e5e9f5] bg-[linear-gradient(135deg,_#ffffff_0%,_#f7f9ff_100%)] p-[.2rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex items-start justify-between gap-[.18rem]">
                            <div className="max-w-[6.2rem]">
                                <p className="text-[.14rem] font-medium uppercase tracking-[0.18em] text-[#6c78a6]">
                                    Payroll operations
                                </p>
                                <h2 className="mt-[.06rem] font-['Montserrat'] text-[.38rem] font-semibold leading-[1.08] text-[#232b57]">
                                    Salary releases, payout status, and payroll timing
                                </h2>
                                <p className="mt-[.08rem] text-[.16rem] leading-[1.6] text-[#6c7598]">
                                    Review payroll records, spot pending payouts, and monitor salary releases from one finance-ready surface.
                                </p>
                            </div>

                            <div className="flex items-center gap-[.1rem] rounded-[.18rem] border border-[#dfe5f5] bg-white px-[.14rem] py-[.12rem] shadow-[0_.06rem_.18rem_rgba(15,23,42,0.05)]">
                                <div className="flex h-[.42rem] w-[.42rem] items-center justify-center rounded-[.14rem] bg-[#eef2ff] text-[#5b6cff]">
                                    <CalendarRange className="h-[.18rem] w-[.18rem]" />
                                </div>
                                <div>
                                    <p className="text-[.11rem] font-semibold uppercase tracking-[0.16em] text-[#8b97b7]">
                                        Active cycle
                                    </p>
                                    <p className="mt-[.03rem] text-[.15rem] font-medium text-[#34426b]">March 2026</p>
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

                    <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex flex-wrap items-center gap-[.1rem] border-b border-[#edf1f8] px-[.18rem] py-[.14rem]">
                            <Dropdown
                                label="Department"
                                options={["Engineering", "People Ops", "Finance", "Design"]}
                                icon={<GoListUnordered />}
                            />
                            <Dropdown
                                label="Month"
                                options={["January 2026", "February 2026", "March 2026"]}
                                icon={<CalendarRange />}
                            />
                            <Dropdown
                                label="Status"
                                options={["Paid", "Pending", "Scheduled"]}
                                icon={<MdOutlineFilterList />}
                            />

                            <div className="ml-auto flex min-w-[3.3rem] items-center gap-[.1rem] rounded-[.14rem] border border-[#e2e8f4] bg-[#fbfcff] px-[.14rem] py-[.1rem] text-[#8d97b4]">
                                <Search className="h-[.16rem] w-[.16rem]" />
                                <input
                                    className="w-full bg-transparent text-[.14rem] text-slate-700 outline-none placeholder:text-[#98a1bc]"
                                    placeholder="Search employee, team, or payout"
                                />
                            </div>

                            <button className="inline-flex h-[.42rem] items-center gap-[.08rem] rounded-[.14rem] border border-[#e2e8f4] bg-white px-[.14rem] text-[.14rem] font-medium text-[#5c6b93] transition hover:bg-[#f8faff]">
                                <Download className="h-[.16rem] w-[.16rem]" />
                                <span>Export</span>
                            </button>
                        </div>

                        <div className="flex flex-col gap-[.12rem] p-[.18rem]">
                            <div className="flex flex-wrap items-center gap-[.08rem]">
                                <PayrollChip tone="good" label={`${statusCounts.paid} paid`} />
                                <PayrollChip tone="warning" label={`${statusCounts.pending} pending`} />
                                <PayrollChip tone="info" label={`${statusCounts.scheduled} scheduled`} />
                            </div>

                            <div className="overflow-hidden rounded-[.18rem] border border-[#edf1f8] bg-white">
                                <div className="max-h-[4.55rem] overflow-auto">
                                    <table className="w-full table-fixed text-left">
                                        <thead className="sticky top-0 z-10 bg-[#f8faff]">
                                            <tr className="border-b border-[#edf1f8] text-[.13rem] font-medium uppercase tracking-[0.08em] text-[#7c86a8]">
                                                <th className="w-[2.45rem] px-[.12rem] py-[.1rem]">Employee</th>
                                                <th className="w-[1.15rem] px-[.12rem] py-[.1rem]">Department</th>
                                                <th className="w-[1.1rem] px-[.12rem] py-[.1rem]">Month</th>
                                                <th className="w-[1.05rem] px-[.12rem] py-[.1rem]">Paid on</th>
                                                <th className="w-[1rem] px-[.12rem] py-[.1rem]">Method</th>
                                                <th className="w-[.95rem] px-[.12rem] py-[.1rem]">Status</th>
                                                <th className="w-[.95rem] px-[.12rem] py-[.1rem] text-right">Net pay</th>
                                                <th className="w-[.78rem] px-[.12rem] py-[.1rem] text-center">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {currentData.map((emp) => (
                                                <tr
                                                    key={emp.id}
                                                    className="border-b border-[#edf1f8] bg-white transition hover:bg-[#fbfcff] last:border-b-0"
                                                >
                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center gap-[.09rem]">
                                                            <img
                                                                src={`https://i.pravatar.cc/56?img=${emp.id}`}
                                                                className="h-[.42rem] w-[.42rem] rounded-full border border-[#dde3f5]"
                                                                alt={emp.name}
                                                            />
                                                            <div className="min-w-0 leading-[1.08]">
                                                                <div className="truncate text-[.145rem] font-semibold text-[#24305b]">
                                                                    {emp.name}
                                                                </div>
                                                                <div className="truncate text-[.12rem] text-[#7b86a8]">
                                                                    {emp.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center">
                                                            <span className="inline-flex rounded-full bg-[#eef3ff] px-[.09rem] py-[.04rem] text-[.12rem] font-medium text-[#5365f6]">
                                                                {emp.department}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">
                                                            {emp.month}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center text-[.13rem] text-[#556282]">
                                                            {emp.paidOn}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center gap-[.05rem] text-[.13rem] text-[#556282]">
                                                            {emp.method === "Bank transfer" ? (
                                                                <Landmark className="h-[.14rem] w-[.14rem] text-[#7d89ab]" />
                                                            ) : (
                                                                <CreditCard className="h-[.14rem] w-[.14rem] text-[#7d89ab]" />
                                                            )}
                                                            {emp.method}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center">
                                                            <StatusPill status={emp.status} />
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center justify-end text-right text-[.14rem] font-semibold text-[#24305b]">
                                                            {emp.netPay}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.12rem] py-[.08rem]">
                                                        <div className="flex min-h-[.44rem] items-center justify-center">
                                                            <ActionBtn>
                                                                <Download />
                                                            </ActionBtn>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-between border-t border-[#edf1f8] bg-[#fbfcff] px-[.14rem] py-[.1rem]">
                                    <div className="text-[.13rem] text-[#7b86a8]">
                                        {indexFirst + 1}-{visibleEnd} of {payrollRows.length}
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

function PayrollChip({
    label,
    tone,
}: {
    label: string;
    tone: "good" | "warning" | "info";
}) {
    const classes =
        tone === "good"
            ? "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]"
            : tone === "warning"
                ? "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]"
                : "border-[#d9e2ff] bg-[#f4f7ff] text-[#5365f6]";

    return (
        <span className={`inline-flex items-center rounded-full border px-[.1rem] py-[.05rem] text-[.12rem] font-medium ${classes}`}>
            {label}
        </span>
    );
}

function StatusPill({ status }: { status: PayrollRow["status"] }) {
    const classes =
        status === "Paid"
            ? "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]"
            : status === "Pending"
                ? "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]"
                : "border-[#d9e2ff] bg-[#f4f7ff] text-[#5365f6]";

    const dot = status === "Paid" ? "bg-[#22b07d]" : status === "Pending" ? "bg-[#f1aa28]" : "bg-[#5b6cff]";

    return (
        <span className={`inline-flex items-center gap-[.04rem] rounded-full border px-[.085rem] py-[.03rem] text-[.115rem] font-semibold leading-none ${classes}`}>
            <span className={`h-[.055rem] w-[.055rem] rounded-full ${dot}`} />
            {status}
        </span>
    );
}

function ActionBtn({ children }: { children: React.ReactNode }) {
    return (
        <button className="flex h-[.34rem] w-[.34rem] items-center justify-center rounded-[.1rem] bg-[#f3f6fc] text-[.15rem] text-[#5b678f] transition hover:bg-[#e7edf9]">
            {children}
        </button>
    );
}
