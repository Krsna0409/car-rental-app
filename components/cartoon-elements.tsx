export function CartoonCar() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Car body */}
      <rect x="30" y="50" width="140" height="30" rx="8" fill="currentColor" />
      {/* Car roof */}
      <path d="M 60 50 L 80 30 L 120 30 L 140 50" fill="currentColor" />
      {/* Window */}
      <rect x="85" y="35" width="30" height="15" rx="3" fill="rgba(255,255,255,0.3)" />
      {/* Wheels */}
      <circle cx="60" cy="80" r="12" fill="currentColor" />
      <circle cx="140" cy="80" r="12" fill="currentColor" />
      {/* Wheel rims */}
      <circle cx="60" cy="80" r="6" fill="rgba(255,255,255,0.4)" />
      <circle cx="140" cy="80" r="6" fill="rgba(255,255,255,0.4)" />
      {/* Headlights */}
      <circle cx="35" cy="58" r="3" fill="rgba(255,255,255,0.8)" />
      <circle cx="42" cy="58" r="3" fill="rgba(255,255,255,0.8)" />
    </svg>
  )
}

export function AnimatedCheckmark() {
  return (
    <svg
      className="w-full h-full animate-bounce-in"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 6L9 17L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LoadingSpinner() {
  return (
    <svg
      className="w-full h-full animate-spin-slow"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SuccessAnimation() {
  return (
    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-green-500 animate-bounce-in shadow-xl">
      <svg
        className="w-12 h-12 text-white animate-float"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 6L9 17L4 12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
