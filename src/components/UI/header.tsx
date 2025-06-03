"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";
import { FaBars } from "react-icons/fa";
import Toolbar from "@/components/toolbar/toolbar";

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<>
			{menuOpen && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
					onClick={toggleMenu}
				></div>
			)}
			{menuOpen && <Toolbar onClose={toggleMenu} />}

			<header className={styles.gradientHeader}>
				<div className={styles.toolbarBtn} onClick={toggleMenu}>
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
								width={200}
								height={200}
							/>
						</Link>
					</div>
				</div>
				<div className={styles.navTitleContainer}>
					<div className={styles.navbarContainerRight}>
						<Link href="/contact" className={styles.menuItem}>
							Contact us
						</Link>
						<Link href="/login" className={styles.menuItem}>
							Login
						</Link>
					</div>
				</div>
			</header>
		</>
	);
}
