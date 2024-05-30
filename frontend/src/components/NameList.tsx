import { useState } from "react";
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
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  const validateName = (name: string) => {
    if (name.length === 0) {
      setError("Name cannot be empty");
      return false;
    }
    if (name.length > 12) {
      setError("Name cannot be longer than 12 characters");
      return false;
    }
    // should include only letters, numbers, and spaces
    if (!/^[a-zA-Z0-9 ]+$/.test(name)) {
      setError("Name can only include letters, numbers, and spaces");
      return false;
    }

    // should be atleast 3 characters
    if (name.length < 3) {
      setError("Name should be atleast 3 characters long");
      return false;
    }

    // should have atleast 2 alphabets
    if (!/[a-zA-Z].*[a-zA-Z]/.test(name)) {
      setError("Name should have atleast 2 alphabets");
      return false;
    }

    // should not start or end with a space
    if (name[0] === " " || name[name.length - 1] === " ") {
      setError("Name should not start or end with a space");
      return false;
    }

    setError(null);
    return true;
  };

  const handleAddName = () => {
    if (validateName(username)) {
      socket.emit("add-name", {
        roomname: roomName,
        username: username,
      });
      setUsername("");
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Add your name"
          className="border-2 border-gray-300 p-2 rounded-lg w-48"
          onChange={(e) => {
            setUsername(e.currentTarget.value);
            setError(null);
          }}
          // onKeyPress={(e) => {
          //   if (e.key === "Enter") {
          //     socket.emit("add-name", {
          //       // name: e.currentTarget.value
          //       roomname: roomName,
          //       username: username,
          //     });
          //     e.currentTarget.value = "";
          //   }
          // }}
        />
        <button
          className={`font-bold py-2 px-4 rounded w-16 
          ${
            error !== null || username === ""
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
          onClick={() => {
            handleAddName();
          }}
          disabled={error !== null || username === ""}
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default NameList;
