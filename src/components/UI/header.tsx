"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";
import { FaBars } from "react-icons/fa";
import SideBar from "@/components/sideBar/sideBar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <>
      {menuOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={toggleMenu}></div>}
      {menuOpen && <SideBar onClose={toggleMenu} />}

      <header className={styles.gradientHeader}>
        <div className={styles.sideBarBtn} onClick={toggleMenu}>
          <FaBars size={24} />
        </div>
        <div className={styles.navTitleContainer}>
          <div className={styles.navbarContainerLeft}>
            <Link href="/movies" className={styles.menuItem}>
              Movies
            </Link>
            <Link href="/tv-shows" className={styles.menuItem}>
              TV-Shows
            </Link>
          </div>
        </div>
        <div className={styles.logoNavbar}>
          <div className={styles.logo}>
            <Link href="/">
              <Image
                className={styles.movieScoutLogo}
                src="/MovieScout.svg"
                alt="Main logo not found!"
                width={375}
                height={375}
                unoptimized
                priority
              />
            </Link>
          </div>
        </div>
        <div className={styles.navTitleContainer}>
          <div className={styles.navbarContainerRight}>
            <Link href="/contactPage" className={styles.menuItem}>
              Contact us
            </Link>
            {/*--------- signed in function ----------*/}
            <SignedIn>
              <Link href="/dashboard" className={styles.menuItem}>
                Dashboard
              </Link>
              <UserButton />
            </SignedIn>
            {hydrated && (
              <SignedOut>
                <SignInButton mode="modal">
                  <button className={styles.menuItem}>Sign-In</button>
                </SignInButton>
              </SignedOut>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
