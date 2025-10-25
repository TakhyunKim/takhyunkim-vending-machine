import { Product } from "@/entities/Product/lib";
import { Change } from "@/entities/Change/lib";
import { Dispenser } from "@/entities/Dispenser/lib";
import {
  CashPayment,
  CardPayment,
  SamsungCardGateway,
} from "@/entities/Payment";

export const USER_CASH_MOCK = 50000;
export const CASH_PAYMENT = new CashPayment(USER_CASH_MOCK);

export const SAMSUNG_CARD_GATEWAY = new SamsungCardGateway();
export const SAMSUNG_CARD_PAYMENT = new CardPayment(
  {
    cardNumber: "1234567890123456",
    cardExpirationDate: "202512",
    cardCvv: "123",
  },
  SAMSUNG_CARD_GATEWAY
);

export const CHANGE_MOCK = new Change(100, 100, 100, 100, 100);

export const DISPENSER_MOCK = new Dispenser();

const COLA_PRODUCT = new Product({
  id: "1",
  name: "콜라",
  price: 1100,
  quantity: 10,
});

const WATER_PRODUCT = new Product({
  id: "2",
  name: "물",
  price: 600,
  quantity: 100,
});

const COFFEE_PRODUCT = new Product({
  id: "3",
  name: "커피",
  price: 700,
  quantity: 10,
});

export const PRODUCTS_MOCK_LIST: Product[] = [
  COLA_PRODUCT,
  WATER_PRODUCT,
  COFFEE_PRODUCT,
];
