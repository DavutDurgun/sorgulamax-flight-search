"use client";
import React, { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      // Placeholder: replace with actual API call
      await new Promise((res) => setTimeout(res, 700));
      setSuccess(true);
      setEmail("");
    } catch (err) {
      // show toast / Sentry log
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      aria-label="Haber bülteni"
      className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 mt-8"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Haber bülteni
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Yeni özellikler ve kampanyalardan ilk siz haberdar olun
      </p>

      {success ? (
        <div className="text-sm text-green-600">
          Teşekkürler! E-posta listenize eklendiniz.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            E-posta adresiniz
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="E-posta adresiniz"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium whitespace-nowrap disabled:opacity-60"
          >
            {loading ? "Gönderiliyor..." : "Abone Ol"}
          </button>
        </form>
      )}
    </section>
  );
};

export default NewsletterSignup;
