export type State = { logged_in: boolean | null };
export type Action =
  | {
      type: "LOG_OUT" | "LOG_IN";
      data: boolean | any;
      testvalue?: number;
    }
  | {
      type: "TEST";
      data: boolean | any;
      testvalue?: number;
    };

const LogIn = (action: Action, state: State) => {
  return { ...state, logged_in: action.data };
};
const LogOut = (action: Action, state: State) => {
  return { ...state, logged_in: action.data };
};

const TEST = (action: Action, state: State) => {
  console.log(action);
  return { ...state, logged_in: action.data, testvalue: action.testvalue };
};

export const LoginReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOG_IN":
      return LogIn(action, state);
    case "LOG_OUT":
      return LogOut(action, state);
    case "TEST":
      return TEST(action, state);
    default:
      return state;
  }
};
