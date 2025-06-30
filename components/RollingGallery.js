import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";

const IMGS = [
  {
    quote: "Lambda helped me find an electrician in 10 minutes. Super smooth!",
    name: "— Riya, Bangalore",
  },
  {
    quote: "As a mechanic, I get 5-6 new jobs daily thanks to Lambda.",
    name: "— Irfan, Pune",
  },
  {
    quote: "It’s like Swiggy for workers. Booked a plumber in seconds.",
    name: "— Rahul, Indore",
  },
  {
    quote: "Quick, fair, and easy. I booked a TV repair in 5 minutes.",
    name: "— Priya, Hyderabad",
  },
];

const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  images = images.length > 0 ? images : IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(false);

  useEffect(() => {
  // Set initial value
  setIsScreenSizeSm(window.innerWidth <= 640);

  const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);


  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const radius = cylinderWidth / (2 * Math.PI);

  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) startInfiniteSpin(finalAngle);
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) controls.stop();
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <h1 className="flex justify-center items-center text-center mt-26 text-5xl font-bold mb-4">
        Reviews From all Over India
      </h1>
      {/* Gradient overlays */}
      <div
        className="absolute top-0 left-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to left, rgba(0,0,0,0) 0%, #060010 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #060010 100%)",
        }}
      />

      {/* 3D rotating testimonials */}
      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {images.map((item, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[8%] md:p-[6%] [backface-visibility:hidden]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  (360 / faceCount) * i
                }deg) translateZ(${radius}px)`,
              }}
            >
              <div className="h-[140px] w-[300px] sm:h-[120px] sm:w-[220px] rounded-[15px] border-[3px] border-slate-600 bg-white dark:bg-slate-800 text-black dark:text-amber-50 shadow-lg p-4 transition-transform duration-300 ease-out group-hover:scale-105">
                <p className="text-sm md:text-base italic mb-2">
                  "{item.quote}"
                </p>
                <p className="text-xs md:text-sm font-semibold text-right">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
