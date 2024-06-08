import { Icon } from "solid-heroicons";
import { codeBracketSquare } from "solid-heroicons/solid";

export default function Logo() {
	return (
		<div class="flex text-indigo-600 gap-1 items-center text-xl font-bold">
			<Icon path={codeBracketSquare} class="w-10 h-10" /> <h2>morgan/dev</h2>
		</div>
	);
}
