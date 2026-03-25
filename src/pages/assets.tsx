import { ModuleWorkspace } from "./module_workspace";

export const AssetsOverview = () => {
    return (
        <ModuleWorkspace
            eyebrow="Assets"
            title="Assigned devices, uniforms, IDs, and return tracking"
            description="Monitor who currently holds company assets, what needs replacement, and what must be returned during offboarding."
            bannerVariant="compact"
            panelVariant="compact"
            stats={[
                { label: "Assigned assets", value: "246", detail: "Devices and materials in circulation", accent: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(117,135,255,0.04))]" },
                { label: "Pending returns", value: "08", detail: "Assets due back from exiting staff", accent: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(247,198,91,0.04))]" },
                { label: "Replacement alerts", value: "13", detail: "Items marked damaged or due for renewal", accent: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(79,212,186,0.04))]" },
            ]}
            primaryTitle="Tracked asset types"
            primaryDescription="The most common HR-visible assets tied to employee records."
            primaryItems={[
                { label: "Laptop assignment", value: "118 active" },
                { label: "ID card", value: "9 replacements", tone: "border-[#f8dfb0] bg-[#fff7e8] text-[#c78211]" },
                { label: "Uniforms", value: "74 issued" },
                { label: "Device return tracking", value: "8 pending" },
            ]}
            secondaryTitle="Asset operations"
            secondaryDescription="Use these signals to stay ahead of losses and handoff delays."
            secondaryItems={[
                { label: "Offboarding returns", value: "3 due today" },
                { label: "Damaged devices", value: "5 cases" },
                { label: "Warehouse stock", value: "Healthy", tone: "border-[#cdeedd] bg-[#f2fdf7] text-[#148a68]" },
                { label: "Unassigned laptops", value: "14 ready" },
            ]}
            tableTitle="Asset registry"
            tableDescription="Current assignments, return state, and item health."
            columns={[
                { key: "asset", label: "Asset", width: "1.5rem" },
                { key: "employee", label: "Employee", width: "1.4rem" },
                { key: "serial", label: "Reference", width: "1.2rem" },
                { key: "branch", label: "Branch", width: "1rem" },
                { key: "status", label: "Status", width: "1rem" },
            ]}
            rows={[
                { asset: "MacBook Pro 14", employee: "Kris Uy", serial: "MBP-2147", branch: "BGC", status: "Assigned" },
                { asset: "ID card", employee: "Nina Lee", serial: "ID-6610", branch: "Cebu", status: "Replace" },
                { asset: "Uniform set", employee: "Ben Cruz", serial: "UNI-904", branch: "Makati", status: "Issued" },
            ]}
        />
    );
};
