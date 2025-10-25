import type { DispenserState } from "../model";

export class Dispenser {
  private state: DispenserState;

  constructor() {
    this.state = { state: "idle" };
  }

  dispense(productId: string) {
    this.state = { state: "dispensing", productId };

    const randomResult = Math.random();

    if (randomResult < 0.5) {
      throw new Error("Dispenser failed");
    }

    this.state = { state: "done", productId };
  }
}
