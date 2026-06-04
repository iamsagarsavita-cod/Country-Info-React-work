import { useState } from "react";
import Axios from "axios";

function CountryInfo() {
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const fetchCountryDetails = async () => {
    try {
      if (!country) {
        setErrors("Please Enter a Country Name");
        return;
      }

      setLoading(true);
      setErrors("");

      const res = await Axios.get(
        `https://restcountries.com/v3.1/name/${country}?fullText=true`
      );

      setCountryData(res.data[0]);
    } catch (error) {
      setErrors("Country Not Found...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 p-4 shadow-lg w-[500px] mx-auto rounded-xl bg-gradient-to-br from-blue-400 via-sky-300 to-cyan-200">
      <h1 className="text-3xl font-bold text-white mb-10">
        🌍 Country Info
      </h1>

      <input
        type="text"
        placeholder="Enter Country Name"
        className="w-80 px-4 py-3 rounded-xl outline-none"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-4"
        onClick={fetchCountryDetails}
      >
        Search
      </button>

      {loading && <p className="mt-4">Loading...</p>}
      {errors && <p className="text-red-600 mt-4">{errors}</p>}
    </div>
  );
}

export default CountryInfo;