import {
    BellRing,
    Download,
    KeyRound,
    Mail,
    MonitorSmartphone,
    Search,
    ShieldCheck,
    SlidersHorizontal,
    Sparkles,
    UserCog,
    Workflow,
} from "lucide-react";
import { Main } from "../layout/main";

const settingsHighlights = [
    {
        title: "Workspace admins",
        value: "06",
        detail: "Users with elevated permissions",
        icon: UserCog,
        accent: "from-[#4f6bff] to-[#7587ff]",
        surface: "bg-[linear-gradient(135deg,_rgba(79,107,255,0.14),_rgba(117,135,255,0.04))]",
    },
    {
        title: "Active alerts",
        value: "12",
        detail: "Notification rules enabled",
        icon: BellRing,
        accent: "from-[#f1aa28] to-[#f7c65b]",
        surface: "bg-[linear-gradient(135deg,_rgba(241,170,40,0.14),_rgba(247,198,91,0.04))]",
    },
    {
        title: "Security checks",
        value: "98%",
        detail: "Policy compliance this month",
        icon: ShieldCheck,
        accent: "from-[#18b397] to-[#4fd4ba]",
        surface: "bg-[linear-gradient(135deg,_rgba(24,179,151,0.14),_rgba(79,212,186,0.04))]",
    },
];

const settingsSections = [
    {
        title: "Account access",
        description: "Control sign-in and role privileges for the HR team.",
        icon: UserCog,
        items: [
            { label: "Single sign-on", value: "Enabled", tone: "text-[#148a68] bg-[#f2fdf7] border-[#cdeedd]" },
            { label: "Session timeout", value: "8 hours", tone: "text-[#5365f6] bg-[#f4f7ff] border-[#d9e2ff]" },
            { label: "Role approval flow", value: "Manager required", tone: "text-[#667392] bg-[#f8faff] border-[#e4e8f6]" },
        ],
    },
    {
        title: "Notifications",
        description: "Keep teams updated on approvals, payroll, and attendance changes.",
        icon: BellRing,
        items: [
            { label: "Email digests", value: "Daily at 8:00 AM", tone: "text-[#5365f6] bg-[#f4f7ff] border-[#d9e2ff]" },
            { label: "Payroll reminders", value: "3 rules active", tone: "text-[#c78211] bg-[#fff7e8] border-[#f8dfb0]" },
            { label: "Attendance anomalies", value: "Realtime", tone: "text-[#148a68] bg-[#f2fdf7] border-[#cdeedd]" },
        ],
    },
    {
        title: "Workflow defaults",
        description: "Set standard approval paths and review rules for daily HR operations.",
        icon: Workflow,
        items: [
            { label: "Leave approvals", value: "Team lead -> HR", tone: "text-[#667392] bg-[#f8faff] border-[#e4e8f6]" },
            { label: "Probation reviews", value: "60 / 90 / 180 days", tone: "text-[#5365f6] bg-[#f4f7ff] border-[#d9e2ff]" },
            { label: "Payroll cut-off", value: "Every 25th", tone: "text-[#148a68] bg-[#f2fdf7] border-[#cdeedd]" },
        ],
    },
];

const securityChecks = [
    { label: "Two-factor authentication", status: "Required", tone: "text-[#148a68]" },
    { label: "Password rotation", status: "Every 90 days", tone: "text-[#24305b]" },
    { label: "Audit logs", status: "Captured automatically", tone: "text-[#24305b]" },
    { label: "Export restrictions", status: "Finance and payroll only", tone: "text-[#24305b]" },
];

const quickControls = [
    { label: "Enable login alerts", helper: "Send a notice for each new device sign-in.", enabled: true },
    { label: "Require manager note", helper: "Add a justification note for manual attendance edits.", enabled: true },
    { label: "Auto-lock archived accounts", helper: "Disable archived employee access immediately.", enabled: false },
];

const accountRows = [
    { label: "Full name", value: "Virgilio Galicia" },
    { label: "Work email", value: "virgilio@company.com", icon: Mail },
    { label: "Role", value: "HR Administrator" },
    { label: "Two-factor method", value: "Authenticator app", icon: MonitorSmartphone },
];

