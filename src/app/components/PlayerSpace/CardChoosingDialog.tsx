import { Dialog, DialogTitle, DialogContent, Grid } from "@mui/material";
import { classicDeck } from "@/app/data/classicDeck";
import CardComponent from "../Card"; // 🟢 перейменовуємо щоб не було конфлікту
import { CardType } from "@/app/atoms";

export default function CardChoosingDialog({
  visible,
  selectCard,
  onClose,
}: {
  visible: boolean;
  selectCard: any;
  onClose: any;
}) {
  const cardsWithPrice1 = classicDeck.filter((card) => card.rarity > 0);
  const handleCLick = (card: CardType) => {
    return selectCard(card.imgUrl, card.stats);
  };

  return (
    <Dialog
      onClose={() => onClose()}
      open={visible}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          backgroundColor: "#1a1a1d",
          borderRadius: "20px",
          color: "white",
          minWidth: "350px",
        },
      }}
    >
      <DialogTitle>Оберіть в яку карту перетворити СПЕЦ-КАРТУ</DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          {cardsWithPrice1.map((card) => (
            <CardComponent
              key={card.id}
              imgUrl={card.imgUrl}
              hoverable
              cardName={card.name}
              cardId={card.id}
              playCard={() => handleCLick(card)}
            />
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
