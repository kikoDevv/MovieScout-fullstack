"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DashboardContent() {
	const { user, isLoaded } = useUser();
	const [showSignInModal, setShowSignInModal] = useState(false);

	useEffect(() => {
		if (isLoaded && !user) {
			setShowSignInModal(true);
		}
	}, [isLoaded, user]);

	{
		/*--------- Show loading state while Clerk is loading ----------*/
	}
	if (!isLoaded) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
				<div className="text-white text-xl">Loading...</div>
			</div>
		);
	}

	{
		/*--------- If user is not signed in show sign-in modal ----------*/
	}
	if (!user && showSignInModal) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
				<div className="max-w-2xl mx-auto text-center px-6">
					<div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
						<h1 className="text-4xl font-bold text-white mb-4">
							Welcome to Dashboard
						</h1>
						<p className="text-blue-200 text-lg mb-8">
							Please sign in to access your personal movie discovery space
						</p>
						<SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
							<button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
								Sign In to Continue
							</button>
						</SignInButton>
					</div>
				</div>
			</div>
		);
	}

	{
		/*--------- User is signed in, show dashboard content ----------*/
	}
	return (
		<div className="min-h-screen  flex items-center justify-center">
			<div className="max-w-2xl mx-auto text-center px-6">
				<div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
					<div className="mb-6">
						<div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
							{user?.imageUrl ? (
								<Image
									src={user.imageUrl}
									alt="user Image not found"
									width={80}
									height={80}
									className="w-full h-full object-cover rounded-full"
								/>
							) : (
								<span className="text-2xl font-bold text-white">
									{(
										user?.firstName?.charAt(0) ||
										user?.username?.charAt(0) ||
										user?.emailAddresses[0]?.emailAddress.charAt(0) ||
										"U"
									).toUpperCase()}
								</span>
							)}
						</div>
						<h1 className="text-4xl font-bold text-white mb-2">
							Welcome back {user?.firstName || user?.username || "Movie explorer"}
						</h1>
						<p className="text-blue-200 text-lg">
							Your personal movie discovery space
						</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="#"
							className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
						>
							Explore Movies
						</a>
						<a
							href="/profile"
							className="border border-white/30 hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
						>
							View Profile
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
