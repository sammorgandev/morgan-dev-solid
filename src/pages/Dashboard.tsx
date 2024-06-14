import {
	createSignal,
	Show,
	createEffect,
	onCleanup,
	JSX,
	For,
	Component,
} from "solid-js";
import { Icon } from "solid-heroicons";
import {
	bars_3,
	bell,
	calendar,
	folder,
	home,
	users,
	xMark,
	chevronDown,
	magnifyingGlass,
	cog_6Tooth,
} from "solid-heroicons/solid";
import Logo from "../components/atoms/Logo";
import { useAuth } from "../components/auth/authContext";
import { supabase } from "../components/auth/supabase";
import { useLocation, useNavigate } from "@solidjs/router";
import BackgroundPattern from "../components/layout/BackgroundPattern";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/layout/ThemeProvider";

const navigation = [
	{ name: "Home", href: "/dashboard/home", icon: home, current: true },
	{ name: "About", href: "/dashboard/about", icon: users, current: false },
	{ name: "Work", href: "/dashboard/work", icon: folder, current: false },
	{ name: "Blog", href: "/dashboard/blog", icon: calendar, current: false },
];
const tools = [
	{
		id: 1,
		name: "SamBot",
		href: "/dashboard/sambot",
		initial: "S",
		current: false,
	},
	{
		id: 2,
		name: "Todos",
		href: "/dashboard/todos",
		initial: "T",
		current: false,
	},
	{
		id: 3,
		name: "Recipes",
		href: "/dashboard/recipes",
		initial: "R",
		current: false,
	},
];

const handleSignOut = () => {
	supabase.auth.signOut().then(r => console.log(r));
};

const userNavigation = [
	{ name: "Your profile", href: "#" },
	{ name: "Sign out", href: "#", onClick: () => handleSignOut() },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

interface DialogProps {
	open: boolean;
	onClose: () => void;
	children: JSX.Element;
}
{/*MOBILE MENU*/}
const Dialog = (props: DialogProps) => {
	return (
		<div class={`fixed inset-0 z-50 ${props.open ? "block" : "hidden"}`}>
			<div
				class="fixed inset-0 bg-gray-900/80 dark:bg-gray-900/80"
				onClick={props.onClose}></div>
			<div class="fixed inset-0 flex">
				<div class="relative mr-16 flex w-full max-w-xs flex-1">
					<div class="absolute left-full top-0 flex w-16 justify-center pt-5">
						<button type="button" class="-m-2.5 p-2.5" onClick={props.onClose}>
							<span class="sr-only">Close sidebar</span>
							<Icon
								path={xMark}
								class="h-6 w-6 text-white"
								aria-hidden="true"
							/>
						</button>
					</div>
					<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-slate-800 px-6 pb-4">
						{props.children}
					</div>
				</div>
			</div>
		</div>
	);
};

interface MenuProps {
	button: JSX.Element;
	children: JSX.Element;
}
const Menu = (props: MenuProps) => {
	const [isOpen, setIsOpen] = createSignal(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen());
	};

	return (
		<div class="relative">
			<button class="-m-1.5 flex items-center p-1.5" onClick={toggleMenu}>
				{props.button}
			</button>
			<Show when={isOpen()}>
				<div class="fixed inset-0 z-10" onClick={toggleMenu}></div>
				<div
					class="absolute right-0 z-20 mt-2.5 w-32 origin-top-right rounded-md bg-white dark:bg-slate-800 py-2 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-900/5 focus:outline-none"
					onClick={toggleMenu}>
					{props.children}
				</div>
			</Show>
		</div>
	);
};
interface MenuItemProps {
	href: string;
	onClick: (() => void) | undefined;
	active?: boolean;
	children: JSX.Element;
}
const MenuItem = (props: MenuItemProps) => {
	return (
		<a
			href={props.href}
			onClick={props.onClick}
			class={classNames(
				props.active ? "bg-gray-50 dark:bg-slate-900/40" : "",
				"block px-3 py-1 text-sm leading-6 text-gray-900 dark:text-gray-300"
			)}>
			{props.children}
		</a>
	);
};

const Transition = (props: { show: any; children: any }) => {
	createEffect(() => {
		if (props.show) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	});

	onCleanup(() => {
		document.body.classList.remove("overflow-hidden");
	});

	return <Show when={props.show}>{props.children}</Show>;
};

