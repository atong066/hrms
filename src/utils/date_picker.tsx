import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";

type DatePickerProps = {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
};

function formatDate(value: string) {
  if (!value) return "";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export const DatePicker = ({ label, value, onChange }: DatePickerProps) => {
  const [date, setDate] = useState(value ?? "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setDate(value ?? "");
  }, [value]);

  const openPicker = () => {
    const input = inputRef.current as (HTMLInputElement & { showPicker?: () => void }) | null;
    if (!input) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.focus();
      input.click();
    }
  };

  const clearDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setDate("");
    onChange?.("");
  };

  return (
    <div className="relative min-w-[2.1rem]">
      <input
        ref={inputRef}
        type="date"
        value={date}
        onChange={(event) => {
          const nextValue = event.target.value;
          setDate(nextValue);
          onChange?.(nextValue);
        }}
        className="pointer-events-none absolute inset-0 opacity-0"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="flex h-[.42rem] w-full items-center gap-[.08rem] rounded-[.14rem] border border-[#e2e8f4] bg-white px-[.14rem] text-left shadow-[0_.04rem_.12rem_rgba(17,24,39,0.04)] transition hover:border-[#d5def1] hover:bg-[#fbfcff]">
        <span className="flex h-[.18rem] w-[.18rem] items-center justify-center text-[#7c89ac]">
          <Calendar size={15} />
        </span>

        <button
          type="button"
          onClick={openPicker}
          className="min-w-0 flex-1 text-left"
        >
          <div className="text-[.1rem] font-semibold uppercase tracking-[0.12em] text-[#94a0bf]">
            Filter
          </div>
          <div className={`truncate text-[.145rem] font-medium ${date ? "text-[#39476f]" : "text-[#8090b5]"}`}>
            {date ? formatDate(date) : label}
          </div>
        </button>

        {date ? (
          <button
            type="button"
            onClick={clearDate}
            className="text-[.12rem] font-medium text-[#8090b5] transition hover:text-[#5b6cff]"
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
};
