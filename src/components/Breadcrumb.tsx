import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-blue-600 flex items-center gap-1" aria-label="Home">
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
          {item.href ? (
            <Link to={item.href} className="hover:text-blue-600">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
