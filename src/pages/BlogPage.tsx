import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag, Search } from 'lucide-react';
import { Badge } from '../components/Layout';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

const articles: Article[] = [
  {
    id: 'a1',
    title: 'Complete Guide to Buying Your First Car in Nepal',
    excerpt: 'Everything you need to know before purchasing your first vehicle in Nepal, from budgeting to documentation.',
    content: 'Buying your first car is an exciting milestone...',
    author: 'Rajesh Shrestha',
    date: '2026-01-10',
    readTime: '8 min read',
    category: 'Buying Guide',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    tags: ['First Car', 'Buying Tips', 'Nepal'],
  },
  {
    id: 'a2',
    title: 'Electric Vehicles in Nepal: What You Need to Know',
    excerpt: 'A comprehensive guide to EVs in Nepal, including charging infrastructure, battery health, and total cost of ownership.',
    content: 'Electric vehicles are gaining popularity in Nepal...',
    author: 'Sunil Shakya',
    date: '2026-01-08',
    readTime: '10 min read',
    category: 'Electric Vehicles',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    tags: ['EV', 'Battery', 'Charging', 'Nepal'],
  },
  {
    id: 'a3',
    title: 'Understanding Vehicle Insurance in Nepal',
    excerpt: 'Learn about third-party vs comprehensive insurance, claim processes, and how to get the best coverage.',
    content: 'Vehicle insurance is mandatory in Nepal...',
    author: 'Priya Joshi',
    date: '2026-01-05',
    readTime: '6 min read',
    category: 'Insurance',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    tags: ['Insurance', 'Claims', 'Coverage'],
  },
  {
    id: 'a4',
    title: 'How to Check if a Used Car Has Been in an Accident',
    excerpt: 'Learn the telltale signs of accident damage and how to verify a vehicle\'s history before purchase.',
    content: 'When buying a used car, checking for accident history...',
    author: 'Anil Karki',
    date: '2026-01-03',
    readTime: '7 min read',
    category: 'Inspection',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
    tags: ['Used Car', 'Inspection', 'Accident History'],
  },
  {
    id: 'a5',
    title: 'The Complete Ownership Transfer Process in Nepal',
    excerpt: 'Step-by-step guide to transferring vehicle ownership at the Department of Transport Management.',
    content: 'Transferring vehicle ownership in Nepal requires...',
    author: 'Ramesh Thapa',
    date: '2025-12-28',
    readTime: '9 min read',
    category: 'Legal',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800',
    tags: ['Ownership Transfer', 'Legal', 'Documentation'],
  },
  {
    id: 'a6',
    title: 'Best SUVs Under 50 Lakh in Nepal (2026)',
    excerpt: 'Our top picks for SUVs that offer the best value for money in the Nepali market.',
    content: 'Looking for an SUV under 50 lakh? Here are our recommendations...',
    author: 'Biraj Rajbhandari',
    date: '2025-12-25',
    readTime: '12 min read',
    category: 'Reviews',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    tags: ['SUV', 'Reviews', 'Budget', '2026'],
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = articles.filter(article => {
    if (selectedCategory !== 'all' && article.category !== selectedCategory) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">GadiBazar Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Expert guides, tips, and insights for buying, selling, and maintaining vehicles in Nepal
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <p className="text-gray-500">No articles found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="info">{article.category}</Badge>
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
        <p className="text-blue-100 mb-6">Get the latest vehicle tips and market insights delivered to your inbox</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl text-gray-900 outline-none"
          />
          <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
