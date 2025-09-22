import React from "react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div
        className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        aria-hidden
      />
      <div
        className="absolute top-40 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"
        aria-hidden
      />
      <div
        className="absolute bottom-20 left-1/3 w-24 h-24 bg-indigo-400/10 rounded-full blur-xl"
        aria-hidden
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Türkiye'nin online{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
              seyahat platformu
            </span>
          </h1>

          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Otel, uçak, araç kiralama ve otobüs bileti rezervasyonu yapın
          </p>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
            role="list"
            aria-label="Hızlı istatistikler"
          >
            <div className="text-center" role="listitem">
              <div className="text-2xl font-bold text-white">1M+</div>
              <div className="text-sm text-blue-200">Müşteri</div>
            </div>
            <div className="text-center" role="listitem">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-blue-200">Havayolu</div>
            </div>
            <div className="text-center" role="listitem">
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-sm text-blue-200">Otel</div>
            </div>
            <div className="text-center" role="listitem">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-blue-200">Destek</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
