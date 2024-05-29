import { useParams } from "react-router-dom";

const Room = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Room {id}</div>;
};

export default Room;
