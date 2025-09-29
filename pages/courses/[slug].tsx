import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import CopyButton from "../../components/CopyButton";
import InteractiveButton from "../../components/InteractiveButton";

interface CourseProps {
  content: string;
  slug: string;
}

// Define code component props type
interface CodeComponentProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export default function CoursePage({ content, slug }: CourseProps) {
  // Course navigation data
  const courseList = [
    '01-introduction',
    '02-environment-setup', 
    '03-writing-contract',
    '04-deploy-contract',
    '05-encryption-decryption',
    '06-frontend',
    '07-conclusion'
  ];

  const currentIndex = courseList.indexOf(slug);
  const prevCourse = currentIndex > 0 ? courseList[currentIndex - 1] : null;
  const nextCourse = currentIndex < courseList.length - 1 ? courseList[currentIndex + 1] : null;

  return (
    <Layout 
      title={`Course: ${slug} - FHEVM Tutorials`}
      description={`Learn FHEVM course ${slug}, master privacy computing smart contract development skills`}
    >
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Course Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Course Progress</span>
            <span>{currentIndex + 1} / {courseList.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / courseList.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 lg:p-12">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-strong:text-gray-900 prose-code:text-pink-600 prose-code:bg-pink-50 prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: ({ node, inline, className, children, ...props }: CodeComponentProps) => {
                    const codeContent = String(children).replace(/\n$/, '');
                    
                    if (!inline) {
                      return (
                        <div className="relative my-6 group">
                          <CopyButton text={codeContent} />
                          <pre className="bg-gray-900 text-white p-6 rounded-xl overflow-x-auto border border-gray-700">
                            <code className="text-sm font-mono leading-relaxed">{children}</code>
                          </pre>
                        </div>
                      );
                    }
                    return (
                      <code className="bg-pink-50 text-pink-600 px-2 py-1 rounded-md text-sm font-mono border border-pink-200">
                        {children}
                      </code>
                    );
                  },
                  h1: (props: any) => (
                    <h1 className="text-4xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-primary-500">
                      {props.children}
                    </h1>
                  ),
                  h2: (props: any) => (
                    <h2 className="text-3xl font-semibold text-gray-800 mt-12 mb-6 flex items-center">
                      <span className="w-1 h-8 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full mr-4"></span>
                      {props.children}
                    </h2>
                  ),
                  h3: (props: any) => (
                    <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                      {props.children}
                    </h3>
                  ),
                  blockquote: (props: any) => (
                    <blockquote className="border-l-4 border-primary-500 bg-gradient-to-r from-primary-50 to-transparent p-6 my-6 rounded-r-lg">
                      <div className="flex items-start">
                        <svg className="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>{props.children}</div>
                      </div>
                    </blockquote>
                  ),
                  ul: (props: any) => (
                    <ul className="space-y-2 my-6">{props.children}</ul>
                  ),
                  li: (props: any) => (
                    <li className="flex items-start">
                      <svg className="w-2 h-2 text-primary-500 mt-3 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="4" />
                      </svg>
                      <span>{props.children}</span>
                    </li>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        {/* Course Navigation */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {prevCourse ? (
                <Link href={`/courses/${prevCourse}`}>
                  <InteractiveButton variant="outline" size="md">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </InteractiveButton>
                </Link>
              ) : (
                <div></div>
              )}
            </div>

            <div className="text-center">
              <Link href="/">
                <InteractiveButton variant="ghost" size="sm">
                  Back to Home
                </InteractiveButton>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {nextCourse ? (
                <Link href={`/courses/${nextCourse}`}>
                  <InteractiveButton variant="primary" size="md">
                    Next
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </InteractiveButton>
                </Link>
              ) : (
                <Link href="/">
                  <InteractiveButton variant="primary" size="md">
                    Course Complete 🎉
                  </InteractiveButton>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Course Info Card */}
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Current Course</h3>
              <p className="text-gray-600">{slug}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {Math.round(((currentIndex + 1) / courseList.length) * 100)}%
              </div>
              <div className="text-sm text-gray-500">Progress</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const contentDir = path.join(process.cwd(), "public/content/courses");
  
  // Check if directory exists
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }

  // Try to find file in courses directory
  const filePath = path.join(
    process.cwd(),
    "public/content/courses",
    `${params.slug}.md`
  );

  try {
    // Check if file exists
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