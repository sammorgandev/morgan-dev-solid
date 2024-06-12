import {
	Component,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
	useContext,
} from "solid-js";
import { useAuth } from "../components/auth/authContext";
import { useNavigate, useLocation } from "@solidjs/router";
import {
	useSupabase,
	useSupabaseAuth,
	useOnAuthStateChange,
} from "solid-supabase";
import { Session } from "@supabase/supabase-js";

const Auth: Component = () => {
	const location = useLocation();
	console.log("Location:", location.pathname);
	const { session } = useAuth();
	const [mode, setMode] = createSignal<string>(
		location.pathname === "/auth/sign-in" ? "sign-in" : "sign-up"
	);
	console.log(mode());
	const [email, setEmail] = createSignal<string>("");
	const [password, setPassword] = createSignal<string>("");
	const [loading, setLoading] = createSignal<boolean>(false);
	const navigate = useNavigate();

	const auth = useSupabaseAuth();

	const handleLogin = async (e: Event) => {
		e.preventDefault();

		try {
			setLoading(true);
			const method =
				mode() === "sign-in" ? auth.signInWithPassword : auth.signUp;
			const { data, error } = await method.call(auth, {
				email: email(),
				password: password(),
			});
			if (error) {
				throw error;
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			setLoading(false);
			if (mode() === "sign-up") {
				navigate("/auth/confirm-email");
			}
			console.log("done");
			console.log(session());
		}
	};

	createEffect(() => {
		if (session()) {
			navigate("/dashboard");
		}
	});

	createEffect(() => {
		if (location.pathname === "sign-in") {
			setMode("sign-in");
		} else if (location.pathname === "sign-up") {
			setMode("sign-up");
		} else if (location.pathname === "confirm-email") setMode("confirm-email");
	});

	return (
		<>
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-md text-center">
					<h2 class="flex gap-2 justify-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
						{location.pathname === "/auth/sign-in"
							? "🔑 Sign in"
							: location.pathname === "/auth/sign-up"
							? "🔑 Sign up"
							: "📨 Confirm your email"}
					</h2>
					<p class="mt-6 text-left text-lg leading-8 dark:text-gray-300 text-gray-600">
						{location.pathname === "/auth/sign-in"
							? "Welcome back! Sign in to your account to access more tools and cool stuff."
							: location.pathname === "/auth/sign-up"
							? "Why create an account? Honestly - no reason. I have a few cool tools that use third party APIs that you can access."
							: "Please check your inbox and click the link to confirm your email address."}
					</p>
				</div>

				{location.pathname !== "/auth/confirm-email" && (
					<div class="mt-10 sm:mx-auto sm:w-full">
						<form class="space-y-6" onSubmit={handleLogin} method="post">
							<div>
								<label
									for="email"
									class="block text-sm font-medium leading-6 text-gray-900">
									Email address
								</label>
								<div class="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										autocomplete="email"
										value={email()}
										onChange={(e) => setEmail(e.currentTarget.value)}
										required
										class="input-primary"
									/>
								</div>
							</div>

							<div>
								<div class="flex items-center justify-between">
									<label
										for="password"
										class="block text-sm font-medium leading-6 text-gray-900">
										Password
									</label>
									{location.pathname === "/auth/sign-in" && (
										<div class="text-sm">
											<a
												href="#"
												class="font-semibold text-indigo-600 hover:text-indigo-500">
												Forgot password?
											</a>
										</div>
									)}
								</div>
								<div class="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										autocomplete="current-password"
										value={password()}
										onChange={(e) => setPassword(e.currentTarget.value)}
										required
										class="input-primary"
									/>
								</div>
							</div>

							<div>
								<button
									type="submit"
									class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
									{location.pathname === "/auth/sign-in" && !loading()
										? "Sign in"
										: mode() !== "sign-in" && !loading()
										? "Sign up"
										: "Loading..."}
								</button>
							</div>
						</form>

						<p class="mt-10 text-center text-sm text-gray-500">
							{location.pathname === "/auth/sign-in"
								? "Not a member?"
								: "Already a member?"}{" "}
							{location.pathname === "/auth/sign-up" && (
								<a
									href="/auth/sign-in"
									class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
									Sign in
								</a>
							)}{" "}
							{location.pathname === "/auth/sign-in" && (
								<a
									href="/auth/sign-up"
									class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
									Sign up
								</a>
							)}
						</p>
					</div>
				)}
			</div>
		</>
	);
};

export default Auth;
