import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { LOCAL_STORAGE_KEY } from "../constants";
import { cartInfo, CartItem, cartState } from "../store/cartState";

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const { totalItems, totalPrice } = useRecoilValue(cartInfo);
  const resetCartState = useResetRecoilState(cartState);

  useEffect(() => {
    const localStorageCart = localStorage.getItem(LOCAL_STORAGE_KEY.CART);
    if (localStorageCart) {
      setCart(JSON.parse(localStorageCart)); // set state with localStorage cart
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify(cart)); // set localStorage cart to empty array
    }
  }, []);

  const setCartInLocalStorage = (cart: CartItem[]): void =>
    localStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify(cart));

  const addToCart = (item: CartItem): void => {
    const cartItem = cart.find((cartItem) => cartItem.sku === item.sku); // find item
    if (cartItem) {
      const cartItemIndex = cart.findIndex(
        (cartItem) => cartItem.sku === item.sku
      ); // find index of item

      const newCartItem = { ...cartItem, quantity: cartItem.quantity + 1 }; // create new item with increased quantity
      const newCart = [
        ...cart.slice(0, cartItemIndex),
        newCartItem,
        ...cart.slice(cartItemIndex + 1),
      ]; // create new cart without mutating original state of items
      setCartInLocalStorage(newCart);
      setCart(newCart);
    } else {
      setCartInLocalStorage([...cart, item]);
      setCart([...cart, item]);
    }
  };

  const decrementQuantity = (cartItem: CartItem): void => {
    const foundItem = cart.find((cartItem) => cartItem.sku === cartItem.sku);
    if (!foundItem) {
      return;
    }
    const cartItemIndex = cart.findIndex(
      (cartItem) => cartItem.sku === cartItem.sku
    );
    const newCartItem = { ...cartItem, quantity: cartItem.quantity - 1 };
    const newCart = [
      ...cart.slice(0, cartItemIndex),
      newCartItem,
      ...cart.slice(cartItemIndex + 1),
    ];
    setCart(newCart);
    setCartInLocalStorage(newCart);
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
  const resetCart = () => {
    setCartInLocalStorage([]);
    resetCartState();
  };
  return {
    totalItems,
    totalPrice,
    cart,
    addToCart,
    removeFromCart,
    resetCart,
  };
};
