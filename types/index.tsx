import { MouseEventHandler } from "react";

export interface CustomBottonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: string;
}