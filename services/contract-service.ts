import { ethers } from "ethers"

const DEFAULT_CONTRACT_ADDRESS = "" // Empty by default
const CONTRACT_ABI = [
  "function createGame() external returns (uint256)",
  "function joinGame(uint256 gameId) external",
  "function makeMove(uint256 gameId, uint8 position) external",
  "function getGame(uint256 gameId) external view returns (address player1, address player2, uint8 currentTurn, uint8[9] memory board, uint8 state, uint8 winner)",
  "function games(uint256 gameId) external view returns (address player1, address player2, uint8 currentTurn, uint8[9] memory board, uint8 state, uint8 winner)",
  "function gameCount() external view returns (uint256)",
  "event GameCreated(uint256 gameId, address player1)",
  "event GameJoined(uint256 gameId, address player2)",
  "event MoveMade(uint256 gameId, address player, uint8 position)",
  "event GameWon(uint256 gameId, address winner)",
  "event GameDrawn(uint256 gameId)",
]

export enum GameState {
  WAITING = 0,
  ACTIVE = 1,
  FINISHED = 2,
}

export enum Player {
  NONE = 0,
  PLAYER1 = 1,
  PLAYER2 = 2,
}

export interface Game {
  player1: string
  player2: string
  currentTurn: Player
  board: Player[]
  state: GameState
  winner: Player
}

export class ContractService {
  private contract: ethers.Contract
  private provider: ethers.BrowserProvider
  private address: string

  constructor(provider: ethers.BrowserProvider, address: string, contractAddress?: string) {
    this.provider = provider
    this.address = address

    if (!contractAddress) {
      throw new Error("Contract address is not set. Please deploy the contract and set its address.")
    }

    this.contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider)
  }

  async createGame(): Promise<number> {
    const signer = await this.provider.getSigner()
    const tx = await this.contract.connect(signer).createGame()
    const receipt = await tx.wait()

    // Find the GameCreated event in the receipt
    const event = receipt.logs
      .map((log: any) => {
        try {
          return this.contract.interface.parseLog(log)
        } catch (e) {
          return null
        }
      })
      .find((event: any) => event && event.name === "GameCreated")

    return event ? event.args.gameId.toString() : null
  }

  async joinGame(gameId: number): Promise<void> {
    const signer = await this.provider.getSigner()
    const tx = await this.contract.connect(signer).joinGame(gameId)
    await tx.wait()
  }

  async makeMove(gameId: number, position: number): Promise<void> {
    const signer = await this.provider.getSigner()
    const tx = await this.contract.connect(signer).makeMove(gameId, position)
    await tx.wait()
  }

  async getGame(gameId: number): Promise<Game> {
    const [player1, player2, currentTurn, board, state, winner] = await this.contract.getGame(gameId)

    return {
      player1,
      player2,
      currentTurn,
      board: Array.from(board).map((b) => Number(b)),
      state: Number(state),
      winner: Number(winner),
    }
  }

  async getGameCount(): Promise<number> {
    const count = await this.contract.gameCount()
    return Number(count)
  }

  isPlayer1(game: Game): boolean {
    return game.player1.toLowerCase() === this.address.toLowerCase()
  }

  isPlayer2(game: Game): boolean {
    return game.player2.toLowerCase() === this.address.toLowerCase()
  }

  isMyTurn(game: Game): boolean {
    if (game.state !== GameState.ACTIVE) return false

    if (game.currentTurn === Player.PLAYER1) {
      return this.isPlayer1(game)
    } else {
      return this.isPlayer2(game)
    }
  }

  static isValidContractAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }
}
