"use client";

import { Maximize, Minimize, Move, ZoomIn, ZoomOut } from 'lucide-react';
import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

export default function MermaidChart({ chart }: MermaidProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize and render mermaid chart
  useEffect(() => {
    // Initialize mermaid with proper configuration
    mermaid.initialize({
      startOnLoad: true,
      theme: document.documentElement.classList.contains("dark") ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "inherit",
    });

    const renderChart = async () => {
      if (mermaidRef.current) {
        try {
          // Clear previous content
          mermaidRef.current.innerHTML = "";

          // Create a unique ID for this diagram
          // const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`

          // Create a container with the mermaid class
          const container = document.createElement("div");
          container.className = "mermaid";
          container.textContent = chart;
          mermaidRef.current.appendChild(container);

          // Run mermaid
          mermaid.contentLoaded();
        } catch (error) {
          console.error("Mermaid rendering error:", error);
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = `<div class="p-4 text-red-500 border border-red-300 rounded">Error rendering flowchart. Please check the syntax.</div>`;
          }
        }
      }
    };

    renderChart();

    // Re-render on theme change
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          mermaid.initialize({
            startOnLoad: true,
            theme: isDark ? "dark" : "default",
            securityLevel: "loose",
            fontFamily: "inherit",
          });
          renderChart();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, [chart]);

  // Handle zoom in/out
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2.5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  // Handle reset zoom and position
  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Reset position when toggling fullscreen
    setPosition({ x: 0, y: 0 });
  };

  // Handle mouse/touch drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPos({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.touches[0].clientX - startPos.x,
      y: e.touches[0].clientY - startPos.y
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 p-4' : ''}`}>
      {/* Controls */}
      <div className="absolute top-2 right-2 z-10 flex gap-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-1 rounded-md shadow-sm">
        <button
          onClick={handleZoomIn}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          aria-label="Zoom in"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          aria-label="Zoom out"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={handleReset}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          aria-label="Reset view"
        >
          <Move size={16} />
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>
      </div>

      {/* Mermaid container with fixed dimensions */}
      <div
        ref={containerRef}
        className={`overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg ${isFullscreen ? 'w-full h-full' : 'w-full h-[500px] md:h-[600px]'
          } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          ref={mermaidRef}
          style={{
            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'center',
            transition: isDragging ? 'none' : 'transform 0.2s ease',
            width: isFullscreen ? 'auto' : '840px',
            margin: '0 auto',
            padding: '20px'
          }}
        />
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-2 left-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}
