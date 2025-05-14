import type { Game, RelayEvent } from "./relayEvents";
import {relayEvents} from "./relayEvents";

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

    relayEvents.forEach((event) => {
        event.playerResults.forEach((playerResult) => {
            const { name, win, playedGames } = playerResult;

            // Split names by "&" and trim spaces
            const splitNames = name.split("&").map(n => n.trim());

            splitNames.forEach((userName) => {
                // Initialize user if not already present
                if (!users[userName]) {
                    users[userName] = {
                        name: userName,
                        numRaces: [event],  // Store the event in the numRaces array
                        wins: win ? [event] : [],  // If the user won, store the event in the wins array
                        losses: win ? [] : [event],  // If the user lost, store the event in the losses array
                        firstRelayRace: event.date,
                        gameCount: playedGames.reduce((acc, game) => {
                            acc[game] = (acc[game] || 0) + 1;
                            return acc;
                        }, {} as { [game in Game]?: number }),
                    };
                } else {
                    // Update existing user's stats
                    users[userName].numRaces.push(event);  // Add the current event to numRaces

                    // If the user won, add the event to wins array
                    if (win) {
                        users[userName].wins.push(event);
                    } else {
                        // If the user lost, add the event to losses array
                        users[userName].losses.push(event);
                    }

                    // Update the game count
                    playedGames.forEach((game) => {
                        users[userName].gameCount[game] = (users[userName].gameCount[game] || 0) + 1;
                    });
                }
            });
        });
    });

    return Object.values(users);
}



export const users = generateUserStats(relayEvents);
