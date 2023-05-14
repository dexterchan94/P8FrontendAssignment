import { useEffect, useState } from "react";
import { fetchMonthlyPayment, safeParseFloat, safeParseInt } from "../../utils";
import s from "./MortgageCalculator.module.css";
import MortgageCalculatorCard from "./MortgageCalculatorCard";
import AmortizationPeriodInput from "./AmortizationPeriodInput";
import InterestRateInput from "./InterestRateInput";
import PurchasePriceInput from "./PurchasePriceInput";

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
          if (monthlyPayment) {
            setMonthlyPayment(safeParseFloat(monthlyPayment));
          }
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

  return (
    <div className={s.container}>
      <div className={`${s.content} page-width`}>
        <h1 className={s.heading}>
          Get started with Digital Credit Experience
        </h1>
        <p className={s.subtext}>Qualify or apply your mortgage in minutes</p>
        <div className={s.grid}>
          <div className={s.gridLeft}>
            <PurchasePriceInput
              value={purchasePrice}
              onChange={handlePurchasePriceChange}
            />
            <InterestRateInput
              value={interestRate}
              onChange={handleInterestRateChange}
            />
            <AmortizationPeriodInput
              value={amortizationPeriod}
              onChange={handleAmortizationPeriodChange}
            />
          </div>
          <div className={s.gridRight}>
            <MortgageCalculatorCard
              isError={isError}
              isLoading={isLoading}
              monthlyPayment={monthlyPayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
