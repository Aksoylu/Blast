import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  UseDisclosureProps,
} from "@chakra-ui/react";

export interface MenuItemType {
  label: string;
  value: string;
};

export interface ContextMenuProps {
  menuItems: MenuItemType[];
  onSelect?: (value: string) => void;
  children: React.ReactNode;
  disclosure: UseDisclosureProps;
};

export const ContextMenu: React.FC<ContextMenuProps> = ({ menuItems, onSelect, children, disclosure }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    setTimeout(() => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      disclosure.onOpen?.();
    }, 100);
  };

  const handleItemClick = (value: string) => {
    onSelect?.(value);
    disclosure.onClose?.();
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        disclosure.onClose?.();
      }
    };

    if (disclosure.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [disclosure.isOpen, disclosure]);

  return (
    <div onContextMenu={handleContextMenu} style={{ display: "inline-block" }}>
      {children}

      <Menu isOpen={disclosure.isOpen}>
        <div
          ref={menuRef}
          style={{
            zIndex: 9999,
          }}
        >
          <MenuList position="absolute" top={`${position.y - 100}px`} left={`${position.x - 250}px`}>
            {menuItems.map((item, idx) => (
              <MenuItem key={idx} onClick={() => handleItemClick(item.value)}>
                {item.label}
              </MenuItem>
            ))}
          </MenuList></div>
      </Menu>
    </div>
  );
};

