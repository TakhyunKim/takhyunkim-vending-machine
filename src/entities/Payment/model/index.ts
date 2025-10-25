export type PaymentMethod = "cash" | "card";

export interface CardPaymentInfo {
  cardNumber: string;
  cardExpirationDate: string;
  cardCvv: string;
}
