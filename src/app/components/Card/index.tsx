import { Box } from "@mui/material";
import { useState, useRef, useEffect } from "react";

export default function Card({
  imgUrl,
  hoverable,
  cardId,
  playCard,
}: {
  imgUrl: string;
  hoverable: boolean;
  cardId: number;
  playCard: any;
}) {
  const [selected, setSelected] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setSelected(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Box
      ref={cardRef}
      onClick={() => {
        hoverable ? (selected ? playCard(cardId) : setSelected(true)) : "";
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
        boxShadow: selected ? "0 0 30px 10px #8c00ffff" : "none",
        zIndex: selected ? 100 : 0,
        "&:hover": {
          boxShadow: selected
            ? ""
            : hoverable
            ? "0 20px 30px 20px #000000ff"
            : "",
          zIndex: hoverable ? 100 : 0,
        },
      }}
    />
  );
}
