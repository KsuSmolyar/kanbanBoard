import { useEffect } from "react";
import { API_URL } from "../constants";
import type { SocketMessage } from "../types/socketMsgTypes";


export function useSocket(onMessage: (msg: SocketMessage) => void) {
  useEffect(() => {
    const socket = new WebSocket(API_URL.replace(/^https/, "wss"));

    socket.onopen = () => {
      console.log("WS подключен");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (err) {
        console.error("Ошибка парсинга WS-сообщения", err);
      }
    };

    socket.onclose = () => {
      console.log("WS закрыт");
    };

    return () => socket.close();
  }, [onMessage]);
}
