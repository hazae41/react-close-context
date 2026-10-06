import { Nullable } from "@/libs/nullable/mod.ts";
import { Option } from "@hazae41/result-and-option";
import React, { createContext, ReactNode, useContext } from "react";

React;

export type Close = (force?: boolean) => void

export const CloseContext = createContext<Nullable<Close>>(undefined)

export function useCloseContext() {
  return Option.wrap(useContext(CloseContext))
}

export function CloseProvider(props: { children: ReactNode } & { value: Close }) {
  const { value, children } = props

  return <CloseContext.Provider value={value}>
    {children}
  </CloseContext.Provider>
}