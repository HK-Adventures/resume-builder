import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Resume Builder</h1>
      <div className="space-y-4">
        <Link
          href="/resume/create"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Create New Resume
        </Link>
      </div>
    </div>
  );
}