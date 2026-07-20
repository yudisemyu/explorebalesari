import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface TourismCardProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  imageUrl?: string | null;
  location?: string | null;
  className?: string;
}

export function TourismCard({
  title,
  slug,
  excerpt,
  imageUrl,
  location,
  className,
}: TourismCardProps) {
  return (
    <Link
      href={`/wisata/${slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl bg-card shadow-sm transition-all hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <MapPin className="h-10 w-10 text-primary/30" />
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Title on image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {location && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-white/80 mb-1.5">
              <MapPin className="h-3 w-3" />
              {location}
            </div>
          )}
          <h3 className="text-lg font-bold text-white leading-tight">
            {title}
          </h3>
        </div>
      </div>

      {/* Excerpt */}
      {excerpt && (
        <div className="p-5 pt-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
        </div>
      )}
    </Link>
  );
}
