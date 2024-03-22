"use client";
import { useQuery } from "convex/react";
import { useEffect, useRef } from "react";

import { api } from "@/shared/compoments/convex";

function GamePage() {
  // const data = useQuery(api.game.rooms.get);
  // console.log(data);

  return (
    <canvas
      style={{
        width: "100%",
        height: "100%",
      }}
    ></canvas>
  );
}

export default GamePage;
