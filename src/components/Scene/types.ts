export interface Scene extends React.HTMLAttributes<HTMLDivElement> {}

export interface SelectedActorContext {
  selectedActor: string | null;
  selectActor: (actor: string) => void;
}
