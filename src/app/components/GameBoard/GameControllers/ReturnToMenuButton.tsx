"use client";

import {
  mainDeckAtom,
  playerDeckAtom,
  opponentDeckAtom,
  playersPointsDeckAtom,
  opponentsPointsDeckAtom,
  slot1Atom,
  slot2Atom,
  slot3Atom,
  currentAttackingAtom,
  gameEndedAtom,
  isBattlingAtom,
} from "@/app/atoms";
import { classicDeck } from "@/app/data/classicDeck";
import { IconButton } from "@mui/material";
import { useSetAtom } from "jotai";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";

export default function ReturnToMenuButton() {
  const setMainDeck = useSetAtom(mainDeckAtom);
  const setPlayerDeck = useSetAtom(playerDeckAtom);
  const setOpponentDeck = useSetAtom(opponentDeckAtom);
  const setPlayersPointsDeck = useSetAtom(playersPointsDeckAtom);
  const setOpponentsPointsDeck = useSetAtom(opponentsPointsDeckAtom);
  const setSlot1 = useSetAtom(slot1Atom);
  const setSlot2 = useSetAtom(slot2Atom);
  const setSlot3 = useSetAtom(slot3Atom);
  const setCurrentAttacking = useSetAtom(currentAttackingAtom);
  const setGameEnded = useSetAtom(gameEndedAtom);
  const setIsBattling = useSetAtom(isBattlingAtom);

  const resetGameAtoms = () => {
    setMainDeck(classicDeck);
    setPlayerDeck([]);
    setOpponentDeck([]);
    setPlayersPointsDeck([]);
    setOpponentsPointsDeck([]);
    setSlot1(null);
    setSlot2(null);
    setSlot3([]);
    setCurrentAttacking("");
    setGameEnded(false);
    setIsBattling(false);
  };
  const router = useRouter();
  return (
    <IconButton
      sx={{
        width: "50px",
        height: "50px",
        color: "white",
      }}
      onClick={() => {
        resetGameAtoms();
        router.push("/");
      }}
    >
      <ArrowBackIosNewIcon
        sx={{
          width: "100%",
          height: "100%",
        }}
      />
    </IconButton>
  );
}
