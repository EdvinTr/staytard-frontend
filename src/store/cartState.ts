import { atom, selector } from "recoil";

export interface CartItem {
  sku: string;
  quantity: number;
  price: number;
}
export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});

export const cartInfo = selector({
  key: "cartInfo",
  get: ({ get }) => {
    return {
      totalPrice: get(cartState).reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0),
      totalItems: get(cartState).reduce(
        (acc, item) => (acc += item.quantity),
        0
      ),
    };
  },
});
