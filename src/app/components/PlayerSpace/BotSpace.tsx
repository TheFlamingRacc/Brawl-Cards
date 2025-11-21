"use client";

import { Box } from "@mui/material";
import Card from "../Card";
import {
  CardType,
  currentAttackingAtom,
  slot1Atom,
  slot2Atom,
} from "@/app/atoms";
import { ReactNode, useEffect } from "react";
import { useAtom } from "jotai";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function BotSpace({
  cards,
  children,
  bot = false,
  playCard,
}: {
  cards: CardType[];
  children?: ReactNode;
  bot?: boolean;
  playCard(cardId: number): void;
}) {
  const MAX_WIDTH = 800;
  const CARD_WIDTH = 150;

  const [currentAttacking] = useAtom(currentAttackingAtom);
  const [slot1] = useAtom(slot1Atom);
  const [slot2] = useAtom(slot2Atom);

  const params = useSearchParams();

  const getRandomCard = (hand: CardType[]) => {
    const randomIndex = Math.floor(Math.random() * hand.length);
    return randomIndex;
  };
  const getMiddleCard = (slotCard: CardType, hand: CardType[]) => {
    let fallbackIndex: number | null = null;

    for (let i = 0; i < hand.length; i++) {
      const card = hand[i];
      let statWinCount = 0;

      for (let j = 0; j < 3; j++) {
        if (card.stats[j] > slotCard.stats[j]) statWinCount++;
        else if (slotCard.stats[j] > card.stats[j]) statWinCount--;
      }

      if (statWinCount === 0) return i;
      if (statWinCount < 0 && fallbackIndex === null) fallbackIndex = i;
    }

    return fallbackIndex ?? 0;
  };

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

  const difficultyTriggerBots = (slot1: CardType, hand: CardType[]) => {
    const difficulty = params.get("difficulty");

    if (difficulty === "easy") return getRandomCard(cards);
    if (difficulty === "medium") {
      const randomChoise = Math.floor(Math.random() * 100);
      if (randomChoise <= 33) return getRandomCard(hand);
      if (randomChoise > 33 && randomChoise <= 66)
        return getMiddleCard(slot1, hand);
      if (randomChoise > 66) return getBetterCard(slot1, hand);
    }
    if (difficulty === "hard") {
      const randomChoise = Math.floor(Math.random() * 100);
      if (randomChoise <= 10) return getRandomCard(hand);
      if (randomChoise > 10 && randomChoise <= 30)
        return getMiddleCard(slot1, hand);
      if (randomChoise > 30) return getBetterCard(slot1, hand);
    }
    if (difficulty === "extreme") return getBetterCard(slot1, hand);
    return getRandomCard(hand);
  };

  useEffect(() => {
    if (currentAttacking !== "player2") return;
    if (!cards || cards.length === 0) return;
    if (slot1 && slot2) return;

    const cardIndex =
      currentAttacking === "player2" && slot1 === null
        ? getRandomCard(cards)
        : difficultyTriggerBots(slot1!, cards);
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
        {cards.map((card, index) => {
          const totalCards = cards.length;
          const overlap =
            totalCards * CARD_WIDTH > MAX_WIDTH
              ? (MAX_WIDTH - CARD_WIDTH) / (totalCards - 1)
              : CARD_WIDTH;

          return (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{
                marginLeft: index === 0 ? 0 : -CARD_WIDTH + overlap,
                zIndex: index,
              }}
            >
              <Card
                imgUrl={"/Default.png"}
                hoverable={false}
                cardId={card.id}
                playCard={playCard}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
      {children}
    </Box>
  );
}
