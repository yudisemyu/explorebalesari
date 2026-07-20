import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  imageUrl?: string | null;
  publishedAt?: string | null;
  author?: string;
  className?: string;
}

export function NewsCard({
  title,
  slug,
  excerpt,
  imageUrl,
  publishedAt,
  author,
  className,
}: NewsCardProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <Link
      href={`/berita/${slug}`}
      className={cn(
        "group block overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all hover:shadow-lg hover:border-primary/20 hover:-translate-y-1",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <Newspaper className="h-10 w-10 text-primary/20" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          {formattedDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
          )}
          {author && (
            <span>oleh {author}</span>
          )}
        </div>

        <h3 className="text-base font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {excerpt && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
        )}

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 translate-x-[-4px] transition-all group-hover:opacity-100 group-hover:translate-x-0">
          Baca selengkapnya
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
