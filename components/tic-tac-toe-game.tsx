"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { ethers } from "ethers"
import WalletConnect from "@/components/wallet-connect"
import TicTacToeBoard from "@/components/tic-tac-toe-board"
import GameLobby from "@/components/game-lobby"
import { ContractService, type Game, GameState, Player } from "@/services/contract-service"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import DeploymentGuide from "@/components/deployment-guide"

export default function TicTacToeGame() {
  const [contractService, setContractService] = useState<ContractService | null>(null)
  const [currentGameId, setCurrentGameId] = useState<number | null>(null)
  const [game, setGame] = useState<Game | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMoving, setIsMoving] = useState(false)
  const [contractAddress, setContractAddress] = useState<string>("")
  const [isContractAddressValid, setIsContractAddressValid] = useState<boolean>(false)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleWalletConnect = (provider: ethers.BrowserProvider, address: string) => {
    // Check if we have a saved contract address in localStorage
    if (typeof window !== "undefined") {
      const savedAddress = localStorage.getItem("tictactoe_contract_address")
      if (savedAddress) {
        setContractAddress(savedAddress)
        if (ContractService.isValidContractAddress(savedAddress)) {
          setIsContractAddressValid(true)
          try {
            setContractService(new ContractService(provider, address, savedAddress))
          } catch (err) {
            console.error("Error creating contract service:", err)
            setError("Failed to connect to the contract. Please check the contract address.")
          }
        }
      }
    }
  }

  const handleContractAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setContractAddress(value)
    setIsContractAddressValid(ContractService.isValidContractAddress(value))
  }

  const saveContractAddress = useCallback(() => {
    if (!isContractAddressValid || typeof window === "undefined") return

    localStorage.setItem("tictactoe_contract_address", contractAddress)

    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      provider.listAccounts().then((accounts) => {
        if (accounts.length > 0) {
          try {
            setContractService(new ContractService(provider, accounts[0].address, contractAddress))
          } catch (err) {
            console.error("Error creating contract service:", err)
            setError("Failed to connect to the contract. Please check the contract address.")
          }
        }
      })
    }
  }, [contractAddress, isContractAddressValid])

  const handleGameSelected = (gameId: number) => {
    setCurrentGameId(gameId)
  }

  const handleCellClick = async (position: number) => {
    if (!contractService || !currentGameId || !game || isMoving) return
    if (!contractService.isMyTurn(game)) return
    if (game.board[position] !== Player.NONE) return

    setIsMoving(true)
    setError(null)

    try {
      await contractService.makeMove(currentGameId, position)
      await fetchGameState()
    } catch (err: any) {
      console.error("Error making move:", err)
      setError(`Failed to make move: ${err.message || "Unknown error"}`)
    } finally {
      setIsMoving(false)
    }
  }

  const fetchGameState = async () => {
    if (!contractService || currentGameId === null) return

    setIsLoading(true)
    setError(null)

    try {
      const gameData = await contractService.getGame(currentGameId)
      setGame(gameData)
    } catch (err: any) {
      console.error("Error fetching game:", err)
      setError(`Failed to fetch game: ${err.message || "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const resetGame = () => {
    setCurrentGameId(null)
    setGame(null)
  }

  const resetContractAddress = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("tictactoe_contract_address")
    }
    setContractService(null)
    setContractAddress("")
    setIsContractAddressValid(false)
    setCurrentGameId(null)
    setGame(null)
  }

  useEffect(() => {
    if (currentGameId !== null) {
      fetchGameState()

      // Poll for updates every 5 seconds
      const interval = setInterval(fetchGameState, 5000)
      return () => clearInterval(interval)
    }
  }, [currentGameId, contractService])

  const renderGameStatus = () => {
    if (!game) return null

    let statusText = ""
    let statusClass = "text-lg font-medium"

    if (game.state === GameState.WAITING) {
      statusText = "Waiting for opponent to join..."
      statusClass += " text-yellow-600"
    } else if (game.state === GameState.ACTIVE) {
      if (contractService?.isMyTurn(game)) {
        statusText = "Your turn"
        statusClass += " text-emerald-600"
      } else {
        statusText = "Opponent's turn"
        statusClass += " text-gray-600"
      }
    } else if (game.state === GameState.FINISHED) {
      if (game.winner === Player.NONE) {
        statusText = "Game ended in a draw"
        statusClass += " text-gray-600"
      } else if (
        (game.winner === Player.PLAYER1 && contractService?.isPlayer1(game)) ||
        (game.winner === Player.PLAYER2 && contractService?.isPlayer2(game))
      ) {
        statusText = "You won! 🎉"
        statusClass += " text-emerald-600"
      } else {
        statusText = "You lost"
        statusClass += " text-rose-600"
      }
    }

    return <div className={statusClass}>{statusText}</div>
  }

  // Don't render anything on the server
  if (!isClient) {
    return <div className="p-8 text-center">Loading Web3 Tic-Tac-Toe...</div>
  }

  if (!contractService) {
    return (
      <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold">Connect Your Wallet</h2>
        <p className="text-gray-600 text-center">
          Connect your Ethereum wallet to start playing Tic-Tac-Toe on the blockchain
        </p>
        <WalletConnect onConnect={handleWalletConnect} />

        {typeof window !== "undefined" && window.ethereum && (
          <div className="w-full mt-4">
            <h3 className="text-lg font-semibold mb-2">Contract Address</h3>
            <p className="text-sm text-gray-600 mb-2">Enter the address of your deployed TicTacToe contract:</p>
            <div className="flex gap-2">
              <Input
                value={contractAddress}
                onChange={handleContractAddressChange}
                placeholder="0x..."
                className={`flex-1 ${contractAddress && !isContractAddressValid ? "border-red-500" : ""}`}
              />
              <Button
                onClick={saveContractAddress}
                disabled={!isContractAddressValid}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Connect
              </Button>
            </div>
            {contractAddress && !isContractAddressValid && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid Ethereum contract address</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              You need to deploy the TicTacToe.sol contract to an Ethereum network first.
            </p>
            <DeploymentGuide />
          </div>
        )}
      </div>
    )
  }

  if (currentGameId === null) {
    return <GameLobby contractService={contractService} onGameSelected={handleGameSelected} />
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1">Game #{currentGameId}</h2>
        {renderGameStatus()}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-10">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      ) : game ? (
        <TicTacToeBoard
          board={game.board}
          onCellClick={handleCellClick}
          isMyTurn={contractService.isMyTurn(game)}
          gameActive={game.state === GameState.ACTIVE}
        />
      ) : null}

      {error && <div className="w-full p-3 bg-red-100 text-red-800 rounded-md text-sm">{error}</div>}

      <div className="flex gap-4 mt-2">
        {game?.state === GameState.FINISHED && (
          <div className="flex flex-col gap-2 w-full mt-4">
            <Button onClick={resetGame} variant="outline">
              Back to Lobby
            </Button>
            <Button onClick={resetContractAddress} variant="outline" className="text-red-500">
              Reset Contract Address
            </Button>
          </div>
        )}

        <Button onClick={fetchGameState} variant="outline" disabled={isLoading}>
          Refresh Game
        </Button>
      </div>

      <div className="text-xs text-gray-500 text-center mt-2">
        <p>All moves are recorded on the blockchain</p>
        <p>Game ID: {currentGameId}</p>
      </div>
    </div>
  )
}
