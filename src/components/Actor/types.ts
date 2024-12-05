export enum ActorDirections {
  NONE = "none",
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
  BOTH = "both",
  ALL = "all",
}

export interface Actor extends React.HTMLAttributes<HTMLElement> {
  actorId: string;
  directions?: ActorDirections;

  allowMovement?: boolean;
  allowResize?: boolean;
  allowRotation?: boolean;
  allowFlip?: boolean;

  initialPosition?: { x: number; y: number };
  initialSize?: { width?: number; height?: number };
  initialRotation?: number;
  initialFlip?: number;
}
