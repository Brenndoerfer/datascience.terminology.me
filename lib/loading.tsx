import fs from 'fs'
import { parseISO, format } from 'date-fns'
import { join } from 'path'
import matter from 'gray-matter';

import sha1 from 'js-sha1';

import markdownToHtml from './mdToHtml'

const itemsDirectory = join(process.cwd(), '_items')
const allTags: string[] = [];

export function getItemsSlugs() {
    return fs.readdirSync(itemsDirectory).filter(file => file.toLowerCase() !== '_.md')
}

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

export function getItemsBySlug(slug: string, fields: (string[] | []) = []) {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(itemsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, excerpt, content } = matter(fileContents, { excerpt: true })

    allTags.push(data.tags)

    const contentWithoutExcerpt = content.replace(excerpt, '').replace('---\n', '')


    const items = { data, excerpt, content: contentWithoutExcerpt }
    if (items.data.title.length == 0) {
        items.data.title = realSlug.replace(/-/g, ' ');
    }
    items.hash = sha1(data.title)

    // console.log(matter(fileContents, { excerpt: true }))
    // items['excerptHtml'] = markdownToHtml(items.content)
    // console.log(data.tags)

    return items
}

export function getAllItems(fields: (string[] | []) = []) {
    const slugs = getItemsSlugs()

    let hashes = []
    const items = slugs
        .map(slug => getItemsBySlug(slug, fields))
        .sort((post1, post2) => (post1.data.title.toLowerCase() > post2.data.title.toLowerCase() ? 1 : -1))


    // detect duplicate entries/ same titles
    items.map(item => hashes.push(item.hash))
    if (hashes.length !== [... new Set(hashes)].length) {
        console.error('Error building terminologies: non unique hash. Most likely duplicate title/term')
        return 0
    }
    // items['allTags'] = allTags.flat();

    return items
}
