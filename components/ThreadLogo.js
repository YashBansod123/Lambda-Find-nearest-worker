"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function ThreadLogo({ size = 40, strokeWidth = 12 }) {
  const pathRef = useRef(null)

  useEffect(() => {
    if (!pathRef.current) return

    const length = pathRef.current.getTotalLength()
    pathRef.current.style.strokeDasharray = length
    pathRef.current.style.strokeDashoffset = length

    gsap.fromTo(
      pathRef.current,
      { strokeDashoffset: length },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      }
    )
  }, [])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 270 300"
      fill="none"
      style={{ width: size, height: size }}
    >
      <defs>
        <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" /> // orange-200
          <stop offset="100%" stopColor="#ef4444" /> // orange-600
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        id="lambdaPath"
        d="M 179.689 101.722 C 191.27 89.37 194.757 88.124 201.423 90.985 C 227.621 102.229 227.109 182.81 249.822 207.71 C 252.644 210.804 258.216 213.372 262.322 214.19 C 272.359 216.189 275.081 207.303 268.327 192.765 C 261.651 178.397 245.044 130.438 230.316 136.422 C 227.723 137.476 225.188 140.201 222.776 145.077 C 219.444 151.812 219.006 153.315 219.006 153.315 C 216.371 160.014 213.098 166.305 209.252 174.257 C 202.679 187.845 197.852 215.371 179.054 211.865"
        stroke="url(#threadGradient)"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  )
}
