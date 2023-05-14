import { useEffect, useMemo, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import {
  fetchMonthlyPayment,
  getCents,
  safeParseFloat,
  safeParseInt,
} from "../utils";
import s from "./MortgageCalculator.module.css";
import { Skeleton, styled } from "@mui/material";

export default function MortgageCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(50000);
  const [interestRate, setInterestRate] = useState(1.5);
  const [amortizationPeriod, setAmortizationPeriod] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  function handlePurchasePriceChange(
    event: Event,
    newValue: number | number[]
  ) {
    setPurchasePrice(newValue as number);
  }

  function handleInterestRateChange(event: Event, newValue: number | number[]) {
    setInterestRate(newValue as number);
  }

  function handleAmortizationPeriodChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setAmortizationPeriod(safeParseInt(e.target.value));
  }

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    const debounce = setTimeout(() => {
      fetchMonthlyPayment({
        principal: purchasePrice,
        annualInterestRate: interestRate,
        termOfLoan: amortizationPeriod,
      })
        .then((monthlyPayment) => {
          setMonthlyPayment(safeParseFloat(monthlyPayment));
        })
        .catch((e) => {
          console.error(e);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 200);

    return () => clearTimeout(debounce);
  }, [amortizationPeriod, interestRate, purchasePrice]);

  const cardPriceMarkup = useMemo(() => {
    if (isLoading || !monthlyPayment) {
      return (
        <div className={`${s.cardPrice} ${s.cardPriceSkeleton}`}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={30}
            height={30}
          />{" "}
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={150}
            height={70}
          />{" "}
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={40}
            height={30}
          />
        </div>
      );
    }

    return (
      <div className={s.cardPrice}>
        <span className={s.cardPriceSmall}>$</span>
        <span className={s.cardPriceValue}>
          {safeParseInt(monthlyPayment.toFixed(0)).toLocaleString("en-US")}
        </span>
        <span className={s.cardPriceSmall}>{getCents(monthlyPayment)}</span>
      </div>
    );
  }, [isLoading, monthlyPayment]);

  const BpIcon = styled("span")(() => ({
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

  const BpCheckedIcon = styled(BpIcon)({
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
    <div className={s.container}>
      <div className={`${s.content} page-width`}>
        <h1 className={s.heading}>
          Get started with Digital Credit Experience
        </h1>
        <p className={s.subtext}>Qualify or apply your mortgage in minutes</p>
        <div className={s.grid}>
          <div className={s.gridLeft}>
            <div>
              <FormLabel
                id="purchasePrice"
                sx={{
                  color: "var(--color-secondary)",
                  fontSize: "0.7rem",
                }}
              >
                Purchase Price
              </FormLabel>
              <div className={s.sliderValue}>
                <span className={s.sliderValueCurrency}>$</span>
                <span className={s.sliderValueNumber}>
                  {purchasePrice.toLocaleString("en-US")}
                </span>
              </div>
              <Slider
                aria-labelledby="purchasePrice"
                defaultValue={purchasePrice}
                getAriaValueText={() => `${purchasePrice}%`}
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
                value={purchasePrice}
                onChange={handlePurchasePriceChange}
                sx={{
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#fff",
                    border: "1px solid currentColor",
                  },
                  "& .MuiSlider-track": {
                    height: "3px",
                  },
                  "& .MuiSlider-rail": {
                    height: "2px",
                    backgroundColor: "#bfbfbf",
                  },
                  "& .MuiSlider-mark": {
                    display: "none",
                  },
                  "& .MuiSlider-markLabel": {
                    color: "var(--color-secondary)",
                    fontSize: "0.7rem",
                    top: "22px",
                  },
                  "& .MuiSlider-markLabel[data-index='0']": {
                    transform: "translateX(0)",
                  },
                  "& .MuiSlider-markLabel[data-index='1']": {
                    transform: "translateX(-100%)",
                  },
                }}
              />
            </div>
            <br />
            <div>
              <FormLabel
                id="interestRate"
                sx={{
                  color: "var(--color-secondary)",
                  fontSize: "0.7rem",
                }}
              >
                Interest Rate
              </FormLabel>
              <div className={`${s.sliderValue} ${s.interestRateSliderValue}`}>
                {interestRate}%
              </div>
              <Slider
                aria-labelledby="interestRate"
                defaultValue={interestRate}
                getAriaValueText={() => `${interestRate}%`}
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
                value={interestRate}
                onChange={handleInterestRateChange}
                sx={{
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#fff",
                    border: "1px solid currentColor",
                  },
                  "& .MuiSlider-track": {
                    height: "3px",
                  },
                  "& .MuiSlider-rail": {
                    height: "2px",
                    backgroundColor: "#bfbfbf",
                  },
                  "& .MuiSlider-mark": {
                    display: "none",
                  },
                  "& .MuiSlider-markLabel": {
                    color: "var(--color-secondary)",
                    fontSize: "0.7rem",
                    top: "22px",
                  },
                  "& .MuiSlider-markLabel[data-index='0']": {
                    transform: "translateX(0)",
                  },
                  "& .MuiSlider-markLabel[data-index='1']": {
                    transform: "translateX(-100%)",
                  },
                }}
              />
            </div>
            <br />
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
                value={amortizationPeriod}
                onChange={handleAmortizationPeriodChange}
              >
                <FormControlLabel
                  value="20"
                  control={
                    <Radio icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />
                  }
                  label="20 Years"
                />
                <FormControlLabel
                  value="25"
                  control={
                    <Radio icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />
                  }
                  label="25 Years"
                />
                <FormControlLabel
                  value="30"
                  control={
                    <Radio icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} />
                  }
                  label="30 Years"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={s.gridRight}>
            <div className={s.card}>
              {isError ? (
                "Oops! Something went wrong."
              ) : (
                <>
                  <div className={s.cardText}>
                    Your total monthly payment will be
                  </div>
                  {cardPriceMarkup}
                  <div className={s.cardText}>/month</div>
                </>
              )}
            </div>
            <button className={s.applyButton}>Apply Today</button>
          </div>
        </div>
      </div>
    </div>
  );
}
