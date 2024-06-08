import { Component, createSignal } from "solid-js";
import { supabase } from "../components/auth/supabase";

const pathSegments = window.location.pathname.split("/");
const mode = pathSegments[2];

const Auth: Component = () => {
	console.log(mode);
	const [email, setEmail] = createSignal<string>("");
	const [password, setPassword] = createSignal<string>("");
	const [loading, setLoading] = createSignal<boolean>(false);

	const handleLogin = async (e: Event) => {
		e.preventDefault();

		try {
			setLoading(true);
			const method =
				mode === "sign-in"
					? supabase.auth.signInWithPassword
					: supabase.auth.signUp;
			const { error } = await method.call(supabase.auth, {
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
			console.log("done");
		}
	};
	return (
		<>
			{/*
			This example requires updating your template:
	
			```
			<html class="h-full bg-white">
			<body class="h-full">
			```
		  */}
			<div class="flex min-h-full flex-1 flex-col justify-center">
				<div class="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						class="mx-auto h-10 w-full"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
					<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						{mode === "sign-in"
							? "Sign in to your account"
							: "Sign up for an account"}
					</h2>
				</div>

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
									class="block w-full rounded-md border-0 dark:bg-white/5 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
								<div class="text-sm">
									<a
										href="#"
										class="font-semibold text-indigo-600 hover:text-indigo-500">
										Forgot password?
									</a>
								</div>
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
									class="block w-full rounded-md border-0 dark:bg-white/5 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								{loading() ? "Loading..." : "Sign in"}
							</button>
						</div>
					</form>

					<p class="mt-10 text-center text-sm text-gray-500">
						Not a member?{" "}
						<a
							href="#"
							class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							Start a 14 day free trial
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export default Auth;
