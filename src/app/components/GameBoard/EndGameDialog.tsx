"use client";
import { useAtom } from "jotai";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  mainDeckAtom,
  playerDeckAtom,
  opponentDeckAtom,
  playersPointsDeckAtom,
  opponentsPointsDeckAtom,
  slot1Atom,
  slot2Atom,
  slot3Atom,
  currentAttackingAtom,
  gameEndedAtom,
  isBattlingAtom,
} from "@/app/atoms";
import { useSetAtom } from "jotai";
import { classicDeck } from "@/app/data/classicDeck";

export default function EndGameDialog({ gameEnded }: { gameEnded: boolean }) {
  const setMainDeck = useSetAtom(mainDeckAtom);
  const setPlayerDeck = useSetAtom(playerDeckAtom);
  const setOpponentDeck = useSetAtom(opponentDeckAtom);
  const setPlayersPointsDeck = useSetAtom(playersPointsDeckAtom);
  const setOpponentsPointsDeck = useSetAtom(opponentsPointsDeckAtom);
  const setSlot1 = useSetAtom(slot1Atom);
  const setSlot2 = useSetAtom(slot2Atom);
  const setSlot3 = useSetAtom(slot3Atom);
  const setCurrentAttacking = useSetAtom(currentAttackingAtom);
  const setGameEnded = useSetAtom(gameEndedAtom);
  const setIsBattling = useSetAtom(isBattlingAtom);

  const resetGameAtoms = () => {
    setMainDeck(classicDeck);
    setPlayerDeck([]);
    setOpponentDeck([]);
    setPlayersPointsDeck([]);
    setOpponentsPointsDeck([]);
    setSlot1(null);
    setSlot2(null);
    setSlot3([]);
    setCurrentAttacking("");
    setGameEnded(false);
    setIsBattling(false);
  };
  const router = useRouter();
  const handleClose = () => {
    resetGameAtoms();
    router.push("/");
  };

  const [playersPointsDeck] = useAtom(playersPointsDeckAtom);
  const [opponentsPointsDeck] = useAtom(opponentsPointsDeckAtom);
  return (
    <Dialog
      open={gameEnded}
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
        Гру завершено
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center", pb: 1 }}>
        <Typography sx={{ opacity: 0.8 }}>
          {playersPointsDeck > opponentsPointsDeck
            ? "Ви перемогли!"
            : playersPointsDeck === opponentsPointsDeck
            ? "Нічия"
            : "Ви програли..."}
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>
          Рахунок {playersPointsDeck.length}:{opponentsPointsDeck.length}
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
            resetGameAtoms();
          }}
        >
          Зіграти ще раз
        </Button>

        <Button
          fullWidth
          onClick={() => handleClose()}
          variant="contained"
          color="secondary"
        >
          Повернутись до меню
        </Button>
      </DialogActions>
    </Dialog>
  );
}
