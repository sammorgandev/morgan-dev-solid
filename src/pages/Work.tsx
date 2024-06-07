import { Component, For, Match, Show, Switch, createResource } from "solid-js";

export type Post = {
	id: number;
	title: string;
	body: string;
	image?: string;
	tags?: string[];
	category?: string;
	created_at: string;
	company_name?: string;
	company_logo?: string;
	company_description?: string;
	slug: string;
	video?: string;
};

const Work: Component = () => {
	const fetchPosts = async () => {
		const response = await fetch(import.meta.env.VITE_API_URL + "/posts");
		const data = await response.json();
		console.log(data.posts);
		return data.posts;
	};
	const [posts] = createResource(fetchPosts);

	// Render posts
	return (
		<>
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl text-center">
					<h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
						Things I've worked on{" "}
					</h2>
					<p class="mt-2 text-lg leading-8 dark:text-gray-300 text-gray-600">
						Learn how to grow your business with our expert advice.
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
							<For each={posts()}>
								{(post: Post) => (
									<article
										id={post.id.toString()}
										class="flex flex-col items-start justify-between">
										<div class="relative w-full">
											<img
												src={post.image}
												alt=""
												class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
											/>
											<div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
										</div>
										<div class="max-w-xl">
											<div class="mt-8 flex items-center gap-x-4 text-xs">
												<time
													dateTime={post.created_at}
													class="text-gray-500 dark:text-gray-300">
													{new Date(post.created_at).toLocaleDateString(
														"en-US",
														{ year: "numeric", month: "long", day: "numeric" }
													)}
												</time>
												<a
													href={`/categories/${post.category}`}
													class="relative z-10 rounded-full bg-indigo-50/50 dark:bg-indigo-200/30 dark:text-gray-100 px-3 py-1.5 font-medium text-gray-600 dark:hover:bg-indigo-100/50 hover:text-indigo-600 hover:bg-indigo-100">
													{post.category}
												</a>
											</div>
											<div class="group relative">
												<h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100 dark:group-hover:text-gray-50 group-hover:text-gray-600">
													<a href={`/posts/${post.slug}`}>
														<span class="absolute inset-0" />
														{post.title}
													</a>
												</h3>
												<p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
													{post.body}
												</p>
											</div>
										</div>
									</article>
								)}
							</For>
						</div>
					</Match>
				</Switch>
			</div>
		</>
	);
};
export default Work;
