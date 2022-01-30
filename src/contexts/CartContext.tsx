import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../constants";

export interface CartItem {
  sku: string;
  quantity: number;
}

interface CartContextInterface {
  addToCart: (item: CartItem) => void;
  totalItems: number;
  getCart: () => CartItem[];
}

const CartContext = createContext<CartContextInterface>({
  totalItems: 0,
  addToCart: (productId) => {},
  getCart: () => [],
});

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    console.log("CartContext UseEffect run");
    const localCart = localStorage.getItem(LOCAL_STORAGE_KEY.CART);
    if (localCart) {
      setCart(JSON.parse(localCart));
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify(cart));
    }
  }, []);

  const addToCart = (item: CartItem) => {
    const cartItem = cart.find((cartItem) => cartItem.sku === item.sku);
    const newCart = [...cart];
    if (cartItem) {
      cartItem.quantity += item.quantity;
    } else {
      newCart.push(item);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify(newCart));
    setCart(newCart);
  };

  const getCart = (): CartItem[] => cart;

  const getTotalItems = () =>
    cart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

  return (
    <CartContext.Provider
      value={{
        totalItems: getTotalItems(),
        addToCart,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
