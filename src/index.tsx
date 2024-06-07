/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";
import Layout from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
	);
}

render(
	() => (
		<Router root={Layout}>
			<Route path="/" component={Home} />
			<Route path="/about" component={About} />
			<Route path="/work" component={Work} />
			<Route path="/blog" component={Blog} />
			<Route path="/auth" component={Auth} />
		</Router>
	),
	root!
);
