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
import { classicDeck } from "@/app/data/classicDeck";

type GetCard = { cardIndex: number; card: CardType };

export default function BotSpace({
  cards,
  children,
  bot = false,
  playCard,
}: {
  cards: CardType[];
  children?: ReactNode;
  bot?: boolean;
  playCard(cardId: number, substituteCard?: CardType): void;
}) {
  const MAX_WIDTH = 800;
  const CARD_WIDTH = 150;
  const [currentAttacking] = useAtom(currentAttackingAtom);
  const [slot1] = useAtom(slot1Atom);
  const [slot2] = useAtom(slot2Atom);
  const params = useSearchParams();

  const getRandomCard = (hand: CardType[], special = false) => {
    const targetHand = special ? hand.filter((c) => c.rarity > 0) : hand;
    const randomIndex = Math.floor(Math.random() * targetHand.length);
    return {
      cardIndex: randomIndex,
      card: targetHand[randomIndex],
    };
  };

  const getMiddleCard = (
    slotCard: CardType,
    hand: CardType[],
    special = false
  ) => {
    const targetHand = special ? hand.filter((c) => c.rarity > 0) : hand;
    let fallbackCard: GetCard | null = null;
    for (let i = 0; i < targetHand.length; i++) {
      const card = targetHand[i];
      let statWinCount = 0;
      for (let j = 0; j < 3; j++) {
        if (card.stats[j] > slotCard.stats[j]) statWinCount++;
        else if (slotCard.stats[j] > card.stats[j]) statWinCount--;
      }
      if (statWinCount === 0) return { cardIndex: i, card: targetHand[i] };
      if (statWinCount < 0 && fallbackCard === null)
        fallbackCard = { cardIndex: i, card: targetHand[i] };
    }
    return fallbackCard ?? { cardIndex: 0, card: targetHand[0] };
  };

  const getBetterCard = (
    slotCard: CardType,
    hand: CardType[],
    special = false
  ): GetCard => {
    let bestIndex = 0;
    let bestScore = -Infinity;
    const targetHand = special ? hand.filter((c) => c.rarity > 0) : hand;
    targetHand.forEach((card, index) => {
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
    return { cardIndex: bestIndex, card: targetHand[bestIndex] };
  };

  const difficultyTriggerBots = (
    slot1: CardType,
    hand: CardType[],
    special = false
  ) => {
    const difficulty = params.get("difficulty");
    if (difficulty === "easy") return getRandomCard(cards, special);
    if (difficulty === "medium") {
      const randomChoise = Math.floor(Math.random() * 100);
      if (randomChoise <= 33) return getRandomCard(hand, special);
      if (randomChoise > 33 && randomChoise <= 66)
        return getMiddleCard(slot1, hand, special);
      if (randomChoise > 66) return getBetterCard(slot1, hand, special);
    }
    if (difficulty === "hard") {
      const randomChoise = Math.floor(Math.random() * 100);
      if (randomChoise <= 10) return getRandomCard(hand, special);
      if (randomChoise > 10 && randomChoise <= 30)
        return getMiddleCard(slot1, hand, special);
      if (randomChoise > 30) return getBetterCard(slot1, hand, special);
    }
    if (difficulty === "extreme") return getBetterCard(slot1, hand, special);
    return getRandomCard(hand, special);
  };

  useEffect(() => {
    if (currentAttacking !== "player2") return;
    if (!cards || cards.length === 0) return;
    if (slot1 && slot2) return;

    const { cardIndex, card } =
      slot1 === null
        ? getRandomCard(cards)
        : difficultyTriggerBots(slot1, cards);

    const timer = setTimeout(() => {
      if (card.name === "special") {
        const { imgUrl, stats } =
          slot1 !== null
            ? difficultyTriggerBots(slot1!, classicDeck, true).card
            : getRandomCard(classicDeck, true).card;
        playCard(cards[cardIndex].id, {
          id: cards[cardIndex].id,
          name: cards[cardIndex].name,
          price: 1,
          stats,
          imgUrl,
          rarity: 0,
        });
      } else {
        playCard(cards[cardIndex].id);
      }
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
      sx={{ transform: "rotate(180deg)" }}
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
                cardName={card.name}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
      {children}
    </Box>
  );
}
