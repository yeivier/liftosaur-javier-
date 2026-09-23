import { Text as RNText, TextProps, Platform } from "react-native";
import { JSX } from "react";
import { Translate_children } from "../../i18n/translateChildren";

const textColorPattern =
  /\btext-(icon|text|syntax|red|green|blue|yellow|purple|gray|slate|zinc|stone|neutral|orange|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|pink|rose|white|black|transparent|inherit|current)\b/;
const textSizePattern = /\btext-(2xs|xs|sm|base|lg|xl|\dxl|\[)/;

export function Text_hasSizeClass(className: string | undefined): boolean {
  return className != null && textSizePattern.test(className);
}

export function Text_resolveFontFamily(className: string | undefined): string {
  return resolveFontFamily(className);
}

// San Francisco itself isn't a downloadable webfont; this is the system-font trick every
// Apple-made web page (apple.com included) uses to get it: browsers resolve the -apple-system
// keyword to San Francisco on macOS/iOS, and each OS falls through to its own native UI font
// otherwise (Segoe UI on Windows, Roboto on Android Chrome), which is the closest a website
// gets to "looks native" cross-platform.
const APPLE_SYSTEM_FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

function resolveFontFamily(className: string | undefined): string {
  if (Platform.OS === "web") {
    return APPLE_SYSTEM_FONT_STACK;
  }
  if (Platform.OS !== "android") {
    return "Poppins";
  }
  const isBold = className != null && /\bfont-bold\b/.test(className);
  const isSemiBold = className != null && /\bfont-semibold\b/.test(className);
  const isItalic = className != null && /\bitalic\b/.test(className);
  if (isBold && isItalic) {
    return "Poppins-BoldItalic";
  }
  if (isBold) {
    return "Poppins-Bold";
  }
  if (isSemiBold && isItalic) {
    return "Poppins-SemiBoldItalic";
  }
  if (isSemiBold) {
    return "Poppins-SemiBold";
  }
  if (isItalic) {
    return "Poppins-Italic";
  }
  return "Poppins-Regular";
}

// RN's <Text> with none of the defaults Text injects below - for nested spans, which would
// otherwise get text-base forced on them, and for trees that resolve their own font family.
export function TextRaw({
  noTranslate,
  ...props
}: TextProps & { className?: string; noTranslate?: boolean }): JSX.Element {
  const children = noTranslate ? props.children : Translate_children(props.children);
  return <RNText allowFontScaling={false} {...props} children={children} />;
}

// The OS font scale is folded into the rem instead (see Settings_getTextSize), which moves
// spacing and icons along with the type. Letting RN also scale fontSize here would apply it
// twice, and only to the text, so it would overflow boxes that didn't grow.
export function Text({
  style,
  className,
  noTranslate,
  ...props
}: TextProps & { className?: string; "data-testid"?: string; noTranslate?: boolean }): JSX.Element {
  const defaults: string[] = [];
  if (className == null || !textColorPattern.test(className)) {
    defaults.push("text-text-primary");
  }
  if (className == null || !textSizePattern.test(className)) {
    defaults.push("text-base");
  }
  const effectiveClassName =
    defaults.length > 0 ? (className ? `${defaults.join(" ")} ${className}` : defaults.join(" ")) : className;
  const fontFamily = resolveFontFamily(effectiveClassName);
  const dataTestid = (props as { "data-testid"?: string })["data-testid"];
  const testID = props.testID || dataTestid;
  const children = noTranslate ? props.children : Translate_children(props.children);
  return (
    <RNText
      className={effectiveClassName}
      style={[{ fontFamily }, style]}
      allowFontScaling={false}
      {...props}
      children={children}
      testID={testID}
    />
  );
}
