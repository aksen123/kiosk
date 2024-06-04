declare global {
  interface Window {
    alert(message1: string, message2?: string, callback?: () => void): void;
    yesNo(
      title: string,
      message: string,
      yes?: string,
      callback?: () => void
    ): void;
    selectOrder(callback1: (bool: boolean) => void): void;
  }
}

declare function alert(
  message1: string,
  message2?: string,
  callback?: () => void
): void;
declare function yesNo(
  title: string,
  message: string,
  yes?: string,
  callback?: () => void
): void;
declare function selectOrder(callback1: (bool: boolean) => void): void;
