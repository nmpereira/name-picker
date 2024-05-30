import NameList from "../components/NameList";
import { useEffect, useState } from "react";
import socket, { roomName } from "../Socket/socket";
import { IRoom } from "../../../backend/common/UserStore";
import NamePicker from "../components/NamePicker";
import ConnectionIndicator from "../components/ConnectionIndicator";

const Room = () => {
  const [names, setNames] = useState<IRoom>({});
  const [randomName, setRandomName] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const onConnect = () => {
    socket.emit("join", { roomname: roomName, username: "test-user" });
    console.log("Connected to server");
    setIsConnected(true);
  };

  const onDisconnect = () => {
    console.log("Disconnected from server");
    setIsConnected(false);
  };

  const onUserList = (userList: IRoom) => {
    setNames(userList);
  };

  const onRandomName = (name: string | null) => {
    if (!name) {
      setRandomName(null);
      return;
    }
    setRandomName(name);
    setIsRolling(false);
  };

  const onRolling = async () => {
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
      <ConnectionIndicator isConnected={isConnected} />
      <div className="my-10">
        <h1 className="text-3xl font-bold">Room: {roomName}</h1>
      </div>
      <NamePicker name={randomName} isRolling={isRolling} />
      <div className="divider"></div>
      <NameList names={names} />
    </div>
  );
};

export default Room;
