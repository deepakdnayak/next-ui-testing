"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftImage = leftImageRef.current;
    const rightImage = rightImageRef.current;
    const section = sectionRef.current;

    if (leftImage && rightImage && section) {
      // GSAP Animation for Left Image
      gsap.to(leftImage, {
        scrollTrigger: {
          trigger: leftImage,
          start: "top 60%",
          end: "+=300",
          scrub: true,
          markers: true,
          pin: true,
        },
        x: () => {
          // Dynamically calculate the center position minus half the element width
          const vwCenter = section.offsetWidth / 2; // Center of the section
          const elementWidth = leftImage.offsetWidth; // Width of the left image container
          return vwCenter - elementWidth; // Center position accounting for element width
        },
        ease: "none",
        duration: 2,
      });

      // GSAP Animation for Right Image
      gsap.to(rightImage, {
        scrollTrigger: {
          trigger: rightImage,
          start: "top 60%",
          end: "+=300",
          scrub: true,
          markers: true,
          pin: true,
        },
        x: () => {
          // Dynamically calculate the center position minus half the element width
          const vwCenter = section.offsetWidth / 2; // Center of the viewport
          const elementWidth = rightImage.offsetWidth; // Width of the right image container
          return -(vwCenter - elementWidth); // Center position accounting for element width
        },
        ease: "none",
        duration: 2,
      });
    }
  }, []);

  return (
    <>
    <section
      ref={sectionRef}
      className="h-[170vh] flex items-center justify-between bg-gray-800 overflow-hidden"
    >
      {/* Left Image */}
      <div
        ref={leftImageRef}
        className="w-60 h-60 bg-blue-500 flex items-center justify-end z-10 rounded-lg shadow-lg"
      >
        <p className="text-white text-7xl font-semibold">Aak</p>
      </div>

      {/* Right Image */}
      <div
        ref={rightImageRef}
        className="w-60 h-60 bg-red-500 flex items-center justify-start z-10 rounded-lg shadow-lg"
      >
        <p className="text-white text-7xl font-semibold">riti</p>
      </div>

      {/* Placeholder for scrollable content */}
      <div className="absolute bottom-0 left-0 w-full text-center text-white">
        <p className="text-lg">Scroll down to see the effect!</p>
      </div>
    </section>

    <div className="h-screen text-center text-3xl pt-20">Sample Scroll Space</div>
    </>
  );
}
