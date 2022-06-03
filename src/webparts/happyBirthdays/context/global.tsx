import * as React from 'react'
import { Birthday, Config, User } from '../types'

interface ContextWebpart {
  user: User
  config: Config
  birthdays: Birthday[]
}

const INITIAL_CONTEXT: ContextWebpart = {
  user: null,
  config: null,
  birthdays: [],
}

export const CONTEXT = React.createContext<ContextWebpart>(INITIAL_CONTEXT)

interface Prop {
  data: ContextWebpart
  children: React.ReactNode
}

function WebpartContextProvider({ children, data }: Prop) {
  return <CONTEXT.Provider value={data}>{children}</CONTEXT.Provider>
}

export default WebpartContextProvider
