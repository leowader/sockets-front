import { FC, MouseEventHandler } from "react";
type textButton = {
  text: string;
  bg: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};
export const Button: FC<textButton> = ({ text, bg,onClick }) => {
  return (
    <button
      className={`p-2 rounded-full ${bg} text-white hover:bg-opacity-80`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
