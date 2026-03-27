import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

const trustPoints = [
    "Centralized employee operations",
    "Attendance and payroll visibility",
    "Role-based secure access",
];

const highlights = [
    { value: "24/7", label: "team access" },
    { value: "12+", label: "HR workflows" },
    { value: "99.9%", label: "uptime target" },
];

export const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const backgroundImage = `${import.meta.env.BASE_URL}images/loginBG2.png`;
    const logoImage = `${import.meta.env.BASE_URL}images/logo.png`;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    const login = () => {
        localStorage.setItem("token", "loggedin");
        navigate("/dashboard", { replace: true });
    };

    return (
        <div className="relative h-screen overflow-hidden bg-[#f4f7fb] text-slate-900">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,91,219,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.12),_transparent_30%),linear-gradient(135deg,_#eef4ff_0%,_#f8fafc_48%,_#edf2ff_100%)]" />

            <div className="relative grid h-full lg:grid-cols-[1.08fr_.92fr]">
                <section className="relative hidden overflow-hidden lg:flex">
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,_rgba(15,23,42,0.9)_0%,_rgba(30,41,59,0.78)_45%,_rgba(37,99,235,0.62)_100%)]" />
                    <img
                        className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-screen"
                        src={backgroundImage}
                        alt="HR dashboard preview background"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.18),_transparent_20%),radial-gradient(circle_at_80%_30%,_rgba(96,165,250,0.18),_transparent_25%)]" />

                    <div className="relative z-10 grid h-full w-full grid-rows-[auto_1fr] px-[.64rem] py-[.36rem] text-white">
                        <div className="space-y-[.18rem]">
                            <div className="inline-flex items-center gap-[.14rem] rounded-full border border-white/20 bg-white/10 px-[.18rem] py-[.09rem] backdrop-blur-md">
                                <img className="h-[.24rem] w-[.24rem]" src={logoImage} alt="HRMS logo" />
                                <span className="font-['Montserrat'] text-[.17rem] font-semibold tracking-[0.18em] text-white/92">
                                    HRMS PORTAL
                                </span>
                            </div>

                            <div className="max-w-[5rem] space-y-[.1rem]">
                                <p className="text-[.16rem] uppercase tracking-[0.24em] text-white/60">
                                    Workforce command center
                                </p>
                                <h1 className="font-['Montserrat'] text-[.44rem] font-semibold leading-[1.03] tracking-[-0.03em]">
                                    Keep people, payroll, and performance moving in sync.
                                </h1>
                                <p className="max-w-[4.1rem] text-[.16rem] leading-[1.5] text-slate-200/90">
                                    One secure place for attendance, leave requests, employee records, and daily HR decisions.
                                </p>
                            </div>

                            <div className="grid max-w-[4.1rem] gap-[.05rem]">
                                {trustPoints.map((point) => (
                                    <div
                                        key={point}
                                        className="flex items-center gap-[.1rem] border-b border-white/12 py-[.07rem] text-[.145rem] text-white/88"
                                    >
                                        <ShieldCheck className="h-[.17rem] w-[.17rem] text-sky-300" strokeWidth={2.2} />
                                        <span>{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex min-h-0 items-end justify-center self-stretch">
                            <div className="relative w-full max-w-[5.2rem] origin-bottom scale-[0.88]">
                                <div className="absolute -left-[.18rem] top-[.12rem] h-[2.8rem] w-[2.8rem] rounded-full bg-sky-400/20 blur-3xl" />
                                <div className="absolute right-[.24rem] top-0 h-[1.5rem] w-[1.5rem] rounded-full bg-indigo-400/20 blur-3xl" />
                                <div className="absolute bottom-[.08rem] right-[.06rem] h-[3.05rem] w-[2.35rem] rounded-full bg-indigo-300/18 blur-[.35rem]" />

                                <div className="relative z-10 mr-[1.18rem] overflow-hidden rounded-[.24rem] border border-white/14 bg-white/10 p-[.1rem] shadow-[0_.24rem_.7rem_rgba(15,23,42,0.24)] backdrop-blur-xl">
                                    <div className="rounded-[.18rem] border border-white/10 bg-slate-950/35 p-[.14rem]">
                                        <div className="flex items-center justify-between border-b border-white/10 pb-[.1rem]">
                                            <div className="space-y-[.04rem]">
                                                <p className="text-[.13rem] uppercase tracking-[0.24em] text-white/55">
                                                    Today
                                                </p>
                                                <p className="font-['Montserrat'] text-[.2rem] font-semibold">
                                                    HR overview
                                                </p>
                                            </div>
                                            <div className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-[.1rem] py-[.04rem] text-[.11rem] text-emerald-100">
                                                8 teams active
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-[.08rem] py-[.1rem]">
                                            {highlights.map((item) => (
                                                <div key={item.label} className="rounded-[.14rem] bg-white/8 p-[.1rem]">
                                                    <p className="font-['Montserrat'] text-[.2rem] font-semibold text-white">
                                                        {item.value}
                                                    </p>
                                                    <p className="mt-[.02rem] text-[.1rem] uppercase tracking-[0.18em] text-white/55">
                                                        {item.label}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="rounded-[.16rem] border border-white/8 bg-white/6 p-[.1rem]">
                                            <div className="flex items-center justify-between text-[.1rem] uppercase tracking-[0.18em] text-white/50">
                                                <span>Live queue</span>
                                                <span>Updated 5 min ago</span>
                                            </div>

                                            <div className="mt-[.08rem] space-y-[.06rem]">
                                                {[
                                                    ["Payroll review", "12 items pending"],
                                                    ["Attendance exceptions", "4 flagged logs"],
                                                    ["Leave approvals", "3 awaiting action"],
                                                ].map(([title, detail]) => (
                                                    <div key={title} className="flex items-center justify-between rounded-[.12rem] bg-black/14 px-[.1rem] py-[.08rem]">
                                                        <div>
                                                            <p className="text-[.13rem] text-white">{title}</p>
                                                            <p className="text-[.11rem] text-slate-300">{detail}</p>
                                                        </div>
                                                        <ArrowRight className="h-[.13rem] w-[.13rem] text-white/70" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative flex h-full items-center justify-center overflow-y-auto px-[.02rem] py-[.08rem] sm:px-[.22rem] sm:py-[.22rem] lg:overflow-hidden lg:px-[.42rem] lg:py-[.16rem]">
                    <div className="flex w-full max-w-[6.15rem] lg:block lg:max-w-[5.4rem]">
                        <div className="flex w-full flex-col rounded-[.26rem] border border-white/60 bg-white/88 p-[.18rem] shadow-[0_.26rem_.8rem_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[.3rem] sm:p-[.24rem] lg:block lg:p-[.28rem]">
                            <div className="flex items-center justify-between">
                                <div className="inline-flex items-center gap-[.12rem] rounded-full bg-slate-900 px-[.16rem] py-[.09rem] text-white lg:hidden">
                                    <img className="h-[.22rem] w-[.22rem]" src={logoImage} alt="HRMS logo" />
                                    <span className="font-['Montserrat'] text-[.16rem] font-semibold tracking-[0.16em]">
                                        HRMS
                                    </span>
                                </div>
                                <div className="hidden text-[.15rem] text-slate-500 lg:block">
                                    Staff access
                                </div>
                            </div>

                            <div className="mt-[.12rem] overflow-hidden rounded-[.22rem] border border-[#dfe6fb] bg-[linear-gradient(135deg,_#f8faff_0%,_#eef3ff_48%,_#f9fbff_100%)] p-[.14rem] lg:hidden">
                                <div className="flex items-start justify-between gap-[.1rem]">
                                    <div>
                                        <p className="text-[.11rem] font-semibold uppercase tracking-[0.18em] text-[#6d79a6]">
                                            HR workspace
                                        </p>
                                        <p className="mt-[.05rem] max-w-[2.6rem] font-['Montserrat'] text-[.24rem] font-semibold leading-[1.08] text-[#1e274b]">
                                            People operations in one secure flow.
                                        </p>
                                    </div>
                                    <div className="rounded-[.12rem] bg-white/85 px-[.1rem] py-[.08rem] text-right shadow-[0_.08rem_.16rem_rgba(83,101,246,0.08)]">
                                        <p className="text-[.1rem] uppercase tracking-[0.12em] text-[#8090bc]">
                                            teams live
                                        </p>
                                        <p className="mt-[.02rem] font-['Montserrat'] text-[.2rem] font-semibold leading-none text-[#3f5ae8]">
                                            08
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-[.12rem] grid grid-cols-3 gap-[.06rem]">
                                    {highlights.map((item) => (
                                        <div key={item.label} className="rounded-[.14rem] border border-[#e3e9fb] bg-white/80 px-[.08rem] py-[.09rem] text-center">
                                            <p className="font-['Montserrat'] text-[.17rem] font-semibold leading-none text-[#23305a]">
                                                {item.value}
                                            </p>
                                            <p className="mt-[.03rem] text-[.095rem] uppercase tracking-[0.08em] text-[#7b86aa]">
                                                {item.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-[.16rem] sm:mt-[.18rem]">
                                <p className="text-[.14rem] uppercase tracking-[0.22em] text-slate-500 sm:text-[.16rem] sm:tracking-[0.24em]">
                                    Welcome back
                                </p>
                                <h2 className="mt-[.06rem] font-['Montserrat'] text-[.32rem] font-semibold leading-[1.06] text-slate-950 sm:text-[.38rem]">
                                    Sign in to your workspace
                                </h2>
                                <p className="mt-[.08rem] max-w-[4.1rem] text-[.15rem] leading-[1.6] text-slate-600 sm:text-[.16rem]">
                                    Access employee records, review requests, and keep daily HR operations on track.
                                </p>
                            </div>

                            <div className="mt-[.18rem] grid gap-[.12rem] sm:mt-[.2rem] sm:gap-[.13rem]">
                                <label className="grid gap-[.08rem]">
                                    <span className="text-[.15rem] font-medium text-slate-700 sm:text-[.16rem]">Email address</span>
                                    <div className="group flex items-center gap-[.12rem] rounded-[.16rem] border border-slate-200 bg-white px-[.14rem] py-[.13rem] transition focus-within:border-[#3b5bdb] focus-within:ring-[.02rem] focus-within:ring-[#3b5bdb]/20 sm:rounded-[.18rem] sm:px-[.16rem] sm:py-[.15rem]">
                                        <Mail className="h-[.2rem] w-[.2rem] text-slate-400 transition group-focus-within:text-[#3b5bdb]" />
                                        <input
                                            className="w-full bg-transparent text-[.16rem] text-slate-800 outline-none placeholder:text-slate-400 sm:text-[.17rem]"
                                            type="email"
                                            placeholder="Enter username"
                                            value={username}
                                            onChange={(event) => setUsername(event.target.value)}
                                        />
                                    </div>
                                </label>

                                <label className="grid gap-[.08rem]">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[.15rem] font-medium text-slate-700 sm:text-[.16rem]">Password</span>
                                        <button
                                            type="button"
                                            className="text-[.14rem] font-medium text-[#3b5bdb] transition hover:text-[#2946ad] sm:text-[.15rem]"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="group flex items-center gap-[.12rem] rounded-[.16rem] border border-slate-200 bg-white px-[.14rem] py-[.13rem] transition focus-within:border-[#3b5bdb] focus-within:ring-[.02rem] focus-within:ring-[#3b5bdb]/20 sm:rounded-[.18rem] sm:px-[.16rem] sm:py-[.15rem]">
                                        <LockKeyhole className="h-[.2rem] w-[.2rem] text-slate-400 transition group-focus-within:text-[#3b5bdb]" />
                                        <input
                                            className="w-full bg-transparent text-[.16rem] text-slate-800 outline-none placeholder:text-slate-400 sm:text-[.17rem]"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter") {
                                                    login();
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((current) => !current)}
                                            className="text-slate-400 transition hover:text-slate-700"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-[.2rem] w-[.2rem]" />
                                            ) : (
                                                <Eye className="h-[.2rem] w-[.2rem]" />
                                            )}
                                        </button>
                                    </div>
                                </label>
                            </div>

                            <div className="mt-[.14rem] flex flex-col gap-[.1rem] text-[.145rem] text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:text-[.15rem]">
                                <label className="flex items-center gap-[.1rem]">
                                    <input
                                        className="h-[.18rem] w-[.18rem] rounded border-slate-300 text-[#3b5bdb] focus:ring-[#3b5bdb]/30"
                                        type="checkbox"
                                        defaultChecked
                                    />
                                    <span>Keep me signed in</span>
                                </label>
                                <span className="w-fit rounded-full bg-emerald-50 px-[.12rem] py-[.06rem] text-[.13rem] font-medium text-emerald-700 sm:text-[.14rem]">
                                    Protected session
                                </span>
                            </div>

                            <div className="mt-[.12rem] flex flex-wrap gap-[.06rem] lg:hidden">
                                {trustPoints.map((point) => (
                                    <span
                                        key={point}
                                        className="inline-flex items-center gap-[.05rem] whitespace-nowrap rounded-full border border-[#dfe6fb] bg-[#f7f9ff] px-[.1rem] py-[.06rem] text-[.108rem] font-medium text-[#5f6e95]"
                                    >
                                        <ShieldCheck className="h-[.12rem] w-[.12rem] text-[#5b6cff]" />
                                        <span>{point}</span>
                                    </span>
                                ))}
                            </div>

                            <button
                                onClick={login}
                                className="mt-[.18rem] inline-flex w-full items-center justify-center gap-[.12rem] rounded-[.18rem] bg-[linear-gradient(135deg,_#2447d5_0%,_#3b5bdb_45%,_#5b7cfa_100%)] py-[.15rem] text-[.17rem] font-semibold text-white shadow-[0_.18rem_.4rem_rgba(37,99,235,0.25)] transition hover:-translate-y-[.01rem] hover:shadow-[0_.22rem_.48rem_rgba(37,99,235,0.3)] sm:rounded-[.2rem] sm:py-[.16rem] sm:text-[.18rem]"
                            >
                                <span>Sign in</span>
                                <ArrowRight className="h-[.18rem] w-[.18rem]" />
                            </button>

                            <div className="mt-[.16rem] border-t border-[#edf1f8] pt-[.14rem] sm:mt-[.18rem] sm:border-t-0 sm:pt-[.18rem]">
                                <div className="flex items-center gap-[.1rem] text-[.13rem] text-slate-500 sm:text-[.14rem]">
                                    <span className="h-px flex-1 bg-slate-200" />
                                    <span className="px-[.06rem] uppercase tracking-[0.2em]">Trusted workspace</span>
                                    <span className="h-px flex-1 bg-slate-200" />
                                </div>

                                <div className="mt-[.12rem] grid grid-cols-3 gap-[.06rem] text-center sm:grid-cols-3 sm:gap-[.1rem]">
                                    {[
                                        ["Secure", "Encrypted access"],
                                        ["Reliable", "Stable operations"],
                                        ["Ready", "Built for scale"],
                                    ].map(([title, detail]) => (
                                        <div key={title} className="rounded-[.14rem] bg-[linear-gradient(180deg,_#fbfcff_0%,_#f6f8fd_100%)] px-[.08rem] py-[.11rem] shadow-[inset_0_0_0_.01rem_rgba(230,235,246,0.9)] sm:rounded-[.16rem] sm:px-[.12rem] sm:py-[.13rem]">
                                            <p className="font-['Montserrat'] text-[.16rem] font-semibold text-slate-900 sm:text-[.2rem]">
                                                {title}
                                            </p>
                                            <p className="mt-[.03rem] text-[.105rem] leading-[1.4] text-slate-500 sm:text-[.12rem]">
                                                {detail}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
