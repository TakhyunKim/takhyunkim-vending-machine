export type DispenserState =
  | { state: "idle" }
  | { state: "dispensing"; productId: string }
  | { state: "done"; productId: string }
  | { state: "error"; error: Error };
