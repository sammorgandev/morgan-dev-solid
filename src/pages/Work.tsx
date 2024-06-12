import { Component, For, Match, Show, Switch, createResource } from "solid-js";
import PostCard from "../components/PostCard";
import { Post } from "../components/data/Types";
import { useLocation } from "@solidjs/router";

const Work: Component = () => {
	const fetchPosts = async () => {
		const response = await fetch(import.meta.env.VITE_API_URL + "/posts");
		const data = await response.json();
		return data.posts.filter((post: Post) => post.category !== "blog posts");
	};
	const [posts] = createResource(fetchPosts);
	const path = useLocation().pathname;
	const page = path.split("/")[1];
	return (
		<>
			<div class={`${page === "dashboard" ? "" : "mx-auto"} max-w-7xl`}>
				<div
					class={`${
						page === "dashboard" ? "text-left" : "mx-auto text-center"
					} max-w-2xl`}>
					<h2
						class={`flex gap-2 ${
							page === "dashboard" ? "justify-start" : "justify-center"
						} text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl`}>
						<div class="-mt-0.5">👨‍💻</div>Things I've worked on{" "}
					</h2>
					<p class="mt-6 text-lg leading-8 dark:text-gray-300 text-gray-600">
						This is a collection of things I've worked on as a developer and
						entrepreneur.{" "}
					</p>
				</div>
				<Show when={posts.loading}>
					<p>Loading...</p>
				</Show>
				<Switch>
					<Match when={posts.error}>
						<p>Error: {posts.error.message}</p>
					</Match>
					<Match when={posts()}>
						<div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
							<For each={posts()}>{(post: Post) => <PostCard {...post} />}</For>
						</div>
					</Match>
				</Switch>
			</div>
		</>
	);
};
export default Work;
