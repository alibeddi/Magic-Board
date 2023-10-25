import { ReactNode } from "react";

export interface inputText {
  name: string;
  label: string;
  placeholder: string;
  reaquired: boolean;
  [propName: string]: string | number | boolean;
}

export interface navigation {
  icon: string | ReactNode;
  route: string;
  children: React.ReactNode;
}
