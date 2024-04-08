var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Suit;
(function (Suit) {
    Suit["Hearts"] = "Hearts";
    Suit["Diamonds"] = "Diamonds";
    Suit["Clubs"] = "Clubs";
    Suit["Spades"] = "Spades";
})(Suit || (Suit = {}));
var Rank;
(function (Rank) {
    Rank["Two"] = "Two";
    Rank["Three"] = "Three";
    Rank["Four"] = "Four";
    Rank["Five"] = "Five";
    Rank["Six"] = "Six";
    Rank["Seven"] = "Seven";
    Rank["Eight"] = "Eight";
    Rank["Nine"] = "Nine";
    Rank["Ten"] = "Ten";
    Rank["Jack"] = "Jack";
    Rank["Queen"] = "Queen";
    Rank["King"] = "King";
    Rank["Ace"] = "Ace";
})(Rank || (Rank = {}));
var Card = /** @class */ (function () {
    function Card(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
    return Card;
}());
var Deck = /** @class */ (function () {
    function Deck() {
        this.cards = [];
        for (var suit in Suit) {
            for (var rank in Rank) {
                this.cards.push(new Card(Suit[suit], Rank[rank]));
            }
        }
    }
    Deck.prototype.shuffle = function () {
        var _a;
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [this.cards[j], this.cards[i]], this.cards[i] = _a[0], this.cards[j] = _a[1];
        }
    };
    Deck.prototype.dealCard = function () {
        return this.cards.pop();
    };
    return Deck;
}());
var CommunityCards = /** @class */ (function () {
    function CommunityCards() {
        this.cards = [];
    }
    CommunityCards.prototype.receiveCards = function (cards) {
        var _a;
        (_a = this.cards).push.apply(_a, cards);
    };
    CommunityCards.prototype.showCards = function () {
        console.log("Community cards on the table:");
        this.cards.forEach(function (card) {
            console.log("".concat(card.rank, " of ").concat(card.suit));
        });
    };
    return CommunityCards;
}());
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
        this.hand = [];
        this.money = 1000; // Initial money for each player
    }
    Player.prototype.receiveCard = function (card) {
        this.hand.push(card);
    };
    Player.prototype.showHand = function () {
        console.log("".concat(this.name, "'s hand:"));
        this.hand.forEach(function (card) {
            console.log("".concat(card.rank, " of ").concat(card.suit));
        });
    };
    Player.prototype.placeBet = function (amount) {
        if (amount <= this.money) {
            this.money -= amount;
            return amount;
        }
        else {
            console.log("Insufficient funds!");
            return 0;
        }
    };
    return Player;
}());
var PokerGame = /** @class */ (function () {
    function PokerGame(playerNames) {
        var _this = this;
        this.players = [];
        this.deck = new Deck();
        this.communityCards = new CommunityCards();
        this.pot = 0;
        playerNames.forEach(function (name) {
            _this.players.push(new Player(name));
        });
    }
    PokerGame.prototype.start = function () {
        var _this = this;
        console.log("Starting Poker Game...");
        this.deck.shuffle();
        // Deal initial two cards to each player
        this.players.forEach(function (player) {
            player.receiveCard(_this.deck.dealCard());
            player.receiveCard(_this.deck.dealCard());
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
    };
    PokerGame.prototype.bettingRound = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, currentPlayer, decision, betAmount, placedBet, betAmount, placedBet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Betting Round...");
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.players.length)) return [3 /*break*/, 12];
                        currentPlayer = this.players[i];
                        if (!(currentPlayer.name === "Player 1")) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.promptForDecision(currentPlayer)];
                    case 2:
                        decision = _a.sent();
                        if (!(decision === 'bet')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.promptForBet(currentPlayer)];
                    case 3:
                        betAmount = _a.sent();
                        console.log("".concat(currentPlayer.name, " bets ").concat(betAmount, " coins."));
                        return [4 /*yield*/, currentPlayer.placeBet(betAmount)];
                    case 4:
                        placedBet = _a.sent();
                        this.pot += placedBet;
                        return [3 /*break*/, 6];
                    case 5:
                        console.log("".concat(currentPlayer.name, " passes."));
                        _a.label = 6;
                    case 6: return [3 /*break*/, 11];
                    case 7:
                        console.log("Current player: ".concat(currentPlayer.name));
                        return [4 /*yield*/, this.promptForBet(currentPlayer)];
                    case 8:
                        betAmount = _a.sent();
                        if (!(betAmount > 0)) return [3 /*break*/, 10];
                        console.log("".concat(currentPlayer.name, " bets ").concat(betAmount, " coins."));
                        return [4 /*yield*/, currentPlayer.placeBet(betAmount)];
                    case 9:
                        placedBet = _a.sent();
                        this.pot += placedBet;
                        return [3 /*break*/, 11];
                    case 10:
                        console.log("".concat(currentPlayer.name, " passes."));
                        _a.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 1];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    PokerGame.prototype.promptForDecision = function (player) {
        return __awaiter(this, void 0, void 0, function () {
            var readline;
            var _this = this;
            return __generator(this, function (_a) {
                readline = require('readline').createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        readline.question("".concat(player.name, ", do you want to bet or pass? "), function (decision) {
                            if (decision.toLowerCase() === 'bet' || decision.toLowerCase() === 'pass') {
                                readline.close();
                                resolve(decision.toLowerCase());
                            }
                            else {
                                console.log("Invalid input! Please enter 'bet' or 'pass'.");
                                readline.close();
                                _this.promptForDecision(player).then(resolve); // Recursive call to prompt again
                            }
                        });
                    })];
            });
        });
    };
    // Inside the PokerGame class
    PokerGame.prototype.promptForBet = function (player) {
        return __awaiter(this, void 0, void 0, function () {
            var readline;
            var _this = this;
            return __generator(this, function (_a) {
                readline = require('readline').createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        readline.question("".concat(player.name, ", enter your bet amount (1-100), or enter 0 to pass: "), function (input) {
                            var betAmount = parseInt(input);
                            if (!isNaN(betAmount) && betAmount >= 0 && betAmount <= 100) {
                                readline.close();
                                resolve(betAmount);
                            }
                            else {
                                console.log("Invalid input! Please enter a valid bet amount (1-100) or 0 to pass.");
                                readline.close();
                                _this.promptForBet(player).then(resolve); // Recursive call to prompt again
                            }
                        });
                    })];
            });
        });
    };
    PokerGame.prototype.determineWinner = function () {
        console.log("Determining Winner...");
        var bestHandRank = -1;
        var winningPlayer;
        this.players.forEach(function (player) {
            var handRank = Rank[player.hand[0].rank]; // Explicit cast to number
            if (handRank > bestHandRank) {
                bestHandRank = handRank;
                winningPlayer = player;
            }
        });
        if (winningPlayer) {
            console.log("".concat(winningPlayer.name, " wins the pot of ").concat(this.pot, "!"));
        }
        else {
            console.log("No winner found.");
        }
    };
    return PokerGame;
}());
// Usage
var game = new PokerGame(["Player 1", "Player 2"]);
game.start();
