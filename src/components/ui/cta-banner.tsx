import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";
import { cn } from "@/lib/utils";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  className?: string;
}

export function CTABanner({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  className,
}: CTABannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 py-24 lg:py-32",
        className
      )}
    >
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedSection variant="scale">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              {subtitle}
            </p>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-green-900 shadow-lg transition-all hover:bg-white/90 hover:scale-105 active:scale-100"
                >
                  {primaryAction.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
