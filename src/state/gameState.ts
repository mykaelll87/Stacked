export interface GameState {
  stacked: number,
  started: boolean
}

export default function makeGameState(): GameState {
  return {
    stacked: 0,
    started: false
  }
}