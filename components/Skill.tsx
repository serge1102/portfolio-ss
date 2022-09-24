import { motion } from "framer-motion";
import React from "react";
import { urlFor } from "../sanity";
import { Skill as SkillType } from "../typings";

type Props = {
  directionLeft?: boolean;
  skill: SkillType;
};

export default function Skill({ directionLeft, skill }: Props) {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.img
        initial={{ x: directionLeft ? -80 : 80, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        src={urlFor(skill.image).url()}
        alt="myskill"
        className="rounded-full border border-white w-16 h-16 md:w-24 md:h-24 filter group-hover:grayscale transition duration-300 ease-in-out"
      />
      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white w-16 h-16 md:w-24 md:h-24 rounded-full z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl fond-bold text-sunset-blue opacity-100">
            {skill.progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
