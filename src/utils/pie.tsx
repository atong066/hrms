import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const departments = [
    { name: "Engineering", value: 45, color: "#5B6CFF" },
    { name: "Sales", value: 25, color: "#54C7C3" },
    { name: "Marketing", value: 20, color: "#F4B183" },
    { name: "HR", value: 10, color: "#F29CB1" },
];

const EmployeeOverview: React.FC = () => {
    const data = {
        labels: departments.map((department) => department.name),
        datasets: [
            {
                data: departments.map((department) => department.value),
                backgroundColor: departments.map((department) => department.color),
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: "72%",
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
    };

    return (
        <div className="flex h-full flex-col bg-[linear-gradient(180deg,_#ffffff_0%,_#f8faff_100%)] p-[.2rem]">
            <div className="mb-[.14rem] flex items-center justify-between">
                <div>
                    <h3 className="text-[.22rem] font-semibold text-[#26305f]">Employee overview</h3>
                    <p className="mt-[.04rem] text-[.14rem] text-[#7a84a8]">Department distribution</p>
                </div>

                <button className="text-[.13rem] font-medium text-[#5b6cff]">View all</button>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-[.18rem] xl:flex-row">
                <div className="flex items-center justify-center xl:w-[48%]">
                    <div className="relative h-[1.9rem] w-[1.9rem]">
                        <Doughnut data={data} options={options} />

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="font-['Montserrat'] text-[.24rem] font-semibold text-[#26305f]">
                                1,250
                            </span>
                            <span className="text-[.11rem] text-[#8a93b0]">Employees</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 flex-col justify-center gap-[.12rem] text-[.13rem]">
                    {departments.map((department) => (
                        <div key={department.name} className="flex items-center justify-between">
                            <span className="flex items-center gap-[.08rem] text-[#556282]">
                                <span
                                    className="h-[.1rem] w-[.1rem] rounded-full"
                                    style={{ background: department.color }}
                                />
                                {department.name}
                            </span>

                            <span className="font-medium text-[#7a84a8]">{department.value}%</span>
                        </div>
                    ))}

                    <button className="mt-[.04rem] rounded-[.12rem] border border-[#e4e9f5] py-[.08rem] text-[.12rem] font-medium text-[#5b6cff] transition hover:bg-[#f8faff]">
                        View full breakdown
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeOverview;
