import React from "react";
import Skeleton from "./Skeleton";
import { cn } from "@/utils/general";

export function Lines({
  lines = 1,
  className = "",
  lineClass = "h-4 w-full",
  gap = "space-y-2",
}: {
  lines?: number;
  className?: string;
  lineClass?: string;
  gap?: string;
}) {
  return (
    <div className={cn(gap, className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={
            i === lines - 1 && lines > 1 ? cn(lineClass, "w-3/4") : lineClass
          }
        />
      ))}
    </div>
  );
}
