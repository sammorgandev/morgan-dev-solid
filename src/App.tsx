import { useContext, type Component, type JSX } from "solid-js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/layout/ThemeProvider";
import BackgroundPattern from "./components/layout/BackgroundPattern";
import { SessionContext } from "./components/auth/SessionContext";

const Layout: Component<{ children?: JSX.Element }> = (props) => {
	const { session, setSession } = useContext(SessionContext);

	return (
		<SessionContext.Provider
			value={{ session: session, setSession: setSession }}>
			<ThemeProvider>
				<>
					<div class="flex bg-transparent dark:bg-slate-800 items-center flex-col min-h-screen">
						<div class="z-0 w-full">
							<BackgroundPattern />
						</div>
						<div class="z-10 w-full">
							<Header />
						</div>
						<div
							class={`mt-10 mb-10 flex-grow overflow-auto justify-center px-4 z-10 lg:px-14`}>
							{props.children}
						</div>
						<div class="z-10 w-full">
							<Footer />
						</div>
					</div>
				</>
			</ThemeProvider>
		</SessionContext.Provider>
	);
};

export default Layout;
