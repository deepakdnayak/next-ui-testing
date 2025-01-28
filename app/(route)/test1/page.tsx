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

    useEffect(() => {
        const leftScreen = leftScreenRef.current;
        const rightScreen = rightScreenRef.current;
        const leftImage = leftImageRef.current;
        const rightImage = rightImageRef.current;
        const stage = stageRef.current;

        if (leftScreen && rightScreen && leftImage && rightImage && stage) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: stage,
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                },
            });

            // Stage animations
            tl.to(
                [leftScreen, rightScreen],
                {
                    x: (i) => (i === 0 ? -leftScreen.offsetWidth : rightScreen.offsetWidth),
                    ease: "none",
                    duration: 3,
                },
                0 // Start both at the same time
            );

            // Image animations after stage animations
            tl.to(
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
                3 // Start after stage animations
            ).to(
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
                3 // Synchronize with left image animation
            );
        }
    }, []);

    return (
        <div className="relative">
            <div
                ref={stageRef}
                className="absolute top-0 left-0 bg-[url('/stage.jpg')] bg-center bg-cover bg-no-repeat h-screen w-full"
            >
                {/* Left Image */}
                <div
                    ref={leftImageRef}
                    className="absolute left-0 bottom-0 w-96 h-96 bg-[url('/womenLeft.png')] bg-center bg-cover bg-no-repeat flex items-start justify-end z-10"
                >
                    <p className="text-white text-[100px] font-semibold">Aak</p>
                </div>

                {/* Right Image */}
                <div
                    ref={rightImageRef}
                    className="absolute right-0 bottom-0 w-96 h-96 bg-[url('/womenRight.png')] bg-center bg-cover bg-no-repeat flex items-start justify-start z-10"
                >
                    <p className="text-white text-[100px] font-semibold">riti</p>
                </div>
            </div>

            <div className="flex flex-row overflow-hidden">
                <div ref={leftScreenRef} className="w-1/2 h-screen bg-red-400 z-10">
                    <Image src="/screenLeft.jpg" alt="Left Screen" fill />
                </div>
                <div ref={rightScreenRef} className="w-1/2 h-screen bg-blue-400 z-10">
                    <Image src="/screenRight.jpg" alt="Right Screen" fill />
                </div>
            </div>

            <div className="h-screen text-center text-3xl pt-20">Sample Scroll Space</div>
        </div>
    );
}
