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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleRoll}
      >
        🎲
      </button>

      <h1 className="text-2xl font-bold my-10">
        {
          // if name is null, show "Pick a name"
          !name ? (
            "Pick a name"
          ) : isRolling ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            // if name is not null and isRolling is false, show the name
            <RandomReveal isPlaying duration={2} characters={name} />
          )
        }
      </h1>
    </>
  );
};

export default NamePicker;
