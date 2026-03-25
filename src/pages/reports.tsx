import { ModuleWorkspace } from "./module_workspace";

export const ReportsOverview = () => {
    return (
        <ModuleWorkspace
            eyebrow="Reports and analytics"
            title="Attrition, hiring, attendance, payroll, and performance signals"
            description="Review workforce trends and decision metrics in one reporting surface, from hiring funnel health to payroll cost and top performers."
            bannerVariant="compact"
            panelVariant="compact"
            stats={[
                { label: "Attrition rate", value: "4.8%", detail: "Rolling 12-month workforce loss", accent: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(117,135,255,0.04))]" },
                { label: "Payroll cost", value: "$1.24M", detail: "Current monthly payroll spend", accent: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(79,212,186,0.04))]" },
                { label: "Hiring funnel", value: "31", detail: "Candidates currently in interview stage", accent: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(247,198,91,0.04))]" },
            ]}
            primaryTitle="Key report areas"
            primaryDescription="The operational metrics leadership checks most often."
            primaryItems={[
                { label: "Attrition rate", value: "4.8%" },
                { label: "Hiring funnel", value: "31 interview stage" },
                { label: "Attendance summary", value: "96.4% present", tone: "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]" },
                { label: "Top performers", value: "12 highlighted" },
            ]}
            secondaryTitle="Decision watch"
            secondaryDescription="Use these snapshots before monthly reviews and staffing plans."
            secondaryItems={[
                { label: "Overtime cost risk", value: "Medium", tone: "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]" },
                { label: "Fastest hiring team", value: "Design" },
                { label: "Best attendance branch", value: "Cebu" },
                { label: "Performance review coverage", value: "91%" },
            ]}
            tableTitle="Analytics snapshot"
            tableDescription="Selected reports and the latest measured values."
            columns={[
                { key: "report", label: "Report", width: "1.9rem" },
                { key: "period", label: "Period", width: "1rem" },
                { key: "value", label: "Value", width: "1rem", align: "right" },
                { key: "trend", label: "Trend", width: "1rem" },
                { key: "status", label: "Status", width: "1rem" },
            ]}
            rows={[
                { report: "Attendance summary", period: "This month", value: "96.4%", trend: "+1.2%", status: "Healthy" },
                { report: "Payroll cost", period: "March", value: "$1.24M", trend: "+3.1%", status: "Review" },
                { report: "Top performers", period: "Q1", value: "12", trend: "+2", status: "Published" },
            ]}
        />
    );
};
