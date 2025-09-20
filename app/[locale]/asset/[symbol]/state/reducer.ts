import type { State } from "./types";
import type { Action } from "./actions";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ts/start":
      return { ...state, loadingTimeseries: true, errorTimeseries: null };
    case "ts/success":
      return { ...state, loadingTimeseries: false, timeseries: action.payload };
    case "ts/error":
      return {
        ...state,
        loadingTimeseries: false,
        errorTimeseries: action.payload,
      };
    case "company/start":
      return { ...state, loadingCompany: true, errorCompany: null };
    case "company/success":
      return { ...state, loadingCompany: false, company: action.payload };
    case "company/error":
      return { ...state, loadingCompany: false, errorCompany: action.payload };
    default:
      return state;
  }
}

export const initialState: State = {
  timeseries: null,
  company: null,
  loadingTimeseries: true,
  loadingCompany: true,
  errorTimeseries: null,
  errorCompany: null,
};
