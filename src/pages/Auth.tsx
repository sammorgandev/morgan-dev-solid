import {
	Component,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
	useContext,
} from "solid-js";
import { useAuth } from "../components/auth/authContext";
import { useNavigate } from "@solidjs/router";
import {
	useSupabase,
	useSupabaseAuth,
	useOnAuthStateChange,
} from "solid-supabase";
import { Session } from "@supabase/supabase-js";
const pathSegments = window.location.pathname.split("/");
const mode = pathSegments[2];

const Auth: Component = () => {
	const { session } = useAuth();
	console.log(mode);
	const [email, setEmail] = createSignal<string>("");
	const [password, setPassword] = createSignal<string>("");
	const [loading, setLoading] = createSignal<boolean>(false);
	const navigate = useNavigate();

	const auth = useSupabaseAuth();

	const handleLogin = async (e: Event) => {
		e.preventDefault();

		try {
			setLoading(true);
			const method = mode === "sign-in" ? auth.signInWithPassword : auth.signUp;
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
			console.log("done");
			console.log(session());
		}
	};

	createEffect(() => {
		if (session()) {
			navigate("/dashboard");
		}
	});

	return (
		<>
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
									class="input-primary"
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
