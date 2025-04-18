"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ethers } from "ethers"

export default function WalletConnect({
  onConnect,
}: {
  onConnect: (provider: ethers.BrowserProvider, address: string) => void
}) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(false)

  useEffect(() => {
    // Check if MetaMask is available
    if (typeof window !== "undefined" && window.ethereum) {
      setIsMetaMaskAvailable(true)

      // Check if already connected
      const checkConnection = async () => {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum)
          const accounts = await provider.listAccounts()

          if (accounts.length > 0) {
            setAddress(accounts[0].address)
            onConnect(provider, accounts[0].address)
          }
        } catch (error) {
          console.error("Failed to check wallet connection:", error)
        }
      }

      checkConnection()
    }
  }, [onConnect])

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask to use this app")
      return
    }

    setIsConnecting(true)

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.send("eth_requestAccounts", [])

      if (accounts.length > 0) {
        setAddress(accounts[0])
        onConnect(provider, accounts[0])
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      alert("Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  if (!isMetaMaskAvailable) {
    return (
      <div className="text-center">
        <Button disabled className="bg-gray-400">
          MetaMask Not Available
        </Button>
        <p className="mt-2 text-sm text-gray-600">Please install MetaMask to use this app</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {address ? (
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-full bg-green-100 text-green-800 font-medium">
            Connected: {formatAddress(address)}
          </div>
        </div>
      ) : (
        <Button onClick={connectWallet} disabled={isConnecting} className="bg-emerald-600 hover:bg-emerald-700">
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  )
}
