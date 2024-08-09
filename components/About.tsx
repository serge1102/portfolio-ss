import { motion } from "framer-motion";
import React from "react";
import { urlFor } from "../sanity";
import { PageInfo } from "../typings";

type Props = {
  pageInfo: PageInfo;
};

export default function About({ pageInfo }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex flex-col max-w-7xl px-10 py-[100px] 2xl:justify-center items-center mx-auto"
    >
      <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>
      <div className="flex flex-col md:flex-row justify-center items-center mx-auto mt-10 md:px-40">
        <motion.img
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          src={urlFor(pageInfo?.profilePic).url()}
          alt="myimage2"
          className="flex-shrink-0 w-40 h-40 rounded-full object-cover object-top md:rounded-lg md:w-64 md:h-96 mb-10 2xl:w-[300px] 2xl:h-[450px]"
        />
        <div className="space-y-10 px-0 md:px-10 text-center md:text-left">
          <h4 className="text-4xl font-semibold">
            Here is a{" "}
            <span className="underline decoration-sunset-blue/50">little</span>{" "}
            background
          </h4>
          {/* 自己紹介 */}
          <p className="text-base text-sunset-orange whitespace-pre-line">
            {pageInfo?.backgroundInfomation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
