export type VendingMachineState =
  | { state: "idle"; paymentId?: string }
  | { state: "authorized"; paymentId: string }
  | {
      state: "selecting";
      productId: string;
      paymentId: string;
    }
  | {
      state: "purchased";
      productId: string;
      paymentId: string;
    }
  | { state: "dispensing"; productId: string }
  | { state: "done"; productId: string }
  | { state: "change"; change: number }
  | { state: "error"; error: Error };
