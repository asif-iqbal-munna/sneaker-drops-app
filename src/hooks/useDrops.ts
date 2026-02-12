import { useEffect } from "react";
import { socket } from "../socket/socket";
import type { DropEvent } from "../types/types";
import { useDropStore } from "../store/dropStore";

export const useDropSocket = () => {
  const addNewDrop = useDropStore(state => state.addNewDrop)
  const updateStock = useDropStore(state => state.updateStock)
  useEffect(() => {
    const handler = (event: DropEvent) => {
      console.log(event)
      switch (event.type) {
        case "drop":
          addNewDrop(event.payload)
          break;

        case "stock": { 
          const { dropId, available, userId } = event.payload
          updateStock(dropId, userId, available)
          break; 
        }
        
        case "purchase":
          break;
      }
    };

    socket.on("drop:event", handler);

    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    return () => {
      socket.off("drop:event", handler);
    };

  }, []);
};
