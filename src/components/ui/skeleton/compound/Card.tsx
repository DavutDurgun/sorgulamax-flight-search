import React from "react";
import Skeleton from "../Skeleton";
import { cn } from "@/utils/general";

export const Card = React.memo(function Card({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={cn("border border-gray-200 rounded-lg p-6", className)}>
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-end">
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
});
