import { ModuleWorkspace } from "./module_workspace";

export const TrainingOverview = () => {
    return (
        <ModuleWorkspace
            eyebrow="Training and learning"
            title="Courses, seminars, certifications, and learning history"
            description="Track employee development, compliance training, and completed certifications with a single learning operations view."
            bannerVariant="compact"
            panelVariant="compact"
            stats={[
                { label: "Active courses", value: "18", detail: "Learning tracks currently available", accent: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(117,135,255,0.04))]" },
                { label: "Seminars this quarter", value: "07", detail: "Scheduled instructor-led sessions", accent: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(79,212,186,0.04))]" },
                { label: "Certifications due", value: "12", detail: "Employees needing renewal or completion", accent: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(247,198,91,0.04))]" },
            ]}
            primaryTitle="Learning programs"
            primaryDescription="Monitor what employees need to complete and what’s already in progress."
            primaryItems={[
                { label: "Courses", value: "18 active" },
                { label: "Seminars", value: "7 scheduled" },
                { label: "Certifications", value: "12 due", tone: "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]" },
                { label: "Training history", value: "Up to date", tone: "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]" },
            ]}
            secondaryTitle="Completion watch"
            secondaryDescription="Check deadlines, attendance, and certification renewals by team."
            secondaryItems={[
                { label: "Mandatory completion", value: "89%" },
                { label: "Upcoming seminar seats", value: "22 booked" },
                { label: "Expired certifications", value: "3 staff", tone: "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]" },
                { label: "Top learning team", value: "Operations" },
            ]}
            tableTitle="Training history"
            tableDescription="Current training enrollments, seminar attendance, and certification status."
            columns={[
                { key: "employee", label: "Employee", width: "1.4rem" },
                { key: "program", label: "Program", width: "1.8rem" },
                { key: "type", label: "Type", width: "1rem" },
                { key: "completion", label: "Completion", width: "1rem" },
                { key: "status", label: "Status", width: "1rem" },
            ]}
            rows={[
                { employee: "Lia Gomez", program: "Data Privacy Refresher", type: "Course", completion: "Apr 05", status: "On track" },
                { employee: "Paolo Reyes", program: "Leadership Seminar", type: "Seminar", completion: "Apr 12", status: "Registered" },
                { employee: "Jules Tan", program: "Forklift License", type: "Certification", completion: "May 01", status: "Renewal" },
            ]}
        />
    );
};
