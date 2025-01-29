"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Screen() {
    const leftScreenRef = useRef<HTMLDivElement>(null);
    const rightScreenRef = useRef<HTMLDivElement>(null);
    const leftImageRef = useRef<HTMLDivElement>(null);
    const rightImageRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const leftScreen = leftScreenRef.current;
        const rightScreen = rightScreenRef.current;
        const leftImage = leftImageRef.current;
        const rightImage = rightImageRef.current;
        const stage = stageRef.current;
        const logo = logoRef.current;

        if (leftScreen && rightScreen && leftImage && rightImage && stage && logo) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: stage,
                    start: "top top",
                    end: "+=1000", // Extend the scroll duration
                    scrub: true,
                    pin: true, // Keep the stage pinned
                    pinSpacing: true,
                },
            });

            // Existing animations
            tl.to(
                [leftScreen, rightScreen],
                {
                    x: (i) => (i === 0 ? -leftScreen.offsetWidth : rightScreen.offsetWidth),
                    ease: "none",
                    duration: 5,
                },
                0 // Start both at the same time
            )
                .to(
                    leftImage,
                    {
                        x: () => {
                            const vwCenter = stage.offsetWidth / 2;
                            const elementWidth = leftImage.offsetWidth;
                            return vwCenter - elementWidth;
                        },
                        ease: "none",
                        duration: 4,
                    },
                    5 // Start after stage animations
                )
                .to(
                    rightImage,
                    {
                        x: () => {
                            const vwCenter = stage.offsetWidth / 2;
                            const elementWidth = rightImage.offsetWidth;
                            return -(vwCenter - elementWidth);
                        },
                        ease: "none",
                        duration: 4,
                    },
                    5 // Synchronize with left image animation
                );

            // New animation: Pop-in logo
            tl.to(
                logo,
                {
                    opacity: 1,
                    scale: 1,
                    ease: "elastic.out(1, 0.5)", // Popping effect
                    duration: 1.5,
                },
                "+=0.5" // Add a small delay after the previous animations
            );
        }
    }, []);

    return (
        <div ref={stageRef} className="relative">
            <div className="flex flex-row overflow-hidden">
                <div ref={leftScreenRef} className="relative w-1/2 h-screen z-10">
                    <Image src="/screenLeft.jpg" alt="Left Screen" fill className="object-cover sm:object-contain lg:object-cover" />
                </div>
                <div ref={rightScreenRef} className="w-1/2 h-screen z-10">
                    <Image src="/screenRight.jpg" alt="Right Screen" fill className="object-cover sm:object-contain lg:object-cover" />
                </div>
            </div>

            <div className="absolute top-0 left-0 bg-[url('/stage.jpg')] bg-center bg-cover bg-no-repeat h-screen w-full">
                {/* Logo Image */}
                <div
                    ref={logoRef}
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[url('/logo.png')] bg-center bg-cover bg-no-repeat opacity-0 scale-0"
                ></div>

                {/* Left Image */}
                <div
                    ref={leftImageRef}
                    className="absolute -left-44 md:left-0 bottom-0 w-96 h-96 bg-[url('/womenLeft.png')] bg-center bg-cover bg-no-repeat flex items-start justify-end"
                >
                    <p className="text-white text-[100px] font-semibold">Aak</p>
                </div>

                {/* Right Image */}
                <div
                    ref={rightImageRef}
                    className="absolute -right-44 md:right-0 bottom-0 w-96 h-96 bg-[url('/womenRight.png')] bg-center bg-cover bg-no-repeat flex items-start justify-start"
                >
                    <p className="text-white text-[100px] font-semibold">riti</p>
                </div>
            </div>

            <div className="h-screen text-center text-3xl pt-20">Sample Scroll Space</div>
        </div>
    );
}
