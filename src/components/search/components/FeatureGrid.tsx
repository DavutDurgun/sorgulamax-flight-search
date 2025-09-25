"use client";

import React from "react";

interface FeatureGridProps {
  features: string[];
  title?: string;
}

const FeatureGrid = ({ features, title }: FeatureGridProps) => {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
      role="list"
      aria-label={title}
    >
      {features.map((feature, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4" role="listitem">
          <div
            className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mb-3 mx-auto"
            aria-hidden
          >
            <svg
              className="w-4 h-4 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900">{feature}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
