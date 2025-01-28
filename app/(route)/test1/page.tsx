"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Screen() {
    const leftScreenRef = useRef<HTMLDivElement>(null);
    const rightScreenRef = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        const leftScreen = leftScreenRef.current;
        const rightScreen = rightScreenRef.current;

        if(leftScreen && rightScreen){
            gsap.timeline({
                scrollTrigger: {
                    trigger: leftScreen,
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                    markers: true,
                    pin: true,
                    pinSpacing: true,
                },
            }).to(leftScreen, {
                x: () => -leftScreen.offsetWidth,
                ease: "none",
                duration: 3,
            });
        
            // Animation for the right screen
            gsap.timeline({
                scrollTrigger: {
                    trigger: rightScreen,
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                    markers: true,
                    pin: true, 
                    pinSpacing: true,
                },
            }).to(rightScreen, {
                x: () => rightScreen.offsetWidth,
                ease: "none",
                duration: 3,
            });
        }
    })

    return (
        <>
            <div className="flex flex-row overflow-hidden bg-[url('/stage.jpg')] bg-center bg-cover bg-no-repeat h-screen">
                <div ref={leftScreenRef} className="w-1/2 h-screen bg-red-400 z-10">
                    <Image
                        src="/screenLeft.jpg"
                        alt="Left Screen"
                        fill
                    />
                </div>
                <div ref={rightScreenRef} className="w-1/2 h-screen bg-blue-400 z-10">
                    <Image
                        src="/screenRight.jpg"
                        alt="Left Screen"
                        fill
                    />
                </div>
            </div>

            <div className="h-screen text-center text-3xl pt-20">Sample Scroll Space</div>
        </>
    )

}