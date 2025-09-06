// components/EventDayTabs.tsx
"use client";
import { useState } from "react";

export type DayProgram = {
  dayKey: "sab" | "dom" | "lun";
  label: string;
  dateISO: string; // 2025-12-06
  items: { time: string; title: string; location?: string; note?: string }[];
};

export default function EventDayTabs({ days }: { days: DayProgram[] }) {
  const [active, setActive] = useState<DayProgram["dayKey"]>(days[0]?.dayKey ?? "sab");
  const current = days.find((d) => d.dayKey === active);

  return (
    <div className="mt-6">
      <div className="inline-flex rounded-xl border bg-white p-1">
        {days.map((d) => (
          <button
            key={d.dayKey}
            onClick={() => setActive(d.dayKey)}
            className={`px-4 py-2 text-sm rounded-lg transition ${
              active === d.dayKey ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-pressed={active === d.dayKey}
            aria-controls={`panel-${d.dayKey}`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div id={`panel-${current?.dayKey}`} className="mt-6">
        {!current ? (
          <p className="text-gray-600">Sin actividades cargadas.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="px-4 py-3 w-28">Hora</th>
                  <th className="px-4 py-3">Actividad</th>
                  <th className="px-4 py-3 w-40 hidden sm:table-cell">Lugar</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {current.items.map((it, idx) => (
                  <tr key={idx} className="align-top">
                    <td className="px-4 py-3 font-mono text-sm">{it.time}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{it.title}</div>
                      {it.note && <div className="text-sm text-gray-600 mt-1">{it.note}</div>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 hidden sm:table-cell">
                      {it.location ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-3">
          * Programa sujeto a cambios menores por clima/logística local.
        </p>
      </div>
    </div>
  );
}
