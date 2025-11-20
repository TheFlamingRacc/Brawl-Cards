import { CardType } from "@/app/atoms";
import { motion, AnimatePresence } from "framer-motion";

export function CardSlot({ card }: { card: CardType | null }) {
  return (
    <AnimatePresence>
      {card && (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            width: "100px",
            height: "150px",
            backgroundImage: `url(${card.imgUrl})`,
            backgroundSize: "135%",
            borderRadius: "8px",
            backgroundPosition: "center",
            backgroundColor: "#8a8a8a67",
          }}
        />
      )}
    </AnimatePresence>
  );
}
