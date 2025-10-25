import type { DispenserState } from "../model";

export class Dispenser {
  private state: DispenserState;

  constructor() {
    this.state = { state: "idle" };
  }

  dispense(productId: string) {
    this.state = { state: "done", productId };
  }
}
