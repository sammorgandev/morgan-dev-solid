import { A } from "@solidjs/router";
import Logo from "./atoms/Logo";
import { supabase } from "./auth/supabase";
import { AuthSession } from "@supabase/supabase-js";
import { createEffect, createSignal, useContext } from "solid-js";
import { SessionContext } from "./auth/SessionContext";
const navItems = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Work", href: "/work" },
	{ label: "Blog", href: "/blog" },
];
export default function Header() {
	const { session, setSession } = useContext(SessionContext);

	return (
		<div class="flex justify-between py-4 px-6 border-b border-gray-900/10 pt-4 dark:border-gray-400/20">
			<Logo />
			<nav class="flex items-center self-center gap-6 ml-auto">
				{navItems.map((item) => (
					<A
						end
						inactiveClass={`text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-gray-50 transition-all ease-in`}
						activeClass={`text-indigo-600 text-sm font-semibold leading-6 hover:text-indigo-600 dark:text-indigo-400 transition-all ease-in`}
						href={item.href}>
						{item.label}
					</A>
				))}
			</nav>
			<div class="flex items-center gap-4 ml-auto">
				<A
					end
					inactiveClass={`text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-gray-50 transition-all ease-in`}
					activeClass={`"text-indigo-600 text-sm font-semibold leading-6 hover:text-indigo-600 dark:text-indigo-400 transition-all ease-in`}
					href="/auth">
					{!session ? "Log in" : "Dashboard"}
				</A>
				{!session && (
					<A
						href="/auth"
						class="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Sign up
					</A>
				)}
			</div>
		</div>
	);
}
