import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { ChangeEvent } from "react";

interface AmortizationPeriodInputProps {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AmortizationPeriodInput(
  props: AmortizationPeriodInputProps
) {
  const { value, onChange } = props;

  const RadioIcon = styled("span")(() => ({
    borderRadius: "50%",
    width: 20,
    height: 20,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.5), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#FFF",
    "input:hover ~ &": {
      backgroundColor: "#f5f8fa",
    },
  }));

  const RadioCheckedIcon = styled(RadioIcon)({
    backgroundColor: "#FFF",
    boxShadow:
      "inset 0 0 0 1px var(--color-button), inset 0 -1px 0 rgba(16,22,26,.1)",
    "&:before": {
      display: "block",
      width: 20,
      height: 20,
      backgroundImage:
        "radial-gradient(var(--color-button),var(--color-button) 40%,transparent 45%)",
      content: '""',
    },
  });

  return (
    <FormControl>
      <FormLabel
        id="amortizationPeriod"
        sx={{
          color: "var(--color-secondary)",
          fontSize: "0.7rem",
        }}
      >
        Period
      </FormLabel>
      <RadioGroup
        aria-labelledby="amortizationPeriod"
        name="amortizationPeriod"
        value={value}
        onChange={onChange}
      >
        <FormControlLabel
          value="20"
          control={
            <Radio icon={<RadioIcon />} checkedIcon={<RadioCheckedIcon />} />
          }
          label="20 Years"
        />
        <FormControlLabel
          value="25"
          control={
            <Radio icon={<RadioIcon />} checkedIcon={<RadioCheckedIcon />} />
          }
          label="25 Years"
        />
        <FormControlLabel
          value="30"
          control={
            <Radio icon={<RadioIcon />} checkedIcon={<RadioCheckedIcon />} />
          }
          label="30 Years"
        />
      </RadioGroup>
    </FormControl>
  );
}
