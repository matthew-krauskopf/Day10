import { Player } from "./player";

export interface Match {
    id: number;
    player1: Player;
    player2: Player;
    date: Date;
    result: string;
}
