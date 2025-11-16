import Link from "next/link";
import { formatDate, getBlogPosts, IMetadata } from "./utils";

function Post({ metadata, slug }: { metadata: IMetadata; slug: string }) {
  return (
    <li>
      <Link href={`/blog/${slug}`} className="!not-italic !text-foreground">
        <span>{metadata.title}</span>{" "}
        <span className="text-accent">{formatDate(metadata.date)}</span>
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
