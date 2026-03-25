import { ModuleWorkspace } from "./module_workspace";

export const SchedulingOverview = () => {
    return (
        <ModuleWorkspace
            eyebrow="Shift scheduling"
            title="Shifts, weekly schedules, and time rule coverage"
            description="Assign shifts, review weekly staffing, and monitor the rules that govern rest days, late arrivals, and undertime."
            bannerVariant="compact"
            panelVariant="compact"
            stats={[
                { label: "Assigned shifts", value: "184", detail: "Scheduled shifts for the current week", accent: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(117,135,255,0.04))]" },
                { label: "Rest day conflicts", value: "06", detail: "Staff assigned near protected rest days", accent: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(247,198,91,0.04))]" },
                { label: "Late rule alerts", value: "11", detail: "Policies triggered this pay period", accent: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(79,212,186,0.04))]" },
            ]}
            primaryTitle="Schedule controls"
            primaryDescription="Common shift planning actions for operations and HR."
            primaryItems={[
                { label: "Assign shifts", value: "Open board" },
                { label: "Weekly schedule", value: "Published" },
                { label: "Rest days", value: "Protected", tone: "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]" },
                { label: "Late / undertime rules", value: "11 triggers", tone: "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]" },
            ]}
            secondaryTitle="Coverage overview"
            secondaryDescription="Review load balance and exceptions before publishing the week."
            secondaryItems={[
                { label: "Morning shift coverage", value: "92%" },
                { label: "Night shift gaps", value: "4 open slots", tone: "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]" },
                { label: "Cross-trained staff", value: "18 available" },
                { label: "Overtime risk", value: "Low", tone: "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]" },
            ]}
            tableTitle="Weekly shift board"
            tableDescription="Assigned schedules and rule exceptions to review."
            columns={[
                { key: "team", label: "Team", width: "1.5rem" },
                { key: "shift", label: "Shift", width: "1.3rem" },
                { key: "coverage", label: "Coverage", width: "1rem" },
                { key: "restday", label: "Rest day", width: "1rem" },
                { key: "alert", label: "Alert", width: "1rem" },
            ]}
            rows={[
                { team: "Support A", shift: "6:00 AM - 3:00 PM", coverage: "Full", restday: "Sun", alert: "None" },
                { team: "Warehouse", shift: "2:00 PM - 11:00 PM", coverage: "1 gap", restday: "Mon", alert: "Late risk" },
                { team: "Field Ops", shift: "8:00 AM - 5:00 PM", coverage: "Full", restday: "Sat", alert: "Undertime rule" },
            ]}
        />
    );
};
