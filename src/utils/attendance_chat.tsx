import React from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import type { ChartData, ChartOptions, ScriptableContext } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    Tooltip,
    Legend,
);

const AttendanceOverview: React.FC = () => {
    const data: ChartData<"line"> = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: "Salary",
                data: [50, 60, 70, 65, 90, 75, 68],
                borderColor: "#5B5FEF",
                borderWidth: 3,
                fill: true,
                tension: 0.45,
                pointRadius: 0,
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const { chart } = context;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) return "rgba(91,95,239,0.2)";

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, "rgba(91,95,239,0.42)");
                    gradient.addColorStop(1, "rgba(91,95,239,0)");

                    return gradient;
                },
            },
            {
                label: "Benefits",
                data: [45, 55, 65, 80, 75, 60, 70],
                borderColor: "#A88AF7",
                borderWidth: 3,
                fill: true,
                tension: 0.45,
                pointRadius: 0,
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const { chart } = context;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) return "rgba(168,138,247,0.2)";

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, "rgba(168,138,247,0.32)");
                    gradient.addColorStop(1, "rgba(168,138,247,0)");

                    return gradient;
                },
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#1f2a56",
                titleColor: "#ffffff",
                bodyColor: "#dfe6ff",
                padding: 10,
                displayColors: false,
            },
        },
        scales: {
            x: {
                border: { display: false },
                grid: { display: false },
                ticks: {
                    color: "#8a93b0",
                    font: { size: 11 },
                },
            },
            y: {
                min: 40,
                max: 100,
                border: { display: false },
                ticks: {
                    color: "#8a93b0",
                    callback: (value) => `${value}%`,
                    font: { size: 11 },
                },
                grid: {
                    color: "#eceff8",
                    drawTicks: false,
                },
            },
        },
    };

    return (
        <div className="flex h-full flex-col bg-[linear-gradient(180deg,_#ffffff_0%,_#f8faff_100%)] p-[.22rem]">
            <div className="mb-[.16rem] flex items-center justify-between">
                <div>
                    <h2 className="text-[.22rem] font-semibold text-[#26305f]">Attendance overview</h2>
                    <p className="mt-[.04rem] text-[.14rem] text-[#7a84a8]">
                        Presence trends and payroll allocation
                    </p>
                </div>

                <div className="flex gap-[.08rem]">
                    <button className="rounded-[.1rem] bg-[#eef1ff] px-[.12rem] py-[.06rem] text-[.12rem] font-medium text-[#5b6cff]">
                        Weekly
                    </button>
                    <button className="rounded-[.1rem] border border-[#e3e8f5] bg-white px-[.12rem] py-[.06rem] text-[.12rem] text-[#65739a]">
                        Monthly
                    </button>
                    <button className="rounded-[.1rem] border border-[#e3e8f5] bg-white px-[.12rem] py-[.06rem] text-[.12rem] text-[#65739a]">
                        More ▼
                    </button>
                </div>
            </div>

            <div className="flex min-h-0 flex-1 items-stretch gap-[.24rem]">
                <div className="min-h-0 flex-[2.4]">
                    <Line data={data} options={options} />
                </div>

                <div className="w-px bg-[#e8ecf6]" />

                <div className="flex flex-1 flex-col justify-center">
                    <h1 className="font-['Montserrat'] text-[.34rem] font-semibold text-[#26305f]">
                        $48,350
                        <span className="ml-[.05rem] text-[#16C784]">↑</span>
                    </h1>

                    <p className="mb-[.18rem] text-[.13rem] text-[#16C784]">+5.2% versus last month</p>

                    <div className="flex flex-col gap-[.08rem]">
                        <LegendItem color="#5B5FEF" label="Salary" />
                        <LegendItem color="#A88AF7" label="Benefits" />
                        <LegendItem color="#F4B66D" label="Bonus" />
                        <LegendItem color="#E6A5B8" label="Other" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
    <div className="flex items-center gap-[.08rem] text-[.13rem] text-[#667396]">
        <div className="h-[.12rem] w-[.12rem] rounded-full" style={{ background: color }} />
        {label}
    </div>
);

export default AttendanceOverview;
