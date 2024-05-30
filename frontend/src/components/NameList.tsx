import { IRoom } from "../../../backend/common/UserStore";
import socket, { roomName } from "../Socket/socket";
import NameCard from "./NameCard";

interface NameListProps {
  names: IRoom;
}

const NameList = ({ names }: NameListProps) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl">
      <NameInput />

      {/* <h1 className="text-2xl font-bold my-10">
        Add your name above or click on your name to volunteer
      </h1> */}

      <div className="flex flex-col items-center justify-center gap-2 mb-10">
        <h3 className="text-xl font-bold mt-10">Add your name above</h3>
        {/* <p className="text-sm font-bold">or</p> */}

        <div className="divider">OR</div>
        <p className="text-xl font-bold">Click on your name to volunteer</p>
      </div>

      <ul className="flex flex-wrap gap-4 mt-6 justify-center">
        {Object.keys(names).map((name, index) => (
          <NameCard
            key={index}
            name={name}
            checked={names[name]}
            names={names}
          />
        ))}
      </ul>
    </div>
  );
};

const NameInput = () => {
  return (
    <input
      type="text"
      placeholder="Add your name"
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
