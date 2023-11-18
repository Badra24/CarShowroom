"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
import MyModal from "./Mymodal"; // Import modal yang sudah dibuat

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="w-full  absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>

        <CustomButton
          title="Sign in"
          btnType="button"
          containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
          handleClick={openModal} // Menambahkan event handler untuk membuka modal
        />

        {/* Modal */}
        {isModalOpen && <MyModal closeModal={closeModal} />}
      </nav>
    </header>
  );
};

export default NavBar;
