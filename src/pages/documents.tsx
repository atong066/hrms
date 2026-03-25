import { ModuleWorkspace } from "./module_workspace";

export const DocumentsOverview = () => {
    return (
        <ModuleWorkspace
            eyebrow="Employee documents"
            title="Contracts, IDs, certificates, and signed forms"
            description="Store required employee files in one view and quickly review what is missing, expiring, or pending signature."
            bannerVariant="compact"
            panelVariant="compact"
            stats={[
                { label: "Stored files", value: "1,284", detail: "Active employee records in storage", accent: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(117,135,255,0.04))]" },
                { label: "Missing documents", value: "17", detail: "Files requiring upload or follow-up", accent: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(247,198,91,0.04))]" },
                { label: "Signed forms", value: "94%", detail: "Compliance completion across active staff", accent: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(79,212,186,0.04))]" },
            ]}
            primaryTitle="Document categories"
            primaryDescription="The required record types HR monitors most often."
            primaryItems={[
                { label: "Contracts", value: "Current" },
                { label: "IDs", value: "8 expiring", tone: "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]" },
                { label: "Certificates", value: "31 tracked" },
                { label: "Signed company forms", value: "94% done", tone: "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]" },
            ]}
            secondaryTitle="Compliance watch"
            secondaryDescription="Stay ahead of expirations, gaps, and onboarding paperwork."
            secondaryItems={[
                { label: "Expiring IDs", value: "8 this month" },
                { label: "Unsigned NDA forms", value: "3 pending" },
                { label: "Onboarding uploads", value: "12 completed today" },
                { label: "Audit-ready records", value: "Yes", tone: "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]" },
            ]}
            tableTitle="Document register"
            tableDescription="Track document type, owner, validity, and file status."
            columns={[
                { key: "employee", label: "Employee", width: "1.5rem" },
                { key: "document", label: "Document", width: "1.5rem" },
                { key: "validity", label: "Validity", width: "1.2rem" },
                { key: "branch", label: "Branch", width: "1rem" },
                { key: "status", label: "Status", width: "1rem" },
            ]}
            rows={[
                { employee: "Rina Torres", document: "Employment contract", validity: "Ongoing", branch: "Cebu", status: "Signed" },
                { employee: "Ken Lim", document: "Government ID", validity: "Apr 2026", branch: "BGC", status: "Renew" },
                { employee: "Mia Ong", document: "Medical clearance", validity: "Jul 2026", branch: "Makati", status: "Filed" },
            ]}
        />
    );
};
