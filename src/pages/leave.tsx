import { useEffect, useMemo, useState } from "react";
import { Check, Download, ShieldCheck, X } from "lucide-react";
import { GrView } from "react-icons/gr";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineFilterList } from "react-icons/md";
import { Modal } from "../utils/modal";
import { DatePicker } from "../utils/date_picker";
import { Dropdown } from "../utils/FilterDropdown";
import { ModuleWorkspace } from "./module_workspace";

type LeaveStatus = "Pending" | "Approved" | "Review" | "Declined";
type LeaveType = "Vacation" | "Sick leave" | "Emergency" | "Bereavement" | "Parental";

type LeaveRequest = {
    id: number;
    employee: string;
    type: LeaveType;
    dates: string;
    balance: string;
    status: LeaveStatus;
    reason: string;
    approver: string;
    dateKey: string;
};

const dateOptions = [
    { key: "2026-04-03", label: "Apr 03 - Apr 05" },
    { key: "2026-04-04", label: "Apr 04" },
    { key: "2026-04-08", label: "Apr 08" },
    { key: "2026-04-09", label: "Apr 09" },
    { key: "2026-04-10", label: "Apr 10 - Apr 11" },
    { key: "2026-04-12", label: "Apr 12" },
    { key: "2026-04-14", label: "Apr 14" },
    { key: "2026-04-15", label: "Apr 15 - Apr 16" },
    { key: "2026-04-18", label: "Apr 18" },
    { key: "2026-04-21", label: "Apr 21 - Apr 22" },
];

const employees = [
    "Mika Santos",
    "Jules Tan",
    "Ana Cruz",
    "Paolo Reyes",
    "Lia Gomez",
    "Ben Cruz",
    "Nina Lee",
    "Kris Uy",
    "Gia Ramos",
    "Mila Torres",
];

const approvers = ["Lia Gomez", "People Ops", "HR Desk", "Paolo Reyes", "M. Rivera"];
const leaveTypes: LeaveType[] = ["Vacation", "Sick leave", "Emergency", "Bereavement", "Parental"];
const leaveStatuses: LeaveStatus[] = ["Pending", "Approved", "Review", "Declined"];
const reasons = [
    "Family commitment already scheduled weeks in advance.",
    "Medical rest advised after consultation.",
    "Urgent home matter requiring immediate travel.",
    "Dependent care and recovery support at home.",
    "Personal recharge break after project delivery.",
];

const initialRequests: LeaveRequest[] = Array.from({ length: 32 }, (_, index) => {
    const employee = employees[index % employees.length];
    const type = leaveTypes[index % leaveTypes.length];
    const status = leaveStatuses[index % leaveStatuses.length];
    const dateEntry = dateOptions[index % dateOptions.length];

    return {
        id: index + 1,
        employee,
        type,
        dates: dateEntry.label,
        balance: `${2 + (index % 10)} days`,
        status,
        reason: reasons[index % reasons.length],
        approver: approvers[index % approvers.length],
        dateKey: dateEntry.key,
    };
});

