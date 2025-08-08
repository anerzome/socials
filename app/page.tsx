'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

// Social media icons as SVG components
const DiscordIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)

const PinterestIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174c-.105-.949-.199-2.403.041-3.439c.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911c1.024 0 1.518.769 1.518 1.688c0 1.029-.653 2.567-.992 3.992c-.285 1.193.6 2.165 1.775 2.165c2.128 0 3.768-2.245 3.768-5.487c0-2.861-2.063-4.869-5.008-4.869c-3.41 0-5.409 2.562-5.409 5.199c0 1.033.394 2.143.889 2.741c.099.12.112.225.085.345c-.09.375-.293 1.199-.334 1.363c-.053.225-.172.271-.402.165c-1.495-.69-2.433-2.878-2.433-4.646c0-3.776 2.748-7.252 7.92-7.252c4.158 0 7.392 2.967 7.392 6.923c0 4.135-2.607 7.462-6.233 7.462c-1.214 0-2.357-.629-2.75-1.378c0 0-.599 2.282-.744 2.84c-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
  </svg>
)

const TumblrIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z"/>
  </svg>
)

const SpotifyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

export default function HomePage() {
  const [hasEntered, setHasEntered] = useState(false)
  const [volume, setVolume] = useState([50])
  const [isMuted, setIsMuted] = useState(true) // Start muted due to browser policies
  const videoRef = useRef<HTMLVideoElement>(null)

  // Update video volume when slider changes
  useEffect(() => {
    if (videoRef.current && !isMuted) {
      videoRef.current.volume = volume[0] / 100
    }
  }, [volume, isMuted])

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
      
      // If unmuting, set the volume
      if (!newMutedState) {
        videoRef.current.volume = volume[0] / 100
      }
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume[0] / 100
      // If volume is set above 0, unmute automatically
      if (newVolume[0] > 0 && isMuted) {
        videoRef.current.muted = false
        setIsMuted(false)
      }
      // If volume is set to 0, mute automatically
      if (newVolume[0] === 0 && !isMuted) {
        videoRef.current.muted = true
        setIsMuted(true)
      }
    }
  }

  const handleEnter = () => {
    setHasEntered(true)
    // Start playing the video when user enters (still muted initially due to browser policies)
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }

  if (!hasEntered) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8 animate-pulse">
            Welcome
          </h1>
          <Button 
            onClick={handleEnter}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Click to Enter
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Volume Control */}
      <div className="fixed top-6 left-6 z-20 flex items-center gap-3 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="text-white hover:bg-white/20 w-8 h-8"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        <Slider
          value={volume}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="w-24 [&>span:first-child]:h-2 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-lg [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-2 [&_[role=slider]:focus-visible]:ring-white/50 [&_[role=slider]:focus-visible]:ring-offset-0"
        />
      </div>

      {/* Social Media Icons */}
      <div className="fixed bottom-8 right-8 z-20 flex flex-col gap-4">
        <a
          href="https://discord.gg/T3ujYXBWkS"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        >
          <DiscordIcon />
        </a>
        <a
          href="https://in.pinterest.com/anerzome/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        >
          <PinterestIcon />
        </a>
        <a
          href="https://www.tumblr.com/anerzome"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        >
          <TumblrIcon />
        </a>
        <a
          href="https://open.spotify.com/user/x5pxuwrpptwpbbfxc2sw0nt86?si=00b52c8c95b647ac"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        >
          <SpotifyIcon />
        </a>
      </div>

      {/* Content overlay (optional) */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          {/* Add any additional content here if needed */}
        </div>
      </div>
    </div>
  )
}
