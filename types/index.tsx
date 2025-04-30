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
  delay: number;
}

export interface OurValuesItenProps {
  text: string;
}

export type ArticleItem = {
  id: string
  title: string
  date: string
  category: string
}