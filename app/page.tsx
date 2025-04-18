import type { Metadata } from "next"
import GameContainer from "@/components/game-container"

export const metadata: Metadata = {
  title: "Web3 Tic-Tac-Toe",
  description: "A decentralized Tic-Tac-Toe game built on Ethereum",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8 text-center">Web3 Tic-Tac-Toe</h1>
        <GameContainer />
      </div>
    </main>
  )
}
