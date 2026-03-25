import { ArrowRight, CalendarDays, CheckCircle2, Clock3, DollarSign, Sparkles, Star, Users } from "lucide-react";
import { Main } from "../layout/main";
import FinanceCard from "../utils/attendance_chat";
import EmployeeOverview from "../utils/pie";

const topMetrics = [
    {
        title: "Total employees",
        value: "1,250",
        detail: "+42 this quarter",
        icon: Users,
        accent: "from-[#4568ff] to-[#6c7dff]",
        surface: "bg-[linear-gradient(135deg,_rgba(69,104,255,0.14),_rgba(108,125,255,0.03))]",
    },
    {
        title: "Attendance rate",
        value: "92.4%",
        detail: "18 employees absent",
        icon: CheckCircle2,
        accent: "from-[#16b39a] to-[#43d2b8]",
        surface: "bg-[linear-gradient(135deg,_rgba(22,179,154,0.14),_rgba(67,210,184,0.03))]",
    },
    {
        title: "Payroll processed",
        value: "$56,750",
        detail: "Next batch in 3 days",
        icon: DollarSign,
        accent: "from-[#f1ad2b] to-[#f6c95d]",
        surface: "bg-[linear-gradient(135deg,_rgba(241,173,43,0.14),_rgba(246,201,93,0.03))]",
    },
    {
        title: "Avg. performance",
        value: "4.2 / 5",
        detail: "27 reviews pending",
        icon: Star,
        accent: "from-[#8d63ff] to-[#b088ff]",
        surface: "bg-[linear-gradient(135deg,_rgba(141,99,255,0.14),_rgba(176,136,255,0.03))]",
    },
];

const leaveRequests = [
    {
        name: "Janet Lee",
        role: "Product Design",
        type: "Vacation leave",
        date: "Apr 30, 2026",
        days: "3 days",
        avatar: 32,
    },
    {
        name: "Adam Smith",
        role: "Engineering",
        type: "Sick leave",
        date: "May 2, 2026",
        days: "1 day",
        avatar: 14,
    },
    {
        name: "Samuel Brown",
        role: "Operations",
        type: "Emergency leave",
        date: "May 4, 2026",
        days: "2 days",
        avatar: 51,
    },
    {
        name: "Alice Turner",
        role: "People Ops",
        type: "Maternity leave",
        date: "May 6, 2026",
        days: "Start review",
        avatar: 44,
    },
];

const events = [
    {
        title: "Interview with Janet Lee",
        time: "Today, 3:00 PM",
        icon: CalendarDays,
        tone: "text-[#5b6cff] bg-[#eef1ff]",
    },
    {
        title: "Payroll processing",
        time: "April 30, 2026",
        icon: DollarSign,
        tone: "text-[#e6a62c] bg-[#fff5de]",
    },
    {
        title: "Performance review with Adam",
        time: "May 2, 2026",
        icon: Sparkles,
        tone: "text-[#1ea488] bg-[#e5faf4]",
    },
];

const openPositions = [
    { title: "Software Engineer", meta: "IT · 2 candidates" },
    { title: "HR Coordinator", meta: "People · 4 candidates" },
];

const reviews = [
    {
        name: "Virgilio Galicia",
        team: "People Operations",
        cycle: "April 2026",
        status: "Completed",
        rating: 5,
        avatar: 12,
    },
    {
        name: "Janet Lee",
        team: "Product Design",
        cycle: "April 2026",
        status: "Pending",
        rating: 4,
        avatar: 32,
    },
    {
        name: "Adam Smith",
        team: "Engineering",
        cycle: "March 2026",
        status: "Completed",
        rating: 4,
        avatar: 14,
    },
];

