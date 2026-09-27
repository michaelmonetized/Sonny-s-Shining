export type InputFrame = {
  moveX: number;
  moveY: number;
  light: boolean;
  heavy: boolean;
  towel: boolean;
  dodge: boolean;
  special: boolean;
  interact: boolean;
  start: boolean;
};

export function emptyInput(): InputFrame {
  return {
    moveX: 0,
    moveY: 0,
    light: false,
    heavy: false,
    towel: false,
    dodge: false,
    special: false,
    interact: false,
    start: false,
  };
}
