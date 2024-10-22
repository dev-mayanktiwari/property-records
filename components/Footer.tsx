import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PropertyRecords. All rights reserved.
          </p>
          <Link
            href="/contact"
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors mt-2 sm:mt-0"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
