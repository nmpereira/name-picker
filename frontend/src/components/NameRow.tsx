import socket, { roomName } from "../Socket/socket";

interface NameRowProps {
  name: string;
  checked: boolean;
}
const NameRow = ({ name, checked }: NameRowProps) => {
  // This is a row in the NameList component with a checkbox

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // add the name to the list
      socket.emit("check-name", {
        roomname: roomName,
        username: name,
      });
    }

    if (!e.target.checked) {
      // remove the name from the list
      socket.emit("uncheck-name", {
        roomname: roomName,
        username: name,
      });
    }
  };

  const handleDelete = () => {
    // remove the name from the list
    socket.emit("remove-name", {
      roomname: roomName,
      username: name,
    });
  };
  return (
    <li className="flex items-center">
      <input
        type="checkbox"
        className="mr-2"
        onChange={handleCheck}
        checked={checked}
      />
      {name}
      {/* bin icon to remove */}
      <button className="ml-2 text-red-500" onClick={handleDelete}>
        🗑️
      </button>
    </li>
  );
};

export default NameRow;
