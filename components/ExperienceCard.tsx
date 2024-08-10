import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { Experience } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: Props) {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[300px] md:w-[600px] p-10 overflow-hidden snap-center">
      <motion.img
        initial={{ y: -40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className="w-[200px] md:w-[300px] 2xl:w-[400px] drop-shadow-lg max-h-7 md:max-h-12 object-contain"
        src={urlFor(experience.companyImage).url()}
        alt="myexperience"
      />
      <div className="flex flex-col justify-center items-center px-0 md:px-10 text-left">
        <p className="text-xl md:text-xl text-center">{experience.company}</p>
        <p className="font-bold text-xl md:text-3xl my-5">
          {experience.jobTitle}
        </p>
        <div className="flex space-x-2 my-1">
          {experience.technologies.map((tech) => (
            <img
              key={tech._id}
              className={`${
                tech.square ? "" : "rounded-full"
              } object-contain border border-white w-10 h-10 md:w-14 md:h-14`}
              src={urlFor(tech?.image).url()}
              alt="mytech"
            />
          ))}
        </div>
        <p className="uppercase py-5 text-blue-300 md:text-xl">
          {new Date(experience.dateStarted).toDateString()} -{" "}
          {experience.isCurrentlyWorkingHere
            ? "Present"
            : new Date(experience.dateEnded).toDateString()}
        </p>
        {/* <ul className="list-disc space-y-4 ml-5 text-lg">
          {experience.points?.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul> */}
      </div>
    </article>
  );
}
