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
import { Skeleton } from "@mui/material";

export default function MortgageCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(50);
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
    const debounce = setTimeout(() => {
      setIsError(false);
      setIsLoading(true);

      fetchMonthlyPayment({
        principal: purchasePrice * 1000,
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
    }, 500);

    return () => clearTimeout(debounce);
  }, [amortizationPeriod, interestRate, purchasePrice]);

  const cardPriceMarkup = useMemo(() => {
    if (isError) {
      return "Error";
    }

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
        <span className={s.cardPriceValue}>{monthlyPayment.toFixed(0)}</span>
        <span className={s.cardPriceSmall}>{getCents(monthlyPayment)}</span>
      </div>
    );
  }, [isError, isLoading, monthlyPayment]);

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
              <FormLabel id="purchasePrice">Purchase Price</FormLabel>
              <div>${purchasePrice}K</div>
              <Slider
                aria-labelledby="purchasePrice"
                defaultValue={purchasePrice}
                getAriaValueText={() => `${purchasePrice}%`}
                valueLabelDisplay="auto"
                step={50}
                min={50}
                max={2500}
                size="small"
                marks={[
                  {
                    value: 50,
                    label: "$50K",
                  },
                  {
                    value: 2500,
                    label: "$2.5M",
                  },
                ]}
                value={purchasePrice}
                onChange={handlePurchasePriceChange}
              />
            </div>
            <br />
            <div>
              <FormLabel id="interestRate">Interest Rate</FormLabel>
              <div>{interestRate}%</div>
              <Slider
                aria-labelledby="interestRate"
                defaultValue={interestRate}
                getAriaValueText={() => `${interestRate}%`}
                valueLabelDisplay="auto"
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
              />
            </div>
            <br />
            <FormControl>
              <FormLabel id="amortizationPeriod">Period</FormLabel>
              <RadioGroup
                aria-labelledby="amortizationPeriod"
                name="amortizationPeriod"
                value={amortizationPeriod}
                onChange={handleAmortizationPeriodChange}
              >
                <FormControlLabel
                  value="20"
                  control={<Radio />}
                  label="20 years"
                />
                <FormControlLabel
                  value="25"
                  control={<Radio />}
                  label="25 years"
                />
                <FormControlLabel
                  value="30"
                  control={<Radio />}
                  label="30 years"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={s.gridRight}>
            <div className={s.card}>
              <div className={s.cardText}>
                Your total monthly payment will be
              </div>
              {cardPriceMarkup}
              <div className={s.cardText}>/month</div>
            </div>
            <button className={s.applyButton}>Apply Today</button>
          </div>
        </div>
      </div>
    </div>
  );
}
