declare global {
  declare function alert(message: string, callback?: () => void);
  declare function yesNo(
    title: string,
    message: string,
    yes?: string,
    callback?: () => void
  ): void;
}
