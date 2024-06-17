import {socialLinks} from "../../components/data/Lists";
import {Component} from "solid-js";
import { A } from "@solidjs/router";

const SocialLinks: Component = () => {
    return (
        <div class={"flex gap-4"}>
        {
            socialLinks.social.map((item) => (
                <A
                    id={item.name}
                    href={item.href}
                    class="text-gray-400 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:font-bold transition-all ease-in">
                    <span class="sr-only">{item.name}</span>
                    {item.icon({class: "h-6 w-6 transition-all ease-in", 'aria-hidden': "true"})}
                </A>
            ))
        }
        </div>)
};

export default SocialLinks