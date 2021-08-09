import fs from 'fs'
import { parseISO, format } from 'date-fns'
import { join } from 'path'
import matter from 'gray-matter';
import sha1 from 'js-sha1';
import { Item, MatterResult } from './IItemData';

const itemsDirectory = join(process.cwd(), '_items')
const allTags: string[] = [];

export function getItemsSlugs() {
    return fs.readdirSync(itemsDirectory).filter(file => file.toLowerCase() !== '_.md')
}

export function getItemsBySlug(slug: string): Item {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(itemsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, excerpt, content }: MatterResult = matter(fileContents, { excerpt: true })

    allTags.push(data.tags)

    let contentWithoutExcerpt = content
    if (excerpt) {
        contentWithoutExcerpt = content.replace(excerpt, '').replace('---\n', '')
    }

    if (data.title.length == 0) {
        data.title = realSlug.replace(/-/g, ' ');
    }
    const items = {
        data,
        excerpt,
        content: contentWithoutExcerpt,
        hash: sha1(data.title),
        slug: realSlug.toLowerCase().replace(/[^a-zA-Z0-9-]/g, '')
    }

    // console.log(items)
    return items as Item
}


// TOD remove fields
export function getAllItems(): Item[] {
    const slugs = getItemsSlugs()

    let hashes: string[] = []
    const items: Item[] = slugs
        .map(slug => getItemsBySlug(slug))
        .filter(post => !post.data?.draft || (post.data?.draft && post.content.length == 0 && post.excerpt.length == 0))
        .sort((post1, post2) => (post1.data.title.toLowerCase() > post2.data.title.toLowerCase() ? 1 : -1))


    items.map(item => hashes.push(item.hash))

    // @ts-ignore
    if (hashes.length !== [... new Set(hashes)].length) {
        console.error('Error building terminologies: non unique hash. Most likely duplicate title/term')
    }

    return items
}
