import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { getAllArticles } from '@/lib/blog-articles';

// Articles de blog pour le carousel - utilisation des vrais articles
const articlesFromLib = getAllArticles();
const blogArticles = articlesFromLib.map((article, index) => ({
  tempId: index,
  title: article.title,
  excerpt: article.excerpt,
  category: article.category,
  date: article.date,
  readTime: article.readTime,
  slug: article.slug
}));

interface BlogCardProps {
  position: number;
  article: typeof blogArticles[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const BlogCard: React.FC<BlogCardProps> = ({
  position,
  article,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 transition-all duration-500 ease-in-out overflow-hidden",
        isCenter
          ? "z-10 bg-gradient-to-br from-digiqo-primary to-digiqo-primary/90 text-white border-digiqo-primary shadow-2xl"
          : "z-0 bg-white text-gray-800 border-gray-200 hover:border-digiqo-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        borderRadius: '20px',
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 20px 40px rgba(139, 20, 49, 0.3)" : "0px 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      {/* Category Badge */}
      <div className={cn(
        "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4",
        isCenter ? "bg-digiqo-accent text-white" : "bg-digiqo-primary/10 text-digiqo-primary"
      )}>
        {article.category}
      </div>

      {/* Title */}
      <h3 className={cn(
        "text-xl font-bold mb-3 line-clamp-2",
        isCenter ? "text-white" : "text-digiqo-primary"
      )}>
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className={cn(
        "text-sm mb-4 line-clamp-3",
        isCenter ? "text-white/90" : "text-gray-600"
      )}>
        {article.excerpt}
      </p>

      {/* Meta Info */}
      <div className={cn(
        "flex items-center gap-4 text-xs mb-6",
        isCenter ? "text-white/80" : "text-gray-500"
      )}>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {article.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {article.readTime}
        </span>
      </div>

      {/* Read More Link */}
      <Link
        href={`/blog/${article.slug}`}
        className={cn(
          "inline-flex items-center gap-2 font-semibold transition-all group absolute bottom-6",
          isCenter
            ? "text-white hover:text-digiqo-accent"
            : "text-digiqo-primary hover:text-digiqo-accent"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        Lire l'article
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export const BlogCarousel: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [articlesList, setArticlesList] = useState(blogArticles);

  const handleMove = (steps: number) => {
    const newList = [...articlesList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setArticlesList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 320 : 280);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleMove(1);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [articlesList]);

  return (
    <div
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white"
      style={{ height: 500 }}
    >
      {articlesList.map((article, index) => {
        const position = articlesList.length % 2
          ? index - (articlesList.length + 1) / 2
          : index - articlesList.length / 2;
        return (
          <BlogCard
            key={article.tempId}
            article={article}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-all",
            "bg-white border-2 border-digiqo-primary text-digiqo-primary",
            "hover:bg-digiqo-primary hover:text-white shadow-lg"
          )}
          aria-label="Article précédent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-all",
            "bg-white border-2 border-digiqo-primary text-digiqo-primary",
            "hover:bg-digiqo-primary hover:text-white shadow-lg"
          )}
          aria-label="Article suivant"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};