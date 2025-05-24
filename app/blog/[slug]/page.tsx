import { notFound } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc'
import { formatDate, getBlogPosts } from "../utils"
import { MDXComponents } from "mdx/types";

interface IParams {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: IParams) {
    const slug = (await params).slug;
    const metadata = (await getBlogPosts()).find(({ slug: post }) => post === slug);

    return {
        title: metadata?.metadata.title,
        description: metadata?.metadata.description,
        openGraph: {
            type: "article",
            article: {
                publishedTime: (metadata?.metadata.date),
                authors: ["Faye Keller"],
                section: "Blog",
                tags: ["Faye Keller", "Faye", "Keller", "Enchantress", "Digital Ecosystems", "Computers", "Software", "Programming", "Web Development", "Frontend", "Backend", "DevOps", "Open Source", "Notaio", "CodeFairy"],
            },
        },
    };
}

const components: MDXComponents = {
    a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />,
}

export default async function Page({
    params,
}: IParams) {
    const slug = (await params).slug;
    const post = (await getBlogPosts()).find(({ slug: post }) => post === slug);
    if (!post) return notFound();

    return (<section className="pb-10">
        <article className="prose">
            <MDXRemote source={post.content} components={components} />
        </article>
    </section>);
}


export const dynamicParams = false;
