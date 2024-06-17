import { Component, createResource } from "solid-js";
import { useParams, useLocation } from "@solidjs/router";
import { chevronLeft } from "solid-heroicons/solid";
import { Icon } from "solid-heroicons";
import { Post as PostType } from "../components/data/Types";
import {YoutubePlayer} from "../components/atoms/YoutubePlayer";

const Post: Component = () => {
	const params = useParams();
	const slug = params.slug;
	const location = useLocation();
	const path = location.pathname;
	const backPath = path.split("/").slice(0, -1).join("/");
	const backDisplay = backPath.split("/").slice(1).join("/").split("/")[0];
	const backDisplay2 = backPath.split("/").slice(1).join("/").split("/")[1];
	console.log("Backpath:", backPath);
	console.log("Backpath length:", backPath.split("/").length);

	const fetchPost = async () => {
		const response = await fetch(
			import.meta.env.VITE_API_URL + "/posts/" + slug
		);
		const data = await response.json();
		console.log(data);
		return data as PostType;
	};
	const [post] = createResource(fetchPost);
	console.log(post());
	return (
		<div class="bg-transparent">
			<div class="mx-auto max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300">
				<a
					href={`${backPath}`}
					class="text-base flex items-center font-semibold leading-7 text-indigo-600 z-20 dark:text-indigo-400">
					<Icon path={chevronLeft} class="w-4 h-4"/>
					{backPath.split("/").length > 2
						? backDisplay2.replace("-", " ").toUpperCase()
						: backDisplay.replace("-", " ").toUpperCase()}
				</a>
				<h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
					{post()?.title}
				</h1>
				<p class="mt-6 text-xl leading-8 dark:text-gray-200">{post()?.body}</p>

				<figure class="mt-8">
					{post()?.video ? (<YoutubePlayer videoId={post()?.video} />) : (<img
						class="aspect-video rounded-xl bg-gray-50 dark:bg-gray-700 object-cover"
						src={post()?.image}
						alt=""></img>)}
					<figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500 dark:text-gray-300">
						<svg
							class="mt-0.5 h-5 w-5 flex-none text-gray-300 dark:text-gray-500"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
								clip-rule="evenodd"
							/>
						</svg>
						Faucibus commodo massa rhoncus, volutpat.
					</figcaption>
				</figure>
				<div class="mt-10 max-w-2xl">
					<p class="text-gray-600 dark:text-gray-400">
						{post()?.body_2}
					</p>


					{post()?.list_1_title || post()?.list_2_title || post()?.list_3_title && (<ul
						role="list"
						class="mt-8 max-w-xl space-y-8 text-gray-600 dark:text-gray-400">
						<li class="flex gap-x-3">
							<svg
								class="mt-1 h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>
								<strong class="font-semibold text-gray-900 dark:text-gray-100">
									{post()?.list_1_title}
								</strong>{" "}
								{post()?.list_1_description}
							</span>
						</li>
						<li class="flex gap-x-3">
							<svg
								class="mt-1 h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>
								<strong class="font-semibold text-gray-900 dark:text-gray-100">
									{post()?.list_2_title}
								</strong>{" "}
								{post()?.list_2_description}
							</span>
						</li>
						<li class="flex gap-x-3">
							<svg
								class="mt-1 h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>
								<strong class="font-semibold text-gray-900 dark:text-gray-100">
									{post()?.list_3_title}
								</strong>{" "}
								{post()?.list_3_description}
							</span>
						</li>
					</ul>)}
					<p class="mt-8 text-gray-600 dark:text-gray-400">
						{post()?.body_3}
					</p>
					<h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
						{post()?.title_2}
					</h2>
					<p class="mt-6 text-gray-600 dark:text-gray-400">
						{post()?.body_4}
					</p>
					{post()?.quote_text && (<figure class="mt-10 border-l border-indigo-600 dark:border-indigo-400 pl-9">
						<blockquote class="font-semibold text-gray-900 dark:text-gray-100">
							<p>
								{post()?.quote_text}
							</p>
						</blockquote>
						<figcaption class="mt-6 flex gap-x-4">
							<img
								class="h-6 w-6 flex-none rounded-full bg-gray-50 dark:bg-gray-700"
								src={post()?.quote_author_image}
								alt=""></img>
							<div class="text-sm leading-6 text-gray-900 dark:text-gray-100">
								<strong class="font-semibold">{post()?.quote_author_name}</strong> – {post()?.quote_author_title}{" "}
							</div>
						</figcaption>
					</figure>)}
					<p class="mt-10 text-gray-600 dark:text-gray-400">
						{post()?.body_5}
					</p>
				</div>

				<div class="mt-16 max-w-2xl">
					<h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
						{post()?.title_3}					</h2>
					<p class="mt-6 text-gray-600 dark:text-gray-400">
						{post()?.body_6}
					</p>

				</div>
			</div>
		</div>
	);
};

export default Post;
