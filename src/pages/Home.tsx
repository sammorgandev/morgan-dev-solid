import { A } from "@solidjs/router";
import { Component } from "solid-js";
import { useLocation } from "@solidjs/router";
import SocialLinks from "../components/atoms/SocialLinks";
const Home: Component = () => {
	const path = useLocation().pathname;
	const page = path.split("/")[1];
	console.log(page);
	return (
		<div class="max-w-2xl">
			<div
				class={`justify-start mb-8 mt-2 flex h-full  ${
					page === "dashboard"
						? "items-start"
						: "items-center lg:justify-center"
				}`}>

				<SocialLinks />
			</div>
			<div
				class={`text-left flex-grow ${
					page === "dashboard" ? "" : "lg:text-center"
				} mb-4 lg:mb-0`}>
				<div class={"flex flex-col lg:items-center"}>
				<div
					class={`text-5xl mb-6 md:text-6xl font-bold tracking-tight gap-4 text-gray-900 dark:text-slate-100 flex justify-left ${
						page === "dashboard" ? "" : "lg:justify-center gap-8"
					}`}>
					<div class="wave-element -mt-1">👋 </div>
					<div>
						<h1 class="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
							Hi - I&apos;m Sam
						</h1>
					</div>
				</div>

				</div>


				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-slate-300">
					I&apos;m a computer nerd, product enthusiast, and developer who is
					passionate about{" "}
					<b>helping small businesses and niche industries grow</b> and thrive.
					I work for{" "}
					<A href="https://bubble.io" target="_blank">
						@bubble
					</A>{" "}
					by day, and I build websites, mobile apps, custom CRMs, lead tracking
					solutions, and business ops management software in my spare time.
				</p>
				<div
					class={`mt-10 flex items-center justify-left gap-x-6 ${
						page === "dashboard" ? "" : "lg:justify-center"
					}`}>
					<a
						href="/work"
						class="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Browse work
					</a>
					<a
						href="/about"
						class="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-300 hover:text-indigo-600 transition-all ease-in">
						Learn more <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Home;
