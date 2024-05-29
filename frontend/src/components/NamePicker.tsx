import socket, { roomName } from "../Socket/socket";

interface NamePickerProps {
  name: string;
}
const NamePicker = ({ name }: NamePickerProps) => {
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

      <h1 className="text-2xl font-bold">{name}</h1>
    </>
  );
};

export default NamePicker;
