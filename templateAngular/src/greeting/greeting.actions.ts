import { createAction, props } from '@ngrx/store';
import {Greeting} from "./Greeting";

export const addGreeting = createAction(
  '[Greeting Component] Add Greeting',
  props<{greeting: Greeting}>()
);

export const removeGreeting = createAction(
  '[Greeting Component] Remove Greeting',
  props<{greeting: Greeting}>()
);

export const loadGreeting = createAction(
  '[Greeting Component] Load Greeting',
  props<{greetings: ReadonlyArray<Greeting>}>()
);
