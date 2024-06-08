import { createContext, createEffect, createSignal } from "solid-js";
import { supabase } from "./supabase";
import { AuthSession } from "@supabase/supabase-js";

const [session, setSession] = createSignal<AuthSession | null>(null);

createEffect(() => {
	supabase.auth.getSession().then(({ data: { session } }) => {
		setSession(session);
	});

	supabase.auth.onAuthStateChange((_event, session) => {
		setSession(session);
	});
});

export const SessionContext = createContext({ session, setSession });
