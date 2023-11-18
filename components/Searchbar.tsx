"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import SearchManufacturer from "./SearchManufacturer";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = ({
  setManufacturer,
  setModel,
}: {
  setManufacturer: React.Dispatch<React.SetStateAction<string>>;
  setModel: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [searchmanufacturer, setSearchManuFacturer] = useState("");
  const [searchmodel, setSearchModel] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchmanufacturer.trim() === "" && searchmodel.trim() === "") {
      return alert("Please provide some input");
    }

    setModel(searchmodel);
    setManufacturer(searchmanufacturer);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item z-50">
        <SearchManufacturer
          selected={searchmanufacturer}
          setSelected={setSearchManuFacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={searchmodel}
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder="Tiguan..."
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
