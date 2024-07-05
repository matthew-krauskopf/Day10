import { Player } from './player';

export interface Match {
  id: number;
  bracketId: number;
  round: number;
  player1Id: number;
  player2Id: number;
  player1Score: number;
  player2Score: number;
}
