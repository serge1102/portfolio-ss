type Props = {};

export default function ChatbotLoading({}: Props) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center space-y-5">
      <h2 className="text-center text-white text-md font-semibold">
        Loading...
      </h2>
      <div className="flex justify-center mb-2">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    </div>
  );
}
