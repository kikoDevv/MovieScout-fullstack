"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./tabBar.css";

interface TabItem {
  id: string;
  label: string;
  icon?: string;
}

export default function TabBar() {
	const [activeTab, setActiveTab] = useState("movies");

	const tabs: TabItem[] = [
		{ id: "movies", label: "Movies", icon: "🎬" },
		{ id: "tvshows", label: "TV Shows", icon: "📺" },
		{ id: "children", label: "Children", icon: "🧸" },
		{ id: "newReleases", label: "New Releases", icon: "🆕" },
		{ id: "comedy", label: "Comedy", icon: "😂" }
	];

	return (
		<div className="flex justify-center w-full">
			<div className="max-w-4xl w-fit overflow-x-auto scrollbar-hide backdrop-blur-md">
				<div className="relative px-2 w-fit">
					<div className="flex items-center justify-center relative">
						<div className="tab-backdrop absolute inset-0 bg-black/30 backdrop-blur-md rounded-full"></div>

						<div className="flex space-x-1 sm:space-x-3 p-1.5 relative z-10">
							{tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`
										group relative px-4 py-2.5 rounded-full transition-all duration-200
										flex items-center justify-center whitespace-nowrap hover:cursor-pointer
										${activeTab === tab.id ? "text-white" : "text-gray-300"}
									`}
								>
									{activeTab === tab.id && (
										<motion.div
											layoutId="tab-indicator"
											className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full"
											transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
										>
											<div className="absolute inset-0 rounded-full opacity-20 blur-sm bg-purple-400"></div>
										</motion.div>
									)}

									<span className={`
										relative z-10 font-medium tracking-wide flex items-center text-sm sm:text-base
										transition-all duration-200 ease-out
										${activeTab === tab.id
											? "transform translate-y-0"
											: "transform group-hover:translate-y-[-2px]"
										}
									`}>
										{tab.icon && (
											<span className={`
												mr-1.5 text-xs sm:text-sm
												${activeTab !== tab.id && "opacity-70 group-hover:opacity-100"}
											`}>
												{tab.icon}
											</span>
										)}
										{tab.label}
									</span>
								</button>
							))}
						</div>
					</div>

					<div className="tab-glow"></div>
				</div>
			</div>
		</div>
	);
}
