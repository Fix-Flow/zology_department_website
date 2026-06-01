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
  Users: <Users size={32} />,
  GraduationCap: <GraduationCap size={32} />,
  BookOpen: <BookOpen size={32} />,
  Award: <Award size={32} />,
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
    <section data-component="StatsBarClient" className="relative bg-white border-y border-govt-border" ref={ref}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      <div className="section-container relative py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative flex flex-col items-center text-center group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon — larger, stronger background */}
              <div className="w-16 h-16 rounded-2xl bg-primary/[0.07] flex items-center justify-center text-primary mb-4 group-hover:bg-primary/[0.12] transition-colors">
                {iconMap[stat.icon] || <Users size={32} />}
              </div>

              {/* Animated Number — larger */}
              <div className="stat-number text-3xl sm:text-4xl">
                {isVisible ? (
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={1500}
                  />
                ) : (
                  "0"
                )}
              </div>

              {/* Label — improved spacing */}
              <span className="stat-label mt-2">{stat.label}</span>

              {/* Desktop divider */}
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-border" />
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
  duration = 1500,
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

      // Ease-out cubic
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
