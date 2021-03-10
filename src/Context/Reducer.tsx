export type State = {
  is_loged_in: boolean | null;
  loged_email?: string;
  location?: {
    longitude: number;
    latitude: number;
  };
};
export type Action = {
  type: "LOG_OUT" | "LOG_IN" | "GET_LOCATION";
  is_loged_in?: boolean | any;
  loged_email?: string;
  location?: {
    longitude: number;
    latitude: number;
  };
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
const GetLocation = (action: Action, state: State) => {
  return {
    ...state,
    location: {
      longitude: action.location ? action.location.longitude : 0,
      latitude: action.location ? action.location.latitude : 0,
    },
  };
};

export const LoginReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOG_IN":
      return LogIn(action, state);
    case "LOG_OUT":
      return LogOut(action, state);
    case "GET_LOCATION":
      return GetLocation(action, state);
    default:
      return state;
  }
};
