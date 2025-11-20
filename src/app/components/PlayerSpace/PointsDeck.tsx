import { Box, Typography } from "@mui/material";
import { CardType } from "@/app/atoms";

export default function PointsDeck({
  cards,
  opponent = false,
}: {
  cards: CardType[];
  opponent?: boolean;
}) {
  return (
    <Box
      position={"absolute"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"80px"}
      height={"120px"}
      right={-100}
      bottom={0}
      sx={{
        backgroundImage: `url(${
          cards.length === 0 ? "" : cards[cards.length - 1].imgUrl
        })`,
        borderRadius: "6px",
        backgroundSize: "135%",
        backgroundPosition: "center",
        backgroundColor: "#8888884f",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          textShadow: `
  0 0 5px #000,
  0 0 10px #000,
  0 0 15px #000
`,
          transform: `${opponent ? "rotate(180deg)" : ""}`,
        }}
        variant="h2"
      >
        {cards.length === 0 ? "" : cards.length}
      </Typography>
    </Box>
  );
}
