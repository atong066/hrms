import { useState } from "react";
import {
    CalendarClock,
    Clock3,
    CreditCard,
    Download,
    FileText,
    MapPin,
    Phone,
    ShieldCheck,
    UserCircle2,
    X,
} from "lucide-react";
import { Modal } from "../utils/modal";

const employee = {
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Senior Product Designer",
    department: "Design",
    id: "EMP001",
    status: "Active",
    joined: "March 14, 2023",
    phone: "+63 912 345 6789",
    location: "Quezon City, Philippines",
    salary: "$88,000",
    bank: "UnionBank",
    account: "**** 4821",
};

const attendanceRows = [
    { date: "Mar 21, 2026", status: "Present", checkIn: "09:03 AM", checkOut: "06:02 PM", hours: "8h 59m" },
    { date: "Mar 20, 2026", status: "Remote", checkIn: "08:56 AM", checkOut: "05:48 PM", hours: "8h 52m" },
    { date: "Mar 19, 2026", status: "Present", checkIn: "09:07 AM", checkOut: "06:01 PM", hours: "8h 54m" },
    { date: "Mar 18, 2026", status: "Leave", checkIn: "-", checkOut: "-", hours: "0h" },
];

const payrollRows = [
    { month: "March 2026", gross: "$7,333", deductions: "$420", bonus: "$350", net: "$7,263", status: "Paid" },
    { month: "February 2026", gross: "$7,333", deductions: "$400", bonus: "$0", net: "$6,933", status: "Paid" },
    { month: "January 2026", gross: "$7,333", deductions: "$415", bonus: "$180", net: "$7,098", status: "Paid" },
];

const files = [
    { name: "Signed employment contract.pdf", type: "Contract", updated: "Updated 2 weeks ago" },
    { name: "Government IDs.zip", type: "Verification", updated: "Updated 1 month ago" },
    { name: "Payroll account form.pdf", type: "Payroll", updated: "Updated 1 month ago" },
];

