import React from "react";

export default function Footer() {
  return (
    <footer
      className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-20"
      role="contentinfo"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-xl font-bold text-white mb-4">
              <span className="text-green-500">sorgula</span>
              <span className="text-blue-500">max</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Türkiye'nin en güvenilir online seyahat platformu. En uygun
              fiyatları bulun, güvenle rezervasyon yapın.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Hizmetlerimiz
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Uçak Bileti
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Otel Rezervasyonu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Otobüs Bileti
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Araç Kiralama
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tatil Paketleri
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Destek</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Yardım Merkezi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sıkça Sorulan Sorular
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  İletişim
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Şikayet ve Öneri
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Kurumsal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Kariyer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Basın
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Kullanım Şartları
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 SorgulaMax. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
