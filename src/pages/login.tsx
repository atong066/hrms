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
    const [error, setError] = useState("");
    const backgroundImage = `${import.meta.env.BASE_URL}images/loginBG2.png`;
    const logoImage = `${import.meta.env.BASE_URL}images/logo.png`;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    const login = () => {
        if (username.trim() === "admin" && password === "admin") {
            localStorage.setItem("token", "loggedin");
            setError("");
            navigate("/dashboard", { replace: true });
            return;
        }

        setError("Use username admin and password admin.");
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

                <section className="relative flex h-full items-center justify-center overflow-hidden px-[.24rem] py-[.24rem] lg:px-[.42rem] lg:py-[.16rem]">
                    <div className="w-full max-w-[5.4rem]">
                        <div className="rounded-[.3rem] border border-white/60 bg-white/82 p-[.24rem] shadow-[0_.26rem_.8rem_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-[.28rem]">
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

                            <div className="mt-[.18rem]">
                                <p className="text-[.16rem] uppercase tracking-[0.24em] text-slate-500">
                                    Welcome back
                                </p>
                                <h2 className="mt-[.06rem] font-['Montserrat'] text-[.38rem] font-semibold leading-[1.06] text-slate-950">
                                    Sign in to your workspace
                                </h2>
                                <p className="mt-[.08rem] max-w-[4.1rem] text-[.16rem] leading-[1.6] text-slate-600">
                                    Access employee records, review requests, and keep daily HR operations on track.
                                </p>
                            </div>

                            <div className="mt-[.2rem] grid gap-[.13rem]">
                                <label className="grid gap-[.08rem]">
                                    <span className="text-[.16rem] font-medium text-slate-700">Email address</span>
                                    <div className="group flex items-center gap-[.12rem] rounded-[.18rem] border border-slate-200 bg-white px-[.16rem] py-[.15rem] transition focus-within:border-[#3b5bdb] focus-within:ring-[.02rem] focus-within:ring-[#3b5bdb]/20">
                                        <Mail className="h-[.2rem] w-[.2rem] text-slate-400 transition group-focus-within:text-[#3b5bdb]" />
                                        <input
                                            className="w-full bg-transparent text-[.17rem] text-slate-800 outline-none placeholder:text-slate-400"
                                            type="email"
                                            placeholder="Enter username"
                                            value={username}
                                            onChange={(event) => setUsername(event.target.value)}
                                        />
                                    </div>
                                </label>

                                <label className="grid gap-[.08rem]">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[.16rem] font-medium text-slate-700">Password</span>
                                        <button
                                            type="button"
                                            className="text-[.15rem] font-medium text-[#3b5bdb] transition hover:text-[#2946ad]"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="group flex items-center gap-[.12rem] rounded-[.18rem] border border-slate-200 bg-white px-[.16rem] py-[.15rem] transition focus-within:border-[#3b5bdb] focus-within:ring-[.02rem] focus-within:ring-[#3b5bdb]/20">
                                        <LockKeyhole className="h-[.2rem] w-[.2rem] text-slate-400 transition group-focus-within:text-[#3b5bdb]" />
                                        <input
                                            className="w-full bg-transparent text-[.17rem] text-slate-800 outline-none placeholder:text-slate-400"
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

                            {error ? (
                                <div className="mt-[.12rem] rounded-[.16rem] border border-[#ffd8dd] bg-[#fff5f6] px-[.14rem] py-[.1rem] text-[.14rem] font-medium text-[#cc4a60]">
                                    {error}
                                </div>
                            ) : null}

                            <div className="mt-[.14rem] flex items-center justify-between text-[.15rem] text-slate-600">
                                <label className="flex items-center gap-[.1rem]">
                                    <input
                                        className="h-[.18rem] w-[.18rem] rounded border-slate-300 text-[#3b5bdb] focus:ring-[#3b5bdb]/30"
                                        type="checkbox"
                                        defaultChecked
                                    />
                                    <span>Keep me signed in</span>
                                </label>
                                <span className="rounded-full bg-emerald-50 px-[.12rem] py-[.06rem] text-[.14rem] font-medium text-emerald-700">
                                    Protected session
                                </span>
                            </div>

                            <button
                                onClick={login}
                                className="mt-[.18rem] inline-flex w-full items-center justify-center gap-[.12rem] rounded-[.2rem] bg-[linear-gradient(135deg,_#2447d5_0%,_#3b5bdb_45%,_#5b7cfa_100%)] py-[.16rem] text-[.18rem] font-semibold text-white shadow-[0_.18rem_.4rem_rgba(37,99,235,0.25)] transition hover:-translate-y-[.01rem] hover:shadow-[0_.22rem_.48rem_rgba(37,99,235,0.3)]"
                            >
                                <span>Sign in</span>
                                <ArrowRight className="h-[.18rem] w-[.18rem]" />
                            </button>

                            <div className="mt-[.18rem] flex items-center gap-[.1rem] text-[.14rem] text-slate-500">
                                <span className="h-px flex-1 bg-slate-200" />
                                <span className="px-[.06rem] uppercase tracking-[0.2em]">Trusted workspace</span>
                                <span className="h-px flex-1 bg-slate-200" />
                            </div>

                            <div className="mt-[.14rem] grid grid-cols-3 gap-[.1rem] text-center">
                                {[
                                    ["Secure", "Encrypted access"],
                                    ["Reliable", "Stable operations"],
                                    ["Ready", "Built for scale"],
                                ].map(([title, detail]) => (
                                    <div key={title} className="rounded-[.16rem] bg-slate-50 px-[.12rem] py-[.13rem]">
                                        <p className="font-['Montserrat'] text-[.2rem] font-semibold text-slate-900">
                                            {title}
                                        </p>
                                        <p className="mt-[.03rem] text-[.12rem] leading-[1.45] text-slate-500">
                                            {detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
