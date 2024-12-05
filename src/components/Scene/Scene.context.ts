import { createContext, RefObject, useContext } from "react";
import { SelectedActorContext } from "./types.ts";

export const SceneSelectedActorContext = createContext<SelectedActorContext>({
  selectedActor: null,
  selectActor: () => null,
});
export const useSceneActors = () => useContext(SceneSelectedActorContext);

export const SceneElementContext = createContext<RefObject<HTMLDivElement>>({
  current: null,
});
export const useSceneElement = () => useContext(SceneElementContext);
