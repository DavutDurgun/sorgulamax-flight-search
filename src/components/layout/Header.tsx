"use client";

import React, { useState } from "react";
import { Phone, Bell } from "lucide-react";

const NAV_ITEMS = [
  "Uçak Bileti",
  "Otel",
  "Otobüs Bileti",
  "Araç Kiralama",
  "Blog",
  "İletişim",
  "Yardım",
  "Kampanyalar",
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a
              href="/"
              aria-label="SorgulaMax anasayfa"
              className="flex items-center space-x-2"
            >
              <div className="text-2xl font-bold">
                <span className="text-primary-600">sorgula</span>
                <span className="text-blue-600">max</span>
              </div>
            </a>

            <div className="hidden md:block text-xs text-gray-500 border-l border-gray-300 pl-3">
              <span>&quot;Türkiye'nin seyahat arama motoru.&quot;</span>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Phone */}
            <div className="hidden md:flex items-center space-x-2 text-gray-600 mr-10">
              <Phone className="w-4 h-4 mr-2" aria-hidden />
              0850 335 00 00
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              <button
                aria-label="Bildirimler"
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bell className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2">
                <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Giriş Yap
                </button>
                <span className="text-gray-400" aria-hidden>
                  |
                </span>
                <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Üye Ol
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600"
              aria-label="Mobil menüyü aç"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav (simple) */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 pb-4 border-t border-gray-100">
            <nav aria-label="Mobil Menü" className="px-2 space-y-2">
              {NAV_ITEMS.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
