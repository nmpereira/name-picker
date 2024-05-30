const OnlineCount = ({ count }: { count: number }) => {
  return (
    <div className="online-count">
      <span>Online: {count}</span>
    </div>
  );
};

export default OnlineCount;
