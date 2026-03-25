import { ModuleWorkspace } from "./module_workspace";

export const DepartmentsOverview = () => {
    return (
        <ModuleWorkspace
            eyebrow="Departments"
            title="Teams, roles, reporting, and office structure"
            description="Organize departments, maintain job positions, and review how staff reporting and branch assignment are mapped."
            bannerVariant="compact"
            panelVariant="compact"
            stats={[
                { label: "Departments", value: "12", detail: "Active groups in the organization", accent: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(117,135,255,0.04))]" },
                { label: "Job positions", value: "46", detail: "Approved positions across branches", accent: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(79,212,186,0.04))]" },
                { label: "Office branches", value: "04", detail: "Physical office assignments currently used", accent: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(247,198,91,0.04))]" },
            ]}
            primaryTitle="Organization setup"
            primaryDescription="Keep the structural records aligned with how teams actually work."
            primaryItems={[
                { label: "Departments", value: "12 active" },
                { label: "Job positions", value: "6 open roles", tone: "border-[#d9e2ff] bg-[#f4f7ff] text-[#5365f6]" },
                { label: "Reporting hierarchy", value: "Updated weekly" },
                { label: "Branch / office assignment", value: "4 offices" },
            ]}
            secondaryTitle="Hierarchy signals"
            secondaryDescription="Review manager coverage and branch distribution before staffing changes."
            secondaryItems={[
                { label: "Missing managers", value: "2 teams", tone: "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]" },
                { label: "Cross-branch moves", value: "3 pending" },
                { label: "Span of control", value: "Within target", tone: "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]" },
                { label: "New positions draft", value: "5 roles" },
            ]}
            tableTitle="Department directory"
            tableDescription="Department ownership, open positions, and branch mapping."
            columns={[
                { key: "department", label: "Department", width: "1.7rem" },
                { key: "lead", label: "Lead", width: "1.3rem" },
                { key: "positions", label: "Positions", width: "1rem" },
                { key: "branch", label: "Branch", width: "1.2rem" },
                { key: "status", label: "Status", width: "1rem" },
            ]}
            rows={[
                { department: "Engineering", lead: "Paolo Reyes", positions: "14", branch: "BGC", status: "Stable" },
                { department: "People Ops", lead: "Lia Gomez", positions: "7", branch: "Makati", status: "Hiring" },
                { department: "Finance", lead: "Rina Torres", positions: "6", branch: "Cebu", status: "Stable" },
            ]}
        />
    );
};
