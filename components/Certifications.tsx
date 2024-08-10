import { motion } from "framer-motion";
import React from "react";
import { urlFor } from "../sanity";
import { Certification } from "../typings";

type Props = {
  certifications: Certification[];
};

export default function Certifications({ certifications }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col text-center md:text-left py-[100px] selection:max-w-7xl px-10 md:justify-center mx-auto items-center"
    >
      <h3 className="uppercase tracking-[10px] md:tracking-[20px] text-gray-500 text-2xl">
        Certifications
      </h3>
      <h3 className="uppercase tracking-[3px] text-gray-500 text-sm">
        I hold a bunch of certifications !
      </h3>
      <div className="space-y-4 mt-10">
        {certifications.map((certification) => (
          <div
            key={certification?._id}
            className="flex justify-start items-center space-x-4"
          >
            {certification.image ? (
              <motion.div
                initial={{ x: -150, opacity: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <img
                  src={urlFor(certification?.image).url()}
                  alt="mycertification"
                  className={`${
                    certification?.square ? "" : "rounded-full"
                  } object-contain border border-white w-24 md:w-36 `}
                />
              </motion.div>
            ) : (
              <div>
                <p>hello</p>
              </div>
            )}
            <motion.p
              initial={{ x: 150, opacity: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="md:text-2xl font-semibold"
            >
              {certification?.title}
            </motion.p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
