import { Bars3Icon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import { Social } from "../typings";

type Props = {
  socials: Social[];
  scrollY: number;
  sidebarOn: boolean;
  setSidebarOn: (sidebarOn: boolean) => void;
};

export default function Header({
  socials,
  scrollY,
  sidebarOn,
  setSidebarOn,
}: Props) {

  return (
    <header
      className={`sticky top-0 p-3 flex justify-between z-30 mx-auto items-start xl:items-center ${
        sidebarOn ? "bg-[#fff7ee]" : "bg-white"
      } ${
        scrollY === 0 ? "drop-shadow-none" : "drop-shadow"
      } transition duration-300 min-w-full h-[70px]`}
    >
      <motion.div
        initial={{ x: -500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="flex items-center"
      >
        {/* Social Icons */}
        {socials.map((social) => (
          <SocialIcon
            key={social._id}
            url={social.url}
            fgColor="#68c8e8"
            bgColor="transparent"
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ x: 500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="hidden md:flex items-center"
      >
        <Link href="#about">
          <button className="heroButton">About</button>
        </Link>
        <Link href="#experience">
          <button className="heroButton">Experience</button>
        </Link>
        <Link href="#skills">
          <a className="heroButton">Skills</a>
        </Link>
        <Link href="#certifications">
          <a className="heroButton">Certifications</a>
        </Link>
        {/* <Link href="#projects">
          <a className="heroButton">Projects</a>
        </Link> */}
      </motion.div>
      <motion.div
        initial={{ x: 500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="md:hidden"
      >
        <label className="h-7 w-7 mt-3 mr-3 text-sunset-blue swap swap-rotate">
          <input
            id="hamburger"
            placeholder="menu"
            type="checkbox"
            checked={sidebarOn}
            onClick={() => {
              setSidebarOn(!sidebarOn);
            }}
          />
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </motion.div>
    </header>
  );
}
