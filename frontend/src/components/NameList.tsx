import socket from "../Socket/socket";
import NameRow from "./NameRow";

interface NameListProps {
  names: string[];
}

const NameList = ({ names }: NameListProps) => {
  return (
    <div className="flex flex-col">
      <h2>Names</h2>
      <ul>
        {names.map((name, index) => (
          <NameRow key={index} name={name} />
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
          socket.emit("add-name", { name: e.currentTarget.value });
          e.currentTarget.value = "";
        }
      }}
    />
  );
};

export default NameList;
