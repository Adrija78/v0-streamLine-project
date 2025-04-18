"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ContractService } from "@/services/contract-service"
import { AlertCircle } from "lucide-react"

interface GameLobbyProps {
  contractService: ContractService
  onGameSelected: (gameId: number) => void
}

export default function GameLobby({ contractService, onGameSelected }: GameLobbyProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [gameIdToJoin, setGameIdToJoin] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [contractError, setContractError] = useState<string | null>(null)

  const createNewGame = async () => {
    setIsCreating(true)
    setError(null)
    setContractError(null)

    try {
      const gameId = await contractService.createGame()
      onGameSelected(gameId)
    } catch (err: any) {
      console.error("Error creating game:", err)

      // Check if it's a contract-related error
      if (err.message && (err.message.includes("contract") || err.message.includes("execution reverted"))) {
        setContractError(
          "There was an error with the contract. Make sure you're connected to the correct network and the contract is deployed properly.",
        )
      } else {
        setError(`Failed to create game: ${err.message || "Unknown error"}`)
      }
    } finally {
      setIsCreating(false)
    }
  }

  const joinGame = async () => {
    if (!gameIdToJoin) {
      setError("Please enter a game ID")
      return
    }

    setIsJoining(true)
    setError(null)
    setContractError(null)

    try {
      await contractService.joinGame(Number(gameIdToJoin))
      onGameSelected(Number(gameIdToJoin))
    } catch (err: any) {
      console.error("Error joining game:", err)

      // Check if it's a contract-related error
      if (err.message && (err.message.includes("contract") || err.message.includes("execution reverted"))) {
        setContractError(
          "There was an error with the contract. Make sure you're connected to the correct network and the contract is deployed properly.",
        )
      } else {
        setError(`Failed to join game: ${err.message || "Unknown error"}`)
      }
    } finally {
      setIsJoining(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Game Lobby</h2>
        <p className="text-gray-600">Create a new game or join an existing one</p>
      </div>

      <div className="w-full">
        <Button onClick={createNewGame} disabled={isCreating} className="w-full bg-emerald-600 hover:bg-emerald-700">
          {isCreating ? "Creating..." : "Create New Game"}
        </Button>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="text-center">
          <p className="text-gray-600">- OR -</p>
        </div>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Enter Game ID"
            value={gameIdToJoin}
            onChange={(e) => setGameIdToJoin(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={joinGame}
            disabled={isJoining || !gameIdToJoin}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isJoining ? "Joining..." : "Join"}
          </Button>
        </div>
      </div>

      {error && <div className="w-full p-3 bg-red-100 text-red-800 rounded-md text-sm">{error}</div>}
      {contractError && (
        <div className="w-full p-4 bg-yellow-100 text-yellow-800 rounded-md text-sm flex items-start gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Contract Error</p>
            <p>{contractError}</p>
            <p className="mt-2">
              You may need to reset your contract address. Go back and reconnect with a different contract.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
