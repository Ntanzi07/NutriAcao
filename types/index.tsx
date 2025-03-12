import { MouseEventHandler } from "react";

export interface CustomBottonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
}

export interface CustomCardProps {
  name: string;
  style: string;
  path: string;
}

export interface OurValuesItenProps {
  text: string;
}