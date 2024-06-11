import {
	createSignal,
	Show,
	createEffect,
	onCleanup,
	JSX,
	For,
} from "solid-js";
import { Icon } from "solid-heroicons";
import {
	bars_3,
	bell,
	calendar,
	chartPie,
	documentDuplicate,
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
import { user } from "solid-heroicons/solid";

const navigation = [
	{ name: "Home", href: "#", icon: home, current: true },
	{ name: "About", href: "#", icon: users, current: false },
	{ name: "Projects", href: "#", icon: folder, current: false },
	{ name: "Calendar", href: "#", icon: calendar, current: false },
	{ name: "Documents", href: "#", icon: documentDuplicate, current: false },
	{ name: "Reports", href: "#", icon: chartPie, current: false },
];
const teams = [
	{ id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
	{ id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
	{ id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
const userNavigation = [
	{ name: "Your profile", href: "#" },
	{ name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

interface DialogProps {
	open: boolean;
	onClose: () => void;
	children: JSX.Element;
}
const Dialog = (props: DialogProps) => {
	return (
		<div class={`fixed inset-0 z-50 ${props.open ? "block" : "hidden"}`}>
			<div class="fixed inset-0 bg-gray-900/80" onClick={props.onClose}></div>
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
					<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
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
					class="absolute right-0 z-20 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
					onClick={toggleMenu}>
					{props.children}
				</div>
			</Show>
		</div>
	);
};
interface MenuItemProps {
	href: string;
	active?: boolean;
	children: JSX.Element;
}
const MenuItem = (props: MenuItemProps) => {
	return (
		<a
			href={props.href}
			class={classNames(
				props.active ? "bg-gray-50" : "",
				"block px-3 py-1 text-sm leading-6 text-gray-900"
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

const DashboardLayout = () => {
	const [sidebarOpen, setSidebarOpen] = createSignal(false);
	const { user } = useAuth();

	return (
		<>
			<div>
				{/* Mobile menu */}
				<Transition show={sidebarOpen()}>
					<Dialog open={sidebarOpen()} onClose={() => setSidebarOpen(false)}>
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
																? "bg-gray-50 text-indigo-600"
																: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
															"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
														)}>
														<Icon
															path={item.icon}
															class={classNames(
																item.current
																	? "text-indigo-600"
																	: "text-gray-400 group-hover:text-indigo-600",
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
									<div class="text-xs font-semibold leading-6 text-gray-400">
										Your teams
									</div>
									<ul role="list" class="-mx-2 mt-2 space-y-1">
										<For each={teams}>
											{(team) => (
												<li>
													<a
														href={team.href}
														class={classNames(
															team.current
																? "bg-gray-50 text-indigo-600"
																: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
															"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
														)}>
														<span
															class={classNames(
																team.current
																	? "border-indigo-600 text-indigo-600"
																	: "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
																"flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
															)}>
															{team.initial}
														</span>
														<span class="truncate">{team.name}</span>
													</a>
												</li>
											)}
										</For>
									</ul>
								</li>
								<li class="mt-auto">
									<a
										href="#"
										class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
										<Icon
											path={cog_6Tooth}
											class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
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
					<div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
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
																? "bg-gray-50 text-indigo-600"
																: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
															"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
														)}>
														<Icon
															path={item.icon}
															class={classNames(
																item.current
																	? "text-indigo-600"
																	: "text-gray-400 group-hover:text-indigo-600",
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
									<div class="text-xs font-semibold leading-6 text-gray-400">
										Your teams
									</div>
									<ul role="list" class="-mx-2 mt-2 space-y-1">
										<For each={teams}>
											{(team) => (
												<li>
													<a
														href={team.href}
														class={classNames(
															team.current
																? "bg-gray-50 text-indigo-600"
																: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
															"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
														)}>
														<span
															class={classNames(
																team.current
																	? "border-indigo-600 text-indigo-600"
																	: "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
																"flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
															)}>
															{team.initial}
														</span>
														<span class="truncate">{team.name}</span>
													</a>
												</li>
											)}
										</For>
									</ul>
								</li>
								<li class="mt-auto">
									<a
										href="#"
										class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
										<Icon
											path={cog_6Tooth}
											class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
											aria-hidden="true"
										/>
										Settings
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div class="lg:pl-72">
					{/* Header */}
					<div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
						<button
							type="button"
							class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
							onClick={() => setSidebarOpen(true)}>
							<span class="sr-only">Open sidebar</span>
							<Icon path={bars_3} class="h-6 w-6" aria-hidden="true" />
						</button>

						<div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

						<div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
							<form class="relative flex flex-1" action="#" method="get">
								<label for="search-field" class="sr-only">
									Search
								</label>
								<Icon
									path={magnifyingGlass}
									class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
									aria-hidden="true"
								/>
								<input
									id="search-field"
									class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
									placeholder="Search..."
									type="search"
									name="search"
								/>
							</form>
							<div class="flex items-center gap-x-4 lg:gap-x-6">
								<button
									type="button"
									class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
									<span class="sr-only">View notifications</span>
									<Icon path={bell} class="h-6 w-6" aria-hidden="true" />
								</button>

								<div
									class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
									aria-hidden="true"
								/>

								<Menu
									button={
										<>
											<span class="sr-only">Open user menu</span>
											<img
												class="h-8 w-8 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<span class="hidden lg:flex lg:items-center">
												<span
													class="ml-4 text-sm font-semibold leading-6 text-gray-900"
													aria-hidden="true">
													{user()?.email}
												</span>
												<Icon
													path={chevronDown}
													class="ml-2 h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
											</span>
										</>
									}>
									<For each={userNavigation}>
										{(item) => (
											<MenuItem href={item.href}>{item.name}</MenuItem>
										)}
									</For>
								</Menu>
							</div>
						</div>
					</div>

					{/* Main content */}
					<main class="py-10">
						<div class="px-4 sm:px-6 lg:px-8">
							<h1>Here is my dashboard</h1>
						</div>
					</main>
				</div>
			</div>
		</>
	);
};

export default DashboardLayout;
