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
