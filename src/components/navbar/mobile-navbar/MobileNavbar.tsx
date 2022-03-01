import CSS from "csstype";
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useRecoilState } from "recoil";
import { mobileMenuState } from "../../../store/mobileMenuState";
interface MobileNavbarProps {}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({}) => {
  const [menuState, setMenuState] = useRecoilState(mobileMenuState);
  return (
    <Menu
      styles={{ ...styles }}
      isOpen={menuState}
      onOpen={() => setMenuState(true)}
      onClose={() => setMenuState(false)}
    >
      <div className="">
        <div className="">
          <div>Hello</div>
        </div>
      </div>
      <ul className="">
        <li>Hello</li>
      </ul>
    </Menu>
  );
};

const styles: { [key: string]: CSS.Properties } = {
  bmBurgerButton: {
    display: "none", // using a custom button to open it
  },
  bmBurgerBars: {
    background: "#000",
    height: "2px",
    borderRadius: "4px",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#222222",
    fontSize: "1.15em",
    paddingTop: "2rem",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};
