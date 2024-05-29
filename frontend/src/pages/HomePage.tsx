import { useState } from "react";

const HomePage = () => {
  const [room, setRoom] = useState<string>();

  return (
    <div>
      <h1>Random Name Picker</h1>
      <p>
        This is a simple app that lets you add names to a list and then randomly
        pick one of the names.
      </p>

      <p>
        You can also check off names that have been picked so far, and then
        randomly pick from the remaining names.
      </p>

      <input
        type="text"
        placeholder="Enter a name"
        className="border border-gray-400 rounded p-1"
        value={room}
      />

      {/* button to reset name */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setRoom(generateRandomString())}
      >
        Reset Name
      </button>

      {/* button to go to room */}

      <button
        className={` font-bold py-2 px-4 rounded ${
          !room ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
        disabled={!room}
        onClick={() => {
          window.location.href = `/${room}`;
        }}
      >
        Go to Room
      </button>
    </div>
  );
};

const generateRandomString = () => {
  const randomString = Math.random().toString(36).substring(2, 10);
  return randomString;
};

export default HomePage;
