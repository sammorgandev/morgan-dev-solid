import { createEffect, createSignal, type Component, type JSX } from "solid-js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/layout/ThemeProvider";
import BackgroundPattern from "./components/layout/BackgroundPattern";
import { useLocation } from "@solidjs/router";

const Layout: Component<{ children?: JSX.Element }> = (props) => {
	const [path, setPath] = createSignal<string>("");
	createEffect(() => {
		const activePath = useLocation().pathname;
		console.log(activePath);
		setPath(activePath);
	});

	return (
		<ThemeProvider>
			<>
				<div class="flex bg-transparent dark:bg-slate-800 items-center flex-col min-h-screen">
					<div class="z-0 w-full">
						<BackgroundPattern />
					</div>
					{path() !== "/dashboard" && (
						<div class="z-20 w-full">
							<Header />
						</div>
					)}
					<div
						class={`${
							path() !== "/dashboard"
								? "mt-10 mb-10 flex-grow overflow-auto justify-center px-4 z-10 lg:px-14"
								: "w-full flex-grow overflow-auto justify-center z-10"
						}`}>
						{props.children}
					</div>

					<div
						class={`${
							path() !== "/dashboard" ? "z-10 w-full" : " w-full z-10 lg:pl-72"
						}`}>
						<Footer />
					</div>
				</div>
			</>
		</ThemeProvider>
	);
};

export default Layout;
