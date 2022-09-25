import React from "react";
import { motion } from "framer-motion";
import { Project } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  projects: Project[];
};

export default function Projects({ projects }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex flex-col overflow-hidden text-left max-w-full 2xl:justify-center mx-auto items-center z-0 pt-[100px]"
    >
      <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      <div className="w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-track-gray-400/20 scrollbar-thumb-sunset-orange/80 scrollbar-thin">
        {projects.map((project, i) => (
          <div
            key={project._id}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-2 items-center justify-center p-20"
          >
            <motion.div
              initial={{
                y: -50,
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1.2,
              }}
              viewport={{ once: true }}
            >
              <img
                src={urlFor(project?.image).url()}
                className="h-20 md:h-40 2xl:h-80"
                alt="myproject"
              />
            </motion.div>

            <div className="space-y-2 px-0 md:px-10 max-w-6xl">
              <h4 className="text-xl font-semibold text-center">
                <span className="underline decoration-sunset-orange/50">
                  Case Study {i + 1} of {projects.length}: <br />
                </span>
                {project?.title}
              </h4>
              <div className="flex items-center space-x-2 justify-center">
                {project.technologies.map((tech) => (
                  <img
                    key={tech._id}
                    className={`${
          tech.square ? "" : "rounded-full"} h-10 w-10`}
                    src={urlFor(tech?.image).url()}
                    alt="mytech"
                  />
                ))}
              </div>
              {/* <p className="text-lg text-center md:text-left">
                {project?.summary}
              </p> */}
              <ul className="list-disc space-y-1 ml-5 text-lg">
                {project.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[30%] bg-sunset-orange/10 left-0 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
