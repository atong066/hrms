import { useEffect, useRef, useState } from "react";
import { Calendar, X } from "lucide-react";

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

      <div
        className={`group flex h-[.44rem] w-full items-center gap-[.1rem] rounded-[.16rem] border px-[.1rem] text-left transition duration-200 ${
          date
            ? "border-[#cfd9ff] bg-[linear-gradient(180deg,_#fbfcff_0%,_#f3f6ff_100%)] shadow-[0_.08rem_.2rem_rgba(83,101,246,0.08)]"
            : "border-[#e2e8f4] bg-white shadow-[0_.04rem_.12rem_rgba(17,24,39,0.04)] hover:border-[#d5def1] hover:bg-[#fbfcff]"
        }`}
      >
        <span
          className={`flex h-[.28rem] w-[.28rem] items-center justify-center rounded-[.1rem] transition ${
            date
              ? "bg-[#eef2ff] text-[#5b6cff]"
              : "bg-[#f6f8fc] text-[#7c89ac] group-hover:bg-[#eef2ff] group-hover:text-[#5b6cff]"
          }`}
        >
          <Calendar size={15} />
        </span>

        <button
          type="button"
          onClick={openPicker}
          className="min-w-0 flex-1 text-left"
        >
          <div className="text-[.095rem] font-semibold uppercase tracking-[0.14em] text-[#97a3c1]">
            {date ? "Selected date" : "Pick date"}
          </div>
          <div className={`truncate text-[.145rem] font-medium ${date ? "text-[#2f3d69]" : "text-[#8090b5]"}`}>
            {date ? formatDate(date) : label}
          </div>
        </button>

        {date ? (
          <button
            type="button"
            onClick={clearDate}
            className="inline-flex h-[.26rem] w-[.26rem] items-center justify-center rounded-full bg-white text-[#8a96b4] shadow-[0_.03rem_.08rem_rgba(15,23,42,0.06)] transition hover:bg-[#f5f7ff] hover:text-[#5b6cff]"
            aria-label="Clear date"
          >
            <X size={13} />
          </button>
        ) : null}
      </div>
    </div>
  );
};
