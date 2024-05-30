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
          className={`w-20 h-20`}
        />
      </div>

      <h1 className="text-2xl font-bold my-10">
        {/* {
          // if name is null, show "Pick a name"
          !name ? (
            "Pick a name"
          ) : isRolling ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            // if name is not null and isRolling is false, show the name
            <RandomReveal isPlaying duration={2} characters={name} />
          )
        } */}

        {isRolling ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : name ? (
          <RandomReveal isPlaying duration={2} characters={name} />
        ) : (
          "Pick a name"
        )}
      </h1>
    </>
  );
};

export default NamePicker;
