import {
	createSignal,
	onCleanup,
	createEffect,
	createContext,
	useContext,
	Component,
	JSX,
} from "solid-js";

type ThemeContextType = {
	theme: () => string;
	setTheme: (v: string) => void;
};

const ThemeContext = createContext<ThemeContextType>();

export const ThemeProvider: Component<{ children: JSX.Element }> = (props) => {
	const storedTheme = localStorage.getItem("theme");
	const [theme, setTheme] = createSignal<string>(storedTheme || "light");
	createEffect(() => {
		document.documentElement.className = theme();
		localStorage.setItem("theme", theme());
	});

	return (
		<ThemeContext.Provider
			value={{
				theme: theme,
				setTheme: setTheme,
			}}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export const useDarkMode = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useDarkMode must be used within a ThemeProvider");
	}
	return context;
};
