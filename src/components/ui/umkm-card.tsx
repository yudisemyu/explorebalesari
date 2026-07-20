import Image from "next/image";
import Link from "next/link";
import { Store } from "lucide-react";
import { cn } from "@/lib/utils";

interface UmkmCardProps {
  name: string;
  slug: string;
  excerpt?: string | null;
  imageUrl?: string | null;
  category?: string | null;
  ownerName?: string | null;
  className?: string;
}

export function UmkmCard({
  name,
  slug,
  excerpt,
  imageUrl,
  category,
  ownerName,
  className,
}: UmkmCardProps) {
  return (
    <Link
      href={`/umkm/${slug}`}
      className={cn(
        "group block overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all hover:shadow-lg hover:border-primary/20 hover:-translate-y-1",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/10 to-accent/5">
            <Store className="h-10 w-10 text-accent/30" />
          </div>
        )}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground shadow-sm">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        {ownerName && (
          <p className="mt-1 text-xs text-muted-foreground">
            oleh {ownerName}
          </p>
        )}
        {excerpt && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
