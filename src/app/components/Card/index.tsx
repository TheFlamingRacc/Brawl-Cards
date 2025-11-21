import { Box } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import CardChoosingDialog from "../PlayerSpace/CardChoosingDialog";

export default function Card({
  imgUrl,
  hoverable,
  cardId,
  playCard,
  cardName,
}: {
  imgUrl: string;
  hoverable: boolean;
  cardId: number;
  playCard: any;
  cardName: string;
}) {
  const [selected, setSelected] = useState(false);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // закриття по кліку назовні (і діалогу теж)
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setSelected(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleClick = (cardId: number) => {
    if (cardName !== "special") {
      playCard(cardId);
    } else {
      setVisible(true);
    }
  };

  const selectCard = (imgUrl: string, stats: [number, number, number]) => {
    playCard(cardId, {
      id: cardId,
      name: cardName,
      stats,
      imgUrl,
      rarity: 0,
    });
    setVisible(false); // 🔥 закриваємо діалог після вибору
    setSelected(false); // 🔥 скидаємо виділення
  };

  // коли діалог хоче закритися сам (натискання на backdrop / Esc)
  const handleDialogClose = () => {
    setVisible(false);
    setSelected(false);
  };

  return (
    <Box
      ref={cardRef}
      onClick={() => {
        if (!hoverable) return;
        selected ? handleClick(cardId) : setSelected(true);
      }}
      sx={{
        width: "150px",
        height: "225px",
        position: "relative",
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "135%",
        borderRadius: "8px",
        backgroundPosition: "center",
        transition: "bottom 0.2s ease, box-shadow 0.5s ease",
        bottom: selected ? "20px" : 0,
        zIndex: selected ? 100 : 0,
        boxShadow:
          cardName === "special" && imgUrl !== "/Default.png"
            ? "0 0 20px 4px red"
            : "none",
        animation:
          cardName === "special" && imgUrl !== "/Default.png"
            ? "rainbow-shadow 4s linear infinite alternate"
            : "none",
        "&:hover": {
          boxShadow: selected
            ? ""
            : hoverable
            ? "0 20px 30px 20px #000000ff"
            : "",
          zIndex: hoverable ? 100 : 0,
        },
      }}
    >
      <CardChoosingDialog
        selectCard={selectCard}
        visible={visible}
        onClose={handleDialogClose} // 🔥 передаємо хендлер
      />
    </Box>
  );
}
