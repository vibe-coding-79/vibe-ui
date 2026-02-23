import React, { useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { usePost } from '@/features/Blog/hooks/usePosts';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import csharp from 'highlight.js/lib/languages/csharp';
import php from 'highlight.js/lib/languages/php';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import sql from 'highlight.js/lib/languages/sql';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import ruby from 'highlight.js/lib/languages/ruby';
import rust from 'highlight.js/lib/languages/rust';
import yaml from 'highlight.js/lib/languages/yaml';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import 'highlight.js/styles/github-dark.min.css';

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('go', go);
hljs.registerLanguage('java', java);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('php', php);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('dockerfile', dockerfile);

// Language display names mapping
const languageNames: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    go: 'Go',
    java: 'Java',
    csharp: 'C#',
    php: 'PHP',
    html: 'HTML',
    xml: 'XML',
    css: 'CSS',
    sql: 'SQL',
    bash: 'Bash',
    json: 'JSON',
    ruby: 'Ruby',
    rust: 'Rust',
    yaml: 'YAML',
    dockerfile: 'Dockerfile',
    plaintext: 'Plain Text'
};

// Prettier supported languages (lazy-loaded)
const prettierSupportedLanguages: Record<string, string> = {
    javascript: 'babel',
    typescript: 'typescript',
    json: 'json',
    html: 'html',
    css: 'css',
    yaml: 'yaml',
};

// Load Prettier and plugins on demand
const loadPrettierForLanguage = async (language: string) => {
    const parser = prettierSupportedLanguages[language];
    if (!parser) return null;

    const [prettier, estree] = await Promise.all([
        import('prettier/standalone'),
        import('prettier/plugins/estree'),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let plugins: any[] = [estree.default];

    switch (parser) {
        case 'babel':
        case 'json': {
            const babel = await import('prettier/plugins/babel');
            plugins = [babel.default, estree.default];
            break;
        }
        case 'typescript': {
            const ts = await import('prettier/plugins/typescript');
            plugins = [ts.default, estree.default];
            break;
        }
        case 'html': {
            const html = await import('prettier/plugins/html');
            plugins = [html.default];
            break;
        }
        case 'css': {
            const css = await import('prettier/plugins/postcss');
            plugins = [css.default];
            break;
        }
        case 'yaml': {
            const yaml = await import('prettier/plugins/yaml');
            plugins = [yaml.default];
            break;
        }
    }

    return { prettier: prettier.default, parser, plugins };
};

// Sanitize HTML to prevent XSS attacks
const sanitizeHtml = (html: string): string => {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'strong', 'em', 'b', 'i', 'u', 's',
            'a', 'ul', 'ol', 'li',
            'pre', 'code', 'br', 'hr',
            'blockquote', 'img',
            'table', 'thead', 'tbody', 'tr', 'th', 'td',
            'figure', 'figcaption', 'span', 'div'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'src', 'alt', 'width', 'height', 'style'],
    });
};

const PostDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: postData, isLoading, error } = usePost(slug || '');
    const contentRef = useRef<HTMLDivElement>(null);

    const post = postData?.data;

    // Copy code to clipboard
    const handleCopyCode = useCallback(async (code: string, button: HTMLButtonElement) => {
        try {
            await navigator.clipboard.writeText(code);
            button.textContent = 'Copied!';
            button.classList.add('copied');
            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('copied');
            }, 2000);
        } catch {
            button.textContent = 'Failed';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        }
    }, []);

    // Format code using Prettier (lazy-loaded)
    const handleFormatCode = useCallback(async (
        codeElement: HTMLElement,
        language: string,
        button: HTMLButtonElement
    ) => {
        if (!prettierSupportedLanguages[language]) {
            button.textContent = 'N/A';
            button.classList.add('unsupported');
            setTimeout(() => {
                button.textContent = 'Format';
                button.classList.remove('unsupported');
            }, 1500);
            return;
        }

        const originalCode = codeElement.textContent || '';
        button.textContent = 'Loading...';
        button.disabled = true;

        try {
            const prettierModule = await loadPrettierForLanguage(language);
            if (!prettierModule) {
                throw new Error('Failed to load Prettier');
            }

            button.textContent = 'Formatting...';

            const formatted = await prettierModule.prettier.format(originalCode, {
                parser: prettierModule.parser,
                plugins: prettierModule.plugins,
                tabWidth: 2,
                semi: true,
                singleQuote: true,
            });

            // Update the code element with formatted code
            codeElement.textContent = formatted.trim();
            // Re-apply syntax highlighting
            hljs.highlightElement(codeElement);

            button.textContent = 'Formatted!';
            button.classList.add('formatted');
            setTimeout(() => {
                button.textContent = 'Format';
                button.classList.remove('formatted');
            }, 2000);
        } catch {
            button.textContent = 'Error';
            setTimeout(() => {
                button.textContent = 'Format';
            }, 2000);
        } finally {
            button.disabled = false;
        }
    }, []);

    // Apply syntax highlighting and add UI elements to code blocks
    useEffect(() => {
        if (!contentRef.current) return;

        contentRef.current.querySelectorAll('pre').forEach((pre) => {
            // Skip if already processed
            if (pre.classList.contains('code-block-processed')) return;
            pre.classList.add('code-block-processed');

            const code = pre.querySelector('code');
            if (!code) return;

            // Get language from class
            const classMatch = code.className.match(/language-(\w+)/);
            const language = classMatch ? classMatch[1] : 'plaintext';
            const displayName = languageNames[language] || language;

            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';

            // Create header with language label and copy button
            const header = document.createElement('div');
            header.className = 'code-block-header';

            const langLabel = document.createElement('span');
            langLabel.className = 'code-block-language';
            langLabel.textContent = displayName;

            // Create button container
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'code-block-buttons';

            // Format button
            const formatButton = document.createElement('button');
            formatButton.className = 'code-block-format';
            formatButton.textContent = 'Format';
            formatButton.type = 'button';
            // Show format button only for supported languages
            if (!prettierSupportedLanguages[language]) {
                formatButton.classList.add('hidden');
            }

            // Copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'code-block-copy';
            copyButton.textContent = 'Copy';
            copyButton.type = 'button';

            buttonContainer.appendChild(formatButton);
            buttonContainer.appendChild(copyButton);

            header.appendChild(langLabel);
            header.appendChild(buttonContainer);

            // Wrap the pre element
            pre.parentNode?.insertBefore(wrapper, pre);
            wrapper.appendChild(header);
            wrapper.appendChild(pre);

            // Add format event listener
            formatButton.addEventListener('click', () => {
                handleFormatCode(code, language, formatButton);
            });

            // Add copy event listener
            copyButton.addEventListener('click', () => {
                handleCopyCode(code.textContent || '', copyButton);
            });

            // Apply syntax highlighting
            hljs.highlightElement(code);
        });
    }, [post?.content, handleCopyCode, handleFormatCode]);

    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </MainLayout>
        );
    }

    if (error || !post) {
        return (
            <MainLayout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Post not found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">The article you are looking for does not exist or has been removed.</p>
                </div>
            </MainLayout>
        );
    }

    const {
        title,
        content,
        thumbnail,
        created_at,
        ai_metadata
    } = post;

    const author = ai_metadata?.author || post.author || 'Unknown Author';
    const tags = ai_metadata?.tags || post.tags || [];
    const publishDate = ai_metadata?.publishDate || created_at;
    const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const isHtml = (text: string) => /<\/?[a-z][\s\S]*>/i.test(text);

    return (
        <MainLayout>
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Article Content (Left Column) */}
                <article className="flex-1 min-w-0 max-w-4xl mx-auto lg:mx-0">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-[#4c739a] dark:text-gray-400 mb-6">
                        <a className="hover:text-primary transition-colors" href="/">Home</a>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                        <a className="hover:text-primary transition-colors" href="#">Blog</a>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                        <span className="font-medium text-[#0d141b] dark:text-gray-200 truncate max-w-[200px]">{title}</span>
                    </nav>

                    {/* Header */}
                    <header className="mb-8">
                        <h1 className="mb-4 text-3xl font-black tracking-tight text-[#0d141b] dark:text-white sm:text-4xl lg:text-5xl leading-tight">
                            {title}
                        </h1>
                        {/* Summary/Excerpt if available, else first paragraph logic could go here */}

                        {/* Meta Data */}
                        <div className="flex items-center gap-4 border-y border-[#e7edf3] dark:border-gray-800 py-4">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                                {author.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col text-sm">
                                <span className="font-bold text-[#0d141b] dark:text-white">{author}</span>
                                <span className="text-[#4c739a] dark:text-gray-400">Author</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-4 ml-auto text-sm text-[#4c739a] dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_month</span>
                                    {formattedDate}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
                                    {Math.ceil(content.length / 1000)} min read
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* Hero Image - Placeholder or from metadata */}
                    {thumbnail && (
                        <div className="mb-10 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 aspect-video relative group">
                            <img
                                alt={title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                src={`/${thumbnail}`}
                            />
                        </div>
                    )}

                    {/* Article Body */}
                    <div ref={contentRef} className="prose prose-lg prose-slate dark:prose-invert max-w-none text-[#0d141b] dark:text-gray-200 leading-8">
                        {isHtml(content) ? (
                            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
                        ) : (
                            <p className="whitespace-pre-wrap">{content}</p>
                        )}
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="mt-10 flex flex-wrap gap-2">
                            {tags.map((tag: string, index: number) => (
                                <a key={index} className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors" href="#">
                                    #{tag}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Divider */}
                    <div className="my-12 h-px w-full bg-[#e7edf3] dark:bg-gray-800"></div>

                    {/* Comments Section - Placeholder for now */}
                    <section className="mt-12">
                        <h3 className="text-2xl font-bold text-[#0d141b] dark:text-white mb-6">Discussion</h3>
                        <p className="text-gray-500 italic">Comments are closed for this post.</p>
                    </section>
                </article>

                {/* Sidebar (Right Column) */}
                <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
                    {/* Sticky Wrapper */}
                    <div className="sticky top-24 space-y-8">
                        {/* Social Share */}
                        <div className="rounded-xl border border-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2632] p-6 shadow-sm">
                            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">Share this post</h4>
                            <div className="flex gap-3">
                                {/* Social Buttons Placeholder */}
                                <button className="flex flex-1 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                                    Copy Link
                                </button>
                            </div>
                        </div>

                        {/* More Content Placeholder */}
                        <div className="rounded-xl border border-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2632] p-6 shadow-sm">
                            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">Trending Topics</h4>
                            <div className="flex flex-wrap gap-2">
                                <a className="rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" href="#">Technology</a>
                                <a className="rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" href="#">Design</a>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </MainLayout>
    );
};

export default PostDetailPage;
