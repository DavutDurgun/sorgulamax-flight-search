"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Plane, MapPin, Search, X } from "lucide-react";
import { AutocompleteLocation } from "@/types";
import { cn, debounce, getLocationDisplayName } from "@/utils";
import { LoadingSkeleton } from "@/components/ui/skeleton";

export interface AutocompleteInputProps {
  value: AutocompleteLocation | null;
  onChange: (location: AutocompleteLocation | null) => void;
  placeholder: string;
  suggestions: AutocompleteLocation[];
  onInputChange: (value: string) => void;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
}

export function AutocompleteInput({
  value,
  onChange,
  placeholder,
  suggestions,
  onInputChange,
  loading = false,
  error,
  disabled = false,
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    value ? getLocationDisplayName(value) : ""
  );
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Debounced input change
  const debouncedOnInputChange = useCallback(
    debounce((val: string) => onInputChange(val), 350),
    [onInputChange]
  );

  // Handle input changes
  const handleInputChange = (val: string) => {
    setInputValue(val);
    setIsOpen(true);
    setHighlightedIndex(-1);

    if (!val.trim() && value) onChange(null);

    debouncedOnInputChange(val);
  };

  const handleOptionSelect = (option: AutocompleteLocation) => {
    setInputValue(getLocationDisplayName(option));
    onChange(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsOpen(true);
      if (inputValue && !value) debouncedOnInputChange(inputValue);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
      if (value && inputValue !== getLocationDisplayName(value)) {
        setInputValue(getLocationDisplayName(value));
      }
    }, 150);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || disabled) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const nextIndex =
          highlightedIndex < suggestions.length - 1 ? highlightedIndex + 1 : 0;
        setHighlightedIndex(nextIndex);
        itemRefs.current[nextIndex]?.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        const prevIndex =
          highlightedIndex > 0 ? highlightedIndex - 1 : suggestions.length - 1;
        setHighlightedIndex(prevIndex);
        itemRefs.current[prevIndex]?.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
        break;

      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleOptionSelect(suggestions[highlightedIndex]);
        }
        break;

      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;

      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  // Update inputValue if value prop changes
  useEffect(() => {
    setInputValue(value ? getLocationDisplayName(value) : "");
  }, [value]);

  const getLocationIcon = (location: AutocompleteLocation) =>
    location.type === "airport" ? (
      <Plane className="w-4 h-4 text-blue-500" />
    ) : (
      <MapPin className="w-4 h-4 text-green-500" />
    );

  const showSuggestions = isOpen && (suggestions.length > 0 || loading);
  const showEmptyState =
    isOpen && !loading && suggestions.length === 0 && inputValue.length >= 2;

  return (
    <div className="relative ">
      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          className={cn(
            "w-full truncate font-semibold text-gray-700 h-7  text-sm transition-all duration-200",
            "placeholder:text-gray-700 focus:outline-none  focus:border-transparent",
            error
              ? "border-red-300 focus:ring-red-500/20"
              : "border-transparent focus:border-transparent",
            disabled && "bg-gray-50 cursor-not-allowed",
            "hover:border-transparent "
          )}
        />

        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-500 border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      {/* Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-60 overflow-hidden overflow-y-auto animate-fade-in  w-[300px]">
          {loading ? (
            <LoadingSkeleton.AutocompleteResults />
          ) : (
            <ul className="py-1  w-[300px]">
              {suggestions.map((option, index) => (
                <li
                  key={`${option.code}-${option.type}`}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={cn(
                    "px-4 py-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0",
                    "hover:bg-gray-50 active:bg-gray-100",
                    highlightedIndex === index && "bg-primary-50"
                  )}
                  onClick={() => handleOptionSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="flex items-center space-x-3">
                    {getLocationIcon(option)}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {option.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {option.type === "airport" ? "Havalimanı" : "Şehir"}
                        {option.country && ` • ${option.country}`}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      {option.code}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Empty State */}
      {showEmptyState && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 animate-fade-in w-[300px]">
          <div className="px-4 py-6 text-center text-gray-500">
            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">Aradığınız konumu bulamadık</p>
            <p className="text-xs text-gray-400 mt-1">
              Farklı anahtar kelimeler deneyin
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
