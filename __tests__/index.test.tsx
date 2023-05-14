import { render, screen } from "@testing-library/react";
import MortgageCalculator from "../components/MortgageCalculator/MortgageCalculator";

describe("Mortgage Calculator", () => {
  it("renders a heading", () => {
    render(<MortgageCalculator />);
    const heading = screen.getByText(
      "Get started with Digital Credit Experience"
    );
    expect(heading).toBeInTheDocument();
  });
});
