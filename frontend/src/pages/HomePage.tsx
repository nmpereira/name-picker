import { useState } from "react";

const HomePage = () => {
  const [room, setRoom] = useState<string>();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-3xl font-bold">Random Name Picker</h1>
      <p className="my-5 text-xs">
        How to use: Enter a name and click "Go to Room" to start.
      </p>
      <div className="flex flex-row  items-center justify-center mb-6 gap-2">
        <input
          type="text"
          placeholder="Enter a name"
          className="border border-gray-400 rounded h-8 px-2 w-48"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />

        {/* button to reset name */}
        <div
          className="cursor-pointer"
          onClick={() => setRoom(generateRandomString())}
        >
          <img
            src="https://emojicdn.elk.sh/🎲"
            alt="raised-hand"
            className={`w-8 h-8`}
          />
        </div>
      </div>

      <button
        className={` font-bold py-2 px-4 rounded ${
          !room ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
        disabled={!room}
        onClick={() => {
          if (room) {
            window.location.href = `/${room}`;
          }
        }}
      >
        Go to Room
      </button>

      {/* instructions */}
      <div className="mt-10 w-96">
        <h2 className="text-xl font-bold">How to use</h2>
        <ul className="list-disc list-inside text-sm">
          <li>Create a room above and share the link with your friends</li>
          <li>In the room, enter your name and click "Add"</li>
          <li>Click "Roll" to randomly pick a name</li>
        </ul>
      </div>
    </div>
  );
};

const generateRandomString = () => {
  const randomString = Math.random().toString(36).substring(2, 10);
  return randomString;
};

export default HomePage;
