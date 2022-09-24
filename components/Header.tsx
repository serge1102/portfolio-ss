import { Bars3Icon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import React, {  } from "react";
import { SocialIcon } from "react-social-icons";
import { Social } from "../typings";

type Props = {
  socials: Social[];
  scrollY: number;
  sidebarOn: boolean;
  setSidebarOn: (sidebarOn: boolean) => void;
};

export default function Header({ socials, scrollY, sidebarOn, setSidebarOn }: Props) {
  return (
    <header
      className={`sticky top-0 p-3 flex justify-between z-30 mx-auto items-start xl:items-center bg-white ${
        scrollY === 0 ? "drop-shadow-none" : "drop-shadow"
      } transition duration-300 min-w-full`}
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
        initial={{ y: -100, opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
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
          <button className="heroButton">Skills</button>
        </Link>
        <Link href="#projects">
          <button className="heroButton">Projects</button>
        </Link>
      </motion.div>
      <Link href="#contact">
        <motion.div
          initial={{ x: 500, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hidden md:flex items-center text-sunset-blue cursor-pointer"
        >
          <SocialIcon network="email" fgColor="#68c8e8" bgColor="transparent" />
          <p className="hidden md:inline-block text-sunset-blue">
            Get In Touch
          </p>
        </motion.div>
      </Link>
      <motion.div
        initial={{ x: 500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="md:hidden"
      >
        <Bars3Icon
          className="text-sunset-blue h-7 w-7 mt-2 mr-3"
          onClick={() => setSidebarOn(!sidebarOn)}
        />
      </motion.div>
    </header>
  );
}
