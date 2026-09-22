import type { JSX } from "react";
import { Translate_text } from "../../i18n/translate";

export interface IAffiliatesContentProps {
  client: Window["fetch"];
}

export function AffiliatesContent(props: IAffiliatesContentProps): JSX.Element {
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold">{Translate_text("Affiliate Program")}</h1>
      <p className="mt-4">
        {Translate_text(
          "FORJA2.0 offers an affiliate program. If you're a coach, a trainer, or an influencer, you can earn commission by offering your weightlifting program on FORJA2.0."
        )}
      </p>

      <p className="mt-4">
        {Translate_text(
          "It's a win-win situation - your clients, users and fans would get your ready-to-use weightlifting program in a weightlifting tracker app, and you'd earn money from it too."
        )}
      </p>

      <p className="mt-4">{Translate_text("It works this way:")}</p>
      <ul className="mt-4 ml-4 list-disc">
        <li>
          {Translate_text("Your create your weightlifting program on a laptop (by visiting")}{" "}
          <a target="_blank" className="font-bold underline text-text-link" href="https://www.liftosaur.com/program">
            {Translate_text("liftosaur.com/program")}
          </a>
          {Translate_text("), or on a phone (by installing the ")}
          <strong>{Translate_text("FORJA2.0")}</strong>
          {Translate_text(" app and creating a program there)")}
        </li>
        <li>{Translate_text("You copy the link to the program.")}</li>
        <li>{Translate_text("You share the link with your users/customers/clients/fans.")}</li>
        <li>{Translate_text("Users import the program to their phones, and start to do workouts")}</li>
        <li>{Translate_text("You get paid! 💰💰💰")}</li>
      </ul>

      <p className="mt-4">
        {Translate_text("Interested? Shoot us an email -")}{" "}
        <a className="font-bold underline text-text-link" href="mailto:info@liftosaur.com">
          {Translate_text("info@liftosaur.com")}
        </a>
        {Translate_text(". Also let us know if you need help with creating a program.")}
      </p>
    </section>
  );
}
