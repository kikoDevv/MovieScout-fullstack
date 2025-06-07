"use client";
import React from "react";
import Image from "next/image";
import { SignInButton, SignedOut } from "@clerk/nextjs";

export default function SubscriptionBox() {
	return (
		<div className="relative w-full mx-auto my-8 md:my-12 lg:my-16 overflow-hidden select-none sm:px-4 sm:px-6 lg:px-8">
			{/*--------- Main container backdrop ----------*/}
			<div className="relative bg-black/60 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/10 mx-auto max-w-5xl sm:mt-20 sm:mb-50">
				<div className="absolute inset-0">
					<Image
						src="/seat.jpg"
						alt="Cinema seats image not found"
						className="w-full h-full object-cover"
						fill
						priority
						quality={75}
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
				</div>
				{/*---------  background effects ----------*/}
				<div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-transparent to-blue-600/8"></div>
				<div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-2xl -translate-y-10 translate-x-10 will-change-transform"></div>
				<div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/15 rounded-full blur-2xl translate-y-32 -translate-x-32 will-change-transform"></div>

				<div className="relative z-10 px-8 py-12 lg:px-10 lg:py-9">
					<div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
						{/* Left side - Content */}
						<div className="text-white space-y-8">
							{/* Badge */}
							<div className="inline-flex items-center space-x-2 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-purple-500/20">
								<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
								<span className="text-sm font-medium">
									Free Account Benefits
								</span>
							</div>

							{/*--------- Main heading ----------*/}
							<div className="space-y-4">
								<h2 className="text-4xl lg:text-6xl font-bold leading-tight">
									Unlock Your{" "}
									<span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
										login Benefits
									</span>
								</h2>
								{/* <p className="text-xl text-gray-300 leading-relaxed">
									Join our comunity of movie lovers and discover your next
									favorite film. Create your account today and unlock exclusive
									features.
								</p> */}
							</div>

							{/*--------- Features list ----------*/}
							<div className="space-y-4">
								<div className="flex items-center space-x-4 group">
									<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200 will-change-transform">
										<svg
											className="w-6 h-6 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
											/>
										</svg>
									</div>
									<div>
										<h3 className="text-lg font-semibold">Add movies</h3>
										<p className="text-gray-400">
											Save movies and shows you want to watch later
										</p>
									</div>
								</div>

								<div className="flex items-center space-x-4 group">
									<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200 will-change-transform">
										<svg
											className="w-6 h-6 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
											/>
										</svg>
									</div>
									<div>
										<h3 className="text-lg font-semibold">Write Reviews</h3>
										<p className="text-gray-400">
											Share your thoughts and rate movies
										</p>
									</div>
								</div>

								<div className="flex items-center space-x-4 group">
									<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200 will-change-transform">
										<svg
											className="w-6 h-6 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13 10V3L4 14h7v7l9-11h-7z"
											/>
										</svg>
									</div>
									<div>
										<h3 className="text-lg font-semibold">
											Smart Recommendations
										</h3>
										<p className="text-gray-400">
											Beta future, propoply never gets finished
										</p>
									</div>
								</div>
							</div>
							{/*--------- 100% free badge ----------*/}
							<div className="inline-flex items-center space-x-2 text-sm text-gray-400 m-0">
								<svg
									className="w-5 h-5 text-purple-400"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
								<span>100% Free • secure login usin clerk</span>
							</div>
							<div className="flex flex-col sm:flex-row gap-4">
								{/*--------- sign up button ----------*/}
								<SignedOut>
									<SignInButton mode="modal">
										<div className="group relative px-4 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base rounded-2xl overflow-hidden transition-all duration-300 text-center hover:cursor-pointer hover:scale-[1.02] will-change-transform">
											<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
											<span className="relative flex items-center justify-center space-x-2">
												<span>Get Started Free</span>
												<svg
													className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M13 7l5 5m0 0l-5 5m5-5H6"
													/>
												</svg>
											</span>
										</div>
									</SignInButton>
								</SignedOut>
								{/*--------- sign in btn ----------*/}
								<SignedOut>
									<SignInButton mode="modal">
										<div className="px-4 py-4 border-2 border-gray-600 hover:border-purple-400 text-gray-300 hover:text-white hover:cursor-pointer font-bold text-base rounded-2xl transition-all duration-200 hover:bg-purple-600/10 backdrop-blur-sm text-center will-change-transform">
											Sign In
										</div>
									</SignInButton>
								</SignedOut>
							</div>
						</div>

						{/* Right side - Visual elements */}
						<div className="relative lg:block hidden">
							{/* Movie cards showcase */}
							<div className="relative">
								{/*--------- Background card ----------*/}
								<div className="absolute inset-0 rounded-3xl transform rotate-6 scale-90 border border-purple-500/10 bg-black/80 will-change-transform"></div>

								{/* Main showcase card */}
								<div className="relative bg-black/85 rounded-3xl p-6 border border-gray-700/30 shadow-2xl scale-90 will-change-transform">
									<div className="space-y-6">
										{/* Header */}
										<div className="flex items-center justify-between">
											<h3 className="text-xl font-bold text-white">
												My Watchlist
											</h3>
											<div className="flex items-center space-x-1">
												<div className="w-3 h-3 bg-green-400 rounded-full"></div>
												<div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
												<div className="w-3 h-3 bg-red-400 rounded-full"></div>
											</div>
										</div>

										{/* Movie items */}
										<div className="space-y-4">
											<div className="flex items-center space-x-4 p-3 bg-black/40 rounded-xl hover:bg-purple-600/15 transition-colors duration-200 group border border-gray-700/20 will-change-auto">
												<div className="w-16 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg"></div>
												<div className="flex-1">
													<h4 className="text-white font-semibold group-hover:text-purple-300 transition-colors duration-200">
														Smile 2
													</h4>
													<p className="text-gray-400 text-sm">Horror • 2024</p>
													<div className="flex items-center space-x-1 mt-1">
														<span className="text-yellow-400">★★★★☆</span>
														<span className="text-gray-500 text-xs">
															8.5/10
														</span>
													</div>
												</div>
											</div>

											<div className="flex items-center space-x-4 p-3 bg-black/40 rounded-xl hover:bg-purple-600/15 transition-colors duration-200 group border border-gray-700/20 will-change-auto">
												<div className="w-16 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg shadow-lg"></div>
												<div className="flex-1">
													<h4 className="text-white font-semibold group-hover:text-purple-300 transition-colors duration-200">
														Breaking Bad
													</h4>
													<p className="text-gray-400 text-sm">
														Drama • Series
													</p>
													<div className="flex items-center space-x-1 mt-1">
														<span className="text-yellow-400">★★★★★</span>
														<span className="text-gray-500 text-xs">
															9.5/10
														</span>
													</div>
												</div>
											</div>

											<div className="flex items-center space-x-4 p-3 bg-black/40 rounded-xl hover:bg-purple-600/15 transition-colors duration-200 group border border-gray-700/20 will-change-auto">
												<div className="w-16 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg"></div>
												<div className="flex-1">
													<h4 className="text-white font-semibold group-hover:text-purple-300 transition-colors duration-200">
														Vikings
													</h4>
													<p className="text-gray-400 text-sm">
														Action • Series
													</p>
													<div className="flex items-center space-x-1 mt-1">
														<span className="text-yellow-400">★★★★☆</span>
														<span className="text-gray-500 text-xs">
															8.8/10
														</span>
													</div>
												</div>
											</div>
										</div>

										{/* Add button */}
										<button className="w-full py-3 border-2 border-dashed border-purple-500/30 text-purple-400 rounded-xl hover:border-purple-400 hover:text-purple-300 hover:bg-purple-600/5 transition-colors duration-200 font-medium will-change-auto">
											+ Add New Movie
										</button>
									</div>
								</div>

								{/*--------- dot on the top of the main card ----------*/}
								<div className="absolute -top-[-15px] -right-[-15px] w-8 h-8 bg-purple-500/60 rounded-full opacity-80"></div>
								<div className="absolute top-1/3 -left-6 w-6 h-6 bg-blue-500/40 rounded-full opacity-60"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
