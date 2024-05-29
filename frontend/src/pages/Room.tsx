import NameList from "../components/NameList";
import { useEffect, useState } from "react";
import socket, { roomName } from "../Socket/socket";
import { IRoom } from "../../../backend/common/UserStore";

const Room = () => {
  const [names, setNames] = useState<IRoom>({});

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
  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("user-list", onUserList);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("user-list", onUserList);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Room {roomName}</h1>
      <NameList names={names} />
    </div>
  );
};

export default Room;