export const LeaveOverview = () => {
    const [requests, setRequests] = useState(initialRequests);
    const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
    const [toastMessage, setToastMessage] = useState("");
    const [toastTone, setToastTone] = useState<"success" | "danger">("success");
    const [statusFilter, setStatusFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        if (!toastMessage) return;

        const timeout = window.setTimeout(() => setToastMessage(""), 2400);
        return () => window.clearTimeout(timeout);
    }, [toastMessage]);

    const filteredRequests = useMemo(
        () =>
            requests.filter((request) => {
                if (statusFilter && request.status !== statusFilter) return false;
                if (typeFilter && request.type !== typeFilter) return false;
                if (dateFilter && request.dateKey !== dateFilter) return false;
                return true;
            }),
        [requests, statusFilter, typeFilter, dateFilter],
    );

    const totalPages = Math.max(1, Math.ceil(filteredRequests.length / rowsPerPage));
    const indexLast = currentPage * rowsPerPage;
    const indexFirst = indexLast - rowsPerPage;
    const paginatedRequests = filteredRequests.slice(indexFirst, indexLast);
    const visibleEnd = Math.min(indexLast, filteredRequests.length);

    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter, typeFilter, dateFilter]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const pendingCount = useMemo(
        () => filteredRequests.filter((request) => request.status === "Pending" || request.status === "Review").length,
        [filteredRequests],
    );

    const approvedToday = useMemo(
        () => filteredRequests.filter((request) => request.status === "Approved").length,
        [filteredRequests],
    );

    const rows = paginatedRequests.map((request) => ({
        employee: (
            <div className="flex items-center gap-[.08rem]">
                <div className="flex h-[.38rem] w-[.38rem] items-center justify-center rounded-full bg-[#eef2ff] text-[.13rem] font-semibold text-[#5365f6]">
                    {request.employee
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-[.145rem] font-semibold text-[#24305b]">{request.employee}</p>
                    <p className="truncate text-[.12rem] text-[#7c86a8]">{request.approver}</p>
                </div>
            </div>
        ),
        type: request.type,
        dates: request.dates,
        balance: request.balance,
        status: <LeaveStatusPill status={request.status} />,
        actions: (
            <button
                type="button"
                onClick={() => setSelectedRequest(request)}
                className="inline-flex h-[.34rem] items-center gap-[.06rem] rounded-[.11rem] border border-[#dfe5f5] bg-[#f8faff] px-[.11rem] text-[.13rem] font-medium text-[#52628d] transition hover:bg-[#edf2ff] hover:text-[#4454d8]"
            >
                <GrView className="text-[.14rem]" />
                <span>View</span>
            </button>
        ),
    }));

    const handleDecision = (nextStatus: "Approved" | "Declined") => {
        if (!selectedRequest) return;

        setRequests((current) =>
            current.map((request) =>
                request.id === selectedRequest.id ? { ...request, status: nextStatus } : request,
            ),
        );
        setToastTone(nextStatus === "Approved" ? "success" : "danger");
        setToastMessage(
            nextStatus === "Approved"
                ? `${selectedRequest.employee} leave request approved.`
                : `${selectedRequest.employee} leave request declined.`,
        );
        setSelectedRequest(null);
    };

    const handleExport = () => {
        const lines = [
            ["Employee", "Type", "Dates", "Balance", "Status", "Approver"].join(","),
            ...filteredRequests.map((request) =>
                [request.employee, request.type, request.dates, request.balance, request.status, request.approver].join(","),
            ),
        ];

        const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "leave-requests.csv";
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <>
            {toastMessage ? (
                <div className="pointer-events-none fixed right-[.28rem] top-[.28rem] z-[60]">
                    <div
                        className={`flex items-center gap-[.1rem] rounded-[.16rem] px-[.14rem] py-[.12rem] text-[.14rem] font-medium text-white shadow-[0_.16rem_.34rem_rgba(15,23,42,0.18)] ${
                            toastTone === "success" ? "bg-[#1f8c67]" : "bg-[#d84a61]"
                        }`}
                    >
                        <span className="flex h-[.24rem] w-[.24rem] items-center justify-center rounded-full bg-white/16 text-[.13rem]">
                            {toastTone === "success" ? (
                                <ShieldCheck className="h-[.14rem] w-[.14rem]" />
                            ) : (
                                <X className="h-[.14rem] w-[.14rem]" />
                            )}
                        </span>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            ) : null}

            <LeaveDecisionModal
                request={selectedRequest}
                open={Boolean(selectedRequest)}
                onClose={() => setSelectedRequest(null)}
                onApprove={() => handleDecision("Approved")}
                onDecline={() => handleDecision("Declined")}
            />

            <ModuleWorkspace
                eyebrow="Leave management"
                title="Requests, balances, and team leave visibility"
                description="Review filed requests, approve pending leave, and keep balance and calendar coverage aligned across teams."
                bannerVariant="compact"
                panelVariant="compact"
                stats={[
                    {
                        label: "Pending requests",
                        value: String(pendingCount).padStart(2, "0"),
                        detail: "Requests waiting for action in the current view",
                        accent: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(117,135,255,0.04))]",
                    },
                    {
                        label: "Approved today",
                        value: String(approvedToday).padStart(2, "0"),
                        detail: "Requests already cleared in this filtered queue",
                        accent: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(79,212,186,0.04))]",
                    },
                    {
                        label: "Queue volume",
                        value: String(filteredRequests.length).padStart(2, "0"),
                        detail: "Records shown after filters are applied",
                        accent: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(247,198,91,0.04))]",
                    },
                ]}
                primaryTitle="Leave actions"
                primaryDescription="The key tasks HR handles daily in the leave workspace."
                primaryItems={[
                    { label: "File leave request", value: "Open", tone: "border-[#d9e2ff] bg-[#f4f7ff] text-[#5365f6]" },
                    { label: "Approve / reject leave", value: `${pendingCount} waiting`, tone: "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]" },
                    { label: "Leave balances", value: "Synced", tone: "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]" },
                    { label: "Leave calendar", value: "Updated today" },
                ]}
                secondaryTitle="Coverage watch"
                secondaryDescription="Quick signals for who is off and how team staffing looks this week."
                secondaryItems={[
                    { label: "Engineering coverage", value: "Stable" },
                    { label: "People Ops approvals", value: "3 urgent", tone: "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]" },
                    { label: "Upcoming holidays", value: "2 this month" },
                    { label: "Anniversaries / birthdays", value: "6 upcoming" },
                ]}
                tableTitle="Leave request queue"
                tableDescription="Filter by approval status, date, or leave type, then review a request from the modal."
                tableToolbar={
                    <div className="flex flex-wrap items-center gap-[.1rem]">
                        <Dropdown
                            label="Approval status"
                            options={leaveStatuses}
                            value={statusFilter}
                            onChange={setStatusFilter}
                            icon={<MdOutlineFilterList />}
                        />
                        <Dropdown
                            label="Type"
                            options={leaveTypes}
                            value={typeFilter}
                            onChange={setTypeFilter}
                            icon={<GoListUnordered />}
                        />
                        <DatePicker
                            label="Date"
                            value={dateFilter}
                            onChange={setDateFilter}
                        />
                        <button
                            type="button"
                            onClick={handleExport}
                            className="ml-auto inline-flex h-[.42rem] items-center gap-[.08rem] rounded-[.14rem] border border-[#e2e8f4] bg-white px-[.14rem] text-[.14rem] font-medium text-[#5c6b93] transition hover:bg-[#f8faff]"
                        >
                            <Download className="h-[.16rem] w-[.16rem]" />
                            <span>Export</span>
                        </button>
                    </div>
                }
                columns={[
                    { key: "employee", label: "Employee", width: "1.85rem" },
                    { key: "type", label: "Type", width: "1.15rem" },
                    { key: "dates", label: "Dates", width: "1.35rem" },
                    { key: "balance", label: "Balance", width: "1rem" },
                    { key: "status", label: "Status", width: "1rem" },
                    { key: "actions", label: "Actions", width: "1rem", align: "right" },
                ]}
                rows={rows}
                tableFooter={
                    <div className="flex items-center justify-between px-[.14rem] py-[.1rem] text-[.13rem] text-[#7b86a8]">
                        <span>
                            {filteredRequests.length === 0 ? 0 : indexFirst + 1}-{visibleEnd} of {filteredRequests.length}
                        </span>

                        <div className="flex items-center gap-[.04rem]">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((page) => page - 1)}
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
                                        currentPage === index + 1
                                            ? "border-[#5b6cff] bg-[#5b6cff] text-white"
                                            : "border-[#dde4f5] bg-white text-[#5b678f] hover:bg-[#f8faff]"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((page) => page + 1)}
                                className="h-[.3rem] rounded-[.08rem] border border-[#dde4f5] px-[.1rem] text-[.13rem] text-[#5b678f] transition hover:bg-white disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                }
            />
        </>
    );
};

function LeaveStatusPill({ status }: { status: LeaveStatus }) {
    const classes =
        status === "Approved"
            ? "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]"
            : status === "Declined"
                ? "border-[#ffd8dd] bg-[#fff5f6] text-[#cc4a60]"
                : status === "Review"
                    ? "border-[#d9e2ff] bg-[#f4f7ff] text-[#5365f6]"
                    : "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]";

    return (
        <span className={`inline-flex rounded-full border px-[.085rem] py-[.03rem] text-[.115rem] font-semibold leading-none ${classes}`}>
            {status}
        </span>
    );
}

function LeaveDecisionModal({
    open,
    request,
    onClose,
    onApprove,
    onDecline,
}: {
    open: boolean;
    request: LeaveRequest | null;
    onClose: () => void;
    onApprove: () => void;
    onDecline: () => void;
}) {
    return (
        <Modal open={open}>
            <div className="relative flex w-[4.5rem] flex-col overflow-hidden rounded-[.24rem] border border-[#dfe5f5] bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] shadow-[0_.24rem_.58rem_rgba(15,23,42,0.16)]">
                <div className="flex items-start justify-between border-b border-[#edf1f8] px-[.2rem] py-[.18rem]">
                    <div>
                        <p className="text-[.11rem] font-semibold uppercase tracking-[0.16em] text-[#6e7bb2]">
                            Leave review
                        </p>
                        <h3 className="mt-[.06rem] font-['Montserrat'] text-[.24rem] font-semibold text-[#2e395f]">
                            Review request
                        </h3>
                    </div>

                    <button
                        onClick={onClose}
                        className="flex h-[.34rem] w-[.34rem] items-center justify-center rounded-full border border-[#e3e8f4] bg-white text-[#8b96b4] transition hover:bg-[#f8faff]"
                    >
                        <X className="h-[.16rem] w-[.16rem]" />
                    </button>
                </div>

                <div className="space-y-[.12rem] px-[.2rem] py-[.18rem]">
                    <div className="rounded-[.18rem] border border-[#edf1f8] bg-[#fbfcff] px-[.14rem] py-[.14rem]">
                        <div className="flex items-center justify-between gap-[.12rem]">
                            <div>
                                <p className="text-[.17rem] font-semibold text-[#31406c]">{request?.employee || "Employee"}</p>
                                <p className="mt-[.03rem] text-[.13rem] text-[#7b86a8]">{request?.type || "Leave type"}</p>
                            </div>
                            {request ? <LeaveStatusPill status={request.status} /> : null}
                        </div>
                    </div>

                    <div className="grid gap-[.08rem] sm:grid-cols-2">
                        <ReviewCell label="Dates" value={request?.dates || "-"} />
                        <ReviewCell label="Leave balance" value={request?.balance || "-"} />
                        <ReviewCell label="Approver" value={request?.approver || "-"} />
                        <ReviewCell label="Queue state" value={request?.status || "-"} />
                    </div>

                    <div className="rounded-[.16rem] border border-[#edf1f8] bg-white px-[.14rem] py-[.12rem]">
                        <p className="text-[.12rem] uppercase tracking-[0.12em] text-[#8a96b5]">Reason</p>
                        <p className="mt-[.06rem] text-[.145rem] leading-[1.65] text-[#5d6888]">
                            {request?.reason || "No leave reason provided."}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-[.1rem] border-t border-[#edf1f8] bg-[#fbfcff] px-[.2rem] py-[.16rem]">
                    <button
                        onClick={onDecline}
                        className="inline-flex items-center rounded-[.14rem] bg-[linear-gradient(135deg,_#ef6b7f_0%,_#d84a61_100%)] px-[.16rem] py-[.1rem] text-[.14rem] font-medium text-white shadow-[0_.12rem_.24rem_rgba(216,74,97,0.22)] transition hover:brightness-105"
                    >
                        Decline
                    </button>
                    <button
                        onClick={onApprove}
                        className="inline-flex items-center gap-[.06rem] rounded-[.14rem] bg-[linear-gradient(135deg,_#22a06b_0%,_#1b8d5e_100%)] px-[.16rem] py-[.1rem] text-[.14rem] font-medium text-white shadow-[0_.12rem_.24rem_rgba(27,141,94,0.22)] transition hover:brightness-105"
                    >
                        <Check className="h-[.15rem] w-[.15rem]" />
                        <span>Accept</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function ReviewCell({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-[.16rem] border border-[#edf1f8] bg-white px-[.14rem] py-[.12rem]">
            <p className="text-[.12rem] uppercase tracking-[0.12em] text-[#8a96b5]">{label}</p>
            <p className="mt-[.05rem] text-[.145rem] font-medium text-[#31406c]">{value}</p>
        </div>
    );
}
