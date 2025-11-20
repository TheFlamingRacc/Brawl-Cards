import { atom } from "jotai";
import { classicDeck } from "../data/classicDeck";

export type CardType = {
  name: string;
  price: number;
  id: number;
  stats: [number, number, number];
  rarity: number;
  imgUrl: string;
  owner?: "player1" | "player2";
};

export const mainDeckAtom = atom<CardType[]>(classicDeck);
export const playerDeckAtom = atom<CardType[]>([]);
export const opponentDeckAtom = atom<CardType[]>([]);
export const playersPointsDeckAtom = atom<CardType[]>([]);
export const opponentsPointsDeckAtom = atom<CardType[]>([]);
export const slot1Atom = atom<CardType | null>(null);
export const slot2Atom = atom<CardType | null>(null);
export const slot3Atom = atom<CardType[]>([]);
export const isBattlingAtom = atom(false);
export const currentAttackingAtom = atom<"player1" | "player2">("player1");
export const gameEndedAtom = atom<boolean>(false);
