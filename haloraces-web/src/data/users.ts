import type { Game, RelayEvent } from "./relayEvents";
import {relayEvents} from "./relayEvents";

export interface User {
    name: string;
    numRaces: number;
    wins: number;
    losses: number;
    firstRelayRace: Date;
    gameCount: { [game in Game]?: number }; // Track count per game
}

// Function to generate user stats 
function generateUserStats(relayEvents: RelayEvent[]): User[] {
    const users: { [name: string]: User } = {};

    relayEvents.forEach((event) => {
        event.playerResults.forEach((playerResult) => {
            const { name, win, playedGames } = playerResult;

            // Initialize user if not already present
            if (!users[name]) {
                users[name] = {
                    name,
                    numRaces: 1,
                    wins: win ? 1 : 0,
                    losses: win ? 0 : 1,
                    firstRelayRace: event.date,
                    gameCount: playedGames.reduce((acc, game) => {
                        acc[game] = (acc[game] || 0) + 1;
                        return acc;
                    }, {} as { [game in Game]?: number }),
                };
            } else {
                // Update existing user's stats
                users[name].numRaces += 1;
                users[name].wins += win ? 1 : 0;
                users[name].losses += win ? 0 : 1;

                // Update the game count
                playedGames.forEach((game) => {
                    users[name].gameCount[game] = (users[name].gameCount[game] || 0) + 1;
                });
            }
        });
    });

    return Object.values(users);
}

export const users = generateUserStats(relayEvents);