export const SettingsOverview = () => {
    return (
        <Main>
            <section className="h-full overflow-auto bg-[linear-gradient(180deg,_#f8faff_0%,_#f5f7fb_100%)] p-[.28rem]">
                <div className="flex min-h-full flex-col gap-[.18rem]">
                    <div className="rounded-[.24rem] border border-[#e5e9f5] bg-[linear-gradient(135deg,_#ffffff_0%,_#f7f9ff_100%)] p-[.2rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex items-start justify-between gap-[.18rem]">
                            <div className="max-w-[6.4rem]">
                                <p className="text-[.14rem] font-medium uppercase tracking-[0.18em] text-[#6c78a6]">
                                    System settings
                                </p>
                                <h2 className="mt-[.06rem] font-['Montserrat'] text-[.38rem] font-semibold leading-[1.08] text-[#232b57]">
                                    Access, workflow, and security controls
                                </h2>
                                <p className="mt-[.08rem] text-[.16rem] leading-[1.6] text-[#6c7598]">
                                    Manage the rules that shape permissions, alerts, and approvals across the HR workspace.
                                </p>
                            </div>

                            <div className="flex items-center gap-[.1rem] rounded-[.18rem] border border-[#dfe5f5] bg-white px-[.14rem] py-[.12rem] shadow-[0_.06rem_.18rem_rgba(15,23,42,0.05)]">
                                <div className="flex h-[.42rem] w-[.42rem] items-center justify-center rounded-[.14rem] bg-[#eef2ff] text-[#5b6cff]">
                                    <Sparkles className="h-[.18rem] w-[.18rem]" />
                                </div>
                                <div>
                                    <p className="text-[.11rem] font-semibold uppercase tracking-[0.16em] text-[#8b97b7]">
                                        Workspace state
                                    </p>
                                    <p className="mt-[.03rem] text-[.15rem] font-medium text-[#34426b]">Protected and synced</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-[.18rem] grid gap-[.12rem] xl:grid-cols-3">
                            {settingsHighlights.map((card) => {
                                const Icon = card.icon;

                                return (
                                    <div
                                        key={card.title}
                                        className={`rounded-[.18rem] border border-[#e7ebf6] p-[.16rem] ${card.surface}`}
                                    >
                                        <div className="flex items-start justify-between gap-[.12rem]">
                                            <div>
                                                <p className="text-[.14rem] font-medium text-[#6c7598]">{card.title}</p>
                                                <p className="mt-[.06rem] font-['Montserrat'] text-[.34rem] font-semibold text-[#232b57]">
                                                    {card.value}
                                                </p>
                                            </div>
                                            <div className={`flex h-[.46rem] w-[.46rem] items-center justify-center rounded-[.14rem] bg-gradient-to-br ${card.accent} text-white shadow-[0_.08rem_.18rem_rgba(59,91,219,0.18)]`}>
                                                <Icon className="h-[.22rem] w-[.22rem]" />
                                            </div>
                                        </div>
                                        <p className="mt-[.08rem] text-[.13rem] text-[#7280a7]">{card.detail}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex flex-wrap items-center gap-[.1rem] border-b border-[#edf1f8] px-[.18rem] py-[.14rem]">
                            <div className="flex min-w-[3.4rem] items-center gap-[.1rem] rounded-[.14rem] border border-[#e2e8f4] bg-[#fbfcff] px-[.14rem] py-[.1rem] text-[#8d97b4]">
                                <Search className="h-[.16rem] w-[.16rem]" />
                                <input
                                    className="w-full bg-transparent text-[.14rem] text-slate-700 outline-none placeholder:text-[#98a1bc]"
                                    placeholder="Search setting, policy, or control"
                                />
                            </div>

                            <button className="inline-flex h-[.42rem] items-center gap-[.08rem] rounded-[.14rem] border border-[#e2e8f4] bg-white px-[.14rem] text-[.14rem] font-medium text-[#5c6b93] transition hover:bg-[#f8faff]">
                                <SlidersHorizontal className="h-[.16rem] w-[.16rem]" />
                                <span>Filters</span>
                            </button>

                            <button className="ml-auto inline-flex h-[.42rem] items-center gap-[.08rem] rounded-[.14rem] border border-[#e2e8f4] bg-white px-[.14rem] text-[.14rem] font-medium text-[#5c6b93] transition hover:bg-[#f8faff]">
                                <Download className="h-[.16rem] w-[.16rem]" />
                                <span>Export policy</span>
                            </button>
                        </div>

                        <div className="grid gap-[.18rem] p-[.18rem] xl:grid-cols-[1.2fr_.9fr]">
                            <div className="space-y-[.14rem]">
                                <div className="rounded-[.2rem] border border-[#edf1f8] bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] p-[.16rem]">
                                    <div className="flex items-start justify-between gap-[.12rem]">
                                        <div>
                                            <h3 className="text-[.2rem] font-semibold text-[#253158]">My account</h3>
                                            <p className="mt-[.04rem] text-[.13rem] text-[#7481a4]">
                                                Update your personal access details and profile preferences.
                                            </p>
                                        </div>
                                        <div className="flex h-[.42rem] w-[.42rem] items-center justify-center rounded-[.14rem] bg-[#f4f7ff] text-[#5b6cff]">
                                            <UserCog className="h-[.18rem] w-[.18rem]" />
                                        </div>
                                    </div>

                                    <div className="mt-[.14rem] grid gap-[.08rem] md:grid-cols-2">
                                        {accountRows.map((row) => {
                                            const Icon = row.icon;

                                            return (
                                                <div
                                                    key={row.label}
                                                    className="rounded-[.16rem] border border-[#eef2fa] bg-white px-[.14rem] py-[.12rem]"
                                                >
                                                    <div className="flex items-center gap-[.08rem]">
                                                        {Icon && (
                                                            <div className="flex h-[.28rem] w-[.28rem] items-center justify-center rounded-[.1rem] bg-[#f4f7ff] text-[#5b6cff]">
                                                                <Icon className="h-[.14rem] w-[.14rem]" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="text-[.12rem] uppercase tracking-[0.12em] text-[#8a96b5]">
                                                                {row.label}
                                                            </p>
                                                            <p className="mt-[.04rem] text-[.145rem] font-medium text-[#31406c]">
                                                                {row.value}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="rounded-[.2rem] border border-[#edf1f8] bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] p-[.16rem]">
                                    <div className="flex items-start justify-between gap-[.12rem]">
                                        <div>
                                            <h3 className="text-[.2rem] font-semibold text-[#253158]">Password & security</h3>
                                            <p className="mt-[.04rem] text-[.13rem] text-[#7481a4]">
                                                Rotate your password and review the current sign-in protection for this account.
                                            </p>
                                        </div>
                                        <div className="flex h-[.42rem] w-[.42rem] items-center justify-center rounded-[.14rem] bg-[#effbf6] text-[#18b397]">
                                            <KeyRound className="h-[.18rem] w-[.18rem]" />
                                        </div>
                                    </div>

                                    <div className="mt-[.14rem] grid gap-[.08rem] md:grid-cols-2">
                                        <label className="block rounded-[.16rem] border border-[#eef2fa] bg-white px-[.14rem] py-[.11rem]">
                                            <div className="flex flex-col">
                                                <span className="text-[.12rem] uppercase tracking-[0.12em] text-[#8a96b5]">
                                                    Current password
                                                </span>
                                                <input
                                                    type="password"
                                                    defaultValue="password"
                                                    className="mt-[.06rem] w-full bg-transparent text-[.145rem] font-medium text-[#31406c] outline-none"
                                                />
                                            </div>
                                        </label>

                                        <label className="block rounded-[.16rem] border border-[#eef2fa] bg-white px-[.14rem] py-[.11rem]">
                                            <div className="flex flex-col">
                                                <span className="text-[.12rem] uppercase tracking-[0.12em] text-[#8a96b5]">
                                                    New password
                                                </span>
                                                <input
                                                    type="password"
                                                    placeholder="Enter a stronger password"
                                                    className="mt-[.06rem] w-full bg-transparent text-[.145rem] font-medium text-[#31406c] outline-none placeholder:text-[#9aa4bf]"
                                                />
                                            </div>
                                        </label>
                                    </div>

                                    <div className="mt-[.1rem] flex flex-wrap items-center gap-[.08rem]">
                                        <button className="inline-flex h-[.42rem] items-center justify-center rounded-[.14rem] bg-[#5b6cff] px-[.16rem] text-[.14rem] font-semibold text-white transition hover:bg-[#4b5cf0]">
                                            Change password
                                        </button>
                                        <button className="inline-flex h-[.42rem] items-center justify-center rounded-[.14rem] border border-[#e2e8f4] bg-white px-[.16rem] text-[.14rem] font-medium text-[#5c6b93] transition hover:bg-[#f8faff]">
                                            Sign out other sessions
                                        </button>
                                    </div>
                                </div>

                                {settingsSections.map((section) => {
                                    const Icon = section.icon;

                                    return (
                                        <div
                                            key={section.title}
                                            className="rounded-[.2rem] border border-[#edf1f8] bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] p-[.16rem]"
                                        >
                                            <div className="flex items-start justify-between gap-[.12rem]">
                                                <div>
                                                    <h3 className="text-[.2rem] font-semibold text-[#253158]">{section.title}</h3>
                                                    <p className="mt-[.04rem] text-[.13rem] text-[#7481a4]">
                                                        {section.description}
                                                    </p>
                                                </div>
                                                <div className="flex h-[.42rem] w-[.42rem] items-center justify-center rounded-[.14rem] bg-[#f4f7ff] text-[#5b6cff]">
                                                    <Icon className="h-[.18rem] w-[.18rem]" />
                                                </div>
                                            </div>

                                            <div className="mt-[.14rem] space-y-[.08rem]">
                                                {section.items.map((item) => (
                                                    <div
                                                        key={item.label}
                                                        className="flex items-center justify-between gap-[.12rem] rounded-[.16rem] border border-[#eef2fa] bg-[#fbfcff] px-[.14rem] py-[.12rem]"
                                                    >
                                                        <div>
                                                            <p className="text-[.145rem] font-medium text-[#31406c]">{item.label}</p>
                                                        </div>
                                                        <span className={`inline-flex rounded-full border px-[.09rem] py-[.04rem] text-[.12rem] font-semibold ${item.tone}`}>
                                                            {item.value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="space-y-[.14rem]">
                                <div className="rounded-[.2rem] border border-[#edf1f8] bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] p-[.16rem]">
                                    <div className="flex items-start justify-between gap-[.12rem]">
                                        <div>
                                            <h3 className="text-[.2rem] font-semibold text-[#253158]">Security overview</h3>
                                            <p className="mt-[.04rem] text-[.13rem] text-[#7481a4]">
                                                Review core controls protecting HR records and payroll data.
                                            </p>
                                        </div>
                                        <div className="flex h-[.42rem] w-[.42rem] items-center justify-center rounded-[.14rem] bg-[#effbf6] text-[#18b397]">
                                            <ShieldCheck className="h-[.18rem] w-[.18rem]" />
                                        </div>
                                    </div>

                                    <div className="mt-[.14rem] space-y-[.08rem]">
                                        {securityChecks.map((check) => (
                                            <div
                                                key={check.label}
                                                className="flex items-center justify-between gap-[.12rem] rounded-[.16rem] border border-[#eef2fa] bg-white px-[.14rem] py-[.12rem]"
                                            >
                                                <p className="text-[.14rem] font-medium text-[#31406c]">{check.label}</p>
                                                <span className={`text-[.13rem] font-medium ${check.tone}`}>{check.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-[.2rem] border border-[#edf1f8] bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] p-[.16rem]">
                                    <div className="flex items-start justify-between gap-[.12rem]">
                                        <div>
                                            <h3 className="text-[.2rem] font-semibold text-[#253158]">Active sessions</h3>
                                            <p className="mt-[.04rem] text-[.13rem] text-[#7481a4]">
                                                Review recent device access and account activity.
                                            </p>
                                        </div>
                                        <div className="flex h-[.42rem] w-[.42rem] items-center justify-center rounded-[.14rem] bg-[#f4f7ff] text-[#5b6cff]">
                                            <MonitorSmartphone className="h-[.18rem] w-[.18rem]" />
                                        </div>
                                    </div>

                                    <div className="mt-[.14rem] space-y-[.08rem]">
                                        <div className="rounded-[.16rem] border border-[#d9e2ff] bg-[#f4f7ff] px-[.14rem] py-[.12rem]">
                                            <div className="flex items-center justify-between gap-[.12rem]">
                                                <div>
                                                    <p className="text-[.145rem] font-medium text-[#31406c]">This device</p>
                                                    <p className="mt-[.03rem] text-[.125rem] text-[#7481a4]">
                                                        Chrome on Windows • Quezon City
                                                    </p>
                                                </div>
                                                <span className="inline-flex rounded-full border border-[#d9e2ff] bg-white px-[.09rem] py-[.04rem] text-[.12rem] font-semibold text-[#5365f6]">
                                                    Active now
                                                </span>
                                            </div>
                                        </div>

                                        <div className="rounded-[.16rem] border border-[#eef2fa] bg-white px-[.14rem] py-[.12rem]">
                                            <div className="flex items-center justify-between gap-[.12rem]">
                                                <div>
                                                    <p className="text-[.145rem] font-medium text-[#31406c]">Mobile session</p>
                                                    <p className="mt-[.03rem] text-[.125rem] text-[#7481a4]">
                                                        iPhone app • Last active 2 hours ago
                                                    </p>
                                                </div>
                                                <button className="text-[.13rem] font-medium text-[#ef5a63] transition hover:text-[#dc4650]">
                                                    Revoke
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[.2rem] border border-[#edf1f8] bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] p-[.16rem]">
                                    <div className="flex items-start justify-between gap-[.12rem]">
                                        <div>
                                            <h3 className="text-[.2rem] font-semibold text-[#253158]">Quick controls</h3>
                                            <p className="mt-[.04rem] text-[.13rem] text-[#7481a4]">
                                                Apply the most-used workspace protections and approvals.
                                            </p>
                                        </div>
                                        <div className="flex h-[.42rem] w-[.42rem] items-center justify-center rounded-[.14rem] bg-[#fff7e8] text-[#c78211]">
                                            <KeyRound className="h-[.18rem] w-[.18rem]" />
                                        </div>
                                    </div>

                                    <div className="mt-[.14rem] space-y-[.1rem]">
                                        {quickControls.map((control) => (
                                            <div
                                                key={control.label}
                                                className="flex items-center gap-[.12rem] rounded-[.16rem] border border-[#eef2fa] bg-white px-[.14rem] py-[.12rem]"
                                            >
                                                <div className={`relative h-[.24rem] w-[.42rem] shrink-0 rounded-full transition ${control.enabled ? "bg-[#5b6cff]" : "bg-[#dbe2f3]"}`}>
                                                    <span
                                                        className={`absolute top-[.03rem] h-[.18rem] w-[.18rem] rounded-full bg-white shadow-[0_.03rem_.08rem_rgba(15,23,42,0.18)] transition ${control.enabled ? "left-[.21rem]" : "left-[.03rem]"}`}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-[.145rem] font-medium text-[#31406c]">{control.label}</p>
                                                    <p className="mt-[.03rem] text-[.125rem] leading-[1.5] text-[#7a86a7]">
                                                        {control.helper}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-[.2rem] border border-[#e7ebf6] bg-[linear-gradient(135deg,_rgba(91,108,255,0.06),_rgba(24,179,151,0.04))] p-[.16rem]">
                                    <p className="text-[.12rem] font-semibold uppercase tracking-[0.16em] text-[#8090bc]">
                                        Admin workspace
                                    </p>
                                    <h3 className="mt-[.08rem] text-[.24rem] font-semibold text-[#253158]">
                                        Manila Operations Hub
                                    </h3>
                                    <p className="mt-[.06rem] text-[.135rem] leading-[1.6] text-[#6f7b9d]">
                                        Default timezone is Asia/Manila, payroll calendar is monthly, and regulated exports require admin approval.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Main>
    );
};
