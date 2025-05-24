import Link from "next/link";
import { formatDate, getBlogPosts, IMetadata } from "./utils";

function Post({ metadata, slug }: { metadata: IMetadata, slug: string }) {
	return (
		<li className="grid grid-cols-[1fr] items-start pb-1">
			<Link href={`/blog/${slug}`} className="block !no-underline !text-foreground">
				<div className="text-xs">
					<span className="font-bold">{metadata.title}</span> <span className="text-accent">{formatDate(metadata.date)}</span>
				</div>
				<div className="col-span-2">
					{metadata.description}
				</div>
			</Link>
		</li>
	);
}

export default async function Home() {
	const posts = await getBlogPosts();

	return (
		<div className="flex flex-col gap-4">
			<div>
				<p>Sometimes I think, sometimes I write;</p>
				<p>This is my web of thoughts</p>
			</div>

			<ul>
				{posts.map(({ metadata, slug }) => (
					<Post metadata={metadata} key={slug} slug={slug} />
				))}
			</ul>
		</div>
	);
}