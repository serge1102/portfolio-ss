import { motion } from "framer-motion";
import React from "react";
import { Skill as SkillType } from "../typings";
import Skill from "./Skill";

type Props = {
  skills: SkillType[];
};

export default function Skills({skills}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex flex-col text-center md:text-left py-[100px] max-w-[2000px] xl:px-10 md:justify-center items-center mx-auto"
    >
      <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl">
        Skills
      </h3>
      <h3 className="uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skill to see the description
      </h3>
      <div className="grid grid-cols-4 gap-5 mt-5 md:mt-20">
        {skills.slice(0, skills.length / 2).map((skill) => (
          <Skill key={skill._id} skill={skill} />
        ))}
        {skills.slice(skills.length / 2, skills.length).map((skill) => (
          <Skill key={skill._id} skill={skill} directionLeft={true} />
        ))}
      </div>
    </motion.div>
  );
}
