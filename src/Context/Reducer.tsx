export type State = { is_loged_in: boolean | null; loged_email?: string };
export type Action = {
  type: "LOG_OUT" | "LOG_IN";
  is_loged_in: boolean | any;
  loged_email?: string;
};

const LogIn = (action: Action, state: State) => {
  return {
    ...state,
    is_loged_in: action.is_loged_in,
    loged_email: action.loged_email,
  };
};
const LogOut = (action: Action, state: State) => {
  return { ...state, is_loged_in: action.is_loged_in, loged_email: "" };
};

export const LoginReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOG_IN":
      return LogIn(action, state);
    case "LOG_OUT":
      return LogOut(action, state);

    default:
      return state;
  }
};
