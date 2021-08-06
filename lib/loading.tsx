import fs from 'fs'
import { parseISO, format } from 'date-fns'
import { join } from 'path'
import matter from 'gray-matter';
import sha1 from 'js-sha1';
import { Item, ItemData } from '../pages/index';

const itemsDirectory = join(process.cwd(), '_items')
const allTags: string[] = [];

export function getItemsSlugs() {
    return fs.readdirSync(itemsDirectory).filter(file => file.toLowerCase() !== '_.md')
}

// TODO remove?
function date_to_month_year(dateString: string): [string, string] | undefined {
    const date = parseISO(dateString)
    try {
        let month = format(date, 'LLLL')
        let year = format(date, 'yyyy')
        return [month, year]
    } catch (e) {
        console.error("Cannot parse date `e`", e)
    }
}

export interface MatterResult {
    data: ({ [key: string]: any } | ItemData)
    content: string
    excerpt?: string
}

export function getItemsBySlug(slug: string, fields: (string[] | []) = []): Item {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(itemsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, excerpt, content }: MatterResult = matter(fileContents, { excerpt: true })

    allTags.push(data.tags)

    let contentWithoutExcerpt = ''
    if (excerpt) {
        contentWithoutExcerpt = content.replace(excerpt, '').replace('---\n', '')
    }

    const items = { data, excerpt, content: contentWithoutExcerpt, hash: '' }
    if (items.data.title.length == 0) {
        items.data.title = realSlug.replace(/-/g, ' ');
    }
    items.hash = sha1(data.title)

    return items as Item
}


// TODO remove fields
export function getAllItems(fields: (string[] | []) = []): Item[] {
    const slugs = getItemsSlugs()

    let hashes: string[] = []
    const items: Item[] = slugs
        .map(slug => getItemsBySlug(slug, fields))
        .sort((post1, post2) => (post1.data.title.toLowerCase() > post2.data.title.toLowerCase() ? 1 : -1))


    items.map(item => hashes.push(item.hash))

    // @ts-ignore
    if (hashes.length !== [... new Set(hashes)].length) {
        console.error('Error building terminologies: non unique hash. Most likely duplicate title/term')
    }

    return items
}
