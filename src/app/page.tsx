"use client";

import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [openModeDialog, setOpenModeDialog] = useState(false);
  const [openDifficultyDialog, setOpenDifficultyDialog] = useState(false);

  const router = useRouter();

  const [hoverDifficulty, setHoverDifficulty] = useState("");

  const difficulties: any = {
    easy: "Суперник майже не думає чим ходити",
    medium: "Суперник розбирається у грі, проте не завжди неуважний",
    hard: "Суперник добре орієнтується у грі, грає обачніше",
    extreme: "Тебе врятує тільки вдача...",
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100vw"}
      height={"100vh"}
      flexDirection={"column"}
      sx={{
        backgroundColor: "#0c0016ff",
      }}
    >
      <Typography fontWeight={"600"} variant="h1">
        Brawl Cards
      </Typography>

      <Box
        width={"350px"}
        display={"flex"}
        flexDirection={"column"}
        p={2}
        gap={2}
        sx={{
          border: "solid 2px #35353573",
          borderRadius: "30px",
          backgroundColor: "#24232352",
        }}
      >
        <Button
          onClick={() => setOpenModeDialog(true)}
          variant="contained"
          color="secondary"
        >
          Грати
        </Button>

        <Button
          onClick={() =>
            window.open(
              "https://www.olx.ua/d/uk/obyavlenlenie/nastlna-gra-brawl-cards-IDWzbSm.html",
              "_blank"
            )
          }
          variant="outlined"
          color="secondary"
        >
          Придбати гру
        </Button>

        <Button
          disabled
          variant="contained"
          color="secondary"
          sx={{ color: "#b700ff4d !important" }}
        >
          Правила гри
        </Button>

        <Button
          onClick={() => window.open("https://t.me/brawl_cards", "_blank")}
          variant="outlined"
          color="secondary"
        >
          Приєднатися до спільноти
        </Button>
      </Box>

      {/* ─────────────────────────────── */}
      {/* 1️⃣ Діалог вибору режиму гри */}
      {/* ─────────────────────────────── */}
      <Dialog
        open={openModeDialog}
        onClose={() => setOpenModeDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1d",
            borderRadius: "20px",
            p: 2,
            color: "white",
            minWidth: "350px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          Оберіть режим гри
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", pb: 1 }}>
          <Typography sx={{ opacity: 0.8 }}>
            Виберіть стиль гри, який вам найбільше підходить
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            px: 3,
            pb: 2,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => {
              setOpenModeDialog(false);
              setOpenDifficultyDialog(true);
            }}
          >
            Класичний
          </Button>

          <Button
            fullWidth
            disabled
            variant="contained"
            color="secondary"
            sx={{ color: "#b700ff4d !important" }}
          >
            Сучасний
          </Button>

          <Button
            fullWidth
            disabled
            variant="contained"
            color="secondary"
            sx={{ color: "#b700ff4d !important" }}
          >
            Екстремальний
          </Button>
        </DialogActions>
      </Dialog>

      {/* ─────────────────────────────── */}
      {/* 2️⃣ Діалог вибору складності */}
      {/* ─────────────────────────────── */}
      <Dialog
        open={openDifficultyDialog}
        onClose={() => setOpenDifficultyDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1d",
            borderRadius: "20px",
            p: 2,
            color: "white",
            minWidth: "350px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          Оберіть складність суперника
        </DialogTitle>

        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            px: 3,
            pb: 2,
          }}
        >
          {Object.keys(difficulties).map((key) => (
            <Button
              key={key}
              fullWidth
              variant={
                key !== "easy" && key !== "medium" && key !== "hard"
                  ? "outlined"
                  : "contained"
              }
              color="secondary"
              onMouseEnter={() => setHoverDifficulty(key)}
              onMouseLeave={() => setHoverDifficulty("")}
              onClick={() => router.push(`/classic?difficulty=${key}`)}
            >
              {key === "easy"
                ? "Легка"
                : key === "medium"
                ? "Середня"
                : key === "hard"
                ? "Важка"
                : "Екстремальна"}
            </Button>
          ))}

          {/* Опис показується тільки при наведені */}

          <DialogContent
            sx={{
              textAlign: "center",
              py: 1,
              minHeight: "60px",
              width: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                opacity: hoverDifficulty === "" ? 0 : 0.8,
                transition: "ease 0.3s opacity",
              }}
            >
              {difficulties[hoverDifficulty]}
            </Typography>
          </DialogContent>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
