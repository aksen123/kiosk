declare global {
  interface Window {
    alert(message: string, callback?: () => void);
    yesNo(
      title: string,
      message: string,
      yes?: string,
      callback?: () => void
    ): void;
  }
}

declare function alert(message: string, callback?: () => void);
declare function yesNo(
  title: string,
  message: string,
  yes?: string,
  callback?: () => void
): void;
