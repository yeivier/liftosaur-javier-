import { Alert, Platform } from "react-native";
import { Prompt_show } from "./prompt.native";
import { Translate_text } from "../i18n/translate";

export async function Dialog_confirm(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    Alert.alert(Translate_text("Confirm"), Translate_text(message), [
      { text: Translate_text("Cancel"), style: "cancel", onPress: () => resolve(false) },
      { text: Translate_text("OK"), onPress: () => resolve(true) },
    ]);
  });
}

// A pick between named branches, with dismissal ("Cancel") as a distinct answer — unlike
// Dialog_confirm, where declining and dismissing are the same thing.
export async function Dialog_choice(title: string, message: string, options: string[]): Promise<number | undefined> {
  return new Promise((resolve) => {
    Alert.alert(Translate_text(title), Translate_text(message), [
      ...options.map((option, index) => ({ text: Translate_text(option), onPress: () => resolve(index) })),
      { text: Translate_text("Cancel"), style: "cancel" as const, onPress: () => resolve(undefined) },
    ]);
  });
}

export async function Dialog_prompt(message: string): Promise<string | undefined> {
  // Alert.prompt is iOS-only; on Android we render a custom prompt via PromptHost.
  if (Platform.OS === "android") {
    return new Promise((resolve) => {
      Prompt_show(Translate_text(message), resolve);
    });
  }
  return new Promise((resolve) => {
    Alert.prompt(
      Translate_text("Confirm"),
      Translate_text(message),
      [
        { text: Translate_text("Cancel"), style: "cancel", onPress: () => resolve(undefined) },
        { text: Translate_text("OK"), onPress: (value?: string) => resolve(value) },
      ],
      "plain-text"
    );
  });
}

export function Dialog_alert(message: string): void {
  Alert.alert("", Translate_text(message));
}
