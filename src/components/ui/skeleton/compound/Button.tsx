import React from "react";
import Skeleton from "../Skeleton";
import { cn } from "@/utils/general";

export const Button = React.memo(function Button({
  className = "",
}: {
  className?: string;
}) {
  return <Skeleton className={cn("h-10 w-24 rounded-md", className)} />;
});
