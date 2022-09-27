import { useReducer } from "react";
import { pocketbaseClient } from "../lib/pocketbase";

function pocketbaseReducer(state, action) {
  switch (action.type) {
    case "auth":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    default:
      return { token: "" };
  }
}

export function usePocketbase() {
  const [state, dispatch] = useReducer(pocketbaseReducer, { token: "" });

  return {
    state,
    dispatch,
  };
}
