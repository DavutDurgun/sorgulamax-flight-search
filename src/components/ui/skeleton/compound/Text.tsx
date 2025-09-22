import React from "react";
import { Lines } from "../helpers";

export const Text = React.memo(function Text({
  lines = 1,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return <Lines lines={lines} className={className} />;
});
