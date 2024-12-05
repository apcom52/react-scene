import { memo } from "react";
import { ResizeHandleProps } from "./types.ts";
import s from "./styles.module.css";

export const ResizeHandle = memo<ResizeHandleProps>(({ position }) => {
  return <div className={s.ResizeHandle} data-resize-side={position} />;
});
