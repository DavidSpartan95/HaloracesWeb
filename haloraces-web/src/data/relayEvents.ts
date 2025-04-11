// data/relayEvents.ts
export enum Game {
    HaloCE = 'Halo CE',
    Halo2 = 'Halo 2',
    Halo3 = 'Halo 3',
    HaloODST = 'Halo 3: ODST',
    Halo4 = 'Halo 4',
    HaloReach = 'Halo Reach'
  }
  
  export enum Difficulty {
    Easy = 'Easy',
    Legendary = 'Legendary'
  }
  
  export enum TeamName {
    Green = 'Green',
    Gold = 'Gold',
    Red = 'Red',
    Blue = 'Blue'
  }
  
  export interface PlayerResult {
    name: string
    team: TeamName
    win: boolean
    playedGames: Game[]
  }
  
  export interface TeamResult {
    name: TeamName
    time: string
  }
  
  export interface RelayEvent {
    year: number
    difficulty: Difficulty
    playedGames: Game[]
    winningTeam: TeamName
    teamResults: TeamResult[]
    playerResults: PlayerResult[]
  }

  export const relayEvents: RelayEvent[] = [
      {
          year: 2014,
          difficulty: Difficulty.Legendary,
          playedGames: [Game.HaloCE, Game.Halo2, Game.Halo3],
          winningTeam: TeamName.Green,
          teamResults: [
              {
                  name: TeamName.Green,
                  time: "5:31:13"
              },
              {
                  name: TeamName.Gold,
                  time: "5:39:09"
              }
          ],
          playerResults: [
              {
                  name: "Sol",
                  team: TeamName.Green,
                  win: true,
                  playedGames: [Game.HaloCE]
              },
              {
                  name: "Hockeyfan",
                  team: TeamName.Green,
                  win: true,
                  playedGames: [Game.Halo2]
              },
              {
                  name: "AlienFlow",
                  team: TeamName.Green,
                  win: true,
                  playedGames: [Game.Halo3]
              },
              {
                  name: "Scurty",
                  team: TeamName.Gold,
                  win: false,
                  playedGames: [Game.HaloCE]
              },
              {
                  name: "Monopoli",
                  team: TeamName.Gold,
                  win: false,
                  playedGames: [Game.Halo2]
              },
              {
                  name: "TheBlazeJP",
                  team: TeamName.Gold,
                  win: false,
                  playedGames: [Game.Halo3]
              },
          ],
      },
      {
          year: 2015,
          difficulty: Difficulty.Easy,
          playedGames: [Game.HaloReach,Game.HaloCE,Game.Halo2,Game.Halo3,Game.HaloODST,Game.Halo4],
          winningTeam: TeamName.Green,
          teamResults: [
              {
                  name: TeamName.Red,
                  time: "Unknown"
              },
              {
                  name: TeamName.Green,
                  time: "Unknown"
              },
              {
                  name: TeamName.Blue,
                  time: "Unknown"
              }
          ],
          playerResults: [
              {
                  name: "Wolfy",
                  team: TeamName.Red,
                  win: false,
                  playedGames: [Game.HaloReach]
              },
              {
                  name: "Sol",
                  team: TeamName.Red,
                  win: false,
                  playedGames: [Game.HaloCE]
              },
              {
                  name: "HockyFan",
                  team: TeamName.Red,
                  win: false,
                  playedGames: [Game.Halo2]
              },
              {
                  name: "Heroic Robb",
                  team: TeamName.Red,
                  win: false,
                  playedGames: [Game.HaloODST]
              },
              {
                  name: "Deadrain",
                  team: TeamName.Red,
                  win: false,
                  playedGames: [Game.Halo3]
              },
              {
                  name: "Haole Cake",
                  team: TeamName.Red,
                  win: false,
                  playedGames: [Game.Halo4]
              },
              //Green Team
              {
                  name: "Halodude",
                  team: TeamName.Green,
                  win: true,
                  playedGames: [Game.HaloReach]
              },
              {
                  name: "GarishGoblin",
                  team: TeamName.Green,
                  win: true,
                  playedGames: [Game.HaloCE]
              },
              {
                  name: "NadeshotsCats",
                  team: TeamName.Green,
                  win: true,
                  playedGames: [Game.Halo2]
              },
              {
                  name: "Davco",
                  team: TeamName.Green,
                  win: true,
                  playedGames: [Game.HaloODST]
              },
              {
                  name: "Nagato",
                  team: TeamName.Green,
                  win: true,
                  playedGames: [Game.Halo3]
              },
              {
                  name: "BadMonsterz",
                  team: TeamName.Green,
                  win: true,
                  playedGames: [Game.Halo4]
              },
              //Blue Team
              {
                  name: "Backflip",
                  team: TeamName.Blue,
                  win: false,
                  playedGames: [Game.HaloReach]
              },
              {
                  name: "Savusukka",
                  team: TeamName.Blue,
                  win: false,
                  playedGames: [Game.HaloCE]
              },
              {
                  name: "Reraised",
                  team: TeamName.Blue,
                  win: false,
                  playedGames: [Game.Halo2]
              },
              {
                  name: "A Royal Hobo",
                  team: TeamName.Blue,
                  win: false,
                  playedGames: [Game.HaloODST]
              },
              {
                  name: "StuffedCrustFTW",
                  team: TeamName.Blue,
                  win: false,
                  playedGames: [Game.Halo3]
              },
              {
                  name: "Egg92",
                  team: TeamName.Blue,
                  win: false,
                  playedGames: [Game.Halo4]
              },
          ]
      }
  ]