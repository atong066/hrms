import type { ReactNode } from "react";
import { Main } from "../layout/main";

type Stat = {
    label: string;
    value: string;
    detail: string;
    accent: string;
};

type ListItem = {
    label: string;
    value: string;
    tone?: string;
};

type Column = {
    key: string;
    label: string;
    width?: string;
    align?: "left" | "right";
};

type Row = Record<string, ReactNode>;

interface ModuleWorkspaceProps {
    eyebrow: string;
    title: string;
    description: string;
    stats: Stat[];
    bannerVariant?: "default" | "compact";
    panelVariant?: "default" | "compact";
    primaryTitle: string;
    primaryDescription: string;
    primaryItems: ListItem[];
    secondaryTitle: string;
    secondaryDescription: string;
    secondaryItems: ListItem[];
    tableTitle: string;
    tableDescription: string;
    tableToolbar?: ReactNode;
    columns: Column[];
    rows: Row[];
    tableFooter?: ReactNode;
}

export const ModuleWorkspace = ({
    eyebrow,
    title,
    description,
    stats,
    bannerVariant = "default",
    panelVariant = "default",
    primaryTitle,
    primaryDescription,
    primaryItems,
    secondaryTitle,
    secondaryDescription,
    secondaryItems,
    tableTitle,
    tableDescription,
    tableToolbar,
    columns,
    rows,
    tableFooter,
}: ModuleWorkspaceProps) => {
    return (
        <Main>
            <section className="h-full overflow-auto bg-[linear-gradient(180deg,_#f8faff_0%,_#f5f7fb_100%)] p-[.28rem]">
                <div className="flex min-h-full flex-col gap-[.18rem]">
                    {bannerVariant === "compact" ? (
                        <div className="rounded-[.22rem] border border-[#e5e9f5] bg-[linear-gradient(135deg,_#ffffff_0%,_#f8faff_100%)] px-[.18rem] py-[.16rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                            <div className="flex flex-col gap-[.14rem] xl:flex-row xl:items-start xl:justify-between">
                                <div className="max-w-[5.1rem]">
                                    <p className="text-[.125rem] font-medium uppercase tracking-[0.18em] text-[#6c78a6]">
                                        {eyebrow}
                                    </p>
                                    <h2 className="mt-[.05rem] font-['Montserrat'] text-[.3rem] font-semibold leading-[1.08] text-[#232b57]">
                                        {title}
                                    </h2>
                                    <p className="mt-[.06rem] text-[.14rem] leading-[1.55] text-[#6c7598]">
                                        {description}
                                    </p>
                                </div>

                                <div className="grid gap-[.08rem] sm:grid-cols-3 xl:min-w-[4.4rem] xl:max-w-[5.4rem]">
                                    {stats.map((stat) => (
                                        <div
                                            key={stat.label}
                                            className={`rounded-[.16rem] border border-[#e7ebf6] px-[.12rem] py-[.11rem] ${stat.accent}`}
                                        >
                                            <p className="text-[.115rem] uppercase tracking-[0.08em] text-[#7d86a8]">
                                                {stat.label}
                                            </p>
                                            <p className="mt-[.04rem] font-['Montserrat'] text-[.24rem] font-semibold leading-none text-[#232b57]">
                                                {stat.value}
                                            </p>
                                            <p className="mt-[.05rem] text-[.115rem] leading-[1.45] text-[#7280a7]">
                                                {stat.detail}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-[.24rem] border border-[#e5e9f5] bg-[linear-gradient(135deg,_#ffffff_0%,_#f7f9ff_100%)] p-[.2rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                            <div className="max-w-[6.7rem]">
                                <p className="text-[.14rem] font-medium uppercase tracking-[0.18em] text-[#6c78a6]">
                                    {eyebrow}
                                </p>
                                <h2 className="mt-[.06rem] font-['Montserrat'] text-[.38rem] font-semibold leading-[1.08] text-[#232b57]">
                                    {title}
                                </h2>
                                <p className="mt-[.08rem] text-[.16rem] leading-[1.6] text-[#6c7598]">
                                    {description}
                                </p>
                            </div>

                            <div className="mt-[.18rem] grid gap-[.12rem] xl:grid-cols-3">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className={`rounded-[.18rem] border border-[#e7ebf6] p-[.16rem] ${stat.accent}`}
                                    >
                                        <p className="text-[.14rem] font-medium text-[#6c7598]">{stat.label}</p>
                                        <p className="mt-[.06rem] font-['Montserrat'] text-[.34rem] font-semibold text-[#232b57]">
                                            {stat.value}
                                        </p>
                                        <p className="mt-[.08rem] text-[.13rem] text-[#7280a7]">{stat.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid gap-[.18rem] xl:grid-cols-[1.05fr_1.15fr]">
                        <InfoPanel
                            title={primaryTitle}
                            description={primaryDescription}
                            items={primaryItems}
                            variant={panelVariant}
                        />
                        <InfoPanel
                            title={secondaryTitle}
                            description={secondaryDescription}
                            items={secondaryItems}
                            variant={panelVariant}
                        />
                    </div>

                    <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white p-[.18rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
                        <div>
                            <h3 className="text-[.2rem] font-semibold text-[#253158]">{tableTitle}</h3>
                            <p className="mt-[.04rem] text-[.13rem] text-[#7481a4]">{tableDescription}</p>
                        </div>

                        {tableToolbar ? <div className="mt-[.14rem]">{tableToolbar}</div> : null}

                        <div className="mt-[.14rem] overflow-hidden rounded-[.18rem] border border-[#edf1f8] bg-white">
                            <div className="max-h-[4.8rem] overflow-auto">
                                <table className="w-full table-fixed text-left">
                                    <thead className="sticky top-0 z-10 bg-[#f8faff]">
                                        <tr className="border-b border-[#edf1f8] text-[.13rem] font-medium uppercase tracking-[0.08em] text-[#7c86a8]">
                                            {columns.map((column) => (
                                                <th
                                                    key={column.key}
                                                    className={`px-[.12rem] py-[.1rem] ${column.align === "right" ? "text-right" : ""}`}
                                                    style={column.width ? { width: column.width } : undefined}
                                                >
                                                    {column.label}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {rows.map((row, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-[#edf1f8] bg-white transition hover:bg-[#fbfcff] last:border-b-0"
                                            >
                                                {columns.map((column) => (
                                                    <td
                                                        key={column.key}
                                                        className={`px-[.12rem] py-[.1rem] ${column.align === "right" ? "text-right" : ""}`}
                                                    >
                                                        <div className={`min-h-[.46rem] text-[.135rem] text-[#556282] ${column.align === "right" ? "flex items-center justify-end" : "flex items-center"}`}>
                                                            {row[column.key]}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {tableFooter ? (
                                <div className="border-t border-[#edf1f8] bg-[#fbfcff]">
                                    {tableFooter}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
        </Main>
    );
};

function InfoPanel({
    title,
    description,
    items,
    variant = "default",
}: {
    title: string;
    description: string;
    items: ListItem[];
    variant?: "default" | "compact";
}) {
    if (variant === "compact") {
        return (
            <div className="rounded-[.22rem] border border-[#e5e9f5] bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfcff_100%)] px-[.16rem] py-[.15rem] shadow-[0_.08rem_.22rem_rgba(15,23,42,0.045)]">
                <div className="flex items-start justify-between gap-[.12rem]">
                    <div>
                        <h3 className="text-[.18rem] font-semibold text-[#253158]">{title}</h3>
                        <p className="mt-[.03rem] text-[.125rem] leading-[1.45] text-[#7481a4]">{description}</p>
                    </div>
                    <span className="mt-[.02rem] h-[.08rem] w-[.08rem] rounded-full bg-[#d7def8]" />
                </div>

                <div className="mt-[.12rem] space-y-[.06rem]">
                    {items.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center justify-between gap-[.1rem] rounded-[.14rem] border border-[#edf1f8] bg-[#fcfdff] px-[.12rem] py-[.09rem]"
                        >
                            <div className="flex min-w-0 items-center gap-[.08rem]">
                                <span className="h-[.06rem] w-[.06rem] shrink-0 rounded-full bg-[#c9d3f7]" />
                                <p className="truncate text-[.138rem] font-medium text-[#31406c]">{item.label}</p>
                            </div>
                            <span className={`inline-flex shrink-0 rounded-full border px-[.08rem] py-[.035rem] text-[.115rem] font-semibold leading-none ${item.tone || "border-[#e4e8f6] bg-[#f8faff] text-[#667392]"}`}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-[.24rem] border border-[#e5e9f5] bg-white p-[.18rem] shadow-[0_.08rem_.24rem_rgba(15,23,42,0.05)]">
            <h3 className="text-[.2rem] font-semibold text-[#253158]">{title}</h3>
            <p className="mt-[.04rem] text-[.13rem] text-[#7481a4]">{description}</p>

            <div className="mt-[.14rem] space-y-[.08rem]">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center justify-between gap-[.12rem] rounded-[.16rem] border border-[#eef2fa] bg-[#fbfcff] px-[.14rem] py-[.12rem]"
                    >
                        <p className="text-[.145rem] font-medium text-[#31406c]">{item.label}</p>
                        <span className={`inline-flex rounded-full border px-[.09rem] py-[.04rem] text-[.12rem] font-semibold ${item.tone || "border-[#e4e8f6] bg-[#f8faff] text-[#667392]"}`}>
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
