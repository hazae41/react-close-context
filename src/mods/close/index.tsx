import { Nullable, Option } from "@hazae41/option"
import { createContext, useContext } from "react"

export type Close = (force?: boolean) => void

export const CloseContext = createContext<Nullable<Close>>(undefined)

export function useCloseContext() {
  return Option.wrap(useContext(CloseContext))
}