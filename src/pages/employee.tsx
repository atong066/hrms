import { useEffect, useRef, useState } from "react";
import { ArrowRight, BriefcaseBusiness, Check, ChevronDown, Download, Search, ShieldCheck, UserPlus, Users2, X } from "lucide-react";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineAutoDelete, MdOutlineFilterList } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { Main } from "../layout/main";
import { AddEmployeeModal } from "../modals/add_employee";
import { EmployeeModal } from "../modals/view_employee";
import { Dropdown } from "../utils/FilterDropdown";
import { Modal } from "../utils/modal";

const summaryCards = [
    {
        title: "Total headcount",
        value: "1,250",
        detail: "+32 hires this quarter",
        icon: Users2,
        accent: "from-[#4f6bff] to-[#7388ff]",
        surface: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(115,136,255,0.03))]",
    },
    {
        title: "Active employees",
        value: "1,187",
        detail: "94.9% currently active",
        icon: ShieldCheck,
        accent: "from-[#18b397] to-[#4cd4b7]",
        surface: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(76,212,183,0.03))]",
    },
    {
        title: "Open positions",
        value: "18",
        detail: "6 roles in final review",
        icon: BriefcaseBusiness,
        accent: "from-[#f1aa28] to-[#f8c962]",
        surface: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(248,201,98,0.03))]",
    },
];

type EmployeeRow = {
    id: number;
    name: string;
    email: string;
    department: string;
    role: string;
    status: string;
    lastLogin: string;
    salary: string;
};

