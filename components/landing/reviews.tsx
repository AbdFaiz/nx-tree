import { testimonials } from "@/lib/data";
import { Star } from "lucide-react";
import Image from "next/image";

const Reviews = () => {
  return (
    <section id="reviews" className="px-4 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Loved by Developers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who have simplified their Nx monorepo workflow.
          </p>
        </div>

        {/* Masonry-like Grid atau Column Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="break-inside-avoid bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              {/* Rating & Content */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="text-muted-foreground leading-relaxed mb-6">
                &quot;{testimonial.content}&quot;
              </blockquote>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="relative h-11 w-11 flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover border-2 border-background shadow-sm"
                  />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-semibold text-sm truncate uppercase tracking-wide">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;