"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
} from "date-fns";
import { tr } from "date-fns/locale";
import { cn } from "@/utils";

type CalendarPopupProps = {
  minDate: string;
  currentMonth: Date;
  onMonthChange: (d: Date) => void;
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
  onClose: () => void;
};

const dayNames = ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"];

/**
 * CalendarPopup
 * - sadece render ve navigasyon mantığı içerir
 * - Monday-first hesaplama korunur (ay başındaki boş hücreler)
 */
export default function CalendarPopup({
  minDate,
  currentMonth,
  onMonthChange,
  selectedDate,
  onSelectDate,
  onClose,
}: CalendarPopupProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const goPrev = () => onMonthChange(subMonths(currentMonth, 1));
  const goNext = () => onMonthChange(addMonths(currentMonth, 1));

  const isDateDisabled = (date: Date) => {
    const minDateTime = new Date(minDate);
    return isBefore(startOfDay(date), startOfDay(minDateTime)) || false;
  };

  // Monday-first empty cells calc
  const emptyCellsCount =
    monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1;

  return (
    <div className="absolute top-full min-w-[250px] left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Önceki ay"
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <h3 className="text-sm font-semibold text-gray-900">
          {format(currentMonth, "MMMM yyyy", { locale: tr })}
        </h3>

        <button
          type="button"
          onClick={goNext}
          aria-label="Sonraki ay"
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((d) => (
          <div
            key={d}
            className="h-8 flex items-center justify-center text-xs font-medium text-gray-500"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: emptyCellsCount }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8" />
        ))}

        {calendarDays.map((date) => {
          const isSelected =
            (selectedDate && isSameDay(date, selectedDate)) || false;
          const isCurrentDay = isToday(date);
          const disabled = isDateDisabled(date);
          const inCurrentMonth = isSameMonth(date, currentMonth);

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => !disabled && onSelectDate(date)}
              disabled={disabled}
              aria-pressed={isSelected}
              className={cn(
                "h-8 flex items-center justify-center text-sm rounded transition-colors relative",
                "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
                inCurrentMonth ? "text-gray-900" : "text-gray-400",
                isSelected && "bg-primary-600 text-white hover:bg-primary-700",
                isCurrentDay &&
                  !isSelected &&
                  "bg-primary-50 text-primary-600 font-semibold",
                disabled && "cursor-not-allowed opacity-50 hover:bg-transparent"
              )}
            >
              {format(date, "d")}

              {isCurrentDay && !isSelected && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer actions */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
        <button
          type="button"
          onClick={() => onSelectDate(new Date())}
          className="text-xs text-primary-600 hover:text-primary-700 font-medium"
        >
          Bugün
        </button>

        <button
          type="button"
          onClick={onClose}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          İptal
        </button>
      </div>
    </div>
  );
}
