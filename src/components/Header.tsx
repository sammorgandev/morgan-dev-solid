import { A, useNavigate } from "@solidjs/router";
import Logo from "./atoms/Logo";
import { createEffect, createSignal, useContext } from "solid-js";
import { user as userIcon, bars_3, xMark } from "solid-heroicons/solid";
import { Icon } from "solid-heroicons";
import { supabase } from "./auth/supabase";
import { useAuth } from "./auth/authContext";

const navItems = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Work", href: "/work" },
	{ label: "Blog", href: "/blog" },
];

export default function Header() {
	const { session } = useAuth();
	const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);
	const navigate = useNavigate();

	createEffect(() => {
		if (session()) {
			console.log(session());
		}
	});
	return (
		<>
			<div class="flex justify-between py-4 px-6 border-b border-gray-900/10 pt-4 dark:border-gray-400/20">
				<Logo />
				<nav class="hidden lg:flex items-center self-center gap-6 lg:ml-auto">
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
						class="flex"
						inactiveClass={`text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-gray-50 transition-all ease-in`}
						activeClass={`"text-indigo-600 text-sm font-semibold leading-6 hover:text-indigo-600 dark:text-indigo-400 transition-all ease-in`}
						href="/auth">
						{session() === null ? (
							"Log in"
						) : (
							<div class="flex items-center gap-2">
								<p class="hidden lg:block">Dashboard</p>{" "}
								<div class="w-8 h-8 flex items-center justify-center bg-indigo-400/30 rounded-full">
									<Icon path={userIcon} width={18} height={18} />
								</div>
							</div>
						)}
					</A>
					{session() === null && (
						<A
							href="/auth"
							class="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							Sign up
						</A>
					)}
					<div class="flex lg:hidden">
						<button
							type="button"
							class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(true)}>
							<span class="sr-only">Open main menu</span>
							<Icon path={bars_3} class="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
			{mobileMenuOpen() && (
				<div class="lg:hidden bg-white">
					<div class="fixed inset-0" />
					<div class="absolute inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div class="flex items-center justify-between">
							<Logo />
							<button
								type="button"
								class="-m-2.5 rounded-md p-2.5 text-gray-700"
								onClick={() => setMobileMenuOpen(false)}>
								<span class="sr-only">Close menu</span>
								<Icon
									path={xMark}
									class="h-6 w-6 text-indigo-600 dark:text-indigo-400"
									aria-hidden="true"
								/>
							</button>
						</div>
						<div class="mt-6 flow-root">
							<div class="-my-6 divide-y divide-gray-500/10">
								<div class="space-y-2 py-6">
									{navItems.map((item) => (
										<A
											id={item.label}
											href={item.href}
											onClick={() => setMobileMenuOpen(false)}
											class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/5">
											{item.label}
										</A>
									))}
								</div>
								<div class="py-6" onClick={() => setMobileMenuOpen(false)}>
									<A
										href="/contact"
										onClick={() => setMobileMenuOpen(false)}
										class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/5">
										{session() === null ? "Login" : "Dashboard"}{" "}
									</A>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
