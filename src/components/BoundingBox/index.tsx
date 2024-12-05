import type { BoundingBox as BoundingBoxProps } from "./types.ts";
import { memo, useCallback, useLayoutEffect, useRef, useState } from "react";
import s from "./styles.module.css";
import { ResizeHandle } from "../ResizeHandle";
import { HandlePosition } from "../ResizeHandle/types.ts";
import { ActorDirections } from "../Actor/types.ts";
import { RotateHandle } from "../RotateHandle";
import { useSceneElement } from "../Scene/Scene.context.ts";

export const BoundingBox = memo<BoundingBoxProps>(({ actorId }) => {
  const [DOMRect, setDOMRect] = useState<DOMRect>({
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    height: 0,
    width: 0,
    toJSON: () => "",
  });

  const [boundingBoxDirections, setBoundingBoxDirections] =
    useState<ActorDirections>(ActorDirections.NONE);

  const selectedElementRef = useRef<HTMLElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver>();

  const sceneRef = useSceneElement();

  const updateSelection = useCallback(() => {
    console.log(">> updateSelection", selectedElementRef.current);
    if (selectedElementRef.current) {
      const domRect = selectedElementRef.current.getBoundingClientRect();
      console.log(">> dom rect", domRect);
      setDOMRect(domRect);
    }
  }, []);

  useLayoutEffect(() => {
    console.log(">> sceneRef", sceneRef.current);
    if (sceneRef.current) {
      selectedElementRef.current = sceneRef.current.querySelector(
        `[data-rs-id="${actorId}"]`,
      );
      setBoundingBoxDirections(
        (selectedElementRef.current?.getAttribute(
          "data-rs-resize-direction",
        ) as ActorDirections) || ActorDirections.NONE,
      );
      updateSelection();
    }
  }, [actorId]);

  useLayoutEffect(() => {
    resizeObserverRef.current = new ResizeObserver(() => {
      updateSelection();
    });
  }, []);

  useLayoutEffect(() => {
    if (!actorId) {
      if (selectedElementRef.current) {
        resizeObserverRef.current?.unobserve(selectedElementRef.current);
      }

      selectedElementRef.current = null;
    } else if (selectedElementRef.current) {
      resizeObserverRef.current?.observe(selectedElementRef.current);
      console.log(">> selectedElementRef", selectedElementRef.current);
    }
  }, [actorId]);

  console.log({ boundingBoxDirections });

  const isTopLeftVisible = boundingBoxDirections === ActorDirections.ALL;
  const isTopVisible = [
    ActorDirections.ALL,
    ActorDirections.BOTH,
    ActorDirections.VERTICAL,
  ].includes(boundingBoxDirections);
  const isTopRightVisible = boundingBoxDirections === ActorDirections.ALL;
  const isLeftVisible = [
    ActorDirections.ALL,
    ActorDirections.BOTH,
    ActorDirections.HORIZONTAL,
  ].includes(boundingBoxDirections);
  const isRightVisible = [
    ActorDirections.ALL,
    ActorDirections.BOTH,
    ActorDirections.HORIZONTAL,
  ].includes(boundingBoxDirections);
  const isBottomLeftVisible = boundingBoxDirections === ActorDirections.ALL;
  const isBottomVisible = [
    ActorDirections.ALL,
    ActorDirections.BOTH,
    ActorDirections.VERTICAL,
  ].includes(boundingBoxDirections);
  const isBottomRightVisible = boundingBoxDirections === ActorDirections.ALL;

  return (
    <div
      className={s.Selection}
      style={{
        left: DOMRect.x,
        top: DOMRect.y,
        width: DOMRect.width,
        height: DOMRect.height,
        // rotate: `${currentElement?.rotation || 0}deg`,
      }}
    >
      <div className={s.SelectionBox}>
        {isTopLeftVisible && <ResizeHandle position={HandlePosition.topLeft} />}
        {isTopVisible && <ResizeHandle position={HandlePosition.top} />}
        {isTopRightVisible && (
          <ResizeHandle position={HandlePosition.topRight} />
        )}
        {isLeftVisible && <ResizeHandle position={HandlePosition.left} />}
        {isRightVisible && <ResizeHandle position={HandlePosition.right} />}
        {isBottomLeftVisible && (
          <ResizeHandle position={HandlePosition.bottomLeft} />
        )}
        {isBottomVisible && <ResizeHandle position={HandlePosition.bottom} />}
        {isBottomRightVisible && (
          <ResizeHandle position={HandlePosition.bottomRight} />
        )}
        <RotateHandle />
      </div>
    </div>
  );
});
BoundingBox.displayName = "BoundingBox";
