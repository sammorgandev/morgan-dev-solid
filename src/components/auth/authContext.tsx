import {
	createContext,
	useContext,
	createSignal,
	onCleanup,
	JSX,
	Component,
} from "solid-js";
import { supabase } from "./supabase";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
	session: () => Session | null;
	user: () => User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: Component<{ children: JSX.Element }> = (props) => {
	const [session, setSession] = createSignal<Session | null>(null);
	const [user, setUser] = createSignal<User | null>(null);
	supabase.auth.getSession().then(({ data }) => {
		console.log(data);
		setSession(data.session);
	});

	supabase.auth.getUser().then(({ data }) => {
		console.log(data);
		setUser(data.user);
	});

	const { data: authListener } = supabase.auth.onAuthStateChange(
		(_event, newSession) => {
			setSession(newSession);
			supabase.auth.getUser().then(({ data }) => {
				setUser(data.user);
			});
		}
	);

	onCleanup(() => {
		authListener.subscription.unsubscribe();
	});

	return (
		<AuthContext.Provider value={{ session, user }}>
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
