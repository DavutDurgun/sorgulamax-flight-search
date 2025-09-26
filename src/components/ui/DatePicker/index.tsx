"use client";

import React, { useState, useRef, useEffect } from "react";
import { CalendarDays, X } from "lucide-react";
import { cn, formatDate, getTodayString } from "@/utils";
import { format } from "date-fns";
import CalendarPopup from "./CalendarPopup";
import useOutsideClick from "@/hooks/useOutsideClick";

export interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function DatePicker({
  value,
  onChange,
  minDate = getTodayString(),
  placeholder = "Tarih seçin",
  disabled = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    value ? new Date(value) : new Date()
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useOutsideClick(containerRef, () => setIsOpen(false));

  // Sync from prop -> state
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      setSelectedDate(d);
      setCurrentMonth(d);
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const handleInputToggle = () => {
    if (disabled) return;
    setIsOpen((v) => !v);
  };

  const handleDateSelect = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    setSelectedDate(date);
    onChange(dateString);
    setIsOpen(false);
  };

  const displayValue = selectedDate
    ? formatDate(selectedDate.toISOString().slice(0, 10), "d MMM, EEE")
    : "";

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onClick={handleInputToggle}
          placeholder={placeholder}
          disabled={disabled}
          readOnly
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className={cn(
            "ml-1   truncate w-full font-semibold text-gray-700 h-7 pl-4  text-sm cursor-pointer transition-all duration-200",
            "placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:border-transparent",
            "border-transparent focus:ring-transparent hover:border-transparent focus:border-transparent",
            disabled &&
              "  text-gray-400  placeholder:text-gray-400 cursor-not-allowed hover:border-gray-300"
          )}
        />

        {/* Icon */}
        <CalendarDays
          className={cn(
            "absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700",
            disabled &&
              "  text-gray-400  cursor-not-allowed hover:border-gray-300"
          )}
        />
      </div>

      {/* Popup */}
      {isOpen && !disabled && (
        <CalendarPopup
          minDate={minDate}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
