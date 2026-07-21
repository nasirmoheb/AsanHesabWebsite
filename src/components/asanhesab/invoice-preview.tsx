"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { useLanguage, useT } from "./i18n/language-context";
import type { Dict } from "./i18n/dictionary";
import { FileText, Receipt, FileText as InvoiceIcon } from "lucide-react";

type TabType = "a4" | "thermal" | "classic";
type InvoiceCopy = Dict["invoice"];

const MM_TO_PX = 96 / 25.4;
const A4_WIDTH_MM = 210;
const THERMAL_WIDTH_MM = 80;

function InvoiceScaler({
  widthMm,
  children,
  resetKey,
}: {
  widthMm: number;
  children: ReactNode;
  resetKey: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [naturalHeight, setNaturalHeight] = useState(0);

  const naturalWidthPx = widthMm * MM_TO_PX;

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const inner = innerRef.current;
      if (!container || !inner) return;
      const available = container.clientWidth;
      const nextScale = Math.min(1, available / naturalWidthPx);
      setScale(nextScale);
      setNaturalHeight(inner.scrollHeight);
    };

    update();
    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    if (innerRef.current) observer.observe(innerRef.current);
    return () => observer.disconnect();
  }, [widthMm, naturalWidthPx, resetKey]);

  const isScaled = scale < 1;

  return (
    <div ref={containerRef} className="w-full">
      <div
        style={
          isScaled
            ? {
                width: naturalWidthPx * scale,
                height: naturalHeight > 0 ? naturalHeight * scale : undefined,
                overflow: "hidden",
                position: "relative",
                marginInline: "auto",
              }
            : {
                width: naturalWidthPx,
                marginInline: "auto",
                overflow: "hidden",
              }
        }
      >
        <div
          ref={innerRef}
          style={
            isScaled
              ? {
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  width: naturalWidthPx,
                  maxWidth: naturalWidthPx,
                  overflow: "hidden",
                  transform: `translateX(-50%) scale(${scale})`,
                  transformOrigin: "top center",
                }
              : {
                  width: "100%",
                  overflow: "hidden",
              }
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function getInvoiceItems(inv: InvoiceCopy) {
  return [
    {
      id: 1,
      name: inv.item1,
      qty: inv.item1Qty,
      unit: inv.unitPiece,
      price: inv.item1Price,
      discount: inv.dash,
      total: inv.item1Total,
    },
    {
      id: 2,
      name: inv.item2,
      qty: inv.item2Qty,
      unit: inv.unitPiece,
      price: inv.item2Price,
      discount: inv.dash,
      total: inv.item2Total,
    },
    {
      id: 3,
      name: inv.item3,
      qty: inv.item3Qty,
      unit: inv.unitPiece,
      price: inv.item3Price,
      discount: inv.dash,
      total: inv.item3Total,
    },
    {
      id: 4,
      name: inv.item4,
      qty: inv.item4Qty,
      unit: inv.unitBottle,
      price: inv.item4Price,
      discount: inv.dash,
      total: inv.item4Total,
    },
    {
      id: 5,
      name: inv.item5,
      qty: inv.item5Qty,
      unit: inv.unitPiece,
      price: inv.item5Price,
      discount: inv.dash,
      total: inv.item5Total,
    },
    {
      id: 6,
      name: inv.item6,
      qty: inv.item6Qty,
      unit: inv.unitPack,
      price: inv.item6Price,
      discount: inv.dash,
      total: inv.item6Total,
    },
    {
      id: 7,
      name: inv.item7,
      qty: inv.item7Qty,
      unit: inv.unitKg,
      price: inv.item7Price,
      discount: inv.dash,
      total: inv.item7Total,
    },
  ];
}

function AsanHesabFooter({ inv, size = "md" }: { inv: InvoiceCopy; size?: "sm" | "md" }) {
  const logoSize = size === "sm" ? 12 : 24;
  const brandSize = size === "sm" ? "8px" : "10px";
  const metaSize = size === "sm" ? "7px" : "8px";

  return (
    <>
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: size === "sm" ? "4px" : "8px",
          padding: "4px",
        }}
      >
        <svg
          viewBox="0 0 1164.255 948.46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: `${logoSize}px`, height: `${logoSize}px`, flexShrink: 0 }}
        >
          <g>
            <path
              d="M230.069 0L230.069 0C256.544 0 278 21.4559 278 47.931L278 700.931C278 828.012 175.012 931 47.931 931L47.931 931C21.4559 931 0 909.544 0 883.069L-3.05176e-05 230.069C0 102.988 102.988 0 230.069 0L230.069 0Z"
              fill="#000000"
              transform="matrix(0.866 0.5 -0.5 0.866 465.5 0)"
            />
            <path
              d="M98.1176 3.05176e-05L98.1176 3.05176e-05C197.477 -3.05176e-05 278 80.5226 278 179.882L278 427.487C278 554.568 175.012 657.556 47.931 657.556L47.931 657.556C21.4559 657.556 -6.10352e-05 636.1 0 609.625L0 98.1176C-6.10352e-05 43.9214 43.9214 -3.05176e-05 98.1176 3.05176e-05L98.1176 3.05176e-05Z"
              fill="#000000"
              transform="matrix(0.866 0.5 -0.5 0.866 721.5 240)"
            />
            <path
              d="M139 -6.10352e-05C215.778 0 278 62.2219 278 139C278 215.778 215.778 278 139 278C62.222 278 0 215.778 0 139C0 62.2219 62.2219 -6.10352e-05 139 -6.10352e-05L139 -6.10352e-05Z"
              fill="#000000"
              transform="matrix(0.866 0.5 -0.5 0.866 923.5 537)"
            />
          </g>
        </svg>
        <span
          style={{
            fontSize: brandSize,
            fontWeight: 600,
            color: "rgb(51, 51, 51)",
            letterSpacing: "-0.01em",
          }}
        >
          {inv.poweredBy}
        </span>
      </div>
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          fontSize: metaSize,
          color: "rgb(102, 102, 102)",
        }}
      >
        <div style={{ fontWeight: 500, color: "rgb(85, 85, 85)" }}>{inv.supportPhone}</div>
        <span style={{ color: "rgb(153, 153, 153)" }}>•</span>
        <div style={{ fontWeight: 500, color: "rgb(85, 85, 85)" }}>{inv.website}</div>
      </div>
    </>
  );
}

export function InvoicePreview() {
  const t = useT();
  const { dir } = useLanguage();
  const inv = t.invoice;
  const [activeTab, setActiveTab] = useState<TabType>("a4");

  const tabs: { id: TabType; label: string; icon: typeof FileText }[] = [
    { id: "a4", label: inv.tabA4, icon: FileText },
    { id: "thermal", label: inv.tabThermal, icon: Receipt },
    { id: "classic", label: inv.tabClassic, icon: InvoiceIcon },
  ];

  return (
    <section
      id="invoice-preview"
      dir={dir}
      className="relative overflow-hidden bg-background py-20 sm:py-28"
      aria-labelledby="invoice-headline"
    >
      {/* Subtle violet radial atmosphere — purposeful, not decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.62 0.19 293 / 0.07), transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          headlineId="invoice-headline"
          title={inv.title}
          highlight={inv.highlight}
          subtitle={inv.subtitle}
          tone="violet"
        />

        <Reveal delay={120}>
          <div className="mt-12">
            <div className="mb-8 flex justify-center overflow-x-auto px-1">
            <div
              className="inline-flex min-w-max rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              role="tablist"
              aria-label={inv.tablistLabel ?? "Invoice format"}
            >
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-[background-color,box-shadow,color] duration-200 ease-out sm:gap-2 sm:px-4 sm:text-sm ${
                        isActive
                          ? "bg-violet-600 text-white shadow-md"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-4xl">
              {/* Purposeful shadow depth — grounds the invoice on the page */}
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-premium-lg dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900" aria-hidden>
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                </div>
                <div className="p-3 sm:p-6">
                  <InvoiceScaler widthMm={activeTab === "thermal" ? THERMAL_WIDTH_MM : A4_WIDTH_MM} resetKey={activeTab}>
                    {activeTab === "a4" ? (
                      <InvoiceTemplate inv={inv} dir={dir} />
                    ) : activeTab === "thermal" ? (
                      <ThermalReceipt inv={inv} dir={dir} />
                    ) : (
                      <ClassicInvoice inv={inv} dir={dir} />
                    )}
                  </InvoiceScaler>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InvoiceTemplate({ inv, dir }: { inv: InvoiceCopy; dir: "rtl" | "ltr" }) {
  const items = getInvoiceItems(inv);

  return (
    <div
      className="afghan-invoice-pro print-template"
      dir={dir}
      style={{
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        backgroundColor: "rgb(255, 255, 255)",
        fontFamily: "Vazirmatn, Inter, sans-serif",
        position: "relative",
        padding: "16px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
          padding: "16px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            flex: "1 1 0%",
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              flexShrink: 0,
              borderRadius: "4px",
              background: "linear-gradient(135deg, rgb(88, 28, 135) 0%, rgb(154, 118, 183) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgb(88, 28, 135)",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px",
              color: "rgb(255, 255, 255)",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div style={{ flex: "1 1 0%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "rgb(88, 28, 135)",
                margin: "0px 0px 4px",
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                textTransform: "uppercase",
              }}
            >
              {inv.businessName}
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "rgb(154, 118, 183)",
                margin: "0px 0px 6px",
                lineHeight: 1.2,
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              {inv.businessTagline}
            </p>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgb(88, 28, 135)",
            color: "rgb(255, 255, 255)",
            borderRadius: "4px",
            padding: "8px 12px",
            minWidth: "140px",
            boxShadow: "rgba(88, 28, 135, 0.3) 0px 4px 8px",
            border: "2px solid rgb(88, 28, 135)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              marginBottom: "6px",
              paddingBottom: "4px",
              borderBottom: "1.5px solid rgba(255, 255, 255, 0.3)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textTransform: "uppercase",
              letterSpacing: "0.3px",
            }}
          >
            <span>{inv.invoiceTitle}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: "11px", color: "rgb(191, 219, 254)", fontWeight: 500 }}>{inv.number}:</span>
              <span style={{ fontSize: "11px", fontWeight: "bold" }}>{inv.invoiceNumber}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: "11px", color: "rgb(191, 219, 254)", fontWeight: 500 }}>{inv.date}:</span>
              <span style={{ fontSize: "11px", fontWeight: "bold" }}>{inv.invoiceDate}</span>
            </div>
          </div>
        </div>
      </header>

      <div
        style={{
          backgroundColor: "rgb(241, 245, 249)",
          borderTop: "1px solid rgb(226, 232, 240)",
          borderBottom: "1px solid rgb(226, 232, 240)",
          padding: "6px 16px",
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          fontSize: "11px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgb(71, 85, 105)", flex: "1 1 auto", minWidth: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{ lineHeight: 1.4 }}>{inv.businessLocation}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgb(71, 85, 105)", fontWeight: 500, flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>{inv.businessPhone}</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "12px 16px 8px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 0%", minWidth: 0 }}>
          <h3
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontWeight: "bold",
              color: "rgb(107, 114, 128)",
              margin: "0px 0px 6px",
            }}
          >
            {inv.billTo}
          </h3>
          <div
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              border: "1px solid rgb(229, 231, 235)",
              borderRadius: "4px",
              padding: "8px 12px",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px",
              minWidth: 0,
            }}
          >
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "rgb(17, 24, 39)", margin: "0px 0px 6px" }}>
              {inv.customerName}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
                color: "rgb(107, 114, 128)",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>{inv.customerAddress}</span>
              </div>
              <span style={{ color: "rgb(203, 213, 225)" }}>•</span>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{inv.customerPhone}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgb(255, 247, 237)",
            border: "1px solid rgb(254, 215, 170)",
            borderRadius: "4px",
            padding: "8px 12px",
            minWidth: "140px",
            textAlign: dir === "rtl" ? "left" : "right",
          }}
        >
          <p style={{ fontSize: "11px", fontWeight: 600, color: "rgb(154, 52, 18)", margin: "0px 0px 4px" }}>
            {inv.previousBalance}
          </p>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "rgb(234, 88, 12)", margin: "0px" }}>
            {inv.balanceValue} {inv.currency}
          </p>
        </div>
      </div>

      <div style={{ padding: "0px 16px 8px" }}>
        <div style={{ border: "1px solid rgb(229, 231, 235)", borderRadius: "4px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
            <thead>
              <tr
                style={{
                  backgroundColor: "rgb(88, 28, 135)",
                  color: "rgb(255, 255, 255)",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                <th style={{ padding: "8px", textAlign: "center", fontWeight: 600, width: "40px" }}>{inv.colNumber}</th>
                <th style={{ padding: "8px", textAlign: dir === "rtl" ? "right" : "left", fontWeight: 600 }}>{inv.colDescription}</th>
                <th style={{ padding: "8px", textAlign: dir === "rtl" ? "left" : "right", fontWeight: 600, width: "80px" }}>{inv.colQty}</th>
                <th style={{ padding: "8px", textAlign: dir === "rtl" ? "left" : "right", fontWeight: 600, width: "100px" }}>{inv.colUnitPrice}</th>
                <th style={{ padding: "8px", textAlign: dir === "rtl" ? "left" : "right", fontWeight: 600, width: "80px" }}>{inv.colDiscount}</th>
                <th style={{ padding: "8px", textAlign: dir === "rtl" ? "left" : "right", fontWeight: 600, width: "100px" }}>{inv.colTotal}</th>
              </tr>
            </thead>
            <tbody style={{ color: "rgb(55, 65, 81)" }}>
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "rgb(255, 255, 255)" : "rgb(248, 250, 252)",
                    borderBottom: "1px solid rgb(229, 231, 235)",
                  }}
                >
                  <td style={{ padding: "10px 8px", textAlign: "center", color: "rgb(107, 114, 128)" }}>{item.id}</td>
                  <td style={{ padding: "10px 8px", fontWeight: "bold", color: "rgb(17, 24, 39)" }}>
                    <div>{item.name}</div>
                  </td>
                  <td style={{ padding: "10px 8px", textAlign: dir === "rtl" ? "left" : "right" }}>
                    {item.qty}
                    <span style={{ fontSize: "0.75em", color: "rgb(107, 114, 128)", marginInlineStart: "4px" }}>
                      {item.unit}
                    </span>
                  </td>
                  <td style={{ padding: "10px 8px", textAlign: dir === "rtl" ? "left" : "right" }}>
                    {item.price} {inv.currency}
                  </td>
                  <td style={{ padding: "10px 8px", textAlign: dir === "rtl" ? "left" : "right", color: "rgb(239, 68, 68)" }}>
                    {item.discount}
                  </td>
                  <td style={{ padding: "10px 8px", textAlign: dir === "rtl" ? "left" : "right", fontWeight: 500, color: "rgb(17, 24, 39)" }}>
                    {item.total} {inv.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ breakInside: "avoid" }}>
        <div style={{ padding: "0px 16px 8px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "8px",
              border: "1px solid rgb(229, 231, 235)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "rgb(249, 250, 251)",
                padding: "8px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0px", fontSize: "11px", borderBottom: "1px solid rgb(229, 231, 235)", marginBottom: "6px" }}>
                <span style={{ color: "rgb(146, 64, 14)", fontWeight: 600 }}>{inv.previousBalanceShort}</span>
                <span style={{ color: "rgb(146, 64, 14)", fontWeight: 700 }}>
                  {inv.balanceValue} {inv.currency}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0px", fontSize: "11px" }}>
                <span style={{ color: "rgb(107, 114, 128)", fontWeight: 500 }}>{inv.subtotal}</span>
                <span style={{ color: "rgb(17, 24, 39)", fontWeight: 600 }}>
                  {inv.subtotalValue} {inv.currency}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: "1 1 140px" }}>
              <div
                style={{
                  backgroundColor: "rgb(88, 28, 135)",
                  padding: "8px 12px",
                  borderBottom: "1px solid rgb(88, 28, 135)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "rgb(255, 255, 255)", fontWeight: "bold", fontSize: "12px", letterSpacing: "0.3px" }}>
                    {inv.grandTotal}
                  </span>
                  <span style={{ color: "rgb(255, 255, 255)", fontWeight: "bold", fontSize: "16px", letterSpacing: "0.5px" }}>
                    {inv.grandTotalValue} {inv.currency}
                  </span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, flex: "1 1 0%" }}>
                <div
                  style={{
                    padding: "6px 8px",
                    borderLeft: dir === "rtl" ? "1px solid rgb(229, 231, 235)" : undefined,
                    borderRight: dir === "ltr" ? "1px solid rgb(229, 231, 235)" : undefined,
                    backgroundColor: "rgb(240, 253, 244)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: "9px", color: "rgb(21, 128, 61)", fontWeight: 600, marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                    {inv.paid}
                  </div>
                  <div style={{ fontSize: "13px", color: "rgb(21, 128, 61)", fontWeight: "bold" }}>
                    {inv.paidValue} {inv.currency}
                  </div>
                </div>
                <div
                  style={{
                    padding: "6px 8px",
                    backgroundColor: "rgb(240, 253, 244)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: "9px", color: "rgb(21, 128, 61)", fontWeight: 600, marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                    {inv.remaining}
                  </div>
                  <div style={{ fontSize: "13px", color: "rgb(21, 128, 61)", fontWeight: "bold" }}>
                    {inv.remainingValue} {inv.currency}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgb(249, 250, 251)",
            border: "1px solid rgb(229, 231, 235)",
            borderRadius: "4px",
            padding: "12px 16px",
            margin: "0px 16px 0px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "8px", alignItems: "start" }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: "bold", color: "rgb(107, 114, 128)", textTransform: "uppercase", margin: "0px 0px 4px" }}>
                {inv.amountInWords}
              </p>
              <p style={{ fontSize: "11px", fontWeight: 500, color: "rgb(17, 24, 39)", fontStyle: "italic", margin: "0px", lineHeight: 1.3 }}>
                {inv.amountWords}
              </p>
            </div>
            <div>
              <p style={{ fontSize: "10px", fontWeight: "bold", color: "rgb(107, 114, 128)", textTransform: "uppercase", margin: "0px 0px 4px" }}>
                {inv.terms}
              </p>
              <p style={{ fontSize: "10px", color: "rgb(107, 114, 128)", margin: "0px", lineHeight: 1.4 }} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              paddingTop: "8px",
              borderTop: "1px solid rgb(229, 231, 235)",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  border: "1px solid rgb(229, 231, 235)",
                  borderRadius: "4px",
                  padding: "4px",
                  backgroundColor: "rgb(255, 255, 255)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <rect x="7" y="7" width="3" height="3" />
                  <rect x="14" y="7" width="3" height="3" />
                  <rect x="7" y="14" width="3" height="3" />
                  <rect x="14" y="14" width="3" height="3" />
                </svg>
              </div>
              <span style={{ fontSize: "8px", color: "rgb(156, 163, 175)", textAlign: "center" }}>{inv.scanToVerify}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flex: "1 1 0%",
                gap: "24px",
                minWidth: 0,
              }}
            >
              <div style={{ flex: "1 1 0%", textAlign: "center" }}>
                <div style={{ width: "100%", borderBottom: "1px solid rgb(156, 163, 175)", marginBottom: "4px", height: "24px" }} />
                <p style={{ fontSize: "10px", fontWeight: "bold", color: "rgb(107, 114, 128)", margin: "0px" }}>{inv.sellerSignature}</p>
              </div>
              <div
                style={{
                  width: "120px",
                  height: "32px",
                  border: "2px dashed rgb(209, 213, 219)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: "8px", color: "rgb(209, 213, 219)", fontWeight: "bold", textTransform: "uppercase" }}>
                  {inv.stampPlaceholder}
                </span>
              </div>
              <div style={{ flex: "1 1 0%", textAlign: "center" }}>
                <div style={{ width: "100%", borderBottom: "1px solid rgb(156, 163, 175)", marginBottom: "4px", height: "24px" }} />
                <p style={{ fontSize: "10px", fontWeight: "bold", color: "rgb(107, 114, 128)", margin: "0px" }}>{inv.buyerSignature}</p>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "8px",
              paddingTop: "4px",
              borderTop: "1px solid rgb(229, 231, 235)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <AsanHesabFooter inv={inv} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ThermalReceipt({ inv, dir }: { inv: InvoiceCopy; dir: "rtl" | "ltr" }) {
  const items = getInvoiceItems(inv);

  return (
    <div
      className="bg-white text-black font-mono text-[10px] leading-tight print-template"
      dir={dir}
      style={{
        width: `${THERMAL_WIDTH_MM}mm`,
        maxWidth: "100%",
        boxSizing: "border-box",
        wordBreak: "break-word",
        overflowWrap: "break-word",
        padding: "4mm 3mm",
        backgroundColor: "#fff",
      }}
    >
      <div className="mb-2 text-center">
        <div className="mb-0.5 max-w-full truncate text-xs font-bold">{inv.businessName}</div>
        <div className="mb-1 text-xs">{inv.businessPhone}</div>
        <div className="my-1 border-t border-dashed border-gray-400" />
      </div>

      <div className="mb-2 text-xs">
        <div className="flex justify-between gap-2">
          <span className="whitespace-nowrap">
            {inv.receiptLabel}: {inv.invoiceNumber}
          </span>
          <span className="whitespace-nowrap">
            {inv.date}: {inv.invoiceDate}
          </span>
        </div>
      </div>

      <div className="mb-2">
        {items.map((item, index) => (
          <div key={index} className="mb-1">
            <div className="max-w-full truncate font-medium">{item.name}</div>
            <div className="flex w-full justify-between gap-1">
              <div className="flex items-center gap-1 overflow-hidden whitespace-nowrap">
                <span>{item.qty}</span>
                <span>{item.unit}</span>
                <span>×</span>
                <span className="whitespace-nowrap">
                  {item.price} {inv.currency}
                </span>
              </div>
              <span className="shrink-0 whitespace-nowrap">
                {item.total} {inv.currency}
              </span>
            </div>
          </div>
        ))}
        <div className="my-1 border-t border-dashed border-gray-400" />
      </div>

      <div className="mb-2 text-xs">
        <div className="flex justify-between font-bold">
          <span>{inv.total}:</span>
          <span className="whitespace-nowrap">
            {inv.grandTotalValue} {inv.currency}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{inv.paid}:</span>
          <span className="whitespace-nowrap">
            {inv.paidValue} {inv.currency}
          </span>
        </div>
      </div>

      <div className="mb-2 text-center text-xs">
        <span className="font-semibold">{inv.amountInWords}: </span>
        {inv.amountWords}
      </div>

      <div className="mb-1 text-center">
        <div className="mb-0.5">
          <div className="w-full bg-white" aria-label={`Barcode: ${inv.invoiceNumber}`}>
            <svg style={{ width: "100%", height: "30px", display: "block" }} viewBox="0 0 288 60" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="288" height="60" fill="#ffffff" />
              <g transform="translate(10, 10)" fill="#000000">
                <rect x="0" y="0" width="4" height="40" />
                <rect x="6" y="0" width="2" height="40" />
                <rect x="12" y="0" width="2" height="40" />
                <rect x="22" y="0" width="4" height="40" />
                <rect x="32" y="0" width="2" height="40" />
                <rect x="40" y="0" width="2" height="40" />
                <rect x="44" y="0" width="2" height="40" />
                <rect x="48" y="0" width="6" height="40" />
                <rect x="60" y="0" width="4" height="40" />
                <rect x="66" y="0" width="6" height="40" />
                <rect x="74" y="0" width="2" height="40" />
                <rect x="78" y="0" width="4" height="40" />
                <rect x="88" y="0" width="2" height="40" />
                <rect x="94" y="0" width="4" height="40" />
                <rect x="100" y="0" width="6" height="40" />
                <rect x="110" y="0" width="2" height="40" />
                <rect x="114" y="0" width="6" height="40" />
                <rect x="122" y="0" width="8" height="40" />
                <rect x="132" y="0" width="4" height="40" />
                <rect x="138" y="0" width="4" height="40" />
                <rect x="146" y="0" width="4" height="40" />
                <rect x="154" y="0" width="4" height="40" />
                <rect x="160" y="0" width="4" height="40" />
                <rect x="168" y="0" width="4" height="40" />
                <rect x="176" y="0" width="4" height="40" />
                <rect x="182" y="0" width="4" height="40" />
                <rect x="190" y="0" width="4" height="40" />
                <rect x="198" y="0" width="2" height="40" />
                <rect x="202" y="0" width="8" height="40" />
                <rect x="216" y="0" width="2" height="40" />
                <rect x="220" y="0" width="6" height="40" />
                <rect x="232" y="0" width="4" height="40" />
                <rect x="238" y="0" width="2" height="40" />
                <rect x="242" y="0" width="4" height="40" />
                <rect x="252" y="0" width="6" height="40" />
                <rect x="260" y="0" width="2" height="40" />
                <rect x="264" y="0" width="4" height="40" />
              </g>
            </svg>
          </div>
        </div>
        <div className="text-xs">{inv.invoiceNumber}</div>
      </div>

      <div className="mt-2 text-center text-xs">{inv.thankYou}</div>

      <div className="mt-1.5 border-t border-dashed border-gray-300 pt-0.5">
        <div className="flex flex-col items-center gap-0">
          <AsanHesabFooter inv={inv} size="sm" />
        </div>
      </div>
    </div>
  );
}

function ClassicInvoice({ inv, dir }: { inv: InvoiceCopy; dir: "rtl" | "ltr" }) {
  const items = getInvoiceItems(inv);

  return (
    <div
      className="classic-invoice print-template"
      dir={dir}
      style={{
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        backgroundColor: "rgb(255, 255, 255)",
        fontFamily: "Nazanin, Lotus, Vazirmatn, serif",
        padding: "12mm",
        boxSizing: "border-box",
        color: "rgb(0, 0, 0)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "3px double rgb(0, 0, 0)",
          paddingBottom: "3mm",
          marginBottom: "4mm",
          gap: "5mm",
        }}
      >
        <div style={{ flex: "1 1 0%", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "16pt",
              fontWeight: "bold",
              textTransform: "uppercase",
              margin: "0px 0px 1mm",
              textDecoration: "underline",
              letterSpacing: "0.5px",
            }}
          >
            {inv.businessName}
          </h1>
          <div style={{ fontSize: "9pt", lineHeight: 1.3 }}>
            <div>{inv.businessLocation}</div>
            <div>
              {inv.contact}: {inv.businessPhone}
            </div>
          </div>
        </div>
        <div
          style={{
            flexShrink: 0,
            textAlign: "center",
            border: "2px solid rgb(0, 0, 0)",
            padding: "3mm 5mm",
            minWidth: "35mm",
          }}
        >
          <div style={{ fontSize: "14pt", fontWeight: "bold", textTransform: "uppercase" }}>{inv.invoiceTitle}</div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          border: "2px solid rgb(0, 0, 0)",
          marginBottom: "3mm",
          fontSize: "9pt",
        }}
      >
        {[
          { label: inv.number, value: inv.invoiceNumber },
          { label: inv.date, value: inv.invoiceDate },
          { label: inv.billTo, value: inv.customerName },
          { label: inv.contact, value: inv.customerPhone },
        ].map((field, index) => (
          <div
            key={field.label}
            style={{
              padding: "1.5mm 2mm",
              borderLeft: index > 0 && dir === "rtl" ? "1px solid rgb(0, 0, 0)" : undefined,
              borderRight: index > 0 && dir === "ltr" ? "1px solid rgb(0, 0, 0)" : undefined,
              display: "flex",
              flexDirection: "column",
              gap: "0.5mm",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "8pt" }}>{field.label}:</span>
            <span>{field.value}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          border: "2px solid rgb(0, 0, 0)",
          padding: "1.5mm 2mm",
          marginBottom: "3mm",
          backgroundColor: "rgb(245, 245, 245)",
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          fontSize: "9pt",
        }}
      >
        <span>{inv.previousBalanceShort}:</span>
        <span>
          {inv.balanceValue} {inv.currency}
        </span>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "3mm",
          border: "2px solid rgb(0, 0, 0)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "rgb(255, 255, 255)", border: "2px solid rgb(0, 0, 0)" }}>
            <th style={{ border: "1px solid rgb(0, 0, 0)", padding: "1.5mm", textAlign: "center", fontWeight: "bold", fontSize: "9pt", width: "8mm" }}>
              {inv.colNumber}
            </th>
            <th style={{ border: "1px solid rgb(0, 0, 0)", padding: "1.5mm", textAlign: dir === "rtl" ? "right" : "left", fontWeight: "bold", fontSize: "9pt" }}>
              {inv.colDescription}
            </th>
            <th style={{ border: "1px solid rgb(0, 0, 0)", padding: "1.5mm", textAlign: "center", fontWeight: "bold", fontSize: "9pt", width: "15mm" }}>
              {inv.colQty}
            </th>
            <th style={{ border: "1px solid rgb(0, 0, 0)", padding: "1.5mm", textAlign: dir === "rtl" ? "left" : "right", fontWeight: "bold", fontSize: "9pt", width: "25mm" }}>
              {inv.colUnitPrice}
            </th>
            <th style={{ border: "1px solid rgb(0, 0, 0)", padding: "1.5mm", textAlign: dir === "rtl" ? "left" : "right", fontWeight: "bold", fontSize: "9pt", width: "20mm" }}>
              {inv.colDiscount}
            </th>
            <th style={{ border: "1px solid rgb(0, 0, 0)", padding: "1.5mm", textAlign: dir === "rtl" ? "left" : "right", fontWeight: "bold", fontSize: "9pt", width: "30mm" }}>
              {inv.colTotal}
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid rgb(0, 0, 0)", padding: "1.5mm", textAlign: "center", fontSize: "8pt" }}>{item.id}</td>
              <td style={{ border: "1px solid rgb(0, 0, 0)", padding: "1.5mm", textAlign: dir === "rtl" ? "right" : "left", fontSize: "8pt" }}>
                <div style={{ fontWeight: "bold" }}>{item.name}</div>
              </td>
              <td style={{ border: "1px solid rgb(0, 0, 0)", padding: "1.5mm", textAlign: "center", fontSize: "8pt" }}>
                {item.qty}
              </td>
              <td style={{ border: "1px solid rgb(0, 0, 0)", padding: "1.5mm", textAlign: dir === "rtl" ? "left" : "right", fontSize: "8pt" }}>
                {item.price} {inv.currency}
              </td>
              <td style={{ border: "1px solid rgb(0, 0, 0)", padding: "1.5mm", textAlign: dir === "rtl" ? "left" : "right", fontSize: "8pt" }}>
                {item.discount}
              </td>
              <td style={{ border: "1px solid rgb(0, 0, 0)", padding: "1.5mm", textAlign: dir === "rtl" ? "left" : "right", fontSize: "8pt", fontWeight: "bold" }}>
                {item.total} {inv.currency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ border: "2px solid rgb(0, 0, 0)", marginBottom: "3mm" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            fontSize: "8pt",
            borderBottom: "2px solid rgb(0, 0, 0)",
          }}
        >
          {[
            { label: inv.subtotal, value: `${inv.subtotalValue} ${inv.currency}` },
            { label: inv.discount, value: inv.dash },
            { label: inv.paid, value: `${inv.paidValue} ${inv.currency}` },
            { label: inv.remaining, value: `${inv.remainingValue} ${inv.currency}` },
          ].map((row, index) => (
            <div
              key={row.label}
              style={{
                padding: "1.5mm 2mm",
                borderLeft: index > 0 && dir === "rtl" ? "1px solid rgb(0, 0, 0)" : undefined,
                borderRight: index > 0 && dir === "ltr" ? "1px solid rgb(0, 0, 0)" : undefined,
                display: "flex",
                justifyContent: "space-between",
                fontWeight: index === 3 ? "bold" : undefined,
              }}
            >
              <span style={{ fontWeight: "bold" }}>{row.label}:</span>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "2mm 3mm",
            backgroundColor: "rgb(245, 245, 245)",
            borderBottom: "2px solid rgb(0, 0, 0)",
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "11pt", textTransform: "uppercase" }}>{inv.grandTotal}:</span>
          <span style={{ fontWeight: "bold", fontSize: "11pt" }}>
            {inv.grandTotalValue} {inv.currency}
          </span>
        </div>
        <div style={{ padding: "1.5mm 2mm", fontSize: "8pt", fontStyle: "italic" }}>
          <span style={{ fontWeight: "bold" }}>{inv.amountInWords}: </span>
          {inv.amountWords}
        </div>
      </div>

      <div style={{ border: "2px solid rgb(0, 0, 0)", padding: "2mm", marginBottom: "3mm" }}>
        <div style={{ fontWeight: "bold", fontSize: "9pt", marginBottom: "1mm", textTransform: "uppercase" }}>{inv.terms}</div>
        <ul style={{ margin: 0, paddingLeft: 0, paddingRight: dir === "rtl" ? "4mm" : 0, paddingInlineStart: "4mm", fontSize: "7pt", lineHeight: 1.4 }}>
          <li>{inv.term1}</li>
          <li>{inv.term2}</li>
          <li>{inv.term3}</li>
        </ul>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8mm", marginTop: "8mm" }}>
        {[inv.sellerSignature, inv.buyerSignature].map((label) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div
              style={{
                borderTop: "2px solid rgb(0, 0, 0)",
                marginTop: "12mm",
                paddingTop: "1.5mm",
                fontWeight: "bold",
                fontSize: "8pt",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: "7pt",
          borderTop: "1px solid rgb(0, 0, 0)",
          paddingTop: "3mm",
          marginTop: "4mm",
          color: "rgb(102, 102, 102)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", alignItems: "center" }}>
          <AsanHesabFooter inv={inv} />
        </div>
      </div>
    </div>
  );
}