export const EmployeeOverview = () => {
    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openExport, setOpenExport] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<EmployeeRow | null>(null);
    const [archiveTarget, setArchiveTarget] = useState<EmployeeRow | null>(null);
    const [archivedIds, setArchivedIds] = useState<number[]>([]);
    const [toastMessage, setToastMessage] = useState("");
    const [selected, setSelected] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [exportScope, setExportScope] = useState<"all" | "current" | "selected">("all");
    const [exportDepartment, setExportDepartment] = useState("");
    const [exportStatus, setExportStatus] = useState("");

    const checkboxRef = useRef<HTMLInputElement>(null);

    const employees: EmployeeRow[] = Array.from({ length: 57 }, (_, i) => ({
        id: i + 1,
        name: `Employee ${i + 1}`,
        email: `employee${i + 1}@company.com`,
        department:
            i % 4 === 0 ? "Finance" : i % 3 === 0 ? "People Ops" : i % 2 === 0 ? "Engineering" : "Design",
        role:
            i % 4 === 0
                ? "Financial Analyst"
                : i % 3 === 0
                    ? "HR Coordinator"
                    : i % 2 === 0
                        ? "Software Engineer"
                        : "Product Designer",
        status: i % 7 === 0 ? "Inactive" : "Active",
        lastLogin: i % 5 === 0 ? "1 day ago" : i % 4 === 0 ? "Yesterday" : "2 hours ago",
        salary: i % 4 === 0 ? "$98,000" : i % 3 === 0 ? "$74,000" : i % 2 === 0 ? "$120,000" : "$88,000",
    }));

    const visibleEmployees = employees.filter((employee) => !archivedIds.includes(employee.id));
    const indexLast = currentPage * rowsPerPage;
    const indexFirst = indexLast - rowsPerPage;
    const currentEmployees = visibleEmployees.slice(indexFirst, indexLast);
    const totalPages = Math.max(1, Math.ceil(visibleEmployees.length / rowsPerPage));
    const visibleEnd = Math.min(indexLast, visibleEmployees.length);

    const toggleSelect = (id: number) => {
        setSelected((prev) => (prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]));
    };

    const toggleSelectAll = () => {
        const pageIds = currentEmployees.map((employee) => employee.id);
        const allSelected = pageIds.every((id) => selected.includes(id));

        if (allSelected) {
            setSelected((prev) => prev.filter((id) => !pageIds.includes(id)));
        } else {
            setSelected((prev) => [...new Set([...prev, ...pageIds])]);
        }
    };

    const clearAll = () => setSelected([]);

    const handleAddEmployee = () => {
        setEditingEmployee(null);
        setOpen(true);
    };

    const handleEditEmployee = (employee: EmployeeRow) => {
        setEditingEmployee(employee);
        setOpen(true);
    };

    const handleArchiveEmployee = (employee: EmployeeRow) => {
        setArchiveTarget(employee);
    };

    const handleExportEmployees = () => {
        const scopedEmployees =
            exportScope === "current"
                ? currentEmployees
                : exportScope === "selected"
                    ? visibleEmployees.filter((employee) => selected.includes(employee.id))
                    : visibleEmployees;

        const filteredEmployees = scopedEmployees.filter((employee) => {
            if (exportDepartment && employee.department !== exportDepartment) return false;
            if (exportStatus && employee.status !== exportStatus) return false;
            return true;
        });

        const lines = [
            ["ID", "Name", "Email", "Department", "Role", "Status", "Last Login", "Salary"].join(","),
            ...filteredEmployees.map((employee) =>
                [
                    employee.id,
                    employee.name,
                    employee.email,
                    employee.department,
                    employee.role,
                    employee.status,
                    employee.lastLogin,
                    employee.salary,
                ]
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(","),
            ),
        ];

        const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "employees-export.csv";
        link.click();
        window.URL.revokeObjectURL(url);

        setOpenExport(false);
        setToastMessage(
            filteredEmployees.length > 0
                ? `${filteredEmployees.length} employee records exported.`
                : "Employee export downloaded.",
        );
    };

    const confirmArchiveEmployee = () => {
        if (!archiveTarget) return;

        setArchivedIds((prev) => [...prev, archiveTarget.id]);
        setSelected((prev) => prev.filter((id) => id !== archiveTarget.id));
        setToastMessage(`${archiveTarget.name} archived successfully.`);
        setArchiveTarget(null);
    };

    useEffect(() => {
        const pageIds = currentEmployees.map((employee) => employee.id);
        const selectedOnPage = pageIds.filter((id) => selected.includes(id));

        if (!checkboxRef.current) return;

        checkboxRef.current.indeterminate =
            selectedOnPage.length > 0 && selectedOnPage.length < pageIds.length;
    }, [selected, currentEmployees]);

    useEffect(() => {
        if (!toastMessage) return;

        const timeout = window.setTimeout(() => setToastMessage(""), 2400);
        return () => window.clearTimeout(timeout);
    }, [toastMessage]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return (
        <Main>
            <AddEmployeeModal
                key={editingEmployee ? `edit-${editingEmployee.id}` : "create-employee"}
                status={open}
                open={setOpen}
                mode={editingEmployee ? "edit" : "create"}
                employee={
                    editingEmployee
                        ? {
                            ...editingEmployee,
                            phone: "+63 912 345 6789",
                            address: "Quezon City, Philippines",
                            hireDate: "2024-03-14",
                        }
                        : null
                }
            />
            <EmployeeModal status={openView} open={setOpenView} />
            <EmployeeExportModal
                open={openExport}
                onClose={() => setOpenExport(false)}
                scope={exportScope}
                onScopeChange={setExportScope}
                department={exportDepartment}
                onDepartmentChange={setExportDepartment}
                status={exportStatus}
                onStatusChange={setExportStatus}
                selectedCount={selected.length}
                onExport={handleExportEmployees}
            />
            <ArchiveConfirmModal
                employee={archiveTarget}
                open={Boolean(archiveTarget)}
                onCancel={() => setArchiveTarget(null)}
                onConfirm={confirmArchiveEmployee}
            />

            {toastMessage ? (
                <div className="pointer-events-none fixed right-[.28rem] top-[.28rem] z-[60]">
                    <div className="flex items-center gap-[.1rem] rounded-[.16rem] bg-[#1f8c67] px-[.14rem] py-[.12rem] text-[.14rem] font-medium text-white shadow-[0_.16rem_.34rem_rgba(31,140,103,0.28)]">
                        <span className="flex h-[.24rem] w-[.24rem] items-center justify-center rounded-full bg-white/16 text-[.13rem]">
                            <ShieldCheck className="h-[.14rem] w-[.14rem]" />
                        </span>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            ) : null}

            <section className="h-full overflow-auto bg-[linear-gradient(180deg,_#f8faff_0%,_#f5f7fb_100%)] p-[.28rem]">
                <div className="flex min-h-full flex-col gap-[.18rem]">
                    <div className="rounded-[.22rem] border border-[#e5e9f5] bg-[linear-gradient(135deg,_#ffffff_0%,_#f8faff_100%)] px-[.18rem] py-[.15rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex flex-col gap-[.14rem] xl:flex-row xl:items-end xl:justify-between">
                            <div className="max-w-[5.4rem]">
                                <p className="text-[.118rem] font-medium uppercase tracking-[0.18em] text-[#6c78a6]">
                                    People operations
                                </p>
                                <div className="mt-[.03rem] flex flex-col gap-[.04rem] xl:flex-row xl:items-end xl:gap-[.12rem]">
                                    <h2 className="font-['Montserrat'] text-[.28rem] font-semibold leading-[1.08] text-[#232b57]">
                                        Team directory and workforce status
                                    </h2>
                                    <p className="max-w-[3.8rem] pb-[.02rem] text-[.132rem] leading-[1.5] text-[#6c7598]">
                                        Review employee status, open profiles, and manage staffing actions from one clear workspace.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-[.08rem] sm:grid-cols-3 xl:min-w-[4.8rem] xl:max-w-[5.6rem] xl:flex-1">
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
                    </div>

                    <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex flex-col gap-[.12rem] border-b border-[#edf1f8] px-[.18rem] py-[.14rem] xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex flex-wrap items-center gap-[.1rem]">
                                <Dropdown
                                    label="Department"
                                    options={["Engineering", "People Ops", "Finance", "Design"]}
                                    icon={<GoListUnordered />}
                                />
                                <Dropdown
                                    label="Position"
                                    options={["Manager", "Developer", "Analyst", "Coordinator"]}
                                    icon={<GoListUnordered />}
                                />
                                <Dropdown
                                    label="Status"
                                    options={["Active", "Inactive"]}
                                    icon={<MdOutlineFilterList />}
                                />
                            </div>

                            <div className="flex flex-wrap items-center justify-end gap-[.1rem] xl:flex-nowrap">
                                <div className="flex min-w-[3rem] items-center gap-[.1rem] rounded-[.14rem] border border-[#e2e8f4] bg-[#fbfcff] px-[.14rem] py-[.1rem] text-[#8d97b4] xl:w-[3.2rem]">
                                    <Search className="h-[.16rem] w-[.16rem]" />
                                    <input
                                        className="w-full bg-transparent text-[.14rem] text-slate-700 outline-none placeholder:text-[#98a1bc]"
                                        placeholder="Search employee, email, department"
                                    />
                                </div>

                                <button
                                    onClick={() => setOpenExport(true)}
                                    className="inline-flex h-[.42rem] items-center gap-[.08rem] rounded-[.14rem] border border-[#e2e8f4] bg-white px-[.14rem] text-[.14rem] font-medium text-[#5c6b93] transition hover:bg-[#f8faff]"
                                >
                                    <Download className="h-[.16rem] w-[.16rem]" />
                                    <span>Export</span>
                                </button>

                                <button
                                    onClick={handleAddEmployee}
                                    title="Add employee"
                                    aria-label="Add employee"
                                    className="inline-flex h-[.42rem] w-[.42rem] shrink-0 items-center justify-center rounded-[.14rem] bg-[linear-gradient(135deg,_#5365f6_0%,_#6d72ff_100%)] text-white shadow-[0_.12rem_.28rem_rgba(83,101,246,0.22)] transition hover:brightness-105"
                                >
                                    <UserPlus className="h-[.18rem] w-[.18rem]" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[.12rem] p-[.18rem]">
                            {selected.length > 0 && (
                                <div className="flex items-center justify-between rounded-[.16rem] border border-[#dbe4ff] bg-[#f4f7ff] px-[.14rem] py-[.12rem]">
                                    <div className="text-[.14rem] text-[#51618f]">
                                        <span className="font-semibold text-[#31406c]">{selected.length} selected</span>
                                        <span className="ml-[.06rem]">employees ready for bulk actions</span>
                                    </div>

                                    <div className="flex items-center gap-[.08rem]">
                                        <button
                                            onClick={clearAll}
                                            className="text-[.14rem] font-medium text-[#5b6cff] transition hover:text-[#4654d8]"
                                        >
                                            Clear
                                        </button>
                                        <button className="inline-flex items-center gap-[.06rem] rounded-[.12rem] border border-[#e2e8f4] bg-white px-[.12rem] py-[.08rem] text-[.13rem] font-medium text-[#56658f]">
                                            <ArrowRight className="h-[.14rem] w-[.14rem]" />
                                            <span>Bulk update</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="overflow-hidden rounded-[.18rem] border border-[#edf1f8] bg-white">
                                <div className="max-h-[4.4rem] overflow-auto">
                                    <table className="w-full table-fixed text-left">
                                        <thead className="sticky top-0 z-10 bg-[#f8faff]">
                                            <tr className="border-b border-[#edf1f8] text-[.13rem] font-medium uppercase tracking-[0.08em] text-[#7c86a8]">
                                                <th className="w-[.42rem] px-[.1rem] py-[.1rem]">
                                                    <input
                                                        ref={checkboxRef}
                                                        type="checkbox"
                                                        onChange={toggleSelectAll}
                                                        className="size-[.16rem]"
                                                    />
                                                </th>
                                                <th className="w-[2.6rem] px-[.1rem] py-[.1rem]">Employee</th>
                                                <th className="px-[.1rem] py-[.1rem]">Department</th>
                                                <th className="px-[.1rem] py-[.1rem]">Role</th>
                                                <th className="px-[.1rem] py-[.1rem]">Status</th>
                                                <th className="px-[.1rem] py-[.1rem]">Last login</th>
                                                <th className="px-[.1rem] py-[.1rem] text-right">Salary</th>
                                                <th className="w-[1rem] px-[.1rem] py-[.1rem] text-center">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {currentEmployees.map((employee) => (
                                                <tr
                                                    key={employee.id}
                                                    className="border-b border-[#edf1f8] bg-white transition hover:bg-[#fbfcff] last:border-b-0"
                                                >
                                                    <td className="px-[.1rem] py-[.04rem] ">
                                                        <div className="flex">
                                                            <input
                                                                type="checkbox"
                                                                checked={selected.includes(employee.id)}
                                                                onChange={() => toggleSelect(employee.id)}
                                                                className="size-[.16rem]"
                                                            />
                                                        </div>
                                                    </td>

                                                    <td className="px-[.1rem] py-[.04rem]">
                                                        <div className="flex min-h-[.34rem] items-center gap-[.07rem] py-[.1rem]">
                                                            <img
                                                                src={`https://i.pravatar.cc/48?img=${employee.id}`}
                                                                className="h-[.44rem] w-[.44rem] rounded-full border border-[#dde3f5]"
                                                                alt={employee.name}
                                                            />
                                                            <div className="min-w-0 leading-[1.08]">
                                                                <div className="truncate text-[.15rem] font-semibold text-[#24305b]">
                                                                    {employee.name}
                                                                </div>
                                                                <div className="truncate text-[.12rem] text-[#7b86a8]">
                                                                    {employee.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-[.1rem] py-[.04rem]">
                                                        <div className="flex min-h-[.34rem] items-center text-[.14rem] text-[#556282]">
                                                            {employee.department}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.1rem] py-[.04rem]">
                                                        <div className="flex min-h-[.34rem] items-center text-[.14rem] text-[#556282]">
                                                            {employee.role}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.1rem] py-[.04rem]">
                                                        <div className="flex min-h-[.34rem] items-center">
                                                            <span
                                                                className={`inline-flex items-center gap-[.04rem] rounded-full border px-[.085rem] py-[.03rem] text-[.115rem] font-semibold leading-none shadow-[0_.02rem_.08rem_rgba(36,48,91,0.06)] ${
                                                                    employee.status === "Active"
                                                                        ? "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]"
                                                                        : "border-[#ffd8dd] bg-[#fff5f6] text-[#cc4a60]"
                                                                }`}
                                                            >
                                                                <span
                                                                    className={`h-[.055rem] w-[.055rem] rounded-full ${
                                                                        employee.status === "Active" ? "bg-[#22b07d]" : "bg-[#ef6b7f]"
                                                                    }`}
                                                                />
                                                                {employee.status}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-[.1rem] py-[.04rem]">
                                                        <div className="flex min-h-[.34rem] items-center text-[.13rem] text-[#7b86a8]">
                                                            {employee.lastLogin}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.1rem] py-[.04rem]">
                                                        <div className="flex min-h-[.34rem] items-center justify-end text-right text-[.145rem] font-semibold text-[#24305b]">
                                                            {employee.salary}
                                                        </div>
                                                    </td>

                                                    <td className="px-[.1rem] py-[.04rem]">
                                                        <div className="flex min-h-[.34rem] items-center justify-center gap-[.04rem]">
                                                            <ActionBtn onClick={() => setOpenView(true)}>
                                                                <GrView />
                                                            </ActionBtn>
                                                            <ActionBtn onClick={() => handleEditEmployee(employee)}>
                                                                <FaRegEdit />
                                                            </ActionBtn>
                                                            <ActionBtn danger onClick={() => handleArchiveEmployee(employee)}>
                                                                <MdOutlineAutoDelete />
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
                                        {indexFirst + 1}-{visibleEnd} of {employees.length}
                                        {archivedIds.length > 0 ? ` (${visibleEmployees.length} active)` : ""}
                                    </div>

                                    <div className="flex items-center gap-[.04rem]">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage((pageNumber) => pageNumber - 1)}
                                            className="h-[.3rem] rounded-[.08rem] border border-[#dde4f5] px-[.1rem] text-[.13rem] text-[#5b678f] transition hover:bg-white disabled:opacity-40"
                                        >
                                            Prev
                                        </button>

                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentPage(index + 1)}
                                                className={`h-[.3rem] min-w-[.3rem] rounded-[.08rem] border px-[.08rem] text-[.13rem] transition ${currentPage === index + 1
                                                        ? "border-[#5b6cff] bg-[#5b6cff] text-white"
                                                        : "border-[#dde4f5] bg-white text-[#5b678f] hover:bg-[#f8faff]"
                                                    }`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}

                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage((pageNumber) => pageNumber + 1)}
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

function ActionBtn({
    children,
    danger,
    ...props
}: {
    children: React.ReactNode;
    danger?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            {...props}
            className={`flex h-[.32rem] w-[.32rem] items-center justify-center rounded-[.09rem] text-[.14rem] transition ${danger
                    ? "bg-[#fff0f1] text-[#d14f61] hover:bg-[#ffe2e6]"
                    : "bg-[#f3f6fc] text-[#5b678f] hover:bg-[#e7edf9]"
                }`}
        >
            {children}
        </button>
    );
}

function ArchiveConfirmModal({
    open,
    employee,
    onCancel,
    onConfirm,
}: {
    open: boolean;
    employee: EmployeeRow | null;
    onCancel: () => void;
    onConfirm: () => void;
}) {
    return (
        <Modal open={open}>
            <div className="relative flex w-[4.2rem] flex-col overflow-hidden rounded-[.24rem] border border-[#f1d9de] bg-[linear-gradient(180deg,_#ffffff_0%,_#fff9fa_100%)] shadow-[0_.24rem_.58rem_rgba(15,23,42,0.16)]">
                <div className="flex items-start justify-between border-b border-[#f5e7ea] px-[.2rem] py-[.18rem]">
                    <div>
                        <p className="text-[.11rem] font-semibold uppercase tracking-[0.16em] text-[#c66a79]">
                            Confirm archive
                        </p>
                        <h3 className="mt-[.06rem] font-['Montserrat'] text-[.24rem] font-semibold text-[#2e395f]">
                            Archive employee?
                        </h3>
                    </div>

                    <button
                        onClick={onCancel}
                        className="flex h-[.34rem] w-[.34rem] items-center justify-center rounded-full border border-[#f1dfe4] bg-white text-[#9d7580] transition hover:bg-[#fff4f6]"
                    >
                        <X className="h-[.16rem] w-[.16rem]" />
                    </button>
                </div>

                <div className="px-[.2rem] py-[.18rem]">
                    <p className="text-[.15rem] leading-[1.65] text-[#6b7696]">
                        {employee ? (
                            <>
                                This will archive <span className="font-semibold text-[#31406c]">{employee.name}</span> and remove the record from the current table view.
                            </>
                        ) : (
                            "This employee will be archived and removed from the current table view."
                        )}
                    </p>
                </div>

                <div className="flex items-center justify-end gap-[.1rem] border-t border-[#f5e7ea] bg-[#fffafb] px-[.2rem] py-[.16rem]">
                    <button
                        onClick={onCancel}
                        className="inline-flex items-center rounded-[.14rem] border border-[#eadce0] bg-white px-[.16rem] py-[.1rem] text-[.14rem] font-medium text-[#6b7696] transition hover:bg-[#fff4f6]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="inline-flex items-center rounded-[.14rem] bg-[linear-gradient(135deg,_#ef6b7f_0%,_#d84a61_100%)] px-[.16rem] py-[.1rem] text-[.14rem] font-medium text-white shadow-[0_.12rem_.24rem_rgba(216,74,97,0.22)] transition hover:brightness-105"
                    >
                        Archive
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function EmployeeExportModal({
    open,
    onClose,
    scope,
    onScopeChange,
    department,
    onDepartmentChange,
    status,
    onStatusChange,
    selectedCount,
    onExport,
}: {
    open: boolean;
    onClose: () => void;
    scope: "all" | "current" | "selected";
    onScopeChange: (value: "all" | "current" | "selected") => void;
    department: string;
    onDepartmentChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
    selectedCount: number;
    onExport: () => void;
}) {
    const scopeOptions = [
        { value: "all", label: "All employees", detail: "Export the full active directory" },
        { value: "current", label: "Current page", detail: "Export only the employees visible now" },
        { value: "selected", label: "Selected only", detail: selectedCount > 0 ? `${selectedCount} employees selected` : "No employees selected yet" },
    ] as const;

    return (
        <Modal open={open}>
            <div className="relative flex w-[4.9rem] flex-col overflow-visible rounded-[.24rem] border border-[#dfe5f5] bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] shadow-[0_.24rem_.58rem_rgba(15,23,42,0.16)]">
                <div className="flex items-start justify-between border-b border-[#edf1f8] px-[.2rem] py-[.18rem]">
                    <div>
                        <p className="text-[.11rem] font-semibold uppercase tracking-[0.16em] text-[#6b79a6]">
                            Export employees
                        </p>
                        <h3 className="mt-[.05rem] font-['Montserrat'] text-[.24rem] font-semibold text-[#2e395f]">
                            Choose export filters
                        </h3>
                        <p className="mt-[.04rem] text-[.135rem] leading-[1.55] text-[#6b7696]">
                            Filter the employee records first, then download the export as a CSV file.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="flex h-[.34rem] w-[.34rem] items-center justify-center rounded-full border border-[#e4e9f6] bg-white text-[#8b97b7] transition hover:bg-[#f8faff]"
                    >
                        <X className="h-[.16rem] w-[.16rem]" />
                    </button>
                </div>

                <div className="grid gap-[.16rem] px-[.2rem] py-[.18rem] overflow-visible">
                    <div className="grid gap-[.08rem]">
                        <p className="text-[.12rem] font-semibold uppercase tracking-[0.12em] text-[#8a96b7]">
                            Export scope
                        </p>
                        <div className="grid gap-[.08rem]">
                            {scopeOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    disabled={option.value === "selected" && selectedCount === 0}
                                    onClick={() => onScopeChange(option.value)}
                                    className={`flex items-start gap-[.1rem] rounded-[.16rem] border px-[.14rem] py-[.12rem] text-left transition ${
                                        scope === option.value
                                            ? "border-[#cfd9ff] bg-[#f4f7ff]"
                                            : "border-[#e6ebf7] bg-white hover:bg-[#fbfcff]"
                                    } disabled:cursor-not-allowed disabled:opacity-50`}
                                >
                                    <span className={`mt-[.02rem] h-[.12rem] w-[.12rem] rounded-full border ${scope === option.value ? "border-[#5b6cff] bg-[#5b6cff]" : "border-[#ccd5ea] bg-white"}`} />
                                    <div>
                                        <div className="text-[.14rem] font-medium text-[#32416d]">{option.label}</div>
                                        <div className="mt-[.02rem] text-[.12rem] text-[#7a86a7]">{option.detail}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-[.1rem] sm:grid-cols-2">
                        <FilterSelect
                            label="Department"
                            value={department}
                            onChange={onDepartmentChange}
                            options={["Engineering", "People Ops", "Finance", "Design"]}
                            emptyLabel="All departments"
                        />
                        <FilterSelect
                            label="Status"
                            value={status}
                            onChange={onStatusChange}
                            options={["Active", "Inactive"]}
                            emptyLabel="All statuses"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-[.1rem] border-t border-[#edf1f8] bg-[#fbfcff] px-[.2rem] py-[.16rem]">
                    <button
                        onClick={onClose}
                        className="inline-flex items-center rounded-[.14rem] border border-[#dce3f3] bg-white px-[.16rem] py-[.1rem] text-[.14rem] font-medium text-[#6b7696] transition hover:bg-[#f8faff]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onExport}
                        className="inline-flex items-center gap-[.08rem] rounded-[.14rem] bg-[linear-gradient(135deg,_#5365f6_0%,_#6d72ff_100%)] px-[.16rem] py-[.1rem] text-[.14rem] font-medium text-white shadow-[0_.12rem_.24rem_rgba(83,101,246,0.22)] transition hover:brightness-105"
                    >
                        <Download className="h-[.15rem] w-[.15rem]" />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function FilterSelect({
    label,
    value,
    onChange,
    options,
    emptyLabel,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    emptyLabel: string;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

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
        <div ref={ref} className="flex flex-col gap-[.06rem]">
            <span className="text-[.125rem] font-medium text-[#617095]">{label}</span>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen((current) => !current)}
                    className={`flex h-[.42rem] w-full items-center gap-[.08rem] rounded-[.14rem] border px-[.14rem] text-left transition duration-200 ${
                        open
                            ? "border-[#b9c8ff] bg-[#f6f8ff] shadow-[0_.08rem_.2rem_rgba(83,101,246,0.12)]"
                            : "border-[#dde5f2] bg-white shadow-[0_.04rem_.12rem_rgba(17,24,39,0.04)] hover:border-[#d5def1] hover:bg-[#fbfcff]"
                    }`}
                >
                    <div className="min-w-0 flex-1">
                        <div className="truncate text-[.14rem] font-medium text-[#39476f]">
                            {value || emptyLabel}
                        </div>
                    </div>

                    <ChevronDown
                        className={`h-[.16rem] w-[.16rem] flex-none text-[#8090b5] transition duration-200 ${
                            open ? "rotate-180 text-[#5b6cff]" : ""
                        }`}
                    />
                </button>

                <div
                    className={`absolute left-0 right-0 top-full z-30 mt-[.06rem] origin-top overflow-hidden rounded-[.16rem] border border-[#e4eaf7] bg-white p-[.06rem] shadow-[0_.16rem_.38rem_rgba(21,32,68,0.12)] transition-all duration-200 ${
                        open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-[.03rem] opacity-0"
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => {
                            onChange("");
                            setOpen(false);
                        }}
                        className={`flex w-full items-center gap-[.08rem] rounded-[.12rem] px-[.12rem] py-[.09rem] text-left text-[.14rem] transition ${
                            value === ""
                                ? "bg-[#f4f7ff] font-medium text-[#4254da]"
                                : "text-[#5d6b92] hover:bg-[#f8faff] hover:text-[#33436b]"
                        }`}
                    >
                        <span className="flex h-[.16rem] w-[.16rem] items-center justify-center">
                            {value === "" ? <Check className="h-[.14rem] w-[.14rem]" /> : null}
                        </span>
                        <span>{emptyLabel}</span>
                    </button>

                    <div className="my-[.04rem] h-px bg-[#eef2fa]" />

                    {options.map((option) => {
                        const isSelected = value === option;

                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onChange(option);
                                    setOpen(false);
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
                                <span>{option}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
