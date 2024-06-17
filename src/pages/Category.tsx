import { useParams, useLocation } from "@solidjs/router";
import { Component, For, Match, Show, Switch, createResource } from "solid-js";
import { chevronLeft } from "solid-heroicons/solid";
import { Icon } from "solid-heroicons";
import PostCard from "../components/PostCard";
import { Post } from "../components/data/Types";
import SkeletonPostCard from "../components/atoms/SkeletonPostCard";
import { Suspense } from "solid-js";


const Category: Component = () => {
	const path = useLocation().pathname;
	console.log(path);

	const params = useParams();

	const fetchPosts = async () => {
		const response = await fetch(
			import.meta.env.VITE_API_URL + "/posts/category/" + params.category
		);
		const data = await response.json();
		console.log(data.posts);
		return data.posts;
	};
	const [posts] = createResource(fetchPosts);const toTitleCase = (str: string) => {
		let words = str.split(' ');
		words[0] = words[0].charAt(0).toUpperCase() + words[0].substring(1).toLowerCase();
		for (let i = 1; i < words.length; i++) {
			words[i] = words[i].toLowerCase();
		}
		return words.join(' ');
	};
	// Render posts
	return (
		<>
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl lg:text-center">
					<h2 class="flex gap-2 lg:justify-center items-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
						<a href={`${path.includes("dashboard") ? "/dashboard/work" : "/work"}`} class="z-20">
							<Icon path={chevronLeft} class=" h-6 w-6" />
						</a>
						<div class="-mt-0.5">🏷️</div>
						{toTitleCase((params.category).replace('-', ' '))}{" "}
					</h2>
					<p class="mt-2 text-lg leading-8 dark:text-gray-300 text-gray-600">
Browse posts with the {params.category} category.
					</p>
				</div>
				<Suspense fallback={<SkeletonPostCard />}>

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
				</Suspense>
			</div>
		</>
	);
};
export default Category;
