"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/i18n-navigation";

const EDGE_THRESHOLD_PX = 4;

type SolutionItem = {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
};

function OurSolutionsCarousel(props: {
  items: SolutionItem[];
  cta: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= EDGE_THRESHOLD_PX);
    setAtEnd(
      track.scrollLeft + track.clientWidth >=
        track.scrollWidth - EDGE_THRESHOLD_PX,
    );
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateEdges();
    track.addEventListener("scroll", updateEdges);
    window.addEventListener("resize", updateEdges);
    return () => {
      track.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;
    track.scrollBy({
      left: direction * card.getBoundingClientRect().width,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {props.items.map((item) => (
          <Link
            key={item.href + item.title}
            href={item.href}
            className="group relative h-64 w-1/2 shrink-0 snap-start overflow-hidden sm:h-72 sm:w-1/3 lg:h-80 lg:w-1/4"
          >
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-dnet-blue/80 via-dnet-blue/30 to-transparent" />
            <div className="absolute inset-x-0 top-0 p-4 text-right sm:p-5">
              <p className="text-base font-semibold text-white sm:text-lg">
                {item.title}
              </p>
              <span className="mt-1 inline-flex items-center justify-end gap-1 text-sm font-medium text-white/90">
                {props.cta}
                <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {!atStart && (
        <button
          type="button"
          aria-label={props.prevLabel}
          onClick={() => scrollByCard(-1)}
          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-dnet-dark shadow-lg transition-colors duration-150 hover:bg-white sm:left-3"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}
      {!atEnd && (
        <button
          type="button"
          aria-label={props.nextLabel}
          onClick={() => scrollByCard(1)}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-dnet-dark shadow-lg transition-colors duration-150 hover:bg-white sm:right-3"
        >
          <ChevronRight className="size-5" />
        </button>
      )}
    </div>
  );
}

export { OurSolutionsCarousel };
export type { SolutionItem };
