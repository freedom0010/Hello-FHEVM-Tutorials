import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

// 定义所有接口
interface CourseProps {
  content: string;
  slug: string;
}

interface CopyButtonProps {
  text: string;
}

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

interface CodeComponentProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

interface HeadingProps {
  children?: React.ReactNode;
}

interface BlockquoteProps {
  children?: React.ReactNode;
}

// CopyButton 组件
const CopyButton = React.memo<CopyButtonProps>(({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors z-10"
      aria-label="Copy code"
      type="button"
    >
      {copied ? '已复制!' : '复制'}
    </button>
  );
});

CopyButton.displayName = 'CopyButton';

// Layout 组件
const Layout = React.memo<LayoutProps>(({ children, title = 'FHEVM Tutorials' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                FHEVM Tutorials
              </Link>
              <div className="flex space-x-4">
                <Link 
                  href="/courses/01-introduction" 
                  className="text-gray-600 hover:text-gray-900"
                >
                  开始学习
                </Link>
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-gray-900"
                >
                  首页
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        <footer className="bg-gray-100 mt-16">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-600">
            <p>&copy; 2024 FHEVM Tutorials. 学习隐私计算的最佳选择。</p>
          </div>
        </footer>
      </div>
    </>
  );
});

Layout.displayName = 'Layout';

// 主组件
const CoursePage: React.FC<CourseProps> = ({ content, slug }) => {
  // Markdown 组件定义
  const markdownComponents = React.useMemo(() => ({
    code: ({ node, inline, className, children, ...props }: CodeComponentProps) => {
      const codeContent = React.useMemo(() => {
        return String(children).replace(/\n$/, '');
      }, [children]);
      
      if (!inline) {
        return (
          <div className="relative my-4">
            <CopyButton text={codeContent} />
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{children}</code>
            </pre>
          </div>
        );
      }
      return (
        <code className="bg-pink-50 text-pink-600 px-1 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    },
    h1: ({ children }: HeadingProps) => (
      <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }: HeadingProps) => (
      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: HeadingProps) => (
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: BlockquoteProps) => (
      <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 p-4 my-4 italic">
        {children}
      </blockquote>
    ),
  }), []);

  return (
    <Layout title={`课程: ${slug} - FHEVM Tutorials`}>
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-indigo-600 prose-strong:text-gray-900 prose-code:text-pink-600 prose-code:bg-pink-50">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {content}
          </ReactMarkdown>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between">
          <Link 
            href="/"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            ← 返回首页
          </Link>
          <div className="text-sm text-gray-500">
            课程: {slug}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoursePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const contentDir = path.join(process.cwd(), "public/content/FHEVM-Solidity/beginner");
  
  if (!fs.existsSync(contentDir)) {
    console.warn(`Directory not found: ${contentDir}`);
    return { paths: [], fallback: false };
  }

  try {
    const files = fs.readdirSync(contentDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    const paths = markdownFiles.map((file) => ({
      params: { slug: file.replace(/\.md$/, "") },
    }));

    console.log('Generated paths for courses:', paths);
    return { paths, fallback: false };
  } catch (error) {
    console.error('Error reading directory:', error);
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }

  const filePath = path.join(
    process.cwd(),
    "public/content/FHEVM-Solidity/beginner",
    `${params.slug}.md`
  );

  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return { notFound: true };
    }

    const content = fs.readFileSync(filePath, "utf-8");
    
    return { 
      props: { 
        content,
        slug: params.slug as string
      } 
    };
  } catch (error) {
    console.error('Error reading file:', error);
    return { notFound: true };
  }
};