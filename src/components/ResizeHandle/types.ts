export enum HandlePosition {
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left",
  topLeft = "top-left",
  topRight = "top-right",
  bottomRight = "bottom-right",
  bottomLeft = "bottom-left",
}

export interface ResizeHandleProps {
  position: HandlePosition;
}
