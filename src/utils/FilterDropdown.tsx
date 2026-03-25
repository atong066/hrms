import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type FilterDropdownProps = {
    label: string;
    icon?: React.ReactNode;
    options: string[];
    value?: string;
    onChange?: (value: string) => void;
};

export const Dropdown = ({ label, icon, options, value, onChange }: FilterDropdownProps) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value ?? "");
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedValue(value ?? "");
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (option: string) => {
        setSelectedValue(option);
        onChange?.(option);
        setOpen(false);
    };

    return (
        <div className="relative min-w-[2.05rem]" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className={`flex h-[.42rem] w-full items-center gap-[.08rem] rounded-[.14rem] border px-[.14rem] text-left transition duration-200 ${
                    open
                        ? "border-[#b9c8ff] bg-[#f6f8ff] shadow-[0_.08rem_.2rem_rgba(83,101,246,0.12)]"
                        : "border-[#e2e8f4] bg-white shadow-[0_.04rem_.12rem_rgba(17,24,39,0.04)] hover:border-[#d5def1] hover:bg-[#fbfcff]"
                }`}
            >
                {icon ? (
                    <span className={`flex h-[.18rem] w-[.18rem] items-center justify-center text-[.15rem] ${open ? "text-[#5b6cff]" : "text-[#7c89ac]"}`}>
                        {icon}
                    </span>
                ) : null}

                <div className="min-w-0">
                    <div className="text-[.1rem] font-semibold uppercase tracking-[0.12em] text-[#94a0bf]">
                        Filter
                    </div>
                    <div className="truncate text-[.145rem] font-medium text-[#39476f]">
                        {selectedValue || label}
                    </div>
                </div>

                <ChevronDown
                    className={`ml-auto h-[.16rem] w-[.16rem] flex-none text-[#8090b5] transition duration-200 ${
                        open ? "rotate-180 text-[#5b6cff]" : ""
                    }`}
                />
            </button>

            <div
                className={`absolute left-0 right-0 top-full z-20 mt-[.06rem] origin-top overflow-hidden rounded-[.16rem] border border-[#e4eaf7] bg-white p-[.06rem] shadow-[0_.16rem_.38rem_rgba(21,32,68,0.12)] transition-all duration-200 ${
                    open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-[.03rem] opacity-0"
                }`}
            >
                <button
                    type="button"
                    onClick={() => handleSelect("")}
                    className={`flex w-full items-center gap-[.08rem] rounded-[.12rem] px-[.12rem] py-[.09rem] text-left text-[.14rem] transition ${
                        selectedValue === ""
                            ? "bg-[#f4f7ff] font-medium text-[#4254da]"
                            : "text-[#5d6b92] hover:bg-[#f8faff] hover:text-[#33436b]"
                    }`}
                >
                    <span className="flex h-[.16rem] w-[.16rem] items-center justify-center">
                        {selectedValue === "" ? <Check className="h-[.14rem] w-[.14rem]" /> : null}
                    </span>
                    <span>All {label.toLowerCase()}</span>
                </button>

                <div className="my-[.04rem] h-px bg-[#eef2fa]" />

                {options.map((option) => {
                    const isSelected = selectedValue === option;

                    return (
                        <button
                            key={option}
                            type="button"
                            onClick={() => handleSelect(option)}
                            className={`flex w-full items-center gap-[.08rem] rounded-[.12rem] px-[.12rem] py-[.09rem] text-left text-[.14rem] transition ${
                                isSelected
                                    ? "bg-[#f4f7ff] font-medium text-[#4254da]"
                                    : "text-[#5d6b92] hover:bg-[#f8faff] hover:text-[#33436b]"
                            }`}
                        >
                            <span className="flex h-[.16rem] w-[.16rem] items-center justify-center">
                                {isSelected ? <Check className="h-[.14rem] w-[.14rem]" /> : null}
                            </span>
                            <span>{option}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
