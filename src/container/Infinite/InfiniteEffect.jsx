"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FatTransitionScroll() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000", // Total scroll range
          scrub: true,
          pin: true,
        },
      });

      tl.to(".line-1", { width: "200px", duration: 1 })

        // Step 1: Switch from bg-1 to bg-2 + show "to palm oil"
        .to(".bg-1", { opacity: 0, duration: 1 })
        .to(".bg-2", { opacity: 1, duration: 1 }, "<")
        .to(".to-palm-oil", { opacity: 1, duration: 1 })

        // // Step 2: Draw the curve
        // .to(".curve-line path", {
        //   strokeDashoffset: 0,
        //   duration: 1,
        //   ease: "power2.inOut",
        // })

        // Step 3: Switch to bg-3 and show final text
         .to(".line-2", { width: "200px", duration: 1 })
        .to(".bg-2", { opacity: 0, duration: 1 })
        .to(".bg-3", { opacity: 1, duration: 1 }, "<")
        .to(".to-palm-oil-2", { opacity: 1, duration: 1 })
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Images */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-[url('/images/1.jpg')] bg-1 transition-opacity duration-700"
        style={{ opacity: 1 }}
      />
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-[url('/images/2.jpg')] bg-2 transition-opacity duration-700"
        style={{ opacity: 0 }}
      />
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-[url('/images/3.jpg')] bg-3 transition-opacity duration-700"
        style={{ opacity: 0 }}
      />

      {/* Text + Line + Curve */}
      <div className="absolute top-1/3 left-10 text-white text-2xl font-semibold z-10">
        <div className="flex items-center space-x-2">
          <span>Passion. Grit. Glory</span>
          <div className="h-[2px] w-0 bg-white line-1"></div>
          <span className="to-palm-oil opacity-0">Driven by Legacy</span>
          <div className="h-[2px] w-0 bg-white line-2"></div>
          <span className="to-palm-oil-2 opacity-0">Roar. Rise. Repeat</span>
        </div>
      </div>
    </section>
  );
}
