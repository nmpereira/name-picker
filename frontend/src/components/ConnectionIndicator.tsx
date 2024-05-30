const ConnectionIndicator = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <div className="connection-indicator">
      {isConnected ? (
        <div className="flex items-center gap-2 mt-4">
          <div className="bg-green-500 w-4 h-4 rounded-full"></div>
          <p className="text-green-500">Connected</p>
        </div>
      ) : (
        <div className="flex items-center gap-2 mt-4">
          <div className="bg-red-500 w-4 h-4 rounded-full"></div>
          <p className="text-red-500">Disconnected</p>
        </div>
      )}
    </div>
  );
};

export default ConnectionIndicator;
