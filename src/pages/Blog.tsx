import { Component, For, Match, Show, Switch, createResource } from "solid-js";
import PostCard from "../components/PostCard";
import { Post } from "../components/data/Types";

const Blog: Component = () => {
	const fetchPosts = async () => {
		const response = await fetch(
			import.meta.env.VITE_API_URL + "/posts/category/blog-posts"
		);
		const data = await response.json();
		console.log(data.posts);
		return data.posts;
	};
	const [posts] = createResource(fetchPosts);

	// Render posts
	return (
		<>
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<div class=" mx-auto max-w-2xl text-center">
					<h2 class="flex justify-center gap-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
						<div class="-mt-0.5">📃</div>Blog{" "}
					</h2>
					<p class="mt-2 text-lg leading-8 dark:text-gray-300 text-gray-600">
						I write things from time to time about building products and working
						in tech.{" "}
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
export default Blog;
