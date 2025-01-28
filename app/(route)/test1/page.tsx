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

    useEffect(()=> {
        const leftScreen = leftScreenRef.current;
        const rightScreen = rightScreenRef.current;
        const stage = stageRef.current;
        const leftImage = leftImageRef.current;
        const rightImage = rightImageRef.current;
        const section = stageRef.current;

        if(leftScreen && rightScreen && leftImage && rightImage && section){
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


            // Left Image Animation
            gsap.timeline({
                scrollTrigger: {
                  trigger: leftImage,
                  start: "top 60%",
                  end: "+=300",
                  scrub: true,
                  markers: true,
                  pin: true,
                },
            }).to(leftImage,{
                x: () => {
                  // Dynamically calculate the center position minus half the element width
                  const vwCenter = section.offsetWidth / 2; // Center of the section
                  const elementWidth = leftImage.offsetWidth; // Width of the left image container
                  return vwCenter - elementWidth; // Center position accounting for element width
                },
                ease: "none",
                duration: 4,
              });

             // Right Image Animation
            gsap.timeline({
                scrollTrigger: {
                  trigger: rightImage,
                  start: "top 60%",
                  end: "+=300",
                  scrub: true,
                  markers: true,
                  pin: true,
                },
            }).to(rightImage,{
                x: () => {
                  // Dynamically calculate the center position minus half the element width
                  const vwCenter = section.offsetWidth / 2; // Center of the viewport
                  const elementWidth = rightImage.offsetWidth; // Width of the right image container
                  return -(vwCenter - elementWidth); // Center position accounting for element width
                },
                ease: "none",
                duration: 4,
            });


            // Stage
            gsap.timeline({
                scrollTrigger: {
                    trigger: stage,
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                    markers: true,
                    pin: true, 
                    pinSpacing: true,
                },
            }).to(stage, {
                ease: "none",
                duration: 5,
            });
        }
    })

    return (
        <div className="relative">
            <div ref={stageRef} className="absolute top-0 left-0 bg-[url('/stage.jpg')] bg-center bg-cover bg-no-repeat h-screen w-full">

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
        </div>
    )

}