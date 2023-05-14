import { Skeleton } from "@mui/material";
import s from "./MortgageCalculatorCard.module.css";
import { useMemo } from "react";
import { getCents, safeParseInt } from "../../utils";

interface MortgageCalculatorCard {
  isLoading: boolean;
  isError: boolean;
  monthlyPayment: number | null;
}

export default function MortgageCalculatorCard(props: MortgageCalculatorCard) {
  const { isLoading, isError, monthlyPayment } = props;

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
  return (
    <>
      <div className={s.card}>
        {isError ? (
          "Oops! Something went wrong."
        ) : (
          <>
            <div className={s.cardText}>Your total monthly payment will be</div>
            {cardPriceMarkup}
            <div className={s.cardText}>/month</div>
          </>
        )}
      </div>
      <button className={s.applyButton}>Apply Today</button>
    </>
  );
}
