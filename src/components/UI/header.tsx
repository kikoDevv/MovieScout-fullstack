import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
	return (
		<header className={styles.gradientHeader}>
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
					<Image
						className={styles.movieScoutLogo}
						src="/MovieScout.svg"
						alt="Main logo not found!"
						width={200}
						height={200}
					/>
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
	);
}
