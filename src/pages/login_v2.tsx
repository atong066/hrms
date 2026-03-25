import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

const overviewStats = [
    { value: "3", label: "Pending Requests", tone: "text-amber-500" },
    { value: "5", label: "Upcoming Leaves", tone: "text-cyan-500" },
    { value: "2", label: "Today's Leaves", tone: "text-pink-500" },
];

const leaveRows = [
    { name: "Janet Lee", type: "Vacation", status: "Pending" },
    { name: "Adam Smith", type: "Sick Leave", status: "Pending" },
    { name: "Samuel Brown", type: "Emergency Leave", status: "Approved" },
    { name: "Alice Turner", type: "Maternity Leave", status: "Rejected" },
];

const statusStyles: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-700",
    Approved: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-pink-100 text-pink-700",
};

export const LoginV2 = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const login = () => {
        localStorage.setItem("token", "loggedin");
        navigate("/dashboard");
    };

    return (
        <div className="relative h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#c9b7ff_0%,_#b69cf6_22%,_#9f8ae6_48%,_#8778d4_100%)] text-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.35),_transparent_28%),radial-gradient(circle_at_80%_80%,_rgba(255,255,255,0.18),_transparent_24%)]" />

            <div className="relative flex h-full items-center justify-center px-[.24rem] py-[.24rem]">
                <div className="grid h-full max-h-[8.7rem] w-full max-w-[16rem] overflow-hidden rounded-[.3rem] bg-white/14 shadow-[0_.3rem_1rem_rgba(47,28,110,0.28)] backdrop-blur-[.08rem] lg:grid-cols-[1fr_1.65fr]">
                    <section className="flex h-full flex-col justify-center bg-[linear-gradient(180deg,_rgba(255,255,255,0.94)_0%,_rgba(249,245,255,0.96)_100%)] px-[.42rem] py-[.34rem] sm:px-[.52rem] lg:px-[.48rem]">
                        <div className="mx-auto w-full max-w-[4.7rem]">
                            <div className="flex items-center gap-[.14rem]">
                                <img className="h-[.42rem] w-[.42rem]" src="/images/logo.png" alt="HRMS logo" />
                                <span className="font-['Montserrat'] text-[.38rem] font-semibold tracking-[-0.02em] text-[#5951d6]">
                                    HRMS
                                </span>
                            </div>

                            <h1 className="mt-[.34rem] text-[.34rem] font-medium text-[#5d549f]">
                                Welcome Back!
                            </h1>

                            <div className="mt-[.26rem] rounded-[.18rem] border border-[#e4ddfb] bg-white/75 px-[.22rem] py-[.22rem] shadow-[0_.08rem_.24rem_rgba(127,96,210,0.08)]">
                                <div className="grid gap-[.18rem]">
                                    <label className="grid gap-[.08rem]">
                                        <span className="text-[.17rem] font-medium text-[#685f9d]">Email Address</span>
                                        <div className="flex items-center gap-[.12rem] rounded-[.12rem] border border-[#e1daf7] bg-[#fbf9ff] px-[.16rem] py-[.14rem]">
                                            <Mail className="h-[.18rem] w-[.18rem] text-[#9b93c8]" />
                                            <input
                                                className="w-full bg-transparent text-[.17rem] text-slate-700 outline-none placeholder:text-[#a29bc8]"
                                                type="email"
                                                placeholder="example@company.com"
                                            />
                                        </div>
                                    </label>

                                    <label className="grid gap-[.08rem]">
                                        <span className="text-[.17rem] font-medium text-[#685f9d]">Password</span>
                                        <div className="flex items-center gap-[.12rem] rounded-[.12rem] border border-[#e1daf7] bg-[#fbf9ff] px-[.16rem] py-[.14rem]">
                                            <LockKeyhole className="h-[.18rem] w-[.18rem] text-[#9b93c8]" />
                                            <input
                                                className="w-full bg-transparent text-[.17rem] text-slate-700 outline-none placeholder:text-[#a29bc8]"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((current) => !current)}
                                                className="text-[#9b93c8] transition hover:text-[#6d63ca]"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-[.18rem] w-[.18rem]" />
                                                ) : (
                                                    <Eye className="h-[.18rem] w-[.18rem]" />
                                                )}
                                            </button>
                                        </div>
                                    </label>
                                </div>

                                <div className="mt-[.12rem] text-right">
                                    <button type="button" className="text-[.15rem] text-[#6764e7] transition hover:text-[#4d48d8]">
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    onClick={login}
                                    className="mt-[.18rem] w-full rounded-[.12rem] bg-[linear-gradient(180deg,_#6575ff_0%,_#5263f0_100%)] py-[.16rem] text-[.2rem] font-semibold text-white shadow-[0_.12rem_.3rem_rgba(89,81,214,0.26)] transition hover:brightness-105"
                                >
                                    Log In
                                </button>
                            </div>

                            <p className="mt-[.18rem] text-center text-[.16rem] text-[#7d75a7]">
                                Don't have an account?{" "}
                                <button type="button" className="font-medium text-[#5c56de] hover:text-[#4941d4]">
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    </section>

                    <section className="relative hidden h-full overflow-hidden lg:block">
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.22)_0%,_rgba(255,255,255,0.08)_100%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,_rgba(255,255,255,0.34),_transparent_18%),radial-gradient(circle_at_78%_22%,_rgba(255,255,255,0.24),_transparent_16%),radial-gradient(circle_at_70%_70%,_rgba(255,255,255,0.14),_transparent_18%)]" />

                        <div className="relative flex h-full items-center justify-center p-[.34rem]">
                            <div className="relative h-full w-full max-w-[8.9rem]">
                                <div className="absolute left-[.2rem] top-[.48rem] h-[.34rem] w-[.34rem] rounded-[.1rem] border border-white/20 bg-white/18" />
                                <div className="absolute left-[4.75rem] top-[.44rem] h-[.18rem] w-[.18rem] rounded-full bg-white/25" />
                                <div className="absolute right-[1.08rem] top-[.5rem] h-[.32rem] w-[.32rem] rounded-[.1rem] border border-white/20 bg-white/18" />
                                <div className="absolute right-[.52rem] top-[1.18rem] h-[.26rem] w-[.26rem] rounded-[.08rem] border border-white/16 bg-white/14" />
                                <div className="absolute right-[.8rem] bottom-[1.34rem] h-[.26rem] w-[.26rem] rounded-[.08rem] border border-white/16 bg-white/14" />

                                <div className="absolute left-[.8rem] top-[1.3rem] h-[5.1rem] w-[5.95rem] rounded-[.32rem] border border-white/18 bg-[linear-gradient(180deg,_rgba(255,255,255,0.16)_0%,_rgba(255,255,255,0.06)_100%)] p-[.18rem] shadow-[0_.25rem_.8rem_rgba(93,76,174,0.18)] backdrop-blur-sm">
                                    <div className="h-full rounded-[.22rem] bg-[linear-gradient(180deg,_rgba(255,255,255,0.92)_0%,_rgba(244,239,255,0.94)_100%)] shadow-[0_.12rem_.28rem_rgba(94,73,177,0.14)]">
                                        <div className="flex items-center justify-between rounded-t-[.22rem] bg-[linear-gradient(90deg,_#7d63f0_0%,_#915fe5_100%)] px-[.18rem] py-[.12rem] text-white">
                                            <div className="flex items-center gap-[.1rem]">
                                                <img className="h-[.2rem] w-[.2rem]" src="/images/logo.png" alt="HRMS logo" />
                                                <span className="text-[.18rem] font-medium">HRMS</span>
                                            </div>
                                            <div className="flex items-center gap-[.08rem]">
                                                <span className="h-[.12rem] w-[.12rem] rounded-full bg-white/80" />
                                                <span className="h-[.12rem] w-[.12rem] rounded-full bg-white/65" />
                                                <span className="h-[.12rem] w-[.12rem] rounded-full bg-white/50" />
                                            </div>
                                        </div>

                                        <div className="p-[.16rem]">
                                            <div className="grid grid-cols-3 gap-[.1rem]">
                                                {overviewStats.map((item) => (
                                                    <div key={item.label} className="rounded-[.12rem] bg-[#f4edff] px-[.14rem] py-[.12rem]">
                                                        <div className={`text-[.18rem] font-semibold ${item.tone}`}>{item.value}</div>
                                                        <div className="mt-[.03rem] text-[.11rem] leading-[1.35] text-[#7c739e]">
                                                            {item.label}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-[.12rem] flex items-center justify-between rounded-[.12rem] bg-white px-[.14rem] py-[.1rem] text-[.12rem] text-[#786fa2] shadow-[inset_0_0_0_1px_rgba(140,129,193,0.12)]">
                                                <span>Apr 1, 2024 - Apr 30, 2024</span>
                                                <span>▾</span>
                                            </div>

                                            <div className="mt-[.12rem] flex items-center gap-[.22rem] border-b border-[#e9e1fb] pb-[.08rem] text-[.12rem] text-[#8a82ae]">
                                                <span className="border-b-[.02rem] border-[#7665e8] pb-[.05rem] text-[#5f57d3]">Ongoing</span>
                                                <span>Pending (3)</span>
                                                <span>History</span>
                                            </div>

                                            <div className="mt-[.1rem] space-y-[.08rem]">
                                                {leaveRows.map((row) => (
                                                    <div key={row.name} className="grid grid-cols-[1.6fr_1.2fr_1fr] items-center gap-[.08rem] rounded-[.1rem] px-[.08rem] py-[.08rem] text-[.11rem] text-[#756c99]">
                                                        <div className="flex items-center gap-[.08rem]">
                                                            <span className="h-[.28rem] w-[.28rem] rounded-full bg-[linear-gradient(180deg,_#f3bfd8_0%,_#d685b4_100%)]" />
                                                            <span className="truncate">{row.name}</span>
                                                        </div>
                                                        <span className="truncate">{row.type}</span>
                                                        <span className={`w-fit rounded-full px-[.08rem] py-[.04rem] text-[.1rem] ${statusStyles[row.status]}`}>
                                                            {row.status}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <img
                                    className="absolute bottom-[.18rem] right-[.1rem] h-[4.5rem] object-contain drop-shadow-[0_.16rem_.28rem_rgba(98,78,185,0.2)]"
                                    src="/images/meeting.png"
                                    alt="HRMS dashboard illustration"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
