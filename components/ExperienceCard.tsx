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
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0  w-[300px] md:w-[600px] xl:w-[900px] p-10 cursor-pointer transition-opacity duration-200 overflow-hidden">
      <motion.img
        initial={{ y: -40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="w-[200px] md:w-auto md:h-[70px] object-cover"
        src={urlFor(experience.companyImage).url()}
        alt="myexperience"
      />
      <div className="px-0 md:px-10 text-left">
        <p className="font-bold text-2xl mt-1">System Engineer</p>
        <div className="flex space-x-2 my-2">
          {experience.technologies.map((tech) => (
            <img
              key={tech._id}
              className="rounded-full h-10 w-10"
              src={urlFor(tech?.image).url()}
              alt="mytech"
            />
          ))}
        </div>
        <p className="uppercase py-5 text-gray-300">
          {new Date(experience.dateStarted).toDateString()} -{" "}
          {experience.isCurrentlyWorkingHere
            ? "Present"
            : new Date(experience.dateEnded).toDateString()}
        </p>
        {/* <ul className="list-disc space-y-4 ml-5 text-lg">
          {experience.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul> */}
      </div>
    </article>
  );
}
