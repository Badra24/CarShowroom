"use client";
import { fetchCars } from "@utils";
import { HomeProps } from "@types";
import { fuels, yearsOfProduction } from "@constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@components";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize with true to show the loader initially

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2021);
  const [limit, setLimit] = useState(10);
  const [isFiltered, setIsFiltered] = useState(false); // Keep track of whether filters are applied or not

  const handleResetFilters = () => {
    // Update the URL without refreshing the page
    const currentURL = window.location.href;
    const updatedURL = currentURL.split("?")[0]; // Remove the query string
    window.history.pushState({}, "", updatedURL);

    // Reset all filter states
    setManufacturer("");
    setModel("");
    setFuel("");
    setYear(2021);
    setLimit(10);

    // Update isFiltered state
    setIsFiltered(false);
  };
  const getCars = async () => {
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });

      setAllCars(result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, model, manufacturer]);

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <button
            onClick={handleResetFilters}
            title="Unset"
            className="cursor-pointer flex items-center fill-blue-600 bg-white hover:bg-blue-900 active:border active:border-blue-400 rounded-md duration-100 p-2"
          >
            <svg
              viewBox="0 -0.5 25 25"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinejoin="round"
                stroke-linecap="round"
                stroke-width="1.5"
                d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
            <span className="text-sm text-blue-400 font-bold pr-1">Unset</span>
          </button>

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFuel={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setYear={setYear} // Corrected typo here (changed setYer to setYear)
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
              {allCars?.map((car) => (
                <div className="car-card relative overflow-hidden bg-white rounded-md shadow-md transition-transform duration-300 transform hover:scale-105">
                  {/* Isi dari CarCard */}
                  <CarCard car={car} />
                </div>
              ))}
            </div>
            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image
                  src="/arrow-down.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>"Api Error"</p>
          </div>
        )}
      </div>
    </main>
  );
}
