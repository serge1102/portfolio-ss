import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
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
  Strength,
} from "../typings";
import {
  queryCertifications,
  queryExperience,
  queryPageInfo,
  queryProjects,
  querySkills,
  querySocials,
  queryStrengths,
} from "../utils/groq/groqUtil";
import Strengths from "../components/Strengths";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  // projects: Project[];
  socials: Social[];
  certifications: Certification[];
  strengths: Strength[];
};

const Home = ({
  pageInfo,
  experiences,
  // projects,
  skills,
  socials,
  certifications,
  strengths
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

    // Function to check screen width and update chatbotOn state
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setChatbotOn(false); // Mobile size
      } else {
        setChatbotOn(true); // PC size
      }
    };

    // Initial check when the component mounts
    handleResize();

    // // Add event listener to handle window resize
    // window.addEventListener("resize", handleResize);

    // // Cleanup event listener on component unmount
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
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

      <section id="strengths">
        <Strengths strengths={strengths} />
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

      {/* <section id="projects">
        <Projects projects={projects} />
      </section> */}

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
      <AnimatePresence>
        {chatbotOn ? (
          <motion.div
            key={"chatbot"}
            initial={{ y: 200, opacity: 0 }}
            exit={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 right-5 bg-white border-5 z-50"
          >
            <Chatbot chatbotOn={chatbotOn} setChatbotOn={setChatbotOn} />
          </motion.div>
        ) : (
          <motion.div
            key={"chatbotIcon"}
            initial={{ y: 20, opacity: 0 }}
            exit={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 right-5 z-50"
          >
            <motion.div
              animate={{
                y: [0, -10, 0], // y軸でのバウンスアニメーション
              }}
              transition={{
                duration: 2, // アニメーションの継続時間
                ease: "easeInOut", // アニメーションのイージング
                repeat: Infinity, // 無限にリピート
                repeatType: "loop", // ループする
              }}
            >
              <ChatBubbleBottomCenterTextIcon
                height={60}
                width={60}
                onClick={() => setChatbotOn(!chatbotOn)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="sticky bottom-5 w-full">
        <div className="flex items-center justify-center">
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
      </footer>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await sanityClient.fetch(queryPageInfo);
  const experiences: Experience[] = await sanityClient.fetch(queryExperience);
  const skills: Skill[] = await sanityClient.fetch(querySkills);
  // const _projects: Project[] = await sanityClient.fetch(queryProjects);
  // const projects = [_projects[1], _projects[2], _projects[3], _projects[0]];
  const socials: Social[] = await sanityClient.fetch(querySocials);
  const certifications: Certification[] = await sanityClient.fetch(
    queryCertifications
  );
  const strengths: Strength[] = await sanityClient.fetch(
    queryStrengths
  );


  return {
    props: {
      pageInfo,
      experiences,
      skills,
      // projects,
      socials,
      certifications,
      strengths
    },
    revalidate: 10,
  };
};
