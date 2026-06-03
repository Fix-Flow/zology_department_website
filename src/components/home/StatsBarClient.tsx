"use client";

import { useEffect, useRef, useState } from "react";
import { Users, GraduationCap, BookOpen, Award } from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users size={28} strokeWidth={1.8} />,
  GraduationCap: <GraduationCap size={28} strokeWidth={1.8} />,
  BookOpen: <BookOpen size={28} strokeWidth={1.8} />,
  Award: <Award size={28} strokeWidth={1.8} />,
};

export default function StatsBarClient({ stats }: { stats: StatItem[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-component="StatsBarClient"
      className="relative overflow-hidden bg-white border-y border-govt-border"
      ref={ref}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/[0.02]" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-primary/[0.02]" />
      </div>

      <div className="section-container relative py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative flex flex-col items-center text-center group transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Icon container */}
              <div className="w-14 h-14 rounded-xl bg-primary/[0.07] border border-primary/10 flex items-center justify-center text-primary mb-3.5">
                {iconMap[stat.icon] || <Users size={28} />}
              </div>

              {/* Animated Number */}
              <div className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-primary-dark leading-none tracking-tight">
                {isVisible ? (
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={1800}
                  />
                ) : (
                  <span className="text-primary/20">0</span>
                )}
              </div>

              {/* Label */}
              <span className="mt-2.5 text-xs sm:text-sm font-semibold text-govt-muted uppercase tracking-[0.08em]">
                {stat.label}
              </span>

              {/* Desktop divider */}
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-govt-border to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({
  target,
  suffix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
