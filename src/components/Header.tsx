import { A } from "@solidjs/router";
import Logo from "./atoms/Logo";

const navItems = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Work", href: "/work" },
	{ label: "Blog", href: "/blog" },
];
export default function Header() {
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
					Log in
				</A>
			</div>
		</div>
	);
}
