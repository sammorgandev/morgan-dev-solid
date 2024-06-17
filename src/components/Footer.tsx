import { Icon } from "solid-heroicons";
import { moon, sun } from "solid-heroicons/solid";
import { useDarkMode } from "./layout/ThemeProvider";
import { JSX, createSignal  } from "solid-js";
import { A, action } from "@solidjs/router";
import { toast, Toaster } from "solid-toast";
import { useAuth } from "./auth/authContext";
import SocialLinks from "./atoms/SocialLinks";


const [email, setEmail] = createSignal("");
const currentYear = new Date().getFullYear();
const successAlert = () => toast("Success! You are now subscribed.");
export default function Footer() {
	const { session } = useAuth();
	const { theme, setTheme } = useDarkMode();
	const toggleDarkMode = () => {
		setTheme(theme() === "dark" ? "light" : "dark");
		console.log(theme());
	};

	const handleSubmit = action(async (e: Event) => {
		e.preventDefault();
		const res = await fetch(import.meta.env.VITE_API_URL + "/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: import.meta.env.VITE_API_USERNAME,
				password: import.meta.env.VITE_API_CLIENT_KEY,
			}),
		});

		const data = await res.json();
		const token = data.token;
		const res2 = await fetch(import.meta.env.VITE_API_URL + "/contacts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ email: email() }),
		});
	});

	return (
		<footer class="bg-transparent" aria-labelledby="footer-heading">
			<div class="mx-auto max-w-full pb-4">
				{session() === null && (
					<div class="border-t px-6 border-gray-900/10 pt-4 dark:border-gray-400/20 lg:flex lg:items-center lg:justify-between">
						<div>
							<h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
								Subscribe to my newsletter
							</h3>
							<p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
								I send out monthly thoughts on no-code, code, and building
								things.
							</p>
						</div>
						<Toaster />
						<form
							class="mt-4 sm:flex sm:max-w-md lg:mt-0"
							onSubmit={handleSubmit}>
							<label for="email-address" class="sr-only">
								Email address
							</label>
							<input
								type="email"
								name="email-address"
								id="email-address"
								value={email()}
								onChange={(e) => setEmail(e.target.value)}
								autocomplete="email"
								required
								class="input-primary"
								placeholder="Enter your email"
							/>
							<div class="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
								<button
									type="submit"
									class="flex w-full items-center justify-start md:justify-center bg-transparent px-1 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
									Subscribe →
								</button>
							</div>
						</form>
					</div>
				)}

				<div class="mt-4 px-6 border-t border-gray-900/10 pt-4 md:flex md:items-center md:justify-between">
					<div class="flex space-x-6 md:order-2">
						<div
							class={`relative inline-block w-10 align-middle select-none transition duration-200 ease-in `}>
							<input
								type="checkbox"
								name="toggle"
								id="toggle"
								class="toggle-checkbox hidden"
								onClick={toggleDarkMode}
							/>
							<label
								for="toggle"
								class="toggle-label block overflow-hidden h-6 rounded-full bg-indigo-100 hover:shadow-sm dark:bg-white/10 cursor-pointer"></label>
							<div
								class={`toggle-inner ${
									theme() === "dark" ? "translate-x-4" : ""
								} absolute left-0 top-0 mt-1 ml-1 w-4 h-4 rounded-full transition-transform duration-200 ease-in bg-yellow-100 dark:bg-indigo-100`}>
								{theme() === "dark" ? (
									<Icon
										path={moon}
										width={15}
										height={15}
										class="text-indigo-600"
									/>
								) : (
									<Icon
										path={sun}
										width={15}
										height={15}
										class="text-yellow-600"
									/>
								)}
							</div>
						</div>
						<SocialLinks />
					</div>
					<p class="mt-4 text-xs leading-5 text-gray-500 dark:text-gray-400 md:order-1 md:mt-0">
						&copy; {currentYear} 💁‍♂️ This site is built from a solid js front end
						and rust 🦀 backend.{" "}
						<a
							href="/work/categories/projects/about-this-site"
							class="text-indigo-400">
							Learn more
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
