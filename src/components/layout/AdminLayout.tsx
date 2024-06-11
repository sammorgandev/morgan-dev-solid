import { type Component, type JSX } from "solid-js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "../../components/layout/ThemeProvider";
import BackgroundPattern from "../../components/layout/BackgroundPattern";
import { useLocation } from "@solidjs/router";

const AdminLayout: Component<{ children?: JSX.Element }> = (props) => {
	const path = useLocation().pathname;
	console.log(path);
	return (
		<ThemeProvider>
			<>
				<div class="flex bg-transparent dark:bg-slate-800 items-center flex-col min-h-screen">
					<div class="z-0 w-full">
						<BackgroundPattern />
					</div>
					<div class="z-20 w-full">
						<Header />
					</div>
					<div
						class={`${
							path !== "/dashboard"
								? "mt-10 mb-10 flex-grow overflow-auto justify-center px-4 z-10 lg:px-14"
								: "w-full"
						}`}>
						{props.children}
					</div>
					<div class="z-10 w-full">
						<Footer />
					</div>
				</div>
			</>
		</ThemeProvider>
	);
};

export default AdminLayout;
