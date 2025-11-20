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
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();
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
        height={"auto"}
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
          onClick={() => handleClickOpen()}
          variant="contained"
          color="secondary"
        >
          Грати
        </Button>
        <Button
          onClick={() =>
            window.open(
              "https://www.olx.ua/d/uk/obyavlenie/nastlna-gra-brawl-cards-IDWzbSm.html",
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
          sx={{
            color: "#b700ff4d !important",
          }}
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
      <Dialog
        open={open}
        onClose={handleClose}
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
              handleClose();
              router.push("/classic");
            }}
          >
            Класичний
          </Button>

          <Button
            fullWidth
            disabled
            variant="contained"
            color="secondary"
            sx={{
              color: "#b700ff4d !important",
            }}
          >
            Сучасний
          </Button>

          <Button
            fullWidth
            disabled
            variant="contained"
            color="secondary"
            sx={{
              color: "#b700ff4d !important",
            }}
          >
            Екстремальний
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
