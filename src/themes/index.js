import { LIGHT } from "./light";
import { DARK } from "./dark";

export const THEMES = {
  LIGHT,
  DARK,
};

export function getTheme(themeName) {
  return THEMES[themeName] || LIGHT;
}
