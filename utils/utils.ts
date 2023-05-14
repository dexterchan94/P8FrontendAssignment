export function safeParseInt(str: string) {
  const parsed = Number.parseInt(str, 10);
  if (Number.isNaN(parsed)) {
    return 0;
  }

  return parsed;
}

export function safeParseFloat(str: string) {
  const parsed = Number.parseFloat(str);
  if (Number.isNaN(parsed)) {
    return 0;
  }

  return parsed;
}

export function getCents(num: number): string {
  const priceComponents = num.toFixed(2).toString().split(".");
  const cents = priceComponents[1];

  return cents ? cents : "00";
}

interface MonthlyPaymentInputs {
  principal: any;
  annualInterestRate: number;
  termOfLoan: number;
}

export async function fetchMonthlyPayment(inputs: MonthlyPaymentInputs) {
  const { principal, annualInterestRate, termOfLoan } = inputs;

  const url = `/api/mortgageCalculation?principal=${principal}&annualInterestRate=${annualInterestRate}&termOfLoan=${termOfLoan}`;
  const options: RequestInit = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, options);
  const json = await res.json();

  if (json.errors) {
    const { message } = json.errors[0];
    throw new Error(message);
  }

  return json.monthlyPayment;
}
