import {Person} from "./Person";
/**
 * Created by fenggu on 2023/8/2.
 */
export interface Page<Type> {
  totalPages: number;
  totalElements: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: Type[];
}
