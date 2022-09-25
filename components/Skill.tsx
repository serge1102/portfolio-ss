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
        initial={{ x: directionLeft ? -90 : 90, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        src={urlFor(skill.image).fit("fill").url()}
        alt="myskill"
        className={`${
          skill.square ? "" : "rounded-full"
        } object-contain border border-white w-16 h-16 md:w-20 md:h-20 filter group-hover:grayscale transition duration-300 ease-in-out`}
      />
      <div
        className={`${
          skill.square ? "" : "rounded-full"
        } absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white w-16 h-16 md:w-20 md:h-20  z-0`}
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl fond-bold text-sunset-blue opacity-100">
            {skill.progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
