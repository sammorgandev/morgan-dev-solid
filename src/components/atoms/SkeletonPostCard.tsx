import { Component } from "solid-js";

const SkeletonPostCard: Component = () => {
    return (
        <div class="mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 w-full">
            {Array(3)
                .fill(0)
                .map((_, i) => (
                    <div id={i.toString()} class="p-4 w-full">
                        <div class="h-full border-2 border-gray-200 rounded-lg w-96 overflow-hidden">
                            <div class="w-full h-64 bg-gray-200 animate-pulse"></div>
                            <div class="p-6 w-full">
                                <h2 class="w-3/4 h-4 bg-gray-200 animate-pulse"></h2>
                                <p class="mt-2 w-full h-3 bg-gray-200 animate-pulse"></p>
                                <p class="mt-2 w-2/3 h-3 bg-gray-200 animate-pulse"></p>
                                <p class="mt-2 w-1/2 h-3 bg-gray-200 animate-pulse"></p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default SkeletonPostCard;