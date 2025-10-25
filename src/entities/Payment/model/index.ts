export type PaymentMethod = "cash" | "card";

export type PaymentState =
  | { state: "idle"; paymentId?: string; balance: number }
  | { state: "authorized"; paymentId: string; balance: number }
  | { state: "purchased"; paymentId: string; balance: number }
  | { state: "canceled"; paymentId: string; balance: number };

export interface CardPaymentInfo {
  cardNumber: string;
  cardExpirationDate: string;
  cardCvv: string;
}
