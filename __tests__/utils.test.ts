import { getCents, safeParseFloat, safeParseInt } from "../utils";

describe("safeParseInt", () => {
  test("Parses an integer", () => {
    expect(safeParseInt("5")).toBe(5);
  });
  test("Parses a float", () => {
    expect(safeParseInt("5.6")).toBe(5);
  });
  test("Defaults to 0 if NaN", () => {
    expect(safeParseInt("potato")).toBe(0);
  });
  test("Defaults to 0 if NaN", () => {
    expect(safeParseInt("")).toBe(0);
  });
});

describe("safeParseFloat", () => {
  test("Parses an integer", () => {
    expect(safeParseFloat("5")).toBe(5);
  });
  test("Parses a float", () => {
    expect(safeParseFloat("0.50")).toBe(0.5);
  });
  test("Parses a float", () => {
    expect(safeParseFloat("3.14")).toBe(3.14);
  });
  test("Defaults to 0 if NaN", () => {
    expect(safeParseFloat("potato")).toBe(0);
  });
  test("Defaults to 0 if NaN", () => {
    expect(safeParseFloat("")).toBe(0);
  });
});

describe("getCents", () => {
  test("Gets the cents from dollar value with 2 decimals", () => {
    expect(getCents(0.99)).toBe("99");
  });
  test("Gets the cents from dollar value with 1 decimal", () => {
    expect(getCents(123.5)).toBe("50");
  });
  test("Gets the cents from dollar value with no decimals", () => {
    expect(getCents(123)).toBe("00");
  });
});
