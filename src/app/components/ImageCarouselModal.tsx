"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageCarouselModalProps {
  images: string[];
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageCarouselModal({ images, alt, isOpen, onClose }: ImageCarouselModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  if (!isOpen) return null;

  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrentIndex((i) => (i + 1) % images.length);

  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(18, 13, 5, 0.72)",
    backdropFilter: "blur(6px)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "24px",
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.92)",
        }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(6px)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "24px",
          zIndex: 10,
          transition: "all 0.2s ease",
        }}
        aria-label="Close gallery"
      >
        ×
      </button>

      {/* Image container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "800px",
          aspectRatio: "4 / 3",
          maxHeight: "80vh",
          borderRadius: "16px",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          style={{ objectFit: "contain" }}
          sizes="800px"
          priority
        />

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button onClick={prev} style={{ ...arrowStyle, left: "16px" }} aria-label="Previous image">
              ‹
            </button>
            <button onClick={next} style={{ ...arrowStyle, right: "16px" }} aria-label="Next image">
              ›
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "8px",
            }}
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  border: "none",
                  background: i === currentIndex ? "#fff" : "rgba(255, 255, 255, 0.4)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Counter */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.85rem",
          fontWeight: 600,
        }}
      >
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
