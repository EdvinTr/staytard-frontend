import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../constants";

interface CartItem {
  sku: string;
  quantity: number;
}

interface CartContextInterface {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  totalItems: number;
}

interface CartInterface {
  cart: CartItem[];
}

const CartContext = createContext<CartContextInterface>({
  cart: [],
  totalItems: 0,
  addToCart: (productId) => {},
});

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    console.log("CartContext UseEffect run");

    const localCart = localStorage.getItem(LOCAL_STORAGE_KEY.CART);
    if (!localCart) {
      localStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify(cart));
    } else {
      setCart(JSON.parse(localCart));
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

  return (
    <CartContext.Provider
      value={{
        totalItems: cart.length,
        cart: [],
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
