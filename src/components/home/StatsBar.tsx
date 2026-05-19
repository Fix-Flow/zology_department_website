"use client";

import { useEffect, useRef, useState } from "react";
import { Users, GraduationCap, BookOpen, Award } from "lucide-react";
import { departmentStats } from "@/data/stats";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users size={28} />,
  GraduationCap: <GraduationCap size={28} />,
  BookOpen: <BookOpen size={28} />,
  Award: <Award size={28} />,
};

export default function StatsBar() {
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
    <section className="bg-white border-y border-govt-border" ref={ref}>
      <div className="section-container py-8 sm:py-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {departmentStats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-3">
                {iconMap[stat.icon] || <Users size={28} />}
              </div>

              {/* Animated Number */}
              <div className="stat-number">
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

              {/* Label */}
              <span className="stat-label mt-1">{stat.label}</span>
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
