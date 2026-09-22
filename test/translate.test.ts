import "mocha";
import { expect } from "chai";
import { Translate_text, Translate_maybe, Translate_setLocale, Translate_locale } from "../src/i18n/translate";

describe("Translate", () => {
  afterEach(() => {
    Translate_setLocale("es");
  });

  it("translates a catalog entry", () => {
    expect(Translate_text("Save")).to.equal("Guardar");
  });

  it("keeps the surrounding whitespace of a JSX text fragment", () => {
    expect(Translate_text(" Save ")).to.equal(" Guardar ");
    expect(Translate_text("\n  Save\n")).to.equal("\n  Guardar\n");
  });

  it("returns the original string when the catalog has no entry", () => {
    expect(Translate_text("Nqxjvz unlikely string")).to.equal("Nqxjvz unlikely string");
  });

  it("returns the original string for the en locale", () => {
    Translate_setLocale("en");
    expect(Translate_locale()).to.equal("en");
    expect(Translate_text("Save")).to.equal("Save");
  });

  it("passes undefined through", () => {
    expect(Translate_maybe(undefined)).to.equal(undefined);
    expect(Translate_maybe("Save")).to.equal("Guardar");
  });

  it("leaves an empty string alone", () => {
    expect(Translate_text("")).to.equal("");
    expect(Translate_text("   ")).to.equal("   ");
  });
});