export const Dashboard = () => {
    return (
        <Main>
            <section className="h-full overflow-auto bg-[linear-gradient(180deg,_#f8faff_0%,_#f5f7fb_100%)] p-[.28rem]">
                <div className="flex min-h-full flex-col gap-[.18rem]">
                    <div className="rounded-[.24rem] border border-[#e5e9f5] bg-[linear-gradient(135deg,_#ffffff_0%,_#f7f9ff_100%)] p-[.2rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div className="flex items-start justify-between gap-[.2rem]">
                            <div className="max-w-[5.8rem]">
                                <p className="text-[.14rem] font-medium uppercase tracking-[0.18em] text-[#6c78a6]">
                                    Workforce pulse
                                </p>
                                <h2 className="mt-[.06rem] font-['Montserrat'] text-[.38rem] font-semibold leading-[1.08] text-[#232b57]">
                                    Key HR metrics and actions for this week
                                </h2>
                                <p className="mt-[.08rem] text-[.16rem] leading-[1.6] text-[#6c7598]">
                                    Track attendance, payroll, and review cycles from one clearer operating view.
                                </p>
                            </div>

                            <button className="inline-flex items-center gap-[.08rem] rounded-[.12rem] border border-[#dce3f6] bg-white px-[.14rem] py-[.1rem] text-[.15rem] font-medium text-[#5b6cff] shadow-sm transition hover:bg-[#f5f7ff]">
                                <CalendarDays className="h-[.16rem] w-[.16rem]" />
                                <span>View calendar</span>
                            </button>
                        </div>

                        <div className="mt-[.18rem] grid gap-[.12rem] xl:grid-cols-4">
                            {topMetrics.map((metric) => {
                                const Icon = metric.icon;

                                return (
                                    <div
                                        key={metric.title}
                                        className={`rounded-[.18rem] border border-[#e7ebf6] p-[.16rem] ${metric.surface}`}
                                    >
                                        <div className="flex items-start justify-between gap-[.12rem]">
                                            <div>
                                                <p className="text-[.14rem] font-medium text-[#6c7598]">
                                                    {metric.title}
                                                </p>
                                                <p className="mt-[.06rem] font-['Montserrat'] text-[.34rem] font-semibold text-[#232b57]">
                                                    {metric.value}
                                                </p>
                                            </div>
                                            <div className={`flex h-[.46rem] w-[.46rem] items-center justify-center rounded-[.14rem] bg-gradient-to-br ${metric.accent} text-white shadow-[0_.08rem_.18rem_rgba(59,91,219,0.18)]`}>
                                                <Icon className="h-[.22rem] w-[.22rem]" />
                                            </div>
                                        </div>
                                        <p className="mt-[.08rem] text-[.13rem] text-[#7280a7]">
                                            {metric.detail}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid flex-1 gap-[.18rem] xl:grid-cols-[1.7fr_.82fr]">
                        <div className="grid min-h-0 gap-[.18rem]">
                            <div className="grid min-h-0 gap-[.18rem] xl:grid-cols-[.88fr_1.12fr]">
                                <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white p-[.18rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-[.22rem] font-semibold text-[#26305f]">
                                                Leave requests
                                            </h3>
                                            <p className="mt-[.04rem] text-[.14rem] text-[#7a84a8]">
                                                Approval queue for this week
                                            </p>
                                        </div>
                                        <button className="inline-flex items-center gap-[.06rem] text-[.14rem] font-medium text-[#5b6cff]">
                                            <span>View all</span>
                                            <ArrowRight className="h-[.14rem] w-[.14rem]" />
                                        </button>
                                    </div>

                                    <div className="mt-[.14rem] flex flex-col gap-[.08rem]">
                                        {leaveRequests.map((request) => (
                                            <div
                                                key={`${request.name}-${request.date}`}
                                                className="flex items-center justify-between rounded-[.16rem] border border-[#eef1f7] bg-[#fbfcff] px-[.12rem] py-[.12rem] transition hover:border-[#d9e1f8] hover:bg-white"
                                            >
                                                <div className="flex items-center gap-[.12rem]">
                                                    <img
                                                        src={`https://i.pravatar.cc/56?img=${request.avatar}`}
                                                        className="h-[.46rem] w-[.46rem] rounded-full border border-[#dde3f5]"
                                                        alt={request.name}
                                                    />
                                                    <div>
                                                        <p className="text-[.16rem] font-semibold text-[#24305b]">
                                                            {request.name}
                                                        </p>
                                                        <p className="text-[.13rem] text-[#7c86a8]">
                                                            {request.role} · {request.type}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-[.14rem] font-medium text-[#4d5b89]">
                                                        {request.date}
                                                    </p>
                                                    <p className="text-[.13rem] text-[#8a93b0]">
                                                        {request.days}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="min-h-0 overflow-hidden rounded-[.24rem] border border-[#e5e9f5] bg-white shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                                    <FinanceCard />
                                </div>
                            </div>

                            <div className="grid min-h-0 gap-[.18rem] xl:grid-cols-[1.35fr_.78fr]">
                                <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white p-[.18rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-[.22rem] font-semibold text-[#26305f]">
                                                Performance summary
                                            </h3>
                                            <p className="mt-[.04rem] text-[.14rem] text-[#7a84a8]">
                                                Latest review cycles and completion status
                                            </p>
                                        </div>
                                        <button className="inline-flex items-center gap-[.06rem] text-[.14rem] font-medium text-[#5b6cff]">
                                            <span>View all</span>
                                            <ArrowRight className="h-[.14rem] w-[.14rem]" />
                                        </button>
                                    </div>

                                    <div className="mt-[.14rem] overflow-hidden rounded-[.18rem] border border-[#edf1f8]">
                                        <div className="grid grid-cols-[1.55fr_1fr_.92fr_.9fr] bg-[#f8faff] px-[.14rem] py-[.1rem] text-[.13rem] font-medium uppercase tracking-[0.08em] text-[#7c86a8]">
                                            <span>Team member</span>
                                            <span>Department</span>
                                            <span>Status</span>
                                            <span>Rating</span>
                                        </div>

                                        {reviews.map((review) => (
                                            <div
                                                key={`${review.name}-${review.cycle}`}
                                                className="grid grid-cols-[1.55fr_1fr_.92fr_.9fr] items-center border-t border-[#edf1f8] px-[.14rem] py-[.12rem]"
                                            >
                                                <div className="flex items-center gap-[.1rem]">
                                                    <img
                                                        src={`https://i.pravatar.cc/48?img=${review.avatar}`}
                                                        className="h-[.4rem] w-[.4rem] rounded-full border border-[#dde3f5]"
                                                        alt={review.name}
                                                    />
                                                    <div>
                                                        <p className="text-[.15rem] font-semibold text-[#24305b]">
                                                            {review.name}
                                                        </p>
                                                        <p className="text-[.13rem] text-[#7d87a9]">
                                                            {review.cycle}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-[.14rem] font-medium text-[#4d5b89]">
                                                        {review.team}
                                                    </p>
                                                </div>

                                                <div className="flex">
                                                    <span
                                                        className={`inline-flex rounded-full px-[.1rem] py-[.05rem] text-[.12rem] font-semibold ${
                                                            review.status === "Completed"
                                                                ? "bg-[#e6faf2] text-[#1f9a74]"
                                                                : "bg-[#fff3d8] text-[#d39114]"
                                                        }`}
                                                    >
                                                        {review.status}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-[.04rem] text-[#f0b431]">
                                                    {Array.from({ length: 5 }, (_, index) => (
                                                        <Star
                                                            key={index}
                                                            className={`h-[.15rem] w-[.15rem] ${
                                                                index < review.rating ? "fill-current" : "text-[#d9dfef]"
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="min-h-0 overflow-hidden rounded-[.24rem] border border-[#e5e9f5] bg-white shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                                    <EmployeeOverview />
                                </div>
                            </div>
                        </div>

                        <aside className="grid min-h-0 gap-[.18rem]">
                            <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white p-[.18rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-[.22rem] font-semibold text-[#26305f]">
                                            Events
                                        </h3>
                                        <p className="mt-[.04rem] text-[.14rem] text-[#7a84a8]">
                                            Upcoming moments that need attention
                                        </p>
                                    </div>
                                    <button className="rounded-[.1rem] bg-[#eef1ff] px-[.12rem] py-[.07rem] text-[.13rem] font-medium text-[#5b6cff]">
                                        Open all
                                    </button>
                                </div>

                                <div className="mt-[.14rem] flex flex-col gap-[.1rem]">
                                    {events.map((event) => {
                                        const Icon = event.icon;

                                        return (
                                            <div
                                                key={event.title}
                                                className="flex items-start gap-[.12rem] rounded-[.16rem] border border-[#eef1f7] bg-[#fbfcff] px-[.12rem] py-[.12rem]"
                                            >
                                                <div className={`flex h-[.36rem] w-[.36rem] items-center justify-center rounded-[.12rem] ${event.tone}`}>
                                                    <Icon className="h-[.16rem] w-[.16rem]" />
                                                </div>
                                                <div>
                                                    <p className="text-[.15rem] font-semibold text-[#24305b]">
                                                        {event.title}
                                                    </p>
                                                    <p className="mt-[.03rem] text-[.13rem] text-[#7d87a9]">
                                                        {event.time}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white p-[.18rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-[.22rem] font-semibold text-[#26305f]">
                                            Open positions
                                        </h3>
                                        <p className="mt-[.04rem] text-[.14rem] text-[#7a84a8]">
                                            Hiring pipeline snapshot
                                        </p>
                                    </div>
                                    <button className="text-[.13rem] font-medium text-[#5b6cff]">
                                        Manage
                                    </button>
                                </div>

                                <div className="mt-[.14rem] flex flex-col gap-[.1rem]">
                                    {openPositions.map((position) => (
                                        <div
                                            key={position.title}
                                            className="rounded-[.16rem] border border-[#eef1f7] bg-[#fbfcff] px-[.14rem] py-[.12rem]"
                                        >
                                            <p className="text-[.16rem] font-semibold text-[#24305b]">
                                                {position.title}
                                            </p>
                                            <p className="mt-[.04rem] text-[.13rem] text-[#7d87a9]">
                                                {position.meta}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[.24rem] border border-[#dfe5fb] bg-[linear-gradient(135deg,_#5365f6_0%,_#6e6dff_100%)] p-[.18rem] text-white shadow-[0_.12rem_.32rem_rgba(83,101,246,0.22)]">
                                <div className="flex items-start justify-between gap-[.12rem]">
                                    <div>
                                        <p className="text-[.14rem] uppercase tracking-[0.14em] text-white/70">
                                            Next action
                                        </p>
                                        <h3 className="mt-[.06rem] font-['Montserrat'] text-[.24rem] font-semibold leading-[1.2]">
                                            Payroll closes in 72 hours
                                        </h3>
                                        <p className="mt-[.08rem] text-[.14rem] leading-[1.55] text-white/80">
                                            Review overtime flags and finalize adjustments before cutoff.
                                        </p>
                                    </div>
                                    <Clock3 className="h-[.22rem] w-[.22rem] text-white/80" />
                                </div>

                                <button className="mt-[.16rem] inline-flex items-center gap-[.08rem] rounded-[.12rem] bg-white/14 px-[.14rem] py-[.1rem] text-[.14rem] font-medium text-white transition hover:bg-white/20">
                                    <span>Open payroll workspace</span>
                                    <ArrowRight className="h-[.14rem] w-[.14rem]" />
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </Main>
    );
};
