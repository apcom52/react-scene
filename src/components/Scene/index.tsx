import { memo, useMemo, useRef, useState } from "react";
import { Scene as SceneProps } from "./types.ts";
import {
  SceneElementContext,
  SceneSelectedActorContext,
} from "./Scene.context.ts";
import s from "./styles.module.css";
import { clsx } from "clsx";

export const Scene = memo<SceneProps>(
  ({ children, className, ...restProps }) => {
    const [selectedActor, setSelectedActor] = useState<string | null>(null);
    const sceneRef = useRef<HTMLDivElement>(null);

    const sceneSelectedActorContextValue = useMemo(() => {
      return {
        selectedActor,
        selectActor: setSelectedActor,
      };
    }, [selectedActor]);

    const cls = clsx(s.Scene, className);

    return (
      <div data-rs-role="scene" className={cls} ref={sceneRef} {...restProps}>
        <SceneElementContext.Provider value={sceneRef}>
          <SceneSelectedActorContext.Provider
            value={sceneSelectedActorContextValue}
          >
            {children}
          </SceneSelectedActorContext.Provider>
        </SceneElementContext.Provider>
      </div>
    );
  },
);
Scene.displayName = "Scene";
