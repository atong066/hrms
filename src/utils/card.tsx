import React from "react";
interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    color,
}) => {
    return (
        <div className="bg-white rounded-[.1rem] p-[.2rem]
                    border border-gray-300 
                    h-fit
                    w-max
                    min-w-[3.5rem]
                    shadow-md 
                    hover:shadow-lg 
                    transition-all duration-300 
                    flex items-center gap-[.2rem]">

            <div
                className="w-[.5rem] h-[.5rem] rounded-full flex items-center justify-center shadow"
                style={{ backgroundColor: color }}
            >
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-[.18rem]">{title}</p>
                <h2 className="text-[.20rem] font-semibold text-gray-900">{value}</h2>
            </div>
        </div>
    );
};

export default StatCard;