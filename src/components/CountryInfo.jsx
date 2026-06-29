import { useState } from "react";
// import axios from "axios"; // Agar aap fetch use kar rahe hain toh iski zaroorat nahi
import { FaMoon, FaSun } from "react-icons/fa";
// import fetch from "node-fetch"; // Ise hata dein, browser ka apna fetch hota hai


function CountryInfo() {
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const fetchCountryDetails = async () => {
    try {
      if (!country.trim()) {
        setErrors("Please Enter a Country Name");
        return;
      }

      setLoading(true);
      setErrors("");
      setCountryData(null);

const response = await fetch(
  `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://restcountries.com/v3.1/name/${country}`)}`
);

      // Agar country nahi milti API 404 throw karta hai
      if (!response.ok) {
        throw new Error("Country not found");
      }

      // JSON ko sirf ek baar parse karein
      const data = await response.json(); 

      // Native fetch mein 'data' seedha array/object hota hai, 'res.data' nahi
      setCountryData(data[0]);

    } catch (error) {
      console.log("Error:", error.message);
      setErrors("Country Not Found...");
    } finally {
      // API call poori hone ke baad loading band karein (chahe success ho ya fail)
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#374151]"
          : "bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]"
      }`}
    >
      {/* Theme Toggle */}
      <div className="absolute top-5 right-5">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-16 h-8 rounded-full shadow-lg transition-all duration-300 ${
            darkMode ? "bg-slate-700" : "bg-gray-300"
          }`}
        >
          <div
            className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
              darkMode ? "left-9" : "left-1"
            }`}
          >
            {darkMode ? (
              <FaMoon className="text-xs text-slate-700" />
            ) : (
              <FaSun className="text-xs text-yellow-500" />
            )}
          </div>
        </button>
      </div>

      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="relative text-center mb-10">
          <h1
            className={`text-5xl font-extrabold mb-3 tracking-wide ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            🌍 Country Explorer
          </h1>
          <p
            className={`${
              darkMode ? "text-gray-300" : "text-slate-600"
            }`}
          >
            Discover information about any country in the world
          </p>
        </div>

        {/* Main Card */}
        <div
          className={`backdrop-blur-xl rounded-3xl p-6 shadow-2xl border transition-all duration-500 ${
            darkMode
              ? "bg-white/10 border-white/20"
              : "bg-white/70 border-gray-300"
          }`}
        >
          {/* Search Area */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search Country..."
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && fetchCountryDetails()
              }
              className={`flex-1 px-5 py-4 rounded-2xl outline-none border transition-all duration-300 ${
                darkMode
                  ? "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-400"
                  : "bg-white border-gray-300 text-slate-800 placeholder-gray-500 focus:ring-2 focus:ring-gray-500"
              }`}
            />
            <button
              onClick={fetchCountryDetails}
              className="bg-white text-gray-900 hover:bg-gray-200 transition-all duration-300 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105"
            >
              Search
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center mt-8">
              <div className="h-12 w-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error */}
          {errors && !loading && (
            <p className="text-center text-red-500 mt-5 text-lg font-semibold">
              {errors}
            </p>
          )}

          {/* Country Data */}
          {countryData && !loading && (
            <div className="mt-10">
              {/* Flag */}
              <div className="flex justify-center">
                <img
                  src={countryData.flags?.png}
                  alt={countryData.name?.common}
                  className="w-72 rounded-2xl shadow-2xl border-2 border-white/20 hover:scale-105 hover:rotate-1 transition-all duration-500"
                />
              </div>

              {/* Country Name */}
              <h2
                className={`text-center text-4xl font-bold mt-6 ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                {countryData.name?.common}
              </h2>
              <p
                className={`text-center mt-2 ${
                  darkMode ? "text-gray-300" : "text-slate-600"
                }`}
              >
                {countryData.name?.official}
              </p>

              {/* Info Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {[
                  {
                    title: "🏛 Capital",
                    value: countryData.capital?.[0] || "N/A",
                  },
                  {
                    title: "👥 Population",
                    value: countryData.population?.toLocaleString() || "N/A",
                  },
                  {
                    title: "🌎 Region",
                    value: countryData.region || "N/A",
                  },
                  {
                    title: "🗺 Sub Region",
                    value: countryData.subregion || "N/A",
                  },
                  {
                    title: "🌐 Domain",
                    value: countryData.tld?.[0] || "N/A",
                  },
                  {
                    title: "💰 Currency",
                    value: countryData.currencies
                      ? Object.values(countryData.currencies)[0]?.name
                      : "N/A",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                      darkMode
                        ? "bg-white/10 border-white/10 hover:bg-white/20"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <h3
                      className={`font-semibold ${
                        darkMode ? "text-gray-300" : "text-slate-500"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-xl mt-2 ${
                        darkMode ? "text-white" : "text-slate-800"
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="text-center mt-8">
                <span
                  className={`px-4 py-2 rounded-full border ${
                    darkMode
                      ? "bg-white/10 text-gray-200 border-white/20"
                      : "bg-white text-slate-700 border-gray-300"
                  }`}
                >
                  Independent:{" "}
                  {countryData.independent ? "Yes ✅" : "No ❌"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryInfo;