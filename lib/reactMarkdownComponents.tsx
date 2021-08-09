import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image'

const flatten = (text: string, child) => {
    return typeof child === 'string'
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text);
};

/**
 * HeadingRenderer is a custom renderer
 * It parses the heading and attaches an id to it to be used as an anchor
 */
export const HeadingRenderer = props => {
    const children = React.Children.toArray(props.children);
    const text = children.reduce(flatten, '');
    const slug = text.toLowerCase().replace(/\W/g, '-');
    return React.createElement('h' + props.level, { id: slug }, props.children);
};

export const ImageRenderer = image => {
    return (
        <div className="w-100 md:w-1/2 mx-auto my-4 md:my-6">
            <Image src={image.src} alt={image.alt} layout="responsive" width="400" height="200" loading="lazy" placeholder="blur" blurDataURL={image.src} decoding="async" quality="75" />
        </div>
    )
}

export const CodeRenderer = ({ node, inline, className, children, ...props }) => {

    const match = /language-(\w+)/.exec(className || '')
    if (!inline && match) {
        return (
            <SyntaxHighlighter style={vs} customStyle={{ fontSize: '1em' }} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
        )
    } else {
        return (
            <code className={className} {...props} >{String(children)}</code>
        )
    }
}

export const ArticleReactMarkdownComponents = {
    code: CodeRenderer,
    img: ImageRenderer,
    h2: HeadingRenderer,
    h3: HeadingRenderer,
    h4: HeadingRenderer,
    h5: HeadingRenderer,
    h6: HeadingRenderer,
};
