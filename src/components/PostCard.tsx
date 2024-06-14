import { Post } from "./data/Types";
import { useLocation } from "@solidjs/router";

export default function PostCard(post: Post) {
	const path = useLocation().pathname;
	console.log(path);
	return (
		<article
			id={post.id.toString()}
			class="flex flex-col items-start justify-between">
			<div class="relative w-full ">
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
						{new Date(post.created_at).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
					{path === "/work" ? (
						<a
							href={`/category/${post.category}`}
							class="relative z-10 rounded-full bg-indigo-50/50 dark:bg-indigo-200/30 dark:text-gray-100 px-3 py-1.5 font-medium text-gray-600 dark:hover:bg-indigo-100/50 hover:text-indigo-600 hover:bg-indigo-100">
							{post.category}
						</a>
					) : (
						<div class="relative z-10 rounded-full bg-indigo-50/50 dark:bg-indigo-200/30 dark:text-gray-100 px-3 py-1.5 font-medium text-gray-600">
							{" "}
							{post.category}{" "}
						</div>
					)}
				</div>
				<div class="flex mt-2 text-sm text-gray-600 dark:text-gray-300 gap-2">
					{post.tags?.map((tag) => (
						<div class="flex hover:text-indigo-600 hover:cursor-pointer">
							#{tag}{" "}
						</div>
					))}
				</div>
				<div class="group relative">
					<h3 class="mt-3 text-lg font-semibold overflow-clip max-h-6 leading-6  text-gray-900 dark:text-gray-100 dark:group-hover:text-gray-50 group-hover:text-gray-600">
						<a href={`${path}/${post.slug}`}>
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
	);
}
