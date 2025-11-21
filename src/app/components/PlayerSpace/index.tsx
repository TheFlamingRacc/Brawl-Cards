"use client";

import { Box } from "@mui/material";
import Card from "../Card";
import { CardType, currentAttackingAtom } from "@/app/atoms";
import { ReactNode } from "react";
import { useAtom } from "jotai";
import { motion, AnimatePresence } from "framer-motion";

export default function PlayerSpace({
  cards,
  children,
  player = false,
  bot = false,
  playerTag,
  playCard,
}: {
  cards: CardType[];
  children?: ReactNode;
  player?: boolean;
  bot?: boolean;
  playerTag: string;
  playCard(cardId: number): void;
}) {
  const MAX_WIDTH = 800;
  const CARD_WIDTH = 150;
  const [currentAttacking] = useAtom(currentAttackingAtom);
  return (
    <Box
      position="relative"
      display="flex"
      width="800px"
      justifyContent="center"
      height="225px"
      sx={{
        transform: `${player ? "" : "rotate(180deg)"}`,
        overflow: "visible",
      }}
      gap={1}
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
              whileHover={
                player && currentAttacking === playerTag
                  ? { y: -20, zIndex: 100 }
                  : {}
              }
            >
              <Card
                imgUrl={player ? card.imgUrl : "/Default.png"}
                hoverable={player && currentAttacking === playerTag}
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
