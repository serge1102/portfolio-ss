import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import About from "../components/About";
import ContactMe from "../components/ContactMe";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Sidebar from "../components/Sidebar";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience";
import { sanityClient, urlFor } from "../sanity";
import { Experience, PageInfo, Project, Skill, Social } from "../typings";
import {
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
};

const Home = ({ pageInfo, experiences, projects, skills, socials }: Props) => {
  const [scrollY, setScrollY] = useState(0);
  const [sidebarOn, setSidebarOn] = useState(false);

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
      className={`bg-white text-sunset-orange h-screen overflow-x-hidden z-0 ${
        sidebarOn
          ? "scrollbar-none overflow-y-hidden"
          : "scrollbar-thin scrollbar-track-sunset-blue/20 scrollbar-thumb-sunset-orange/80"
      }`}
    >
      {sidebarOn && (
        <Sidebar sidebarOn={sidebarOn} setSidebarOn={setSidebarOn} />
      )}
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

      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <Image
              className="rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
              src={urlFor(pageInfo?.heroImage).url()}
              width={40}
              height={40}
              alt="myfooter"
            />
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  console.log(await sanityClient.fetch(queryPageInfo));
  const pageInfo: PageInfo = await sanityClient.fetch(queryPageInfo);
  const experiences: Experience[] = await sanityClient.fetch(queryExperience);
  const skills: Skill[] = await sanityClient.fetch(querySkills);
  const _projects: Project[] = await sanityClient.fetch(queryProjects);
  const projects = [_projects[1], _projects[2], _projects[3], _projects[0]];
  // const projects = projects_b.reverse();
  const socials: Social[] = await sanityClient.fetch(querySocials);

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      projects,
      socials,
    },
    revalidate: 10,
  };
};
