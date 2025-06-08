import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Dashboard() {
	const user = await currentUser();

	if (!user) {
		redirect("/sign-in");
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
			<div className="max-w-2xl mx-auto text-center px-6">
				<div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
					<div className="mb-6">
						<div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
							{user.imageUrl ? (
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
										user.firstName?.charAt(0) ||
										user.username?.charAt(0) ||
										user.emailAddresses[0]?.emailAddress.charAt(0) ||
										"U"
									).toUpperCase()}
								</span>
							)}
						</div>
						<h1 className="text-4xl font-bold text-white mb-2">
							Welcome back {user.firstName}
						</h1>
						<p className="text-blue-200 text-lg">
							Your personal movie discovery space
						</p>
					</div>

					<div className="space-y-4 mb-8">
						<div className="bg-white/5 rounded-lg p-4 border border-white/10">
							<h3 className="text-xl font-semibold text-white mb-2">
								Hello, {user.firstName || user.username || "Movie Explorer"}!
							</h3>
							<p className="text-blue-200">
								You&apos;ve successfully logged into MovieScout. This is your
								personalized dashboard where you can discover amazing movies and
								track your favorites.
							</p>
						</div>
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
