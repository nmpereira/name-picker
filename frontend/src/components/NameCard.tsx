import socket, { roomName } from "../Socket/socket";

interface NameCardProps {
  name: string;
  checked: boolean;
}
const NameCard = ({ name, checked }: NameCardProps) => {
  // This is a row in the NameList component with a checkbox

  const handleCheck = () => {
    // check or uncheck the name
    if (checked) {
      socket.emit("uncheck-name", {
        roomname: roomName,
        username: name,
      });
    } else {
      socket.emit("check-name", {
        roomname: roomName,
        username: name,
      });
    }
  };

  return (
    <div
      className={`flex items-center justify-start p-2 pl-4 rounded-lg shadow-lg w-32 h-16 sm:w-48 sm:h-20
      ${
        // grey or green background
        checked ? "bg-green-700" : "bg-gray-700"
      }`}
      onClick={
        // handleCheck
        () => {
          handleCheck();
        }
      }
      style={{
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div className="w-[32px] shrink-0">
        <img
          src="https://emojicdn.elk.sh/🙋‍♂️"
          alt="raised-hand"
          className={`w-[32px] h-[32px] ${
            // visible or hidden
            checked ? "block" : "hidden"
          }`}
        />
      </div>

      <p className="text-white text-ellipsis overflow-hidden">{name}</p>
    </div>
  );
};

export default NameCard;
