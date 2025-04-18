"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"

export default function DeploymentGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Only run on client-side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="w-full mt-4 border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="font-medium">How to Deploy the Contract</span>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="p-4 text-sm">
          <p className="mb-2">
            To play this game, you need to deploy the TicTacToe smart contract to an Ethereum network. Here's how to do
            it:
          </p>

          <ol className="list-decimal pl-5 space-y-2 mb-4">
            <li>
              <strong>Use Remix IDE:</strong> The easiest way to deploy is using the{" "}
              <a
                href="https://remix.ethereum.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline inline-flex items-center"
              >
                Remix IDE <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </li>
            <li>
              <strong>Create a new file</strong> called <code>TicTacToe.sol</code> and paste the contract code
            </li>
            <li>
              <strong>Compile the contract</strong> using the Solidity compiler (version 0.8.17 or higher)
            </li>
            <li>
              <strong>Deploy to a test network</strong> like Sepolia or Goerli using the "Deploy & Run Transactions" tab
            </li>
            <li>
              <strong>Copy the deployed contract address</strong> and paste it in the input field above
            </li>
          </ol>

          <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 mb-4">
            <p className="font-medium text-yellow-800">Important Notes:</p>
            <ul className="list-disc pl-5 text-yellow-700 mt-1">
              <li>Make sure your MetaMask is connected to the same network where you deployed the contract</li>
              <li>You'll need test ETH for the network you're using (get from a faucet)</li>
              <li>Each game action (create, join, move) will require a transaction fee</li>
            </ul>
          </div>

          <Button asChild variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
            <a href="https://remix.ethereum.org" target="_blank" rel="noopener noreferrer">
              Open Remix IDE <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}
