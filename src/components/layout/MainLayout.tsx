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

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <HeroSection />

      <main className="relative" role="main" aria-live="polite">
        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <ErrorBoundary
            fallback={
              <div className="p-8 text-center text-red-700">
                Bir hata oluştu. Sayfayı yeniden deneyebilirsiniz.
                <div className="mt-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
                  >
                    Yeniden Dene
                  </button>
                </div>
              </div>
            }
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
