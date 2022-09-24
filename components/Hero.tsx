import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Image from "next/image";
import Link from "next/link";
import { PageInfo } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  pageInfo: PageInfo;
};

export default function Hero({ pageInfo }: Props) {
  const [text, count] = useTypewriter({
    words: [
      `Hi, My name is ${pageInfo?.name}`,
      "Guy-who-loves-Coding.tsx",
      "<AndAlso Cats, Games, Movies />",
    ],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />
      <div className="mt-15">
        <Image
          className="relative rounded-full h-32 w-32 mx-auto object-cover"
          src={urlFor(pageInfo?.heroImage).url()}
          width={100}
          height={100}
          alt="myimage"
        />
      </div>
      <div className="z-20">
        <h2 className="text-lg uppercase text-sunset-orange/80 pb-2 tracking-[15px]">
          {pageInfo.role}
        </h2>
        <h1 className="text-2xl lg:text-6xl font-semibold px-10 min-h-[100px]">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>
      </div>
    </div>
  );
}
