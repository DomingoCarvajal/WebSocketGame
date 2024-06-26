// SocketContext.js
import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';


const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  // const environment = 'not local'
  // const webSocketAddress = environment === 'local' ? 'localhost': '192.168.1.183';
  // // const webSocketURL = 'http://' + webSocketAddress + ':3001';
  const webSocketURL = 'http://18.191.197.149'
  const socket = io(webSocketURL);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
