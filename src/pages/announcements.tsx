import { ModuleWorkspace } from "./module_workspace";

export const AnnouncementsOverview = () => {
    return (
        <ModuleWorkspace
            eyebrow="Announcements"
            title="Company news, notices, and department updates"
            description="Publish internal communication in a way teams can scan quickly, from holiday reminders to policy rollouts and department advisories."
            bannerVariant="compact"
            panelVariant="compact"
            stats={[
                { label: "Published posts", value: "38", detail: "Announcements posted this quarter", accent: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(117,135,255,0.04))]" },
                { label: "Unread notices", value: "64", detail: "Employees with unread urgent updates", accent: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(247,198,91,0.04))]" },
                { label: "Policy updates", value: "05", detail: "Recent changes published this month", accent: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(79,212,186,0.04))]" },
            ]}
            primaryTitle="Announcement streams"
            primaryDescription="The core update types employees rely on throughout the month."
            primaryItems={[
                { label: "Company news", value: "12 live" },
                { label: "Holiday notices", value: "2 pending" },
                { label: "Policy updates", value: "5 this month", tone: "border-[#d9e2ff] bg-[#f4f7ff] text-[#5365f6]" },
                { label: "Department announcements", value: "19 posts" },
            ]}
            secondaryTitle="Engagement signals"
            secondaryDescription="Spot messages that still need distribution or follow-up."
            secondaryItems={[
                { label: "Urgent unread count", value: "64 employees", tone: "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]" },
                { label: "Most active channel", value: "Operations" },
                { label: "Read rate", value: "82%" },
                { label: "Pinned notices", value: "4 active" },
            ]}
            tableTitle="Announcement board"
            tableDescription="Recent internal posts and visibility status."
            columns={[
                { key: "title", label: "Title", width: "1.9rem" },
                { key: "type", label: "Type", width: "1.2rem" },
                { key: "scope", label: "Scope", width: "1.1rem" },
                { key: "date", label: "Date", width: "1rem" },
                { key: "status", label: "Status", width: "1rem" },
            ]}
            rows={[
                { title: "Holy Week office schedule", type: "Holiday notice", scope: "All staff", date: "Apr 01", status: "Published" },
                { title: "Updated travel reimbursement policy", type: "Policy", scope: "Managers", date: "Apr 03", status: "Pinned" },
                { title: "Design team town hall", type: "Department", scope: "Design", date: "Apr 05", status: "Draft" },
            ]}
        />
    );
};
