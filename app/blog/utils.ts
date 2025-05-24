import { readdir, readFile } from "node:fs/promises";
import { resolve, extname, basename } from "node:path";

const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---/;
const POSTS_DIRECTORY = resolve(process.cwd(), "posts");

export interface IMetadata {
    date: string;
    title: string;
    description: string;
}

function parseFrontMatter(file: string): {
    content: string;
    metadata: IMetadata;
} {
    const match = file.match(FRONTMATTER_REGEX);
    if (!match) throw new Error("No frontmatter found");

    const frontmatter = match[1];
    const content = file.replace(FRONTMATTER_REGEX, "").trim();

    const metadata: IMetadata = frontmatter.split("\n").reduce((acc, line) => {
        const [key, value] = line.split(":");
        acc[key.trim() as keyof IMetadata] = value.trim();
        return acc;
    }, {} as IMetadata);

    return { content, metadata };
}


const getMDXData = async (directory: string) =>
    Promise.all(
        (await readdir(directory))
            .filter((file) => extname(file) === ".mdx")
            .map(async (file) => ({
                slug: basename(file, extname(file)),
                ...parseFrontMatter(await readFile(resolve(directory, file), "utf-8")),
            }))
    );

export const formatDate = (date: string) => new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
export const getBlogPosts = () => getMDXData(POSTS_DIRECTORY);
