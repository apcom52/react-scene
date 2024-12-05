import { memo, useEffect, useRef, useState } from "react";
import { Actor as ActorProps, ActorDirections } from "./types.ts";
import { useSceneActors, useSceneElement } from "../Scene/Scene.context.ts";
import { clsx } from "clsx";
import s from "./actor.module.css";
import { createPortal } from "react-dom";
import { BoundingBox } from "../BoundingBox";

const DEFAULT_POSITION = { x: 0, y: 0 };

export const Actor = memo<ActorProps>((props) => {
  const {
    actorId,
    children,
    className,
    directions = ActorDirections.ALL,
    initialPosition = DEFAULT_POSITION,
    initialSize = null,
    ...restProps
  } = props;

  const actorRef = useRef<HTMLDivElement | null>(null);
  const sceneElement = useSceneElement();
  const sceneContext = useSceneActors();

  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);

  const isActorSelected = sceneContext.selectedActor === actorId;

  const cls = clsx(
    s.Actor,
    {
      [s.Selected]: isActorSelected,
    },
    className,
  );

  const styles = {
    left: `${position.x || 0}px`,
    top: `${position.y || 0}px`,
    width: size ? `${size.width}px` : "unset",
    height: size ? `${size.height}px` : "unset",
  };

  useEffect(() => {
    setSize((oldSize) => {
      if (!oldSize) {
        return {
          width: actorRef.current?.getBoundingClientRect().width || 0,
          height: actorRef.current?.getBoundingClientRect().height || 0,
        };
      }

      return oldSize;
    });
  }, []);

  return (
    <>
      <div
        ref={actorRef}
        data-rs-id={actorId}
        data-rs-resize-direction={directions}
        onClick={() => sceneContext.selectActor(actorId)}
        {...restProps}
        className={cls}
        style={styles}
        draggable={false}
      >
        {children}
      </div>
      {isActorSelected && sceneElement.current
        ? createPortal(<BoundingBox actorId={actorId} />, sceneElement.current)
        : null}
    </>
  );
});
Actor.displayName = "Actor";
