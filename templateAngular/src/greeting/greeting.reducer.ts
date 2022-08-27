import {Greeting} from "./Greeting";
import {addGreeting, loadGreeting, removeGreeting} from "./greeting.actions";
import {createReducer, on} from "@ngrx/store";


export const initialState: ReadonlyArray<Greeting> = [];

export const greetingReducer = createReducer(
  initialState,
  on(loadGreeting, (state, { greetings }) => greetings),
  on(removeGreeting, (state, {greeting}) => state.filter((stateGreet) => stateGreet.id != greeting.id)),
  on(addGreeting, (state, { greeting }) => [...state, greeting])
);
