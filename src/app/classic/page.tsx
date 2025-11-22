import GameBoard from "../components/GameBoard";
import { Suspense } from "react";

export default function Classic() {
  return (
    <Suspense fallback={null}>
      <GameBoard />
    </Suspense>
  );
}
