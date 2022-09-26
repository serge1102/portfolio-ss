import React, { useState } from "react";
import {
  Bars3Icon,
  SparklesIcon,
  DocumentMagnifyingGlassIcon,
  FireIcon,
  UserIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import SidebarRow from "./SidebarRow";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

type Props = {
  sidebarOn: boolean;
  setSidebarOn: (sidebarOn: boolean) => void;
};

export default function Sidebar({ sidebarOn, setSidebarOn }: Props) {
  function toAnchor(anchorId: string) {
    setSidebarOn(!sidebarOn);
    let toel = document.getElementById(anchorId);
    toel!.scrollIntoView(true);
  }

  return (
    <AnimatePresence>
      {sidebarOn && (
        <motion.div
          key={"my_unique_key"}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="top-[70px] right-0 fixed h-screen w-screen z-40 bg-[#fff7ee] flex-col"
        >
          {/* <div
            className="flex justify-end items-center mx-auto"
            onClick={() => setSidebarOn(!sidebarOn)}
          >
            <Bars3Icon className="text-sunset-blue h-7 w-7 mt-5 mr-6" />
          </div> */}

          <div className="p-10">
            <SidebarRow
              Icon={UserIcon}
              title="About"
              anchorId="about"
              toAnchor={toAnchor}
            />
            <SidebarRow
              Icon={FireIcon}
              title="Experience"
              anchorId="experience"
              toAnchor={toAnchor}
            />
            <SidebarRow
              Icon={SparklesIcon}
              title="Skills"
              anchorId="skills"
              toAnchor={toAnchor}
            />
            <SidebarRow
              Icon={CheckBadgeIcon}
              title="Certifications"
              anchorId="certifications"
              toAnchor={toAnchor}
            />
            <SidebarRow
              Icon={DocumentMagnifyingGlassIcon}
              title="Projects"
              anchorId="projects"
              toAnchor={toAnchor}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
