import { Player } from "./player";

export interface Match {
  id: number;
  bracketId: number;
  round: number;
  player1Id: Player;
  player2Id: Player;
  player1Score: number;
  player2Score: number;
}
