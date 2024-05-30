import { useState } from "react";

const HomePage = () => {
  const [room, setRoom] = useState<string>();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/dice.png" alt="logo" className="w-32 h-32" />
      <h1 className="text-7xl font-bold text-center">Random Name Picker</h1>
      <p className="my-5 text-lg">
        How to use: Enter a name and click "Go to Room" to start.
      </p>
      <div>
        <div className="flex flex-row  items-center justify-center mb-6 gap-2">
          <input
            type="text"
            placeholder="Room Name"
            className="border border-gray-400 rounded h-12 px-2 w-48"
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
              className={`w-12 h-12`}
            />
          </div>
        </div>

        <button
          className={` font-bold py-2 px-4 rounded w-48 ${
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
      </div>

      {/* instructions */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">How to use</h2>
        {/* overflow  */}
        <ul className="text-sm list-disc list-outside ml-2">
          <li>Create a room above and share the link with your friends</li>
          <li>In the room, enter your name and click "Add"</li>
          <li>Raise your hand to indicate you're ready</li>
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
