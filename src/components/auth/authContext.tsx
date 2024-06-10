import {
	createContext,
	useContext,
	createSignal,
	onCleanup,
	JSX,
	Component,
} from "solid-js";
import { supabase } from "./supabase";
import { Session } from "@supabase/supabase-js";

type AuthContextType = {
	session: () => Session | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: Component<{ children: JSX.Element }> = (props) => {
	const [session, setSession] = createSignal<Session | null>(null);

	supabase.auth.getSession().then(({ data }) => {
		console.log(data);
		setSession(data.session);
	});

	const { data: authListener } = supabase.auth.onAuthStateChange(
		(_event, newSession) => {
			setSession(newSession);
		}
	);

	onCleanup(() => {
		authListener.subscription.unsubscribe();
	});

	return (
		<AuthContext.Provider value={{ session }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
