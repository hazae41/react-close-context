import { Nullable } from "@/libs/nullable/mod.ts";
import { Option } from "@hazae41/result-and-option";
import { createContext, useContext } from "react";

export type Close = (force?: boolean) => void

export const CloseContext = createContext<Nullable<Close>>(undefined)

export function useCloseContext() {
  return Option.wrap(useContext(CloseContext))
}