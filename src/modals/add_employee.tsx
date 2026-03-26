import { useEffect, useRef, useState } from "react";
import { Calendar, Check, ChevronDown, Mail, Phone, X } from "lucide-react";
import { Modal } from "../utils/modal";

type EmployeeFormData = {
    id?: number;
    name: string;
    email: string;
    address?: string;
    phone?: string;
    department?: string;
    role?: string;
    salary?: string;
    status?: string;
    hireDate?: string;
};

export const AddEmployeeModal = ({
    status,
    open,
    employee,
    mode = "create",
}: {
    status: boolean;
    open: (open: boolean) => void;
    employee?: EmployeeFormData | null;
    mode?: "create" | "edit";
}) => {
    const [firstName = "", ...lastNameParts] = (employee?.name ?? "").split(" ");
    const lastName = lastNameParts.join(" ");
    const title = mode === "edit" ? "Edit Employee" : "Add Employee";
    const subtitle =
        mode === "edit" ? "Update the employee details and save your changes." : "Fill out the details to add a new employee";
    const actionLabel = mode === "edit" ? "Save Changes" : "Add Employee";

    return (
        <Modal open={status}>
            <div className="w-[6.5rem] overflow-visible rounded-[.18rem] border border-[#dce3f3] bg-white shadow-[0_.24rem_.6rem_rgba(15,23,42,0.16)]">
                <div className="flex items-start justify-between border-b border-[#edf1f8] px-[.18rem] py-[.14rem]">
                    <div>
                        <h2 className="font-['Montserrat'] text-[.24rem] font-semibold leading-[1.1] text-[#24305b]">
                            {title}
                        </h2>
                        <p className="mt-[.03rem] text-[.13rem] text-[#6f7d9e]">{subtitle}</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => open(false)}
                        className="flex h-[.32rem] w-[.32rem] items-center justify-center rounded-full text-[#7a86a7] transition hover:bg-[#f5f7fc] hover:text-[#4d5c86]"
                    >
                        <X className="h-[.18rem] w-[.18rem]" />
                    </button>
                </div>

                <div className="relative z-10 max-h-[5.9rem] overflow-auto px-[.18rem] py-[.14rem]">
                    <div className="grid gap-[.16rem]">
                        <FormSection title="Personal Information">
                            <div className="grid gap-[.1rem] sm:grid-cols-2">
                                <InputField label="First Name" required placeholder="Enter first name" defaultValue={firstName} />
                                <InputField label="Last Name" placeholder="Enter last name" defaultValue={lastName} />
                                <InputField
                                    label="Email Address"
                                    required
                                    placeholder="Enter email address"
                                    defaultValue={employee?.email}
                                    icon={<Mail className="h-[.14rem] w-[.14rem]" />}
                                />
                                <PhoneField defaultValue={employee?.phone} />
                                <SelectField label="Gender" placeholder="Select gender" options={["Male", "Female", "Non-binary"]} />
                                <SelectField label="Marital Status" placeholder="Select status" options={["Single", "Married", "Separated", "Widowed"]} />
                            </div>
                        </FormSection>

                        <FormSection title="Employment Details">
                            <div className="grid gap-[.1rem] sm:grid-cols-2">
                                <SelectField
                                    label="Department"
                                    required
                                    placeholder="Select department"
                                    value={employee?.department}
                                    options={["Engineering", "People Ops", "Finance", "Design", "Operations", "Marketing"]}
                                />
                                <SelectField
                                    label="Position/Role"
                                    required
                                    placeholder="Select role"
                                    value={employee?.role}
                                    options={["Software Engineer", "Product Designer", "Financial Analyst", "HR Coordinator", "Operations Lead"]}
                                />
                                <InputField label="Employee ID" placeholder="Auto-generated" defaultValue={employee?.id ? `EMP-${String(employee.id).padStart(4, "0")}` : ""} />
                                <DateInputField label="Hire Date" required defaultValue={employee?.hireDate} />
                                <SelectField label="Employment Type" placeholder="Select type" options={["Full-time", "Part-time", "Contract", "Intern"]} />
                                <SelectField
                                    label="Status"
                                    placeholder="Select status"
                                    value={employee?.status ?? "Active"}
                                    options={["Active", "Inactive", "Probation"]}
                                    tone={employee?.status === "Inactive" ? "default" : "status"}
                                />
                            </div>
                        </FormSection>

                        <FormSection title="Additional Information">
                            <div className="grid gap-[.1rem] sm:grid-cols-2">
                                <TextAreaField label="Address" placeholder="Enter address" defaultValue={employee?.address} />
                                <TextAreaField label="Notes (Optional)" placeholder="Add any notes..." />
                            </div>
                        </FormSection>
                    </div>
                </div>

                <div className="relative z-0 flex items-center justify-end gap-[.1rem] border-t border-[#edf1f8] px-[.18rem] py-[.14rem]">
                    <button
                        type="button"
                        onClick={() => open(false)}
                        className="inline-flex h-[.38rem] items-center rounded-[.1rem] border border-[#dce3f3] bg-white px-[.16rem] text-[.14rem] font-medium text-[#5e6d94] transition hover:bg-[#f8faff]"
                    >
                        Cancel
                    </button>
                    <button className="inline-flex h-[.38rem] items-center rounded-[.1rem] bg-[linear-gradient(135deg,_#4859f0_0%,_#5a5df6_100%)] px-[.18rem] text-[.14rem] font-medium text-white shadow-[0_.12rem_.24rem_rgba(72,89,240,0.22)] transition hover:brightness-105">
                        {actionLabel}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section>
            <div className="mb-[.08rem] border-b border-[#edf1f8] pb-[.06rem]">
                <h3 className="text-[.15rem] font-semibold text-[#2a3763]">{title}</h3>
            </div>
            {children}
        </section>
    );
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
    return (
        <label className="mb-[.05rem] block text-[.115rem] font-semibold text-[#495882]">
            {label}
            {required ? <span className="ml-[.02rem] text-[#f05a67]">*</span> : null}
        </label>
    );
}

function InputShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-[.38rem] items-center gap-[.08rem] rounded-[.08rem] border border-[#dde5f2] bg-white px-[.11rem] text-[#7f8dad] shadow-[0_.02rem_.08rem_rgba(15,23,42,0.03)] transition focus-within:border-[#bcc8f6] focus-within:shadow-[0_.08rem_.2rem_rgba(83,101,246,0.08)]">
            {children}
        </div>
    );
}

function InputField({
    label,
    placeholder,
    defaultValue,
    required,
    icon,
}: {
    label: string;
    placeholder: string;
    defaultValue?: string;
    required?: boolean;
    icon?: React.ReactNode;
}) {
    return (
        <div>
            <FieldLabel label={label} required={required} />
            <InputShell>
                {icon ? <span className="text-[#8b97b4]">{icon}</span> : null}
                <input
                    type="text"
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-[.135rem] text-[#2d385d] outline-none placeholder:text-[#98a4c0]"
                />
            </InputShell>
        </div>
    );
}

function PhoneField({ defaultValue }: { defaultValue?: string }) {
    return (
        <div>
            <FieldLabel label="Phone Number" />
            <InputShell>
                <div className="flex items-center gap-[.05rem] pr-[.08rem] text-[.135rem] text-[#556387]">
                    <span className="text-[.15rem]">🇺🇸</span>
                    <ChevronDown className="h-[.13rem] w-[.13rem] text-[#94a0bc]" />
                </div>
                <div className="h-[.18rem] w-px bg-[#e5ebf6]" />
                <Phone className="h-[.14rem] w-[.14rem] text-[#8b97b4]" />
                <input
                    type="text"
                    defaultValue={defaultValue}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-transparent text-[.135rem] text-[#2d385d] outline-none placeholder:text-[#98a4c0]"
                />
            </InputShell>
        </div>
    );
}

function DateInputField({
    label,
    defaultValue,
    required,
}: {
    label: string;
    defaultValue?: string;
    required?: boolean;
}) {
    return (
        <div>
            <FieldLabel label={label} required={required} />
            <InputShell>
                <Calendar className="h-[.14rem] w-[.14rem] text-[#8b97b4]" />
                <input
                    type="date"
                    defaultValue={defaultValue}
                    className="w-full bg-transparent text-[.135rem] text-[#2d385d] outline-none [color-scheme:light]"
                />
            </InputShell>
        </div>
    );
}

function SelectField({
    label,
    placeholder,
    options,
    value,
    required,
    tone = "default",
}: {
    label: string;
    placeholder: string;
    options: string[];
    value?: string;
    required?: boolean;
    tone?: "default" | "status";
}) {
    const [open, setOpen] = useState(false);
    const [openAbove, setOpenAbove] = useState(false);
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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getScrollParent = (element: HTMLElement | null) => {
        let current = element?.parentElement ?? null;

        while (current) {
            const { overflowY } = window.getComputedStyle(current);

            if (overflowY === "auto" || overflowY === "scroll") {
                return current;
            }

            current = current.parentElement;
        }

        return null;
    };

    const toggleOpen = () => {
        if (!open && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const estimatedMenuHeight = 280;
            const scrollParent = getScrollParent(ref.current);

            if (scrollParent) {
                const containerRect = scrollParent.getBoundingClientRect();
                const spaceBelow = containerRect.bottom - rect.bottom;
                const spaceAbove = rect.top - containerRect.top;

                setOpenAbove(spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow);
            } else {
                const spaceBelow = window.innerHeight - rect.bottom;
                const spaceAbove = rect.top;

                setOpenAbove(spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow);
            }
        }

        setOpen((current) => !current);
    };

    return (
        <div ref={ref}>
            <FieldLabel label={label} required={required} />
            <div className="relative">
                <button
                    type="button"
                    onClick={toggleOpen}
                    className={`group flex h-[.42rem] w-full items-center gap-[.08rem] rounded-[.14rem] border px-[.14rem] text-left transition duration-200 ${
                        open
                            ? "border-[#b9c8ff] bg-[#f6f8ff] shadow-[0_.08rem_.2rem_rgba(83,101,246,0.12)]"
                            : "border-[#dde5f2] bg-white shadow-[0_.04rem_.12rem_rgba(17,24,39,0.04)] hover:border-[#d5def1] hover:bg-[#fbfcff]"
                    }`}
                >
                    {tone === "status" && selectedValue ? (
                        <span className="h-[.08rem] w-[.08rem] rounded-full bg-[#22b07d]" />
                    ) : null}

                    <div className="min-w-0 flex-1 truncate text-[.14rem] font-medium text-[#39476f]">
                        {selectedValue || placeholder}
                    </div>

                    <ChevronDown
                        className={`ml-auto h-[.16rem] w-[.16rem] flex-none text-[#8090b5] transition duration-200 ${
                            open ? "rotate-180 text-[#5b6cff]" : ""
                        }`}
                    />
                </button>

                <div
                    className={`absolute left-0 right-0 z-30 max-h-[2.8rem] overflow-auto rounded-[.16rem] border border-[#e4eaf7] bg-white p-[.06rem] shadow-[0_.16rem_.38rem_rgba(21,32,68,0.12)] transition-all duration-200 ${
                        openAbove ? "bottom-full mb-[.06rem] origin-bottom" : "top-full mt-[.06rem] origin-top"
                    } ${
                        open ? "pointer-events-auto translate-y-0 opacity-100" : `pointer-events-none ${openAbove ? "translate-y-[.03rem]" : "-translate-y-[.03rem]"} opacity-0`
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedValue("");
                            setOpen(false);
                        }}
                        className={`flex w-full items-center gap-[.08rem] rounded-[.12rem] px-[.12rem] py-[.09rem] text-left text-[.14rem] transition ${
                            selectedValue === ""
                                ? "bg-[#f4f7ff] font-medium text-[#4254da]"
                                : "text-[#5d6b92] hover:bg-[#f8faff] hover:text-[#33436b]"
                        }`}
                    >
                        <span className="flex h-[.16rem] w-[.16rem] items-center justify-center">
                            {selectedValue === "" ? <Check className="h-[.14rem] w-[.14rem]" /> : null}
                        </span>
                        <span>{placeholder}</span>
                    </button>

                    <div className="my-[.04rem] h-px bg-[#eef2fa]" />

                    {options.map((option) => {
                        const isSelected = selectedValue === option;

                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    setSelectedValue(option);
                                    setOpen(false);
                                }}
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
        </div>
    );
}

function TextAreaField({
    label,
    placeholder,
    defaultValue,
}: {
    label: string;
    placeholder: string;
    defaultValue?: string;
}) {
    return (
        <div>
            <FieldLabel label={label} />
            <textarea
                rows={4}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="min-h-[1.02rem] w-full resize-none rounded-[.08rem] border border-[#dde5f2] bg-white px-[.11rem] py-[.1rem] text-[.135rem] text-[#2d385d] shadow-[0_.02rem_.08rem_rgba(15,23,42,0.03)] outline-none transition placeholder:text-[#98a4c0] focus:border-[#bcc8f6] focus:shadow-[0_.08rem_.2rem_rgba(83,101,246,0.08)]"
            />
        </div>
    );
}
