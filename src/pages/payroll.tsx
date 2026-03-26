import { useEffect, useMemo, useState } from "react";
import {
    BanknoteArrowDown,
    CalendarRange,
    CreditCard,
    Download,
    Eye,
    Landmark,
    ReceiptText,
    Search,
    ShieldCheck,
} from "lucide-react";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineFilterList } from "react-icons/md";
import { Main } from "../layout/main";
import { Dropdown } from "../utils/FilterDropdown";
import { Modal } from "../utils/modal";

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

type PayrollHistoryEntry = {
    cycle: string;
    paidOn: string;
    grossPay: string;
    deductions: string;
    netPay: string;
    status: PayrollRow["status"];
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

const buildPayrollHistory = (employee: PayrollRow): PayrollHistoryEntry[] => {
    const cycles = ["March 2026", "February 2026", "January 2026", "December 2025", "November 2025"];

    return cycles.map((cycle, index) => {
        const status =
            index === 0
                ? employee.status
                : (["Paid", "Paid", "Paid", "Scheduled", "Pending"][index] as PayrollRow["status"]);

        const method = index === 0 ? employee.method : index % 2 === 0 ? "Bank transfer" : "Payroll wallet";
        const netBase = Number(employee.netPay.replace(/[$,]/g, "")) || 0;
        const netPay = `$${(netBase - index * 120).toLocaleString()}`;
        const grossPay = `$${(netBase + 850 - index * 120).toLocaleString()}`;
        const deductions = `$${(850).toLocaleString()}`;
        const paidOn =
            status === "Scheduled" ? "Apr 05, 2026" : status === "Pending" ? "Awaiting release" : index === 0 ? employee.paidOn : `0${index + 1} Feb 2026`;

        return {
            cycle,
            paidOn,
            grossPay,
            deductions,
            netPay,
            status,
            method,
        };
    });
};

export const PayrollOverview = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPayroll, setSelectedPayroll] = useState<PayrollRow | null>(null);
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
                    <div className="rounded-[.22rem] border border-[#e5e9f5] bg-[linear-gradient(135deg,_#ffffff_0%,_#f8faff_100%)] p-[.18rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex flex-wrap items-start justify-between gap-[.14rem]">
                            <div className="max-w-[5.6rem]">
                                <p className="text-[.12rem] font-semibold uppercase tracking-[0.18em] text-[#6c78a6]">
                                    Payroll operations
                                </p>
                                <h2 className="mt-[.04rem] font-['Montserrat'] text-[.28rem] font-semibold leading-[1.06] text-[#232b57]">
                                    Salary releases and payout control
                                </h2>
                                <p className="mt-[.05rem] max-w-[5rem] text-[.14rem] leading-[1.55] text-[#6c7598]">
                                    Review releases, pending approvals, and payout timing from one finance-ready workspace.
                                </p>
                            </div>

                            <div className="flex items-center gap-[.1rem] rounded-[.16rem] border border-[#dfe5f5] bg-white px-[.12rem] py-[.1rem] shadow-[0_.05rem_.16rem_rgba(15,23,42,0.05)]">
                                <div className="flex h-[.38rem] w-[.38rem] items-center justify-center rounded-[.12rem] bg-[#eef2ff] text-[#5b6cff]">
                                    <CalendarRange className="h-[.16rem] w-[.16rem]" />
                                </div>
                                <div>
                                    <p className="text-[.11rem] font-semibold uppercase tracking-[0.16em] text-[#8b97b7]">
                                        Active cycle
                                    </p>
                                    <p className="mt-[.02rem] text-[.14rem] font-medium text-[#34426b]">March 2026</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-[.14rem] grid gap-[.1rem] xl:grid-cols-3">
                            {summaryCards.map((card) => {
                                const Icon = card.icon;

                                return (
                                    <div
                                        key={card.title}
                                        className={`rounded-[.16rem] border border-[#e7ebf6] p-[.13rem] ${card.surface}`}
                                    >
                                        <div className="flex items-start justify-between gap-[.1rem]">
                                            <div>
                                                <p className="text-[.13rem] font-medium text-[#6c7598]">{card.title}</p>
                                                <p className="mt-[.04rem] font-['Montserrat'] text-[.28rem] font-semibold text-[#232b57]">
                                                    {card.value}
                                                </p>
                                            </div>
                                            <div className={`flex h-[.4rem] w-[.4rem] items-center justify-center rounded-[.12rem] bg-gradient-to-br ${card.accent} text-white shadow-[0_.08rem_.18rem_rgba(59,91,219,0.18)]`}>
                                                <Icon className="h-[.18rem] w-[.18rem]" />
                                            </div>
                                        </div>
                                        <p className="mt-[.05rem] text-[.12rem] text-[#7280a7]">{card.detail}</p>
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
                                                <th className="w-[1rem] px-[.12rem] py-[.1rem] text-center">Action</th>
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
                                                        <div className="flex min-h-[.44rem] items-center justify-center gap-[.05rem]">
                                                            <ActionBtn onClick={() => setSelectedPayroll(emp)}>
                                                                <Eye />
                                                            </ActionBtn>
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
            <PayrollHistoryModal employee={selectedPayroll} onClose={() => setSelectedPayroll(null)} />
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

function ActionBtn({
    children,
    onClick,
}: {
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex h-[.34rem] w-[.34rem] items-center justify-center rounded-[.1rem] bg-[#f3f6fc] text-[.15rem] text-[#5b678f] transition hover:bg-[#e7edf9]"
        >
            {children}
        </button>
    );
}

function PayrollHistoryModal({
    employee,
    onClose,
}: {
    employee: PayrollRow | null;
    onClose: () => void;
}) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [employee]);

    if (!employee) return null;

    const history = buildPayrollHistory(employee);
    const rowsPerPage = 3;
    const totalPages = Math.max(1, Math.ceil(history.length / rowsPerPage));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedHistory = history.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);
    const pageStart = history.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
    const pageEnd = Math.min(safePage * rowsPerPage, history.length);
    const paidCount = history.filter((entry) => entry.status === "Paid").length;
    const pendingCount = history.filter((entry) => entry.status === "Pending").length;
    const scheduledCount = history.filter((entry) => entry.status === "Scheduled").length;

    const exportHistory = () => {
        const lines = [
            ["Cycle", "Paid on", "Gross", "Deductions", "Net pay", "Method", "Status"].join(","),
            ...history.map((entry) =>
                [entry.cycle, entry.paidOn, entry.grossPay, entry.deductions, entry.netPay, entry.method, entry.status].join(","),
            ),
        ];

        const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${employee.name.toLowerCase().replace(/\s+/g, "-")}-payroll-history.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Modal open={Boolean(employee)}>
            <div className="w-[7rem] overflow-hidden rounded-[.2rem] border border-[#dce3f3] bg-white shadow-[0_.24rem_.6rem_rgba(15,23,42,0.16)]">
                <div className="border-b border-[#edf1f8] px-[.2rem] py-[.16rem]">
                    <div className="flex items-start justify-between gap-[.14rem]">
                        <div className="flex items-center gap-[.12rem]">
                            <img
                                src={`https://i.pravatar.cc/72?img=${employee.id}`}
                                alt={employee.name}
                                className="h-[.52rem] w-[.52rem] rounded-full border border-[#dde3f5]"
                            />
                            <div>
                                <p className="text-[.11rem] font-semibold uppercase tracking-[0.16em] text-[#8a95b6]">
                                    Payroll history
                                </p>
                                <h3 className="mt-[.04rem] font-['Montserrat'] text-[.24rem] font-semibold text-[#24305b]">
                                    {employee.name}
                                </h3>
                                <p className="mt-[.03rem] text-[.13rem] text-[#6f7d9e]">
                                    {employee.email} · {employee.department} · {employee.method}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-[.08rem]">
                            <button
                                type="button"
                                onClick={exportHistory}
                                className="inline-flex items-center gap-[.06rem] rounded-[.12rem] border border-[#dfe5f3] bg-white px-[.12rem] py-[.08rem] text-[.13rem] font-medium text-[#5f6d93] transition hover:bg-[#f7faff]"
                            >
                                <Download className="h-[.14rem] w-[.14rem]" />
                                <span>Export</span>
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex items-center rounded-[.12rem] border border-[#dfe5f3] bg-white px-[.12rem] py-[.08rem] text-[.13rem] font-medium text-[#5f6d93] transition hover:bg-[#f7faff]"
                            >
                                Close
                            </button>
                        </div>
                    </div>

                    <div className="mt-[.14rem] grid gap-[.1rem] md:grid-cols-3">
                        <PayrollHistoryCard label="Paid cycles" value={`${paidCount}`} tone="good" />
                        <PayrollHistoryCard label="Pending" value={`${pendingCount}`} tone="warning" />
                        <PayrollHistoryCard label="Scheduled" value={`${scheduledCount}`} tone="info" />
                    </div>
                </div>

                <div className="max-h-[4.4rem] overflow-auto p-[.2rem]">
                    <div className="rounded-[.18rem] border border-[#edf1f8] bg-white">
                        <div className="border-b border-[#edf1f8] bg-[#f8faff] px-[.14rem] py-[.1rem]">
                            <p className="text-[.13rem] font-semibold uppercase tracking-[0.08em] text-[#7c86a8]">
                                Payout log
                            </p>
                        </div>

                        <div className="overflow-auto">
                            <table className="w-full table-fixed text-left">
                                <thead className="border-b border-[#edf1f8] text-[.12rem] font-medium uppercase tracking-[0.08em] text-[#7c86a8]">
                                    <tr>
                                        <th className="w-[1.2rem] px-[.12rem] py-[.09rem]">Cycle</th>
                                        <th className="w-[1.05rem] px-[.12rem] py-[.09rem]">Paid on</th>
                                        <th className="w-[.95rem] px-[.12rem] py-[.09rem]">Gross</th>
                                        <th className="w-[.95rem] px-[.12rem] py-[.09rem]">Deductions</th>
                                        <th className="w-[.95rem] px-[.12rem] py-[.09rem]">Net pay</th>
                                        <th className="w-[.9rem] px-[.12rem] py-[.09rem]">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedHistory.map((entry) => (
                                        <tr key={`${employee.id}-${entry.cycle}`} className="border-b border-[#edf1f8] last:border-b-0">
                                            <td className="px-[.12rem] py-[.09rem]"><div className="flex text-[.13rem] font-medium text-[#31406c]">{entry.cycle}</div></td>
                                            <td className="px-[.12rem] py-[.09rem]"><div className="flex text-[.13rem] text-[#556282]">{entry.paidOn}</div></td>
                                            <td className="px-[.12rem] py-[.09rem]"><div className="flex text-[.13rem] text-[#556282]">{entry.grossPay}</div></td>
                                            <td className="px-[.12rem] py-[.09rem]"><div className="flex text-[.13rem] text-[#556282]">{entry.deductions}</div></td>
                                            <td className="px-[.12rem] py-[.09rem]"><div className="flex text-[.13rem] font-semibold text-[#24305b]">{entry.netPay}</div></td>
                                            <td className="px-[.12rem] py-[.09rem]"><div className="flex"><StatusPill status={entry.status} /></div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#edf1f8] bg-[#fbfcff] px-[.14rem] py-[.1rem]">
                            <div className="text-[.13rem] text-[#7b86a8]">
                                {history.length === 0 ? "0-0" : `${pageStart}-${pageEnd}`} of {history.length}
                            </div>

                            <div className="flex items-center gap-[.04rem]">
                                <button
                                    type="button"
                                    disabled={safePage === 1}
                                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                    className="h-[.3rem] rounded-[.08rem] border border-[#dde4f5] px-[.1rem] text-[.13rem] text-[#5b678f] transition hover:bg-white disabled:opacity-40"
                                >
                                    Prev
                                </button>

                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`h-[.3rem] min-w-[.3rem] rounded-[.08rem] border px-[.08rem] text-[.13rem] transition ${
                                            safePage === index + 1
                                                ? "border-[#5b6cff] bg-[#5b6cff] text-white"
                                                : "border-[#dde4f5] bg-white text-[#5b678f] hover:bg-[#f8faff]"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    disabled={safePage === totalPages}
                                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                                    className="h-[.3rem] rounded-[.08rem] border border-[#dde4f5] px-[.1rem] text-[.13rem] text-[#5b678f] transition hover:bg-white disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

function PayrollHistoryCard({
    label,
    value,
    tone,
}: {
    label: string;
    value: string;
    tone: "good" | "warning" | "info";
}) {
    const classes =
        tone === "good"
            ? "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]"
            : tone === "warning"
                ? "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]"
                : "border-[#d9e2ff] bg-[#f4f7ff] text-[#5365f6]";

    return (
        <div className={`rounded-[.16rem] border px-[.14rem] py-[.12rem] ${classes}`}>
            <p className="text-[.11rem] font-semibold uppercase tracking-[0.14em] opacity-80">{label}</p>
            <p className="mt-[.04rem] text-[.24rem] font-semibold leading-none">{value}</p>
        </div>
    );
}
