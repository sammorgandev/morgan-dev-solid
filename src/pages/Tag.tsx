import { useParams, useLocation } from "@solidjs/router";
import { Component, For, Match, Show, Switch, createResource } from "solid-js";
import { chevronLeft } from "solid-heroicons/solid";
import { Icon } from "solid-heroicons";
import PostCard from "../components/PostCard";
import { Post } from "../components/data/Types";
import SkeletonPostCard from "../components/atoms/SkeletonPostCard";
import { Suspense } from "solid-js";


const Tag: Component = () => {
	const path= useLocation().pathname;
	const params = useParams();

	const fetchPosts = async () => {
		const response = await fetch(
			import.meta.env.VITE_API_URL + "/posts/tag/" + params.tag
		);
		const data = await response.json();
		console.log(data.posts);
		return data.posts;
	};
	const [posts] = createResource(fetchPosts);
	const toTitleCase = (str: string) => {
		return str.replace(
			/\w\S*/g,
			(txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
		);
	};
	// Render posts
	// @ts-ignore
	return (
		<>
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl lg:text-center">
					<h2 class="flex gap-2 lg:justify-center items-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
						<a href={path.includes("dashboard") ? "/dashboard/work" : "/work"} class="z-20">
							<Icon path={chevronLeft} class=" h-6 w-6" />
						</a>
						<div class="-mt-0.5">🏷️</div>
						{" "}#{params.tag}{" "}
					</h2>
					<p class="mt-2 text-lg leading-8 dark:text-gray-300 text-gray-600">
						Browse posts with the #{params.tag} tag.
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
export default Tag;