const tabs = [
    { id: "profile", label: "Profile" },
    { id: "attendance", label: "Attendance" },
    { id: "payroll", label: "Payroll" },
    { id: "files", label: "Files" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export const EmployeeModal = ({
    status,
    open,
}: {
    status: boolean;
    open: (open: boolean) => void;
}) => {
    const [tab, setTab] = useState<TabId>("profile");

    return (
        <Modal open={status}>
            <div className="relative flex h-[6.7rem] w-[6.7rem] flex-col overflow-hidden rounded-[.26rem] border border-[#dfe5f5] bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] shadow-[0_.28rem_.72rem_rgba(15,23,42,0.18)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(91,108,255,0.09),_transparent_20%),radial-gradient(circle_at_bottom_left,_rgba(76,212,183,0.07),_transparent_22%)]" />

                <div className="relative border-b border-[#edf1f8] px-[.22rem] py-[.18rem]">
                    <div className="flex items-start justify-between gap-[.16rem]">
                        <div className="flex items-center gap-[.14rem]">
                            <img
                                src="https://i.pravatar.cc/120?img=1"
                                className="h-[.82rem] w-[.82rem] rounded-[.24rem] border border-[#dfe5f5] object-cover shadow-[0_.08rem_.2rem_rgba(15,23,42,0.08)]"
                                alt={employee.name}
                            />

                            <div>
                                <p className="text-[.11rem] font-semibold uppercase tracking-[0.18em] text-[#8a95b6]">
                                    Employee record
                                </p>
                                <h2 className="mt-[.05rem] font-['Montserrat'] text-[.3rem] font-semibold leading-[1.08] text-[#253158]">
                                    {employee.name}
                                </h2>
                                <p className="mt-[.04rem] text-[.14rem] text-[#667392]">{employee.email}</p>

                                <div className="mt-[.08rem] flex items-center gap-[.08rem]">
                                    <span className="inline-flex items-center gap-[.04rem] rounded-full border border-[#cfeee0] bg-[#f2fdf7] px-[.09rem] py-[.04rem] text-[.115rem] font-semibold text-[#148a68]">
                                        <span className="h-[.055rem] w-[.055rem] rounded-full bg-[#22b07d]" />
                                        {employee.status}
                                    </span>
                                    <span className="text-[.13rem] text-[#7a86a7]">
                                        {employee.role} · {employee.department}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => open(false)}
                            className="flex h-[.36rem] w-[.36rem] items-center justify-center rounded-full border border-[#e1e7f4] bg-white text-[#7e8bad] transition hover:border-[#cfdaef] hover:bg-[#f8faff] hover:text-[#4f5d86]"
                        >
                            <X className="h-[.18rem] w-[.18rem]" />
                        </button>
                    </div>

                    <div className="mt-[.16rem] flex items-center gap-[.08rem]">
                        {tabs.map((item) => (
                            <button
                                key={item.id}
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

                <div className="relative flex-1 overflow-auto px-[.22rem] py-[.18rem]">
                    {tab === "profile" && <ProfileTab />}
                    {tab === "attendance" && <AttendanceTab />}
                    {tab === "payroll" && <PayrollTab />}
                    {tab === "files" && <FilesTab />}
                </div>

                <div className="relative flex items-center justify-between border-t border-[#edf1f8] bg-[#fbfcff] px-[.22rem] py-[.16rem]">
                    <div className="text-[.13rem] text-[#7a86a7]">
                        Employee details are synced across attendance, payroll, and team records.
                    </div>

                    <button
                        onClick={() => open(false)}
                        className="inline-flex items-center rounded-[.14rem] border border-[#dfe5f3] bg-white px-[.16rem] py-[.1rem] text-[.14rem] font-medium text-[#5f6d93] transition hover:bg-[#f7faff]"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

function ProfileTab() {
    return (
        <div className="grid gap-[.14rem]">
            <div className="grid gap-[.12rem] lg:grid-cols-2">
                <InfoPanel
                    title="Employee details"
                    items={[
                        { label: "Employee ID", value: employee.id, icon: <UserCircle2 className="h-[.15rem] w-[.15rem]" /> },
                        { label: "Department", value: employee.department, icon: <ShieldCheck className="h-[.15rem] w-[.15rem]" /> },
                        { label: "Date joined", value: employee.joined, icon: <CalendarClock className="h-[.15rem] w-[.15rem]" /> },
                        { label: "Phone", value: employee.phone, icon: <Phone className="h-[.15rem] w-[.15rem]" /> },
                        { label: "Location", value: employee.location, icon: <MapPin className="h-[.15rem] w-[.15rem]" /> },
                    ]}
                />

                <InfoPanel
                    title="Payroll snapshot"
                    items={[
                        { label: "Base salary", value: employee.salary, icon: <CreditCard className="h-[.15rem] w-[.15rem]" /> },
                        { label: "Bank", value: employee.bank, icon: <ShieldCheck className="h-[.15rem] w-[.15rem]" /> },
                        { label: "Account", value: employee.account, icon: <FileText className="h-[.15rem] w-[.15rem]" /> },
                        { label: "Employment status", value: employee.status, icon: <Clock3 className="h-[.15rem] w-[.15rem]" /> },
                    ]}
                />
            </div>

            <div className="rounded-[.18rem] border border-[#e7ecf7] bg-white p-[.16rem]">
                <div className="flex items-center justify-between">
                    <h3 className="text-[.16rem] font-semibold text-[#2d395f]">Recent activity</h3>
                    <span className="text-[.12rem] text-[#7f8cad]">Last 7 days</span>
                </div>

                <div className="mt-[.12rem] space-y-[.08rem]">
                    {[
                        ["Profile updated", "Contact details were edited", "Today, 10:24 AM"],
                        ["Attendance approved", "Timesheet approved by People Ops", "Yesterday, 5:18 PM"],
                        ["Payroll released", "March payroll record marked paid", "Mar 21, 2026"],
                    ].map(([title, detail, time]) => (
                        <div
                            key={title}
                            className="flex items-start justify-between gap-[.14rem] rounded-[.14rem] border border-[#eef2fa] bg-[#fbfcff] px-[.12rem] py-[.11rem]"
                        >
                            <div>
                                <p className="text-[.14rem] font-medium text-[#31406c]">{title}</p>
                                <p className="mt-[.03rem] text-[.125rem] text-[#7683a6]">{detail}</p>
                            </div>
                            <span className="whitespace-nowrap text-[.12rem] text-[#8b97b7]">{time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function AttendanceTab() {
    return (
        <Panel title="Attendance log" subtitle="Latest check-ins and recorded work hours.">
            <DataTable
                headers={["Date", "Status", "Check-in", "Check-out", "Hours"]}
                rows={attendanceRows.map((row) => [
                    row.date,
                    <StatusText key={`${row.date}-status`} tone={row.status === "Leave" ? "muted" : "good"}>
                        {row.status}
                    </StatusText>,
                    row.checkIn,
                    row.checkOut,
                    row.hours,
                ])}
            />
        </Panel>
    );
}

function PayrollTab() {
    return (
        <div className="grid gap-[.14rem]">
            <div className="grid gap-[.12rem] sm:grid-cols-3">
                <MiniStat label="Monthly gross" value="$7,333" />
                <MiniStat label="Latest net pay" value="$7,263" />
                <MiniStat label="Payroll status" value="Paid" accent />
            </div>

            <Panel title="Payroll history" subtitle="Recent salary records and payment status.">
                <DataTable
                    headers={["Month", "Gross", "Deductions", "Bonus", "Net", "Status"]}
                    rows={payrollRows.map((row) => [
                        row.month,
                        row.gross,
                        row.deductions,
                        row.bonus,
                        row.net,
                        <StatusText key={`${row.month}-status`} tone="good">
                            {row.status}
                        </StatusText>,
                    ])}
                />
            </Panel>
        </div>
    );
}

function FilesTab() {
    return (
        <Panel title="Employee files" subtitle="Documents available on this employee record.">
            <div className="space-y-[.08rem]">
                {files.map((file) => (
                    <div
                        key={file.name}
                        className="flex items-center justify-between gap-[.12rem] rounded-[.16rem] border border-[#eef2fa] bg-[#fbfcff] px-[.14rem] py-[.12rem]"
                    >
                        <div className="flex items-center gap-[.1rem]">
                            <div className="flex h-[.38rem] w-[.38rem] items-center justify-center rounded-[.12rem] bg-[#eef2ff] text-[#5b6cff]">
                                <FileText className="h-[.18rem] w-[.18rem]" />
                            </div>
                            <div>
                                <p className="text-[.14rem] font-medium text-[#31406c]">{file.name}</p>
                                <p className="mt-[.03rem] text-[.12rem] text-[#7a86a7]">
                                    {file.type} · {file.updated}
                                </p>
                            </div>
                        </div>

                        <button className="inline-flex items-center gap-[.06rem] rounded-[.12rem] border border-[#dfe5f3] bg-white px-[.12rem] py-[.08rem] text-[.13rem] font-medium text-[#5f6d93] transition hover:bg-[#f7faff]">
                            <Download className="h-[.14rem] w-[.14rem]" />
                            <span>Download</span>
                        </button>
                    </div>
                ))}
            </div>
        </Panel>
    );
}

function Panel({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-[.18rem] border border-[#e7ecf7] bg-white p-[.16rem]">
            <div className="flex items-end justify-between gap-[.12rem]">
                <div>
                    <h3 className="text-[.16rem] font-semibold text-[#2d395f]">{title}</h3>
                    {subtitle ? <p className="mt-[.03rem] text-[.125rem] text-[#7c89ab]">{subtitle}</p> : null}
                </div>
            </div>

            <div className="mt-[.12rem]">{children}</div>
        </div>
    );
}

function InfoPanel({
    title,
    items,
}: {
    title: string;
    items: { label: string; value: string; icon: React.ReactNode }[];
}) {
    return (
        <div className="rounded-[.18rem] border border-[#e7ecf7] bg-white p-[.16rem]">
            <h3 className="text-[.16rem] font-semibold text-[#2d395f]">{title}</h3>
            <div className="mt-[.12rem] space-y-[.08rem]">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center justify-between gap-[.12rem] rounded-[.14rem] border border-[#eef2fa] bg-[#fbfcff] px-[.12rem] py-[.1rem]"
                    >
                        <div className="flex items-center gap-[.08rem] text-[#7c89ab]">
                            {item.icon}
                            <span className="text-[.13rem]">{item.label}</span>
                        </div>
                        <span className="text-right text-[.13rem] font-medium text-[#31406c]">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DataTable({
    headers,
    rows,
}: {
    headers: string[];
    rows: React.ReactNode[][];
}) {
    return (
        <div className="overflow-hidden rounded-[.16rem] border border-[#eef2fa]">
            <table className="w-full text-left">
                <thead className="bg-[#f8faff]">
                    <tr className="text-[.12rem] uppercase tracking-[0.08em] text-[#7c86a8]">
                        {headers.map((header) => (
                            <th key={header} className="px-[.12rem] py-[.1rem] font-medium">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index} className="border-t border-[#eef2fa] text-[.13rem] text-[#4d5b83]">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-[.12rem] py-[.11rem]">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function MiniStat({
    label,
    value,
    accent,
}: {
    label: string;
    value: string;
    accent?: boolean;
}) {
    return (
        <div className="rounded-[.16rem] border border-[#e7ecf7] bg-white p-[.14rem]">
            <p className="text-[.12rem] uppercase tracking-[0.08em] text-[#8a95b6]">{label}</p>
            <p className={`mt-[.06rem] text-[.22rem] font-semibold ${accent ? "text-[#5365f6]" : "text-[#2d395f]"}`}>
                {value}
            </p>
        </div>
    );
}

function StatusText({
    children,
    tone,
}: {
    children: React.ReactNode;
    tone: "good" | "muted";
}) {
    return (
        <span className={tone === "good" ? "font-medium text-[#148a68]" : "font-medium text-[#8a95b6]"}>
            {children}
        </span>
    );
}
