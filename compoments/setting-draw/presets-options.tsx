// @mui
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
// theme

// ----------------------------------------------------------------------

type PresetsOptionsProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export default function PresetsOptions({
  value,
  onChange,
}: PresetsOptionsProps) {
  return (
    <Box
      columnGap={2}
      rowGap={1.5}
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
    ></Box>
  );
}
