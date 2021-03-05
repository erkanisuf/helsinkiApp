import React, { useMemo, useReducer } from "react";

import { LoginReducer, Action, State } from "./Reducer";

const initialState = {
  // Initial STATE
  logged_in: false,
  sex: "initl",
};

//create context
export const Store = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });
//
export const AppContext: React.FC = (props): JSX.Element => {
  const [state, dispatch] = useReducer(LoginReducer, initialState);

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

export default AppContext;
