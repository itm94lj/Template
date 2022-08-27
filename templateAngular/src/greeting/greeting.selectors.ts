import {Greeting} from "./Greeting";
import {createFeatureSelector} from "@ngrx/store";

export const allGreetings = createFeatureSelector<ReadonlyArray<Greeting>>('greeting');
