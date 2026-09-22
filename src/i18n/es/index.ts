import { esUi } from "./ui";
import { esExercises } from "./exercises";
import { esMuscles } from "./muscles";
import { esErrors } from "./errors";
import { esContent } from "./content";
import { esBrand } from "./brand";
import { esSettings } from "./settings";
import { esPages } from "./pages";
import { esFragments } from "./fragments";
import { esPrograms } from "./programs";
import { esTour } from "./tour";

export const esCatalog: Readonly<Record<string, string>> = {
  ...esFragments,
  ...esTour,
  ...esPrograms,
  ...esContent,
  ...esUi,
  ...esSettings,
  ...esPages,
  ...esMuscles,
  ...esExercises,
  ...esErrors,
  ...esBrand,
};
