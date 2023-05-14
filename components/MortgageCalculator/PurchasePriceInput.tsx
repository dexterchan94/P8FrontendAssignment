import { FormLabel, Slider } from "@mui/material";
import s from "./PurchasePriceInput.module.css";
import { labelStyles, sliderStyles } from "./sliderStyles";

interface PurchasePriceInputProps {
  value: number;
  onChange: (event: Event, newValue: number | number[]) => void;
}

export default function PurchasePriceInput(props: PurchasePriceInputProps) {
  const { value, onChange } = props;

  return (
    <div>
      <FormLabel id="purchasePrice" sx={labelStyles}>
        Purchase Price
      </FormLabel>
      <div className={s.sliderValue}>
        <span className={s.sliderValueCurrency}>$</span>
        <span className={s.sliderValueNumber}>
          {value.toLocaleString("en-US")}
        </span>
      </div>
      <Slider
        aria-labelledby="purchasePrice"
        defaultValue={value}
        getAriaValueText={() => `${value}%`}
        valueLabelDisplay="off"
        step={50000}
        min={50000}
        max={2500000}
        size="small"
        marks={[
          {
            value: 50000,
            label: "$50K",
          },
          {
            value: 2500000,
            label: "$2.5M",
          },
        ]}
        value={value}
        onChange={onChange}
        sx={sliderStyles}
      />
    </div>
  );
}
