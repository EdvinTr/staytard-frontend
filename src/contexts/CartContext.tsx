import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../constants";

export interface CartItem {
  sku: string;
  quantity: number;
  price: number;
}

interface CartContextInterface {
  addToCart: (item: CartItem) => void;
  removeFromCart: (sku: string) => void;
  resetCart: () => void;
  totalItems: number;
  cart: CartItem[];
  totalCartPrice: number;
}

const CartContext = createContext<CartContextInterface>({
  totalItems: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  cart: [],
  totalCartPrice: 0,
  resetCart: () => {},
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

  const addToCart = (item: CartItem): void => {
    const cartItem = cart.find((cartItem) => cartItem.sku === item.sku);
    const newCart = [...cart];
    if (cartItem) {
      cartItem.quantity += item.quantity; // increase quantity if item already exists
    } else {
      newCart.push(item); // add new item to cart
    }
    setCartInLocalStorage(newCart);
    setCart(newCart);
  };

  const getCart = () => cart;

  const resetCart = () => {
    setCartInLocalStorage([]);
    setCart([]);
  };

  const getTotalCartItems = (): number =>
    cart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

  const getTotalCartPrice = (): number => {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  };

  const removeFromCart = (sku: string): void => {
    const cartItem = cart.find((cartItem) => cartItem.sku === sku);
    if (!cartItem) {
      return;
    }
    if (cartItem.quantity === 1) {
      const newCart = cart.filter((cartItem) => cartItem.sku !== sku); // remove item from cart all together
      setCartInLocalStorage(newCart);
      setCart(newCart);
    } else {
      decrementQuantity(cartItem);
    }
  };

  const decrementQuantity = (cartItem: CartItem): void => {
    const newCart = [...cart];
    cartItem.quantity -= 1; // decrease quantity
    setCart(newCart);
    setCartInLocalStorage(newCart);
  };

  const setCartInLocalStorage = (cart: CartItem[]): void =>
    localStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify(cart));

  return (
    <CartContext.Provider
      value={{
        totalItems: getTotalCartItems(),
        addToCart,
        removeFromCart,
        totalCartPrice: getTotalCartPrice(),
        cart: getCart(), // assigning as a function to make Next.js play nicely with localStorage
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
