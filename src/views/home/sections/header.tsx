"use client";

import { useState, type MouseEvent } from "react";
import { navItems, type NavItem } from "@/assets/data/home";
import { images } from "@/assets/images";
import { EduImage } from "@/views/home/edu-image";
import { CategorySelect } from "@/views/home/components/category-select";
import { useHomeUi } from "@/views/home/components/home-shell";

function NavMenuList({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const menuClass = mobile
    ? "nav-menu nav-menu--mobile items-center lg:flex!"
    : "nav-menu !flex items-center";

  return (
    <ul className={menuClass}>
      {navItems.map((item) => (
        <NavMenuItem
          key={item.label}
          item={item}
          mobile={mobile}
          onNavigate={onNavigate}
        />
      ))}
    </ul>
  );
}

function NavMenuItem({
  item,
  mobile,
  onNavigate,
}: {
  item: NavItem;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(Boolean(item.active && mobile));

  const itemClass = [
    "nav-menu__item",
    item.children ? "has-submenu" : "",
    item.active ? "activePage" : "",
    mobile && open ? "active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const toggleSubmenu = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!mobile || !item.children) return;
    event.preventDefault();
    setOpen((value) => !value);
  };

  return (
    <li className={itemClass}>
      <a
        href={item.href ?? "#"}
        className="nav-menu__link"
        onClick={toggleSubmenu}
      >
        {item.label}
      </a>
      {item.children ? (
        <ul className="nav-submenu scroll-sm">
          {item.children.map((child) => (
            <li
              key={child.label}
              className={`nav-submenu__item${child.active ? " activePage" : ""}`}
            >
              <a
                href={child.href}
                className="nav-submenu__link hover-bg-neutral-30"
                onClick={onNavigate}
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function Header() {
  const { mobileMenuOpen, openMobileMenu, closeMobileMenu } = useHomeUi();

  return (
    <>
      <div
        className={`mobile-menu scroll-sm block lg:hidden${mobileMenuOpen ? " active" : ""}`}
      >
        <button type="button" className="close-button" onClick={closeMobileMenu}>
          <i className="ph ph-x"></i>
        </button>
        <div className="mobile-menu__inner">
          <a href="index.html" className="mobile-menu__logo" onClick={closeMobileMenu}>
            <EduImage src={images.logo} alt="Logo" />
          </a>
          <div className="mobile-menu__menu">
            <NavMenuList mobile onNavigate={closeMobileMenu} />
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container--xl container">
          <nav className="header-inner !flex items-center justify-between gap-8">
            <div className="header-content-wrapper !flex flex-grow-1 items-center">
              <div className="logo">
                <a href="index.html" className="link">
                  <EduImage src={images.logo} alt="Logo" />
                </a>
              </div>
              <div className="hidden sm:block">
                <CategorySelect />
              </div>
              <div className="header-menu hidden lg:block">
                <NavMenuList />
              </div>
            </div>
            <div className="header-right !flex items-center">
              <form action="#" className="search-form relative hidden xl:block">
                <input
                  className="common-input rounded-pill bg-main-25 border-neutral-30 pe-48"
                  placeholder="Search..."
                />{" "}
                <button
                  type="submit"
                  className="bg-main-600 hover-bg-main-700 rounded-circle text-md translate-middle-y inset-inline-end-0 absolute top-50 me-8 !flex h-36 w-36 items-center justify-center text-white"
                >
                  <i className="ph-bold ph-magnifying-glass"></i>
                </button>
              </form>
              <a
                href="sign-in.html"
                className="info-action bg-main-25 hover-bg-main-600 border-neutral-30 rounded-circle hover-text-white hover-border-main-600 !flex items-center justify-center border text-2xl text-neutral-500 lg:h-[52px] lg:w-[52px]"
              >
                <i className="ph ph-user-circle"></i>{" "}
              </a>
              <button
                type="button"
                className="toggle-mobileMenu flex items-center justify-center text-neutral-200 lg:hidden"
                onClick={openMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-label="Open menu"
              >
                <i className="ph ph-list"></i>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
