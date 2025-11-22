"use client";

import { Box, Typography } from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ShieldIcon from "@mui/icons-material/Shield";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import {
  currentAttackingAtom,
  slot1Atom,
  slot2Atom,
  slot3Atom,
} from "@/app/atoms";
import { CardSlot } from "./CardSlot";

export default function BattleSlots({}) {
  const [slot1] = useAtom(slot1Atom);
  const [slot2] = useAtom(slot2Atom);
  const [slot3] = useAtom(slot3Atom);
  const [currentAttacking] = useAtom(currentAttackingAtom);
  const [displayedAttacking, setDisplayedAttacking] =
    useState(currentAttacking);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (slot2 !== null) {
      setFlash(true);

      const timer = setTimeout(() => {
        setFlash(false);
      }, 999);

      return () => clearTimeout(timer);
    }
  }, [slot2]);

  useEffect(() => {
    if (slot3.length === 0) {
      setDisplayedAttacking(currentAttacking);
    }
  }, [slot3.length, currentAttacking]);

  const winner = () => {
    if (slot1 !== null && slot2 !== null) {
      let slot1Power = slot1.stats;
      let slot2Power = slot2.stats;
      let statWinCount = 0;
      for (let i = 0; i < 3; i++) {
        if (slot1Power[i] > slot2Power[i]) statWinCount++;
        else if (slot1Power[i] < slot2Power[i]) statWinCount--;
      }

      if (statWinCount === 0) return "Draw";

      return statWinCount > 0 === (currentAttacking === "player1")
        ? "Win"
        : "Lose";
    }
  };
  return (
    <Box
      display={"flex"}
      gap={2}
      alignItems={"center"}
      zIndex={2}
      position={"relative"}
    >
      <Box
        width={"100px"}
        height={"150px"}
        sx={{
          borderRadius: "8px",
          backgroundColor: "#8a8a8a67",
          border: `${slot1 === null ? "dashed 2px white" : ""}`,
        }}
      >
        <CardSlot card={slot1} />
      </Box>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Typography
          sx={{
            fontWeight: 700,
            transition: "ease 1s opacity",
            textShadow: `
  0 0 5px #000,
  0 0 10px #000,
  0 0 15px #000,
    0 0 20px #000
`,
            opacity: slot3.length > 0 ? 1 : 0,
          }}
          variant="h2"
        >
          {slot3.length}
        </Typography>
        {displayedAttacking === "player1" ? (
          <LocalDiningIcon />
        ) : displayedAttacking === "player2" ? (
          <ShieldIcon />
        ) : (
          ""
        )}
      </Box>

      <Box
        width={"100px"}
        height={"150px"}
        sx={{
          borderRadius: "8px",
          backgroundColor: "#8a8a8a67",
          border: `${slot2 === null ? "dashed 2px white" : ""}`,
        }}
      >
        <CardSlot card={slot2} />
      </Box>
      {flash && (
        <Box
          position="absolute"
          sx={{
            top: "50%",
            left: "50%",
            zIndex: "-1",
            width: "50px",
            transform: "translate(-50%, -50%)",
            animation: `popFlash${winner()} 1s ease-out forwards`,
          }}
        />
      )}
    </Box>
  );
}
