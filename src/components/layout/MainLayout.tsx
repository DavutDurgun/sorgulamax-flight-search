"use client";

import React, { Suspense } from "react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { LoadingSkeleton } from "@/components/ui/skeleton/compound";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  errorBoundaryResetKeys?: any[];
}

export default function MainLayout({
  children,
  errorBoundaryResetKeys,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <HeroSection />

      <main className="relative" role="main" aria-live="polite">
        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <ErrorBoundary
            resetKeys={errorBoundaryResetKeys}
            fallbackRender={({ resetError }) => (
              <div className="max-w-6xl mx-auto">
                <div className="mb-4">
                  <p className="text-center text-red-700">
                    Bir hata oluştu. Sayfayı yeniden deneyebilirsiniz.
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    onClick={() => resetError?.()}
                  >
                    Yeniden Dene
                  </button>
                </div>
              </div>
            )}
          >
            <Suspense
              fallback={<LoadingSkeleton.Card className="max-w-6xl mx-auto" />}
            >
              {children}
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>

      <Footer />
    </div>
  );
}
