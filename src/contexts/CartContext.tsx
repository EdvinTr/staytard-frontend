import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../constants";

export interface CartItem {
  sku: string;
  quantity: number;
}

interface CartContextInterface {
  addToCart: (item: CartItem) => void;
  totalItems: number;
  cart: CartItem[];
}

const CartContext = createContext<CartContextInterface>({
  totalItems: 0,
  addToCart: (productId) => {},
  cart: [],
});

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const localStorageCart = localStorage.getItem(LOCAL_STORAGE_KEY.CART);
    if (localStorageCart) {
      setCart(JSON.parse(localStorageCart)); // set state with localStorage cart
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify(cart)); // set localStorage cart to empty array
    }
  }, []);

  const addToCart = (item: CartItem) => {
    const cartItem = cart.find((cartItem) => cartItem.sku === item.sku);
    const newCart = [...cart];
    if (cartItem) {
      cartItem.quantity += item.quantity; // increase quantity if item already exists
    } else {
      newCart.push(item); // add new item to cart
    }
    localStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify(newCart));
    setCart(newCart);
  };

  const getCart = (): CartItem[] => cart;

  const getTotalCartItems = () =>
    cart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

  return (
    <CartContext.Provider
      value={{
        totalItems: getTotalCartItems(),
        addToCart,
        cart: getCart(), // assigning as a function to make Next play nicely with localStorage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
