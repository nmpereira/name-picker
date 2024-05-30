import socket, { roomName } from "../Socket/socket";
import { RandomReveal } from "react-random-reveal";

interface NamePickerProps {
  name: string | null;
  isRolling: boolean;
}
const NamePicker = ({ name, isRolling }: NamePickerProps) => {
  const handleRoll = () => {
    socket.emit("roll-dice", { roomname: roomName });
  };
  return (
    <>
      <div className=" font-bold py-2 px-4 rounded" onClick={handleRoll}>
        <img
          src="https://emojicdn.elk.sh/🎲"
          alt="raised-hand"
          className="w-20 h-20 
          hover:scale-110
          "
        />
      </div>

      {/* button to clear names */}
      <button
        className="font-bold py-2 px-4 rounded w-48 text-white mt-6 bg-red-500 hover:bg-red-700"
        onClick={() => {
          socket.emit("clear-names", { roomname: roomName });
        }}
      >
        Lower all hands
      </button>

      <h1 className="text-2xl font-bold my-10">
        {isRolling ? (
          <span className="loading loading-dots loading-md"></span>
        ) : name ? (
          <RandomReveal isPlaying duration={2} characters={name} />
        ) : (
          <p className="text-3xl">Pick a name</p>
        )}
      </h1>
    </>
  );
};

export default NamePicker;
