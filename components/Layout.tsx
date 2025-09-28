import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4">
        <nav className="container mx-auto flex justify-between items-center px-6">
          <Link href="/" className="text-xl font-bold">
            Hello FHEVM Tutorials
          </Link>
          <div className="space-x-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/courses/01-introduction" className="hover:underline">
              Courses
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-6 py-8">{children}</main>
      <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Hello FHEVM Tutorials
      </footer>
    </div>
  );
}
