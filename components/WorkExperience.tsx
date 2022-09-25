import { motion } from "framer-motion";
import React from "react";
import { Experience } from "../typings";
import ExperienceCard from "./ExperienceCard";

type Props = { experiences: Experience[] };

export default function WorkExperience({ experiences }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex overflow-hidden flex-col max-w-full px-10 py-[100px] 2xl:justify-center mx-auto items-center"
    >
      <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl">
        Experience
      </h3>

      <div className="mt-10 w-full flex justify-center">
        {experiences.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </div>
    </motion.div>
  );
}
