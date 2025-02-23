import React, { useEffect, useState } from "react";

const Background3D = () => {
  const [scrollY, setScrollY] = useState(0);
  const [stars, setStars] = useState([]);

  // Handle parallax effect based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate shooting stars
  useEffect(() => {
    const createStars = () => {
      let newStars = [];
      for (let i = 0; i < 10; i++) {
        newStars.push({
          id: i,
          left: Math.random() * 100 + "vw",
          top: Math.random() * 100 + "vh",
          duration: Math.random() * 2 + 2 + "s",
        });
      }
      setStars(newStars);
    };
    createStars();
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      {/* Moving Gradient Orbs */}
      <div
        className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] transition-transform duration-300"
        style={{
          top: `${25 + scrollY * 0.05}%`,
          left: `${20 + scrollY * 0.03}%`,
          transform: `translate(-50%, -50%) rotate(${scrollY * 0.1}deg)`,
        }}
      />
      <div
        className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] transition-transform duration-300"
        style={{
          bottom: `${20 + scrollY * 0.04}%`,
          right: `${25 + scrollY * 0.02}%`,
          transform: `translate(50%, 50%) rotate(${scrollY * -0.1}deg)`,
        }}
      />

      {/* Pulsating Grid Effect */}
      <div
        className="absolute inset-0 opacity-15 animate-pulse"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff11 1px, transparent 1px), linear-gradient(90deg, #ffffff11 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />

      {/* Shooting Stars Effect */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-80 animate-shooting"
          style={{
            left: star.left,
            top: star.top,
            animationDuration: star.duration,
          }}
        />
      ))}

      {/* Shooting Stars Animation */}
      <style>
        {`
          @keyframes shooting {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(-200px, 200px) scale(0.5); opacity: 0; }
          }

          .animate-shooting {
            animation: shooting linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Background3D;
