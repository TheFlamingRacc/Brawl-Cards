"use client";

import { Box } from "@mui/material";
import Card from "../Card";
import {
  CardType,
  currentAttackingAtom,
  opponentsPointsDeckAtom,
  playersPointsDeckAtom,
  slot1Atom,
  slot2Atom,
  slot3Atom,
} from "@/app/atoms";
import { ReactNode, useEffect } from "react";
import { useAtom } from "jotai";
import { motion, AnimatePresence } from "framer-motion";

export default function BotSpace({
  cards,
  children,
  bot = false,
  playerTag,
  playCard,
}: {
  cards: CardType[];
  children?: ReactNode;
  bot?: boolean;
  playerTag: string;
  playCard(cardId: number): void;
}) {
  const [currentAttacking] = useAtom(currentAttackingAtom);
  const [slot1] = useAtom(slot1Atom);
  const [slot2] = useAtom(slot2Atom);
  const [slot3] = useAtom(slot3Atom);
  const [opponentsPointsDeck] = useAtom(opponentsPointsDeckAtom);
  const [playersPointsDeck] = useAtom(playersPointsDeckAtom);

  const getBetterCard = (slotCard: CardType, hand: CardType[]): number => {
    let bestIndex = 0;
    let bestScore = -Infinity;

    hand.forEach((card, index) => {
      let statWinCount = 0;
      for (let i = 0; i < 3; i++) {
        if (card.stats[i] > slotCard.stats[i]) statWinCount++;
        else if (slotCard.stats[i] > card.stats[i]) statWinCount--;
      }
      if (statWinCount > bestScore) {
        bestScore = statWinCount;
        bestIndex = index;
      }
    });

    return bestIndex;
  };

  useEffect(() => {
    if (currentAttacking !== "player2") return;
    if (!cards || cards.length === 0) return;
    if (slot1 && slot2) return;

    const cardIndex =
      currentAttacking === "player2" && slot1 === null
        ? Math.floor(Math.random() * cards.length)
        : getBetterCard(slot1, cards);
    const timer = setTimeout(() => {
      playCard(cards[cardIndex].id);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentAttacking, slot1, slot2, cards]);
  return (
    <Box
      position={"relative"}
      display={"flex"}
      width={"800px"}
      gap={1}
      justifyContent={"center"}
      height={"225px"}
      sx={{
        transform: "rotate(180deg)",
      }}
    >
      <AnimatePresence>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Card
              imgUrl={"/Default.png"}
              hoverable={false}
              cardId={card.id}
              playCard={playCard}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      {children}
    </Box>
  );
}
