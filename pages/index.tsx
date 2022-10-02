import {
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import About from "../components/About";
import Certifications from "../components/Certifications";
import Chatbot from "../components/Chatbot";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Sidebar from "../components/Sidebar";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience";
import { sanityClient, urlFor } from "../sanity";
import {
  Certification,
  Experience,
  PageInfo,
  Project,
  Skill,
  Social,
} from "../typings";
import {
  queryCertifications,
  queryExperience,
  queryPageInfo,
  queryProjects,
  querySkills,
  querySocials,
} from "../utils/groq/groqUtil";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
  certifications: Certification[];
};

const Home = ({
  pageInfo,
  experiences,
  projects,
  skills,
  socials,
  certifications,
}: Props) => {
  const [scrollY, setScrollY] = useState(0);
  const [sidebarOn, setSidebarOn] = useState(false);
  const [chatbotOn, setChatbotOn] = useState(false);

  const handleScroll = (e: HTMLElement) => {
    setScrollY(e!.scrollTop);
  };

  useEffect(() => {
    const main: HTMLElement = document.querySelector("#main")!;
    main!.addEventListener("scroll", () => handleScroll(main));
  }, []);

  return (
    <div
      id="main"
      className={`relative bg-white text-sunset-orange h-screen overflow-x-hidden z-0 ${
        sidebarOn
          ? "scrollbar-none overflow-y-hidden"
          : "scrollbar-thin scrollbar-track-sunset-blue/20 scrollbar-thumb-sunset-orange/80"
      }`}
    >
      <Sidebar sidebarOn={sidebarOn} setSidebarOn={setSidebarOn} />
      <Head>
        <title>{pageInfo?.name} - Portfolio</title>
      </Head>

      <Header
        socials={socials}
        scrollY={scrollY}
        sidebarOn={sidebarOn}
        setSidebarOn={setSidebarOn}
      />

      <section id="hero">
        <Hero pageInfo={pageInfo} />
      </section>

      <section id="about">
        <About pageInfo={pageInfo} />
      </section>

      <section id="experience">
        <WorkExperience experiences={experiences} />
      </section>

      <section id="skills">
        <Skills skills={skills} />
      </section>

      <section id="certifications">
        <Certifications certifications={certifications} />
      </section>

      <section id="projects">
        <Projects projects={projects} />
      </section>

      <section id="bottom">
        <div className="h-30 flex flex-col justify-center items-center p-10">
          <p className="font-bold">© Satsuki Shiba</p>
          <p className="font-bold">{new Date().toDateString()}</p>
        </div>
      </section>

      {/* Contact Me */}
      {/* <section id="contact">
        <ContactMe />
      </section> */}
      {chatbotOn && (
        <motion.div
          key={"my_unique_key"}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-5 right-5 bg-white border-5 z-50"
        >
          <Chatbot chatbotOn={chatbotOn} setChatbotOn={setChatbotOn} />
        </motion.div>
      )}
      <footer className="sticky bottom-5 w-full">
        <div className="ml-12 flex items-center justify-center">
          <div className="w-full flex justify-end">
            <Link href="#hero">
              <Image
                className="rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
                src={urlFor(pageInfo?.heroImage).url()}
                width={40}
                height={40}
                alt="myfooter"
              />
            </Link>
          </div>

          {!chatbotOn ? (
            <div className="w-full flex justify-end px-4 animate-pulse">
              <ChatBubbleBottomCenterTextIcon
                height={60}
                width={60}
                onClick={() => setChatbotOn(!chatbotOn)}
              />
            </div>
          ) : (
            <div className="w-full flex justify-end px-4 animate-pulse">
              <ChatBubbleBottomCenterTextIcon
                height={60}
                width={60}
                onClick={() => setChatbotOn(!chatbotOn)}
              />
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await sanityClient.fetch(queryPageInfo);
  const experiences: Experience[] = await sanityClient.fetch(queryExperience);
  const skills: Skill[] = await sanityClient.fetch(querySkills);
  const _projects: Project[] = await sanityClient.fetch(queryProjects);
  const projects = [_projects[1], _projects[2], _projects[3], _projects[0]];
  const socials: Social[] = await sanityClient.fetch(querySocials);
  const certifications: Certification[] = await sanityClient.fetch(
    queryCertifications
  );

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      projects,
      socials,
      certifications,
    },
    revalidate: 10,
  };
};
