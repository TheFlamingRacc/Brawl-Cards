import { Box, Typography } from "@mui/material";

export default function MainDeckStack({ value }: { value: number }) {
  return (
    <Box
      position={"absolute"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={"10px"}
      left={"50px"}
      top={"calc(50% - 150px)"}
      width={"200px"}
      height={"300px"}
      sx={{
        backgroundImage: "url(/Default.png)",
        backgroundSize: "133%",
        backgroundPosition: "center",
        transition: "0.3s ease opacity",
        opacity: value === 0 ? 0 : 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          textShadow: `
  0 0 5px #000,
  0 0 10px #000,
  0 0 15px #000,
    0 0 20px #000
`,
        }}
        variant="h2"
      >
        {value}
      </Typography>
    </Box>
  );
}
