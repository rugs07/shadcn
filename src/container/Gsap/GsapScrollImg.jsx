"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSlideEffect() {
  useEffect(() => {
    const slides = gsap.utils.toArray(".slide");
    const delay = 0.5;

    // Set initial rotations
    gsap.set(slides, {
      rotationX: (i) => (i ? -90 : 0),
      transformOrigin: "center center -150px",
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power1.inOut",
        transformOrigin: "center center -150px",
      },
      scrollTrigger: {
        trigger: ".trigger-wrapper",
        start: "top top",
        end: "+=" + (slides.length - 1) * 50 + "%",
        pin: true,
        scrub: true,
        markers: true, // Enable for debugging
      },
    });

    slides.forEach((slide, i) => {
      const nextSlide = slides[i + 1];
      if (!nextSlide) return;

      tl.to(
        slide,
        {
          rotationX: 90,
          onComplete: () => gsap.set(slide, { rotationX: -90 }),
        },
        "+=" + delay
      ).to(
        nextSlide,
        {
          rotationX: 0,
        },
        "<"
      );
    });

    tl.to({}, { duration: delay }); // Hold final slide

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* Sticky 3D Slider */}
      <div className="trigger-wrapper h-screen w-full relative overflow-hidden">
        <div className="w-full h-full flex items-end justify-center">
          <div className="relative w-[300px] h-[300px] perspective-3d">
            {/* Slide container */}
            <div className="absolute inset-0 outline outline-dashed outline-gray-400 rounded-lg slider">
              {[
                "/images/1.jpg",
                "/images/2.jpg",
                "/images/3.jpg",
              ].map((src, index) => (
                <div
                  key={index}
                  className="slide absolute inset-0 rounded-lg overflow-hidden"
                >
                  <img
                    src={src}
                    // alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-[50vh] panel bg-transparent" />
    </>
  );
}

// Gradient backgrounds
const gradientClass = (index) => {
  const gradients = [
    "bg-gradient-to-br from-green-400 to-green-700",
    "bg-gradient-to-br from-purple-400 to-purple-700",
    "bg-gradient-to-br from-blue-400 to-blue-700",
    "bg-gradient-to-br from-orange-400 to-orange-600",
    "bg-gradient-to-br from-blue-900 to-blue-700",
    "bg-gradient-to-br from-red-400 to-red-700",
  ];
  return gradients[index] || "bg-gray-400";
};
