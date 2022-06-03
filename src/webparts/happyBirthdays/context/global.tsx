import * as React from 'react';
import { Birthday, Config, Image, User } from '../types';

interface ContextWebpart {
  user: User;
  config: Config;
  birthdays: Birthday[];
  gallery: Image[];
}

const DEFAULT_CONTEXT: ContextWebpart = {
  user: null,
  config: null,
  birthdays: [],
  gallery: [],
};

export const CONTEXT = React.createContext<ContextWebpart>(DEFAULT_CONTEXT);

interface Prop {
  data: ContextWebpart;
  children: React.ReactNode;
}

function WebpartContextProvider({ children, data }: Prop) {
  return <CONTEXT.Provider value={data}>{children}</CONTEXT.Provider>;
}

export default WebpartContextProvider;
