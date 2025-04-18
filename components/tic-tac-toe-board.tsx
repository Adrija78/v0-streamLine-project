"use client"

import { Player } from "@/services/contract-service"

interface TicTacToeBoardProps {
  board: Player[]
  onCellClick: (index: number) => void
  isMyTurn: boolean
  gameActive: boolean
}

export default function TicTacToeBoard({ board, onCellClick, isMyTurn, gameActive }: TicTacToeBoardProps) {
  const renderCell = (index: number) => {
    const value = board[index]
    let content = ""
    let cellClass =
      "flex items-center justify-center text-4xl font-bold h-20 w-20 border-2 border-gray-300 cursor-pointer hover:bg-gray-100"

    if (value === Player.PLAYER1) {
      content = "X"
      cellClass += " text-emerald-600"
    } else if (value === Player.PLAYER2) {
      content = "O"
      cellClass += " text-rose-600"
    } else if (isMyTurn && gameActive) {
      cellClass += " hover:bg-emerald-50"
    } else {
      cellClass += " cursor-not-allowed"
    }

    return (
      <div
        key={index}
        className={cellClass}
        onClick={() => {
          if (value === Player.NONE && isMyTurn && gameActive) {
            onCellClick(index)
          }
        }}
      >
        {content}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-1 bg-gray-300 p-1 rounded-md">
      {Array.from({ length: 9 }).map((_, index) => renderCell(index))}
    </div>
  )
}
