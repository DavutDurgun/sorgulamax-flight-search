import React from "react";
import { cn } from "@/utils/general";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  animate?: boolean;
  variant?: "default" | "rounded" | "pill" | "square";
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className = "", animate = true, variant = "default", ...props }, ref) => {
    const variantClass =
      variant === "rounded"
        ? "rounded-md"
        : variant === "pill"
        ? "rounded-full"
        : variant === "square"
        ? "rounded-none"
        : "rounded-md";

    return (
      <div
        ref={ref}
        role="presentation"
        aria-hidden
        className={cn(
          "bg-gray-200",
          variantClass,
          animate ? "animate-skeleton" : "",
          className
        )}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

export default Skeleton;
