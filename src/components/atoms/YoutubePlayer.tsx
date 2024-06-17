

    export function YoutubePlayer({videoId}: {videoId ? : string}) {


    return (
        <div class={`aspect-w-16 aspect-h-9 rounded-xl bg-gray-50 dark:bg-gray-700`}>
        <iframe width="100%" height="400" src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
    )
    }