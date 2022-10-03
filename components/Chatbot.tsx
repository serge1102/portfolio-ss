import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import agent from "../API/api";
import { Conversation } from "../models/conversation";
import { Button, LexResponse } from "../models/lexResponse";
import ChatbotLoading from "./ChatbotLoading";
import Image from "next/image";
import { urlFor } from "../sanity";
import { PageInfo } from "../typings";

interface Props {
  chatbotOn: boolean;
  setChatbotOn: (chatbotOn: boolean) => void;
}

const Chatbot = ({ chatbotOn, setChatbotOn }: Props) => {
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [inputValue, setInputValue] = useState("");
  const [convHistory, setConvHistory] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const firstOptions = [
    "現在の職業について",
    "スキルについて",
    "プログラミング言語について",
    "このサイトについて",
  ];
  const firstButtons: Button[] = [
    { text: "現在の職業について", value: "現在の職業について" },
    { text: "スキルについて", value: "スキルについて" },
    { text: "プログラミング言語について", value: "プログラミング言語について" },
    { text: "このサイトについて", value: "このサイトについて" },
  ];

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    await handleSend();
  };

  const handleButtonClick = async (value: string) => {
    handleSend(value);
  };

  const handleSend = async (value?: string) => {
    setLoading(true);
    setConvHistory((prevState) => [
      ...prevState,
      { userInput: true, comment: value ?? inputValue },
    ]);
    agent.Bot.send(value ?? inputValue, sessionId)
      .then((data: LexResponse) => {
        // setConvHistory((prevState) => [
        //   ...prevState,
        //   { userInput: false, comment: `「${value ?? inputValue}」ですね。` },
        // ]);
        setSessionId(data.sessionId);
        data.messages.map((msg) => {
          let btns: Button[] = [];
          msg.buttons?.map((btn) => [...btns, btn]);
          setConvHistory((prevState) => [
            ...prevState,
            { userInput: false, comment: msg.content, buttons: msg.buttons },
          ]);
        });
        if (data.endOfConversation) {
          setConvHistory((prevState) => [
            ...prevState,
            { userInput: false, buttons: firstButtons },
          ]);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    setInputValue("");
  };
  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [convHistory]);

  return (
    <div className="relative flex flex-col justify-between items-center h-[90vh] w-[90vw] md:h-[80vh] md:w-[400px] border-2 rounded-lg mx-auto">
      <AnimatePresence>
        {loading && (
          <motion.div
            key={"chatbotLoading"}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="z-50"
          >
            <ChatbotLoading />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex border-b-2 w-full items-center">
        <h1 className="font-bold ml-10 text-sunset-blue bg-white w-full text-center p-2 text-2xl tracking-[3px] md:tracking-[3px] uppercase">
          ChatBot
        </h1>
        <button
          className="text-4xl p-2 text-sunset-blue"
          onClick={() => setChatbotOn(!chatbotOn)}
        >
          ×
        </button>
      </div>
      <div
        id="conversation-area"
        className="h-full w-full overflow-auto scrollbar-none px-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 pb-2"
      >
        <p className="text-center mb-4 mt-2 px-2 py-1 bg-sunset-blue font-semibold text-white  rounded-md relative bot-output w-full">
          ご利用ありがとうございます！
          <br />
          質問を選択してください。
        </p>
        <div className="flex flex-col justify-center items-center border-2 rounded-xl p-2 w-fit bg-white border-none shadow-md">
          {firstOptions.map((opt) => (
            <button
              key={opt}
              className="m-2 px-2 py-1 text-white font-semibold  rounded-md bg-sunset-blue max-w-[12rem]  md:max-w-[26rem]"
              onClick={() => handleButtonClick(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        {convHistory.map((conv, keyId) => {
          if (conv.comment || conv.buttons)
            return (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                exit={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                key={keyId}
                className={`flex ${
                  conv.userInput ? "justify-end" : "justify-start"
                }`}
              >
                {conv.comment && (
                  <p
                    className={`m-2 px-2 py-1 text-white font-semibold rounded-md  relative max-w-[12rem]  md:max-w-[26rem] ${
                      conv.userInput
                        ? "user-output bg-sunset-orange"
                        : "bot-output bg-sunset-blue"
                    }`}
                  >
                    {conv.comment}
                  </p>
                )}
                {conv.buttons && (
                  <div className="flex flex-col justify-center items-center">
                    <p className="m-2 mb-4 px-2 py-1 text-white font-semibold rounded-md bg-sunset-blue relative max-w-[26rem] bot-output">
                      下記の選択肢から選択してください
                    </p>
                    <div className="flex flex-col justify-center items-center border-2 rounded-xl p-4 space-y-3 bg-white border-none shadow-md">
                      {conv.buttons?.map((btn) => (
                        <button
                          key={btn.value}
                          className="m-1 px-2 py-1 text-white font-semibold  rounded-md bg-sunset-blue max-w-[26rem]"
                          onClick={() => handleButtonClick(btn.value)}
                        >
                          {btn.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
        })}
        <div ref={scrollBottomRef} />
      </div>
      <div className="flex w-full">
        <input
          type="text"
          className="w-full bg-sunset-blue/40 focus:outline-none p-2 placeholder:text-white placeholder:font-semibold"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="ex) スキル、職業"
        />
        <button
          className="p-2 w-10 bg-sunset-blue/40 text-white"
          onClick={() => handleSend()}
        >
          <PaperAirplaneIcon />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
