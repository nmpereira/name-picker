import NameList from "../components/NameList";
import { useEffect, useState } from "react";
import socket, { roomName } from "../Socket/socket";
import { IRoom } from "../../../backend/common/UserStore";
import NamePicker from "../components/NamePicker";

const Room = () => {
  const [names, setNames] = useState<IRoom>({});
  const [randomName, setRandomName] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const onConnect = () => {
    socket.emit("join", { roomname: roomName, username: "test-user" });
    console.log("Connected to server");
  };

  const onDisconnect = () => {
    console.log("Disconnected from server");
  };

  const onUserList = (userList: IRoom) => {
    console.log("User list received", userList);
    setNames(userList);
  };

  const onRandomName = (name: string) => {
    console.log("Random name received", name);
    setRandomName(name);
    setIsRolling(false);
  };

  const onRolling = async () => {
    console.log("Rolling...");

    setIsRolling(true);
  };

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("user-list", onUserList);
    socket.on("random-name", onRandomName);
    socket.on("rolling", onRolling);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("user-list", onUserList);
      socket.off("random-name", onRandomName);
      socket.off("rolling", onRolling);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-10">
        <h1 className="text-3xl font-bold">Room: {roomName}</h1>
      </div>
      <NamePicker name={randomName} isRolling={isRolling} />
      <NameList names={names} />
    </div>
  );
};

export default Room;
