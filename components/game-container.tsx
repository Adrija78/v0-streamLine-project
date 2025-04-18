"use client"

import { Suspense, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// Dynamically import the TicTacToeGame component with SSR disabled
const TicTacToeGame = dynamic(() => import("@/components/tic-tac-toe-game"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md w-full max-w-md">
      <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-4" />
      <p className="text-gray-600">Loading Web3 components...</p>
    </div>
  ),
})

export default function GameContainer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-4" />
        <p className="text-gray-600">Initializing Web3 components...</p>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md w-full max-w-md">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-4" />
          <p className="text-gray-600">Loading game components...</p>
        </div>
      }
    >
      <TicTacToeGame />
    </Suspense>
  )
}
