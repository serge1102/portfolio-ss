import { motion } from "framer-motion";
import React from "react";
import { urlFor } from "../sanity";
import { Strength } from "../typings";

type Props = {
  strengths: Strength[];
};

export default function Strengths({ strengths }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col text-center md:text-left py-[100px] max-w-[2000px] xl:px-10 md:justify-center items-center mx-auto"
    >
      <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl">
        Strengths
      </h3>
      <h3 className="uppercase tracking-[3px] text-gray-500 text-sm">
        Here are some of my strengths
      </h3>
      <div className="grid md:grid-cols-3 gap-10 mt-10 md:mt-20">
        {strengths.map((strength) => (
          <motion.div
            key={strength?._id}
            className="card bg-base-100 w-80 md:w-96 shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <figure className="bg-orange-200">
              <img
                alt="strength"
                src={urlFor(strength?.image).url()}
                className="w-auto"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-sunset-blue">{strength.title}</h2>
              <p className="text-gray-500 text-left">{strength.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
