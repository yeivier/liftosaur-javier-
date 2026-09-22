import "mocha";
import { expect } from "chai";
import { createElement, ReactNode } from "react";
import { Translate_children } from "../src/i18n/translateChildren";
import { Translate_setLocale } from "../src/i18n/translate";

function asArray(children: ReactNode): unknown[] {
  return Array.isArray(children) ? children : [children];
}

describe("Translate_children", () => {
  afterEach(() => {
    Translate_setLocale("es");
  });

  it("translates a single string child", () => {
    expect(Translate_children("Save")).to.equal("Guardar");
  });

  it("translates the string parts of a mixed array and leaves elements alone", () => {
    const element = createElement("span", { key: "a" }, "x");
    const result = asArray(Translate_children(["Reps", element, "Weight"]));
    expect(result[0]).to.equal("Reps");
    expect(result[2]).to.equal("Peso");
    expect(result[1]).to.have.property("type", "span");
  });

  it("returns the same array when it holds no translatable text", () => {
    const children = [createElement("span", { key: "a" }, "x")];
    expect(Translate_children(children)).to.equal(children);
  });

  it("leaves numbers and undefined alone", () => {
    expect(Translate_children(5)).to.equal(5);
    expect(Translate_children(undefined)).to.equal(undefined);
  });

  it("returns children untouched for the en locale", () => {
    Translate_setLocale("en");
    expect(Translate_children("Save")).to.equal("Save");
  });
});
