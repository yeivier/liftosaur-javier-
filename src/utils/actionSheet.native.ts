import { ActionSheetIOS, Platform } from "react-native";
import { Translate_maybe, Translate_text } from "../i18n/translate";

export interface IActionSheetOptions {
  title?: string;
  options: string[];
  cancelButtonIndex?: number;
  destructiveButtonIndex?: number;
}

export interface IActionSheetRequest {
  options: IActionSheetOptions;
  callback: (buttonIndex?: number) => void;
}

type IListener = (request: IActionSheetRequest | null) => void;
let currentListener: IListener | null = null;

export function ActionSheet_subscribe(listener: IListener): () => void {
  currentListener = listener;
  return () => {
    if (currentListener === listener) {
      currentListener = null;
    }
  };
}

export function ActionSheet_show(options: IActionSheetOptions, callback: (buttonIndex?: number) => void): void {
  const translated: IActionSheetOptions = {
    ...options,
    title: Translate_maybe(options.title),
    options: options.options.map(Translate_text),
  };
  if (Platform.OS === "ios") {
    ActionSheetIOS.showActionSheetWithOptions(translated, callback);
    return;
  }
  if (currentListener) {
    currentListener({ options: translated, callback });
  }
}
