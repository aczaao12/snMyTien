
import React, { useRef, useState, useEffect } from 'react';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`max-w-3xl mx-auto px-4 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-rose-500">{icon}</div>
            <h2 className="font-playfair text-2xl md:text-3xl text-slate-700">{title}</h2>
          </div>
          <div className="text-slate-600 space-y-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;