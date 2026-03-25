import { ModuleWorkspace } from "./module_workspace";

export const RequestsOverview = () => {
    return (
        <ModuleWorkspace
            eyebrow="Requests and tickets"
            title="COE, payslip, corrections, and general HR concerns"
            description="Centralize employee requests so HR can review service queues, response times, and issue ownership in one place."
            bannerVariant="compact"
            panelVariant="compact"
            stats={[
                { label: "Open tickets", value: "21", detail: "Requests waiting for response or closure", accent: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(117,135,255,0.04))]" },
                { label: "SLA risk", value: "04", detail: "Tickets nearing the response target", accent: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(247,198,91,0.04))]" },
                { label: "Closed today", value: "13", detail: "Requests resolved by the support desk", accent: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(79,212,186,0.04))]" },
            ]}
            primaryTitle="Request types"
            primaryDescription="The most common ticket categories currently handled by HR."
            primaryItems={[
                { label: "COE request", value: "5 open" },
                { label: "Payslip request", value: "3 open" },
                { label: "Correction request", value: "7 open", tone: "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]" },
                { label: "General HR concerns", value: "6 open" },
            ]}
            secondaryTitle="Service desk pulse"
            secondaryDescription="Watch backlog and handoffs before queues start to slip."
            secondaryItems={[
                { label: "Average response time", value: "2.4 hrs" },
                { label: "Escalated tickets", value: "2 cases" },
                { label: "First-contact resolution", value: "71%" },
                { label: "Queue health", value: "Healthy", tone: "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]" },
            ]}
            tableTitle="Ticket queue"
            tableDescription="Active HR support requests and their current owners."
            columns={[
                { key: "request", label: "Request", width: "1.6rem" },
                { key: "employee", label: "Employee", width: "1.4rem" },
                { key: "owner", label: "Owner", width: "1rem" },
                { key: "submitted", label: "Submitted", width: "1rem" },
                { key: "status", label: "Status", width: "1rem" },
            ]}
            rows={[
                { request: "COE request", employee: "Mila Santos", owner: "HR Desk", submitted: "Today", status: "Open" },
                { request: "Payslip copy", employee: "Ben Cruz", owner: "Payroll", submitted: "Yesterday", status: "In progress" },
                { request: "Attendance correction", employee: "Gia Uy", owner: "Timekeeping", submitted: "2 days ago", status: "Review" },
            ]}
        />
    );
};
