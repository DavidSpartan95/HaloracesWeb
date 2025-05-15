import type { Game, RelayEvent } from "./relayEvents";
import { relayEvents } from "./relayEvents";

export interface User {
    name: string;
    numRaces: RelayEvent[];   // Array of RelayEvents the user participated in
    wins: RelayEvent[];       // Array of RelayEvents the user won
    losses: RelayEvent[];     // Array of RelayEvents the user lost
    firstRelayRace: Date;
    gameCount: { [game in Game]?: number };  // Track count per game
}


// Function to generate user stats 
function generateUserStats(relayEvents: RelayEvent[]): User[] {
    const users: { [name: string]: User } = {};

    relayEvents.forEach(event => {
        event.playerResults.forEach(playerResult => {
            const { name, win, playedGames } = playerResult;
            const splitNames = name.split("&").map(n => n.trim());

            splitNames.forEach(userName => {
                const u = users[userName] ||= {
                    name: userName,
                    numRaces: [],
                    wins: [],
                    losses: [],
                    firstRelayRace: event.date,
                    gameCount: {}
                };

                // 1) only add the race once:
                if (!u.numRaces.includes(event)) {
                    u.numRaces.push(event);
                }

                // 2) only add to wins or losses once:
                if (win) {
                    if (!u.wins.includes(event)) u.wins.push(event);
                } else {
                    if (!u.losses.includes(event)) u.losses.push(event);
                }

                // 3) always increment gameCount for *each* game they played:
                playedGames.forEach(game => {
                    u.gameCount[game] = (u.gameCount[game] || 0) + 1;
                });

                // 4) update firstRelayRace if this event is earlier:
                if (event.date < u.firstRelayRace) {
                    u.firstRelayRace = event.date;
                }
            });
        });
    });

    return Object.values(users);
}



export const users = generateUserStats(relayEvents);
