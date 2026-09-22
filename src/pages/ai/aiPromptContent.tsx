import type { JSX } from "react";
import { Translate_text } from "../../i18n/translate";

export function AiPromptContent(): JSX.Element {
  return (
    <section className="flex flex-col max-w-2xl px-4 py-6 mx-auto">
      <h1 className="text-2xl font-bold">{Translate_text("The Liftoscript Prompt Generator is retired")}</h1>
      <p className="mt-4 text-text-secondary">
        {Translate_text(
          "This page used to generate a big prompt you'd copy into ChatGPT, Claude or Gemini to convert a workout program into Liftoscript, then copy the result back into the web editor. There's a much better way to do that now."
        )}
      </p>

      <h2 className="mt-8 text-xl font-bold">{Translate_text("Use the MCP server instead")}</h2>
      <p className="mt-4 text-text-secondary">
        {Translate_text("The")}{" "}
        <a className="font-bold underline text-text-link" href="/doc/mcp">
          {Translate_text("FORJA2.0 MCP server")}
        </a>{" "}
        {Translate_text(
          "connects Claude, ChatGPT or Gemini directly to FORJA2.0, so there's no copy-pasting - you just ask, and the assistant does the work."
        )}
      </p>
      <p className="mt-4 text-text-secondary">
        <strong>{Translate_text("Free, no account needed.")}</strong>
        {Translate_text(
          " The reference tools are open to everyone: the Liftoscript language reference, complete program examples, the program design guide, the built-in program sources, and the exercise list. That's enough for an assistant to write valid Liftoscript for you, which you can then paste into the"
        )}{" "}
        <a className="font-bold underline text-text-link" href="/planner">
          {Translate_text("Web Editor")}
        </a>{" "}
        {Translate_text("yourself - the same thing this page used to help with, only better.")}
      </p>
      <p className="mt-4 text-text-secondary">
        <strong>{Translate_text("Premium.")}</strong>
        {Translate_text(
          " Anything that touches your account needs an active subscription: creating and editing your programs, logging workouts, reading your history, testing progressions in the playground, and managing exercises, gyms and measurements."
        )}
      </p>

      <h2 className="mt-8 text-xl font-bold">{Translate_text("Some history")}</h2>
      <p className="mt-4 text-text-secondary">
        {Translate_text(
          "This generator shipped in June 2025, back when LLMs had no way to reach into an app. Handing you a carefully-built prompt to paste elsewhere was the best available option, and it worked well enough for a while."
        )}
      </p>
      <p className="mt-4 text-text-secondary">
        {Translate_text(
          "The FORJA2.0 MCP server arrived in March 2026 and made the whole round trip unnecessary. On top of that, the generator could fetch arbitrary URLs on FORJA2.0's behalf to read your program from a spreadsheet or a webpage - convenient, but not something worth keeping around for a feature that has a better replacement."
        )}
      </p>

      <p className="mt-8 text-text-secondary">
        {Translate_text("See the")}{" "}
        <a className="font-bold underline text-text-link" href="/doc/mcp">
          {Translate_text("MCP server docs")}
        </a>{" "}
        {Translate_text("for setup instructions, or the")}{" "}
        <a className="font-bold underline text-text-link" href="/doc">
          {Translate_text("Liftoscript docs")}
        </a>{" "}
        {Translate_text("if you'd rather write programs by hand.")}
      </p>
    </section>
  );
}
