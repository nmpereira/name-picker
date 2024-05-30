import { IRoom } from "../../../backend/common/UserStore";
import socket, { roomName } from "../Socket/socket";
import NameCard from "./NameCard";

interface NameListProps {
  names: IRoom;
}

const NameList = ({ names }: NameListProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <NameInput />

      <ul className="flex flex-wrap gap-4 mt-6 justify-center">
        {Object.keys(names).map((name, index) => (
          <NameCard key={index} name={name} checked={names[name]} />
        ))}
      </ul>
    </div>
  );
};

const NameInput = () => {
  return (
    <input
      type="text"
      placeholder="Add a name"
      className="border-2 border-gray-300 p-2 rounded-lg w-48"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          socket.emit("add-name", {
            // name: e.currentTarget.value
            roomname: roomName,
            username: e.currentTarget.value,
          });
          e.currentTarget.value = "";
        }
      }}
    />
  );
};

export default NameList;
