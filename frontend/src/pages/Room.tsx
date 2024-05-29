import { useParams } from "react-router-dom";
import NameList from "../components/NameList";
import { useEffect, useState } from "react";
import socket from "../Socket/socket";

const Room = () => {
  const { id: roomname } = useParams();
  const [names, setNames] = useState<string[]>([]);

  const onConnect = () => {
    socket.emit("join", { room: roomname, username: "test-user" });
    console.log("Connected to server");
  };

  const onDisconnect = () => {
    console.log("Disconnected from server");
  };

  const onUserList = (userList: string[]) => {
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
      <h1>Room {roomname}</h1>
      <NameList names={names} />
    </div>
  );
};

export default Room;
