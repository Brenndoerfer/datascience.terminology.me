
export interface ItemData {
    title: string;
    tags: string[];
    abrv: string;
    draft?: boolean;
}

export interface Item {
    data: ItemData;
    excerpt: string;
    content: string;
    hash: string;
    slug: string;
}

export interface MatterResult {
    data: ({ [key: string]: any; } | ItemData);
    content: string;
    excerpt?: string;
}
