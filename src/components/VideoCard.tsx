'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import Image from 'next/image'

interface VideoCardProps {
  video: {
    title: string
    url: string
    description: string
  }
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Extract YouTube ID (e.g. from https://www.youtube.com/embed/yz5H6FkrWhs)
  const videoId = video.url.split('/').pop()?.split('?')[0] || ''
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  return (
    <div className="group bg-white rounded-sm shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[var(--gray-200)]">
        <span className="flex items-center justify-center w-8 h-8 bg-[var(--red)] rounded-sm">
          <Play className="w-4 h-4 text-white fill-white" />
        </span>
        <h3 className="text-lg font-bold text-[var(--black)] font-[family-name:var(--font-display)] leading-tight">
          {video.title}
        </h3>
      </div>

      {/* Video embed */}
      <div className="video-container relative">
        {isPlaying ? (
          <iframe
            src={`${video.url}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full block focus:outline-none cursor-pointer"
            aria-label={`Play ${video.title}`}
          >
            {/* YouTube Thumbnail */}
            <div className="relative w-full h-full">
              <Image
                src={thumbnailUrl}
                alt={video.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={false}
              />
              {/* Backdrop overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              
              {/* Play Button Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-[var(--red)] text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white fill-white translate-x-0.5" />
                </div>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Description */}
      <div className="px-6 py-4">
        <p className="text-sm text-[var(--gray-600)] leading-relaxed">
          {video.description}
        </p>
      </div>
    </div>
  )
}
