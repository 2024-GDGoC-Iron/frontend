// src/hooks/useWebSocket.js
import { useState, useEffect, useCallback } from 'react';

const WEBSOCKET_URL = 'https://lu6wbizt4e.execute-api.ap-northeast-1.amazonaws.com/production/';

export const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = useCallback((message) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify({
        action: 'sendMessage',
        message
      }));
    }
  }, [socket, isConnected]);

  return { socket, isConnected, sendMessage };  // socket 추가
};