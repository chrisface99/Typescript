enum Suit {
  Hearts = 'Hearts',
  Diamonds = 'Diamonds',
  Clubs = 'Clubs',
  Spades = 'Spades'
}

enum Rank {
  Two = 'Two', Three = 'Three', Four = 'Four', Five = 'Five', Six = 'Six',
  Seven = 'Seven', Eight = 'Eight', Nine = 'Nine', Ten = 'Ten',
  Jack = 'Jack', Queen = 'Queen', King = 'King', Ace = 'Ace'
}

class Card {
  constructor(public suit: Suit, public rank: Rank) {}
}

class Deck {
  cards: Card[] = [];

  constructor() {
      for (let suit in Suit) {
          for (let rank in Rank) {
              this.cards.push(new Card(Suit[suit], Rank[rank]));
          }
      }
  }

  shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
  }

  dealCard(): Card {
      return this.cards.pop();
  }
}

class CommunityCards {
  cards: Card[] = [];

  receiveCards(cards: Card[]) {
      this.cards.push(...cards);
  }

  showCards() {
      console.log("Community cards on the table:");
      this.cards.forEach(card => {
          console.log(`${card.rank} of ${card.suit}`);
      });
  }
}

class Player {
  hand: Card[] = [];
  money: number = 1000; // Initial money for each player

  constructor(public name: string) {}

  receiveCard(card: Card) {
      this.hand.push(card);
  }

  showHand() {
      console.log(`${this.name}'s hand:`);
      this.hand.forEach(card => {
          console.log(`${card.rank} of ${card.suit}`);
      });
  }

  placeBet(amount: number) {
      if (amount <= this.money) {
          this.money -= amount;
          return amount;
      } else {
          console.log("Insufficient funds!");
          return 0;
      }
  }
}

class PokerGame {
  players: Player[] = [];
  deck: Deck = new Deck();
  communityCards: CommunityCards = new CommunityCards();
  pot: number = 0;

  constructor(playerNames: string[]) {
      playerNames.forEach(name => {
          this.players.push(new Player(name));
      });
  }

  start() {
      console.log("Starting Poker Game...");
      this.deck.shuffle();

      // Deal initial two cards to each player
      this.players.forEach(player => {
          player.receiveCard(this.deck.dealCard());
          player.receiveCard(this.deck.dealCard());
          player.showHand();
      });

      // Deal community cards
      this.communityCards.receiveCards([
          this.deck.dealCard(), 
          this.deck.dealCard(), 
          this.deck.dealCard()
      ]);
      this.communityCards.showCards();

      // Betting round before showing additional cards
      this.bettingRound();

      // Determining winner
      this.determineWinner();
  }
  
  async bettingRound() {
    console.log("Betting Round...");
    for (let i = 0; i < this.players.length; i++) {
        const currentPlayer = this.players[i];
        if (currentPlayer.name === "Player 1") {
            const decision = await this.promptForDecision(currentPlayer);
            if (decision === 'bet') {
                const betAmount = await this.promptForBet(currentPlayer);
                console.log(`${currentPlayer.name} bets ${betAmount} coins.`);
                const placedBet = await currentPlayer.placeBet(betAmount);
                this.pot += placedBet;
            } else {
                console.log(`${currentPlayer.name} passes.`);
            }
        } else {
            console.log(`Current player: ${currentPlayer.name}`);
            const betAmount = await this.promptForBet(currentPlayer);
            if (betAmount > 0) {
                console.log(`${currentPlayer.name} bets ${betAmount} coins.`);
                const placedBet = await currentPlayer.placeBet(betAmount);
                this.pot += placedBet;
            } else {
                console.log(`${currentPlayer.name} passes.`);
            }
        }
    }
}

async promptForDecision(player: Player): Promise<string> {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise<string>((resolve, reject) => {
        readline.question(`${player.name}, do you want to bet or pass? `, (decision: string) => {
            if (decision.toLowerCase() === 'bet' || decision.toLowerCase() === 'pass') {
                readline.close();
                resolve(decision.toLowerCase());
            } else {
                console.log("Invalid input! Please enter 'bet' or 'pass'.");
                readline.close();
                this.promptForDecision(player).then(resolve); // Recursive call to prompt again
            }
        });
    });
}


// Inside the PokerGame class

async promptForBet(player: Player): Promise<number> {
  const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
  });

  return new Promise<number>((resolve, reject) => {
      readline.question(`${player.name}, enter your bet amount (1-100), or enter 0 to pass: `, (input: string) => {
          const betAmount = parseInt(input);
          if (!isNaN(betAmount) && betAmount >= 0 && betAmount <= 100) {
              readline.close();
              resolve(betAmount);
          } else {
              console.log("Invalid input! Please enter a valid bet amount (1-100) or 0 to pass.");
              readline.close();
              this.promptForBet(player).then(resolve); // Recursive call to prompt again
          }
      });
  });
}

determineWinner() {
  console.log("Determining Winner...");

  let bestHandRank: number = -1;
  let winningPlayer: Player | undefined;

  this.players.forEach(player => {
      const handRank: number = Rank[player.hand[0].rank] as unknown as number; // Explicit cast to number
      if (handRank > bestHandRank) {
          bestHandRank = handRank;
          winningPlayer = player;
      }
  });

  if (winningPlayer) {
      console.log(`${winningPlayer.name} wins the pot of ${this.pot}!`);
  } else {
      console.log("No winner found.");
  }
}


}

// Usage
const game = new PokerGame(["Player 1", "Player 2"]);
game.start();
