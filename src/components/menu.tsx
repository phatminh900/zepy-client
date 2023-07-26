/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, createContext, useContext } from "react";
import { twMerge } from "tailwind-merge";

import { createPortal } from "react-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import useClickOutside from "src/hooks/useClickOutside";
interface IPosition {
  right: number;
  top: number;
}
interface IMenuContext {
  openId: string;
  open: (id: string) => void;
  close: () => void;
  listPosition: IPosition;
  handleSetListPosition: (position: IPosition) => void;
}
const MenuContext = createContext<IMenuContext | null>(null);
const useMenuContext = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("using menu context out side of contextMenu");
  return ctx;
};

const Menu = ({ children }: { children: React.ReactNode }) => {
  const [openId, setOpenId] = useState("");
  const [listPosition, setListPosition] = useState({
    right: 0,
    top: 0,
  });
  const handleSetListPosition = (position: IPosition) => {
    setListPosition(position);
  };
  const open = (id: string) => setOpenId(id);
  const close = () => setOpenId("");

  return (
    <MenuContext.Provider
      value={{
        open,
        openId,
        close,
        listPosition,
        handleSetListPosition,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
const Toggle = ({
  id,
  children,
  placeMenuPosition,
}: {
  id: string;
  placeMenuPosition?: (e: React.MouseEvent) => { top: number; right: number };
  children?: React.ReactNode;
}) => {
  const { openId, open, close, handleSetListPosition } = useMenuContext();
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openId && openId === id ? close() : open(id);
    // default no place list position
    if (!placeMenuPosition) {
      const marginToButton = 2;
      const button = (e.target as HTMLButtonElement).closest("button")!;
      const rect = button.getBoundingClientRect();
      handleSetListPosition({
        top: rect.y + rect.height + marginToButton,
        right: window.innerWidth - rect.width - rect.x,
      });
      return;
    }
    const { top, right } = placeMenuPosition(e);
    handleSetListPosition({
      top,
      right,
    });
  };
  return (
    <button onClick={handleClick}>
      {!children ? <HiDotsHorizontal /> : children}
    </button>
  );
};

interface IListProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}
const List = (props: IListProps) => {
  const { className, children, id } = props;
  const { close, openId, listPosition } = useMenuContext();
  const { ref } = useClickOutside(close);
  if (openId !== id) return null;
  return createPortal(
    <ul
      ref={ref}
      style={{
        top: listPosition.top + "px",
        right: listPosition.right + "px",
      }}
      className={`${twMerge(
        "fixed  z-50  shadow-2xl bg-[var(--color-grey-100)] divide-y-2 [&>li]:py-2 [&>li]:px-4 text-sm divide-[var(--color-grey-300)]",
        className
      )}`}
    >
      {children}
    </ul>,
    document.body
  );
};
const Option = ({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </li>
  );
};
Menu.Toggle = Toggle;
Menu.List = List;
Menu.Option = Option;
export default Menu;
