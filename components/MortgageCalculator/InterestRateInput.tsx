import { FormLabel, Slider } from "@mui/material";
import s from "./InterestRateInput.module.css";
import { labelStyles, sliderStyles } from "./sliderStyles";

interface InterestRateInputProps {
  value: number;
  onChange: (event: Event, newValue: number | number[]) => void;
}

export default function InterestRateInput(props: InterestRateInputProps) {
  const { value, onChange } = props;

  return (
    <div>
      <FormLabel id="interestRate" sx={labelStyles}>
        Interest Rate
      </FormLabel>
      <div className={`${s.sliderValue} ${s.interestRateSliderValue}`}>
        {value}%
      </div>
      <Slider
        aria-labelledby="interestRate"
        defaultValue={value}
        getAriaValueText={() => `${value}%`}
        valueLabelDisplay="off"
        step={0.5}
        min={0}
        max={25}
        size="small"
        marks={[
          {
            value: 0,
            label: "0",
          },
          {
            value: 25,
            label: "25%",
          },
        ]}
        value={value}
        onChange={onChange}
        sx={sliderStyles}
      />
    </div>
  );
}
