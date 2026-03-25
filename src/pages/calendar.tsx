import { ModuleWorkspace } from "./module_workspace";

export const CalendarOverview = () => {
    return (
        <ModuleWorkspace
            eyebrow="Calendar"
            title="Absences, holidays, team schedules, and employee milestones"
            description="Keep a single calendar view for who is out today, upcoming holidays, team scheduling, and birthdays or anniversaries."
            bannerVariant="compact"
            panelVariant="compact"
            stats={[
                { label: "Absent today", value: "09", detail: "Employees currently out or on leave", accent: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(117,135,255,0.04))]" },
                { label: "Upcoming holidays", value: "02", detail: "Company holidays in the next 30 days", accent: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(247,198,91,0.04))]" },
                { label: "Birthdays / anniversaries", value: "11", detail: "Milestones scheduled this month", accent: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(79,212,186,0.04))]" },
            ]}
            primaryTitle="Calendar feeds"
            primaryDescription="The event streams people operations teams check each morning."
            primaryItems={[
                { label: "Who is absent today", value: "9 people" },
                { label: "Holidays", value: "2 upcoming" },
                { label: "Team schedule view", value: "Published" },
                { label: "Birthdays / anniversaries", value: "11 this month" },
            ]}
            secondaryTitle="Planning signals"
            secondaryDescription="Use the calendar view to catch staffing and celebration overlaps early."
            secondaryItems={[
                { label: "Coverage conflicts", value: "2 teams", tone: "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]" },
                { label: "Peak absence day", value: "Apr 12" },
                { label: "Shared office event", value: "Town hall" },
                { label: "Schedule health", value: "Stable", tone: "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]" },
            ]}
            tableTitle="Calendar timeline"
            tableDescription="Upcoming absences, holidays, and milestone events."
            columns={[
                { key: "date", label: "Date", width: "1rem" },
                { key: "event", label: "Event", width: "1.8rem" },
                { key: "group", label: "Group", width: "1.2rem" },
                { key: "owner", label: "Owner", width: "1rem" },
                { key: "status", label: "Status", width: "1rem" },
            ]}
            rows={[
                { date: "Apr 08", event: "Araw ng Kagitingan holiday", group: "All staff", owner: "HR Ops", status: "Confirmed" },
                { date: "Apr 10", event: "Support team leave overlap", group: "Support", owner: "People Ops", status: "Review" },
                { date: "Apr 12", event: "April work anniversary round", group: "HQ", owner: "Internal Comms", status: "Planned" },
            ]}
        />
    );
};
