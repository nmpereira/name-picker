import { IRoom } from "../../../backend/common/UserStore";
import socket, { roomName } from "../Socket/socket";
import NameRow from "./NameRow";

interface NameListProps {
  names: IRoom;
}

const NameList = ({ names }: NameListProps) => {
  return (
    <div className="flex flex-col">
      <h2>Names</h2>
      <ul>
        {Object.keys(names).map((name, index) => (
          <NameRow key={index} name={name} checked={names[name]} />
        ))}
      </ul>

      <NameInput />
    </div>
  );
};

const NameInput = () => {
  return (
    <input
      type="text"
      placeholder="Add a name"
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