const DashboardLayout: Component<{ children?: JSX.Element }> = (props) => {
	const [sidebarOpen, setSidebarOpen] = createSignal(false);
	const { session, user } = useAuth();
	const [path, setPath] = createSignal(useLocation().pathname);

	createEffect(() => {
		const activePath = useLocation().pathname;
		setPath(activePath);
	});

	createEffect(() => {
		if (session()) {
			console.log("User is signed in");
		} else {
			console.log("User is not signed in");
			let navigate = useNavigate();
			navigate("/auth/sign-in");
		}
	});
	return (
		<ThemeProvider>
			<>
				<div class="bg-transparent dark:bg-slate-800 min-h-screen">
					<div class="z-0 w-full">
						<BackgroundPattern />
					</div>
					<div>
						{/* Mobile menu */}
						<Transition show={sidebarOpen()}>
							<Dialog
								open={sidebarOpen()}
								onClose={() => setSidebarOpen(false)}>
								<div class="flex h-16 shrink-0 items-center">
									<Logo />
								</div>
								<nav class="flex flex-1 flex-col">
									<ul role="list" class="flex flex-1 flex-col gap-y-7">
										<li>
											<ul role="list" class="-mx-2 space-y-1">
												<For each={navigation}>
													{(item) => (
														<li>
															<a
																href={item.href}
																class={classNames(
																	item.current
																		? "bg-gray-50 dark:bg-slate-900/40 text-indigo-600 dark:text-indigo-400"
																		: "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-900/40 hover:text-indigo-600 dark:hover:text-indigo-400",
																	"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
																)}>
																<Icon
																	path={item.icon}
																	class={classNames(
																		item.current
																			? "text-indigo-600 dark:text-indigo-400"
																			: "text-gray-400 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
																		"h-6 w-6 shrink-0"
																	)}
																	aria-hidden="true"
																/>
																{item.name}
															</a>
														</li>
													)}
												</For>
											</ul>
										</li>
										<li>
											<div class="text-xs font-semibold leading-6 text-gray-400 dark:text-gray-500">
												Your teams
											</div>
											<ul role="list" class="-mx-2 mt-2 space-y-1">
												<For each={tools}>
													{(tool) => (
														<li>
															<a
																href={tool.href}
																class={classNames(
																	tool.current
																		? "bg-gray-50 dark:bg-slate-900/40 text-indigo-600 dark:text-indigo-400"
																		: "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-900/40 hover:text-indigo-600 dark:hover:text-indigo-400",
																	"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
																)}>
																<span
																	class={classNames(
																		tool.current
																			? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
																			: "border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-500 group-hover:border-indigo-600 dark:group-hover:border-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
																		"flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white dark:bg-slate-800 text-[0.625rem] font-medium"
																	)}>
																	{tool.initial}
																</span>
																<span class="truncate">{tool.name}</span>
															</a>
														</li>
													)}
												</For>
											</ul>
										</li>
										<li class="mt-auto">
											<a
												href="#"
												class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-900/40 hover:text-indigo-600 dark:hover:text-indigo-400">
												<Icon
													path={cog_6Tooth}
													class="h-6 w-6 shrink-0 text-gray-400 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
													aria-hidden="true"
												/>
												Settings
											</a>
										</li>
									</ul>
								</nav>
							</Dialog>
						</Transition>

						{/* Static sidebar for desktop */}
						<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
							<div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 px-6 pb-4">
								<div class="flex h-16 shrink-0 items-center">
									<Logo />
								</div>
								<nav class="flex flex-1 flex-col">
									<ul role="list" class="flex flex-1 flex-col gap-y-7">
										<li>
											<ul role="list" class="-mx-2 space-y-1">
												<For each={navigation}>
													{(item) => (
														<li>
															<a
																href={item.href}
																class={classNames(
																	item.href === path()
																		? "bg-gray-50 dark:bg-slate-900/40 text-indigo-600 dark:text-indigo-400"
																		: "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-900/40 hover:text-indigo-600 dark:hover:text-indigo-400",
																	"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
																)}>
																<Icon
																	path={item.icon}
																	class={classNames(
																		item.href === path()
																			? "text-indigo-600 dark:text-indigo-400"
																			: "text-gray-400 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
																		"h-6 w-6 shrink-0"
																	)}
																	aria-hidden="true"
																/>
																{item.name}
															</a>
														</li>
													)}
												</For>
											</ul>
										</li>
										<li>
											<div class="text-xs font-semibold leading-6 text-gray-400 dark:text-gray-500">
												Fun tools
											</div>
											<ul role="list" class="-mx-2 mt-2 space-y-1">
												<For each={tools}>
													{(tool) => (
														<li>
															<a
																href={tool.href}
																class={classNames(
																	tool.current
																		? "bg-gray-50 dark:bg-slate-900/40 text-indigo-600 dark:text-indigo-400"
																		: "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-900/40 hover:text-indigo-600 dark:hover:text-indigo-400",
																	"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
																)}>
																<span
																	class={classNames(
																		tool.current
																			? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
																			: "border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-500 group-hover:border-indigo-600 dark:group-hover:border-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
																		"flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white dark:bg-slate-800 text-[0.625rem] font-medium"
																	)}>
																	{tool.initial}
																</span>
																<span class="truncate">{tool.name}</span>
															</a>
														</li>
													)}
												</For>
											</ul>
										</li>
										<li class="mt-auto">
											<a
												href="#"
												class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-900/40 hover:text-indigo-600 dark:hover:text-indigo-400">
												<Icon
													path={cog_6Tooth}
													class="h-6 w-6 shrink-0 text-gray-400 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
													aria-hidden="true"
												/>
												Settings
											</a>
										</li>
									</ul>
								</nav>
							</div>
						</div>

						<div class="flex flex-col lg:pl-72">
							{/* Header */}
							<div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
								<button
									type="button"
									class="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 lg:hidden"
									onClick={() => setSidebarOpen(true)}>
									<span class="sr-only">Open sidebar</span>
									<Icon path={bars_3} class="h-6 w-6" aria-hidden="true" />
								</button>

								<div
									class="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden"
									aria-hidden="true"
								/>

								<div class="flex flex-1 gap-x-4 bg-transparent self-stretch lg:gap-x-6">
									<form class="relative flex flex-1" action="#" method="get">
										<label for="search-field" class="sr-only">
											Search
										</label>
										<Icon
											path={magnifyingGlass}
											class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 dark:text-gray-500"
											aria-hidden="true"
										/>
										<input
											id="search-field"
											class="block h-full w-full bg-transparent border-0 py-0 pl-8 pr-0 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none sm:text-sm"
											placeholder="Search..."
											type="search"
											name="search"
										/>
									</form>
									<div class="flex items-center gap-x-4 lg:gap-x-6">
										<button
											type="button"
											class="-m-2.5 p-2.5 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
											<span class="sr-only">View notifications</span>
											<Icon path={bell} class="h-6 w-6" aria-hidden="true" />
										</button>

										<div
											class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700"
											aria-hidden="true"
										/>

										<Menu
											button={
												<>
													<span class="sr-only">Open user menu</span>
													<img
														class="h-8 w-8 rounded-full bg-gray-50 dark:bg-gray-700"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
													<span class="hidden lg:flex lg:items-center">
														<span
															class="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
															aria-hidden="true">
															{user()?.email}
														</span>
														<Icon
															path={chevronDown}
															class="ml-2 h-5 w-5 text-gray-400 dark:text-gray-500"
															aria-hidden="true"
														/>
													</span>
												</>
											}>
											<For each={userNavigation}>
												{(item) => (
													<MenuItem href={item.href} onClick={item.onClick}>
														{item.name}
													</MenuItem>
												)}
											</For>
										</Menu>
									</div>
								</div>
							</div>

							{/* Main content */}
							<main class="py-10 flex-1">
								<div class="px-4 sm:px-6 lg:px-8">{props.children}</div>
							</main>
							<div
								class={`${
									path() !== "/dashboard"
										? "z-10 w-full"
										: " w-full z-10 lg:pl-72 fixed bottom-0 left-0"
								}`}>
								<Footer />
							</div>
						</div>
					</div>
				</div>
			</>
		</ThemeProvider>
	);
};

export default DashboardLayout;
