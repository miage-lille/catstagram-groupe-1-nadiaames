import { Picture } from "./picture.type";

export type Success = { kind: 'SUCCESS'; pictures: Picture[] };
export type Loading = { kind: 'LOADING' };
export type Failure = { kind: 'FAILURE'; error: string };
  
export type ApiState = Loading | Success | Failure;