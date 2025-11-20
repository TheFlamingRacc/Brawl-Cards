"use client";

import { Box } from "@mui/material";
import PointsDeck from "../PlayerSpace/PointsDeck";
import { useEffect } from "react";
import PlayerSpace from "../PlayerSpace";
import MainDeckStack from "./MainDeckStack";
import BattleSlots from "./BattleSlots";
import { useAtom } from "jotai";
import {
  currentAttackingAtom,
  isBattlingAtom,
  mainDeckAtom,
  opponentDeckAtom,
  opponentsPointsDeckAtom,
  playerDeckAtom,
  playersPointsDeckAtom,
  slot1Atom,
  slot2Atom,
  slot3Atom,
  gameEndedAtom,
  CardType,
} from "@/app/atoms";
import EndGameDialog from "./EndGameDialog";
import BotSpace from "../PlayerSpace/BotSpace";

export default function GameBoard() {
  const [gameEnded, setGameEnded] = useAtom(gameEndedAtom);
  const [mainDeck, setMainDeck] = useAtom(mainDeckAtom);

  const [playersPointsDeck, setPlayersPointsDeck] = useAtom(
    playersPointsDeckAtom
  );
  const [opponentsPointsDeck, setOpponentsPointsDeck] = useAtom(
    opponentsPointsDeckAtom
  );

  const [slot1, setSlot1] = useAtom(slot1Atom);
  const [slot2, setSlot2] = useAtom(slot2Atom);
  const [slot3, setSlot3] = useAtom(slot3Atom);

  const [playerDeck, setPlayerDeck] = useAtom(playerDeckAtom);
  const [opponentDeck, setOpponentDeck] = useAtom(opponentDeckAtom);

  const [isBattling, setIsBattling] = useAtom(isBattlingAtom);
  const [currentAttacking, setCurrentAttacking] = useAtom(currentAttackingAtom);

  const toggleAttacking = () =>
    setCurrentAttacking((prev) => (prev === "player1" ? "player2" : "player1"));

  // --- helper для owner ---
  const assignOwner = (
    card: CardType,
    owner: "player1" | "player2"
  ): CardType => ({
    ...card,
    owner,
  });

  const getRandomCard = (deck: CardType[], owner: "player1" | "player2") => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = assignOwner(deck[randomIndex], owner);
    const newDeck = deck.filter((_, i) => i !== randomIndex);
    return { randomCard: card, actualDeck: newDeck };
  };

  const addCardToDeck = (deck: CardType[], card: CardType) => [...deck, card];

  // --- ход гравця ---
  const playCard = (cardId: number) => {
    const isPlayer1 = currentAttacking === "player1";
    const targetDeck = isPlayer1 ? playerDeck : opponentDeck;
    const setDeck = isPlayer1 ? setPlayerDeck : setOpponentDeck;

    const targetCard = targetDeck.find((c) => c.id === cardId);

    // Перевірка owner
    if (!targetCard || targetCard.owner !== currentAttacking) return;

    if (slot1 === null || slot2 === null) {
      const updatedDeck = targetDeck.filter((c) => c.id !== cardId);
      setDeck(updatedDeck);
      setSlot1(slot1 ?? targetCard);
      setSlot2(slot1 ? targetCard : slot2);
      setSlot3([...slot3, targetCard]);

      toggleAttacking();
    }
  };

  // --- битва ---
  useEffect(() => {
    setTimeout(() => {
      if (slot1 !== null && slot2 !== null) {
        let slot1Power = slot1.stats;
        let slot2Power = slot2.stats;
        let statWinCount = 0;
        for (let i = 0; i < 3; i++) {
          if (slot1Power[i] > slot2Power[i]) statWinCount++;
          else if (slot1Power[i] < slot2Power[i]) statWinCount--;
        }

        endRound();
        if (statWinCount > 0) {
          if (currentAttacking === "player1") {
            setPlayersPointsDeck([...playersPointsDeck, ...slot3]);
          } else {
            setOpponentsPointsDeck([...opponentsPointsDeck, ...slot3]);
          }
          resetStack();
          toggleAttacking();
          setIsBattling(false);
        } else if (statWinCount < 0) {
          if (currentAttacking === "player1") {
            setOpponentsPointsDeck([...opponentsPointsDeck, ...slot3]);
          } else {
            setPlayersPointsDeck([...playersPointsDeck, ...slot3]);
          }
          resetStack();
          toggleAttacking();
          setIsBattling(false);
        }
      }
    }, 1000);
  }, [slot2, slot3]);

  const endRound = () => {
    setSlot1(null);
    setSlot2(null);
  };

  const resetStack = () => {
    setSlot1(null);
    setSlot2(null);
    setSlot3([]);
  };

  // --- видача карт якщо колода порожня ---
  useEffect(() => {
    const owner = currentAttacking;
    const currentDeck = owner === "player1" ? playerDeck : opponentDeck;
    const setDeck = owner === "player1" ? setPlayerDeck : setOpponentDeck;

    if (currentDeck.length === 0 && mainDeck.length > 0) {
      const { randomCard, actualDeck } = getRandomCard(mainDeck, owner);
      setDeck(addCardToDeck(currentDeck, randomCard));
      setMainDeck(actualDeck);
    }
  }, [currentAttacking, mainDeck, playerDeck, opponentDeck]);

  // --- end game ---
  const endGame = () => {
    const half = Math.ceil(slot3.length / 2);
    const toWinner = slot3.slice(0, half);
    const toLoser = slot3.slice(half);

    if (currentAttacking === "player1") {
      setPlayersPointsDeck((prev) => [...prev, ...toWinner, ...playerDeck]);
      setPlayerDeck([]);
      setOpponentsPointsDeck((prev) => [...prev, ...toLoser, ...opponentDeck]);
      setOpponentDeck([]);
    } else if (currentAttacking === "player2") {
      setOpponentsPointsDeck((prev) => [...prev, ...toWinner, ...playerDeck]);
      setOpponentDeck([]);
      setPlayersPointsDeck((prev) => [...prev, ...toLoser, ...opponentDeck]);
      setPlayerDeck([]);
    }

    setGameEnded(true);
  };

  useEffect(() => {
    if (gameEnded) return;
    const currentDeck =
      currentAttacking === "player1" ? playerDeck : opponentDeck;
    if (
      (!isBattling &&
        mainDeck.length === 0 &&
        playerDeck.length === 0 &&
        opponentDeck.length === 0 &&
        slot3.length > 0) ||
      (currentDeck.length === 0 && mainDeck.length === 0)
    ) {
      setTimeout(endGame, 1000);
    }
  }, [
    mainDeck,
    playerDeck,
    opponentDeck,
    currentAttacking,
    isBattling,
    slot3,
    gameEnded,
  ]);

  // --- заповнити колоди ---
  const fillBothDecks = () => {
    let mainCopy = [...mainDeck];
    let playerCopy = [...playerDeck];
    let opponentCopy = [...opponentDeck];

    let turn: "player" | "opponent" = "player";

    while (
      (playerCopy.length < 5 || opponentCopy.length < 5) &&
      mainCopy.length > 0
    ) {
      const owner = turn === "player" ? "player1" : "player2";
      const { randomCard, actualDeck } = getRandomCard(mainCopy, owner);
      mainCopy = actualDeck;

      if (turn === "player" && playerCopy.length < 5) {
        playerCopy.push(randomCard);
        turn = "opponent";
      } else if (turn === "opponent" && opponentCopy.length < 5) {
        opponentCopy.push(randomCard);
        turn = "player";
      }

      if (playerCopy.length >= 5 && opponentCopy.length < 5) turn = "opponent";
      if (opponentCopy.length >= 5 && playerCopy.length < 5) turn = "player";
    }

    setPlayerDeck(playerCopy);
    setOpponentDeck(opponentCopy);
    setMainDeck(mainCopy);
  };

  useEffect(() => {
    if (!isBattling) {
      fillBothDecks();
      setIsBattling(true);
    }
  }, [isBattling]);

  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      sx={{ backgroundColor: "#0f001bff" }}
      position={"relative"}
      p={2}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <BotSpace playerTag="player2" cards={opponentDeck} playCard={playCard}>
        <PointsDeck opponent cards={opponentsPointsDeck} />
      </BotSpace>

      <BattleSlots />

      <PlayerSpace
        player
        playerTag="player1"
        cards={playerDeck}
        playCard={playCard}
      >
        <PointsDeck cards={playersPointsDeck} />
      </PlayerSpace>

      <MainDeckStack value={mainDeck.length} />
      <EndGameDialog gameEnded={gameEnded} />
    </Box>
  );
}
