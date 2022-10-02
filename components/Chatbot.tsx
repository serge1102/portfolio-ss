import { useLayoutEffect, useRef, useState } from "react";
import agent from "../API/api";
import { Conversation } from "../models/conversation";
import { Button, LexResponse } from "../models/lexResponse";

interface Props {
  chatbotOn: boolean;
  setChatbotOn: (chatbotOn: boolean) => void;
}

const Chatbot = ({chatbotOn, setChatbotOn}: Props) => {
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [inputValue, setInputValue] = useState("");
  const [convHistory, setConvHistory] = useState<Conversation[]>([]);
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
    setConvHistory((prevState) => [
      ...prevState,
      { userInput: true, comment: value ?? inputValue },
    ]);
    agent.Bot.send(value ?? inputValue, sessionId).then((data: LexResponse) => {
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
    });
    setInputValue("");
  };
  useLayoutEffect(() => {
    // 以下はtypescriptの書き方。jsの場合は
    // if(scrollBottomRef && scrollBottomRef.current) {
    //   scrollBottomRef.current.scrollIntoView()
    // }
    scrollBottomRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [convHistory]);

  return (
    <div className="relative flex flex-col justify-between items-center h-[600px] w-[300px] md:h-[700px] md:w-[500px] border-2 rounded-lg mx-auto">
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
      <div id="conversation-area" className="h-full w-full overflow-auto px-4">
        <p className="m-2 mb-4 px-2 py-1 text-gray-500  rounded-md bg-sunset-blue/40 relative bot-output max-w-[12rem]  md:max-w-[26rem]">
          ご利用ありがとうございます！聞きたい質問を選択してください。
        </p>
        <div className="flex flex-col justify-center items-center border-2 rounded-xl p-2 w-fit">
          {firstOptions.map((opt) => (
            <button
              key={opt}
              className="m-2 px-2 py-1 text-gray-500  rounded-md bg-sunset-blue/40 max-w-[12rem]  md:max-w-[26rem]"
              onClick={() => handleButtonClick(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        {convHistory.map((conv, keyId) => {
          if (conv.comment || conv.buttons)
            return (
              <div
                key={keyId}
                className={`flex ${
                  conv.userInput ? "justify-end" : "justify-start"
                }`}
              >
                {conv.comment && (
                  <p
                    className={`m-2 px-2 py-1 text-gray-500  rounded-md  relative max-w-[12rem]  md:max-w-[26rem] ${
                      conv.userInput
                        ? "user-output bg-sunset-orange/40"
                        : "bot-output bg-sunset-blue/40"
                    }`}
                  >
                    {conv.comment}
                  </p>
                )}
                {conv.buttons && (
                  <div className="flex flex-col justify-center items-center">
                    <p className="m-2 mb-4 px-2 py-1 text-gray-500  rounded-md bg-sunset-blue/40 relative max-w-[26rem] bot-output">
                      下記の選択肢から選択してください
                    </p>
                    <div className="flex flex-col justify-center items-center border-2 rounded-xl p-4 space-y-6">
                      {conv.buttons?.map((btn) => (
                        <button
                          key={btn.value}
                          className="m-2 px-2 py-1 text-gray-500  rounded-md bg-sunset-blue/40 max-w-[26rem]"
                          onClick={() => handleButtonClick(btn.value)}
                        >
                          {btn.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
        })}
        <div ref={scrollBottomRef} />
      </div>
      <div className="flex w-full mt-2">
        <input
          type="text"
          className="w-full bg-sunset-blue/40 focus:outline-none p-2"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="ex) スキル、職業"
        />
        <button
          className="p-2 w-16 bg-sunset-blue text-white"
          onClick={() => handleSend()}
        >
          送信
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
