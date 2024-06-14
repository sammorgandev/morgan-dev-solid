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
import Category from "./pages/Category";
import Post from "./pages/Post";
import { AuthProvider } from "./components/auth/authContext";
import { SupabaseProvider } from "solid-supabase";
import { supabase } from "./components/auth/supabase";
import DashboardLayout from "./pages/Dashboard";
const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
	);
}

render(
	() => (
		<SupabaseProvider client={supabase}>
			<AuthProvider>
				<Router>
					<Route path="/" component={Layout}>
						<Route path="/" component={Home} />
						<Route path="/about" component={About} />
						<Route path="/work" component={Work} />
						<Route path="/work/:slug" component={Post} />
						<Route path="/category/:category" component={Category} />
						<Route path="/category/:category/:slug" component={Post} />
						<Route path="/blog" component={Blog} />
						<Route path="/blog/:slug" component={Post} />
						<Route path="/auth/:mode?" component={Auth} />
					</Route>
					<Route path="/" component={DashboardLayout}>
						<Route path="/dashboard" component={Home} />
						<Route path="/dashboard/home" component={Home} />
						<Route path="/dashboard/about" component={About} />
						<Route path="/dashboard/work" component={Work} />
						<Route path="/dashboard/blog" component={Blog} />
					</Route>
				</Router>
			</AuthProvider>
		</SupabaseProvider>
	),
	root!
);
