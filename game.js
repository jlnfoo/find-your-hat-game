//all codes to setup game goes here

const prompt = require('prompt-sync')({sigint: true});
const term = require( 'terminal-kit' ).terminal ;
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10, colNum = 10;

// create a Field Class - Task 2

class Field {

    //creating arrays inside array
    constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;

    //Set and fix the "home" position to 00 before the game starts
    this.field[0][0] = pathCharacter;
    }
    
    //Task 4 
    runGame() {
        //terminal output default color set to cyan
        term.cyan();
        let playing = true;
        console.log("Start Game");

        while (playing) {
        //print the field
        this.print();

        this.askQuestion();

        // If player not in bound, display message that they lost, playing = false will end the loop
        if(!this.isWithinBound()) {
            // term sets text color to red when player goes out of bound
            term.red();
            console.log("You went out of bound. Game over.");
            playing = false;
        }

        // If player drops in hole, game ends, display message that they lost, playing = false will end loop
        else if (this.droppedInHole()) {
            // term sets text color to red when player dropped in hole
            term.red();
            console.log("You dropped in the hole! Game over.");
            playing = false;
        }

        //If player found the hat, display message that they won, playing = false will end loop
        else if (this.foundHat()) {
            // term sets text color to green when player found hat
            term.brightGreen();
            console.log("Congrats! You found your hat and won the game!");
            playing = false;
        }

        //to display pathCharacter location if game carries on
        this.field[this.locationY][this.locationX] = pathCharacter;

        }
    }

    askQuestion() {
        // Up = U, Down = D, Left = L, Right = R
        const direction = prompt('Which way? Enter U, D, L, or R. ').toUpperCase();
        switch (direction) {
            case 'U':
                this.locationY -= 1;
                break;
           
            case 'D':
                this.locationY += 1;
                break;
            
            case 'L':
                this.locationX -= 1;
                break;
            
            case 'R':
                this.locationX += 1;
                break;
           
            // displays message when player does not input any of the cases above
            default:
                console.log("Error: invalid input. Please try again.");
                break;
        }
    }

    isWithinBound() {
        return (
            //checks top side, left side, bottom side, right side of field
            this.locationY >= 0 && 
            this.locationX >= 0 && 
            this.locationY < this.field.length && 
            this.locationX < this.field[0].length
        );
    }

    droppedInHole() {
        return this.field[this.locationY][this.locationX] === hole;
    }

    foundHat() {
        return this.field[this.locationY][this.locationX] === hat;
    }

    print() {
        const displayString = this.field.map(row => {
            return row.join('');
            }).join('\n');

        console.log(displayString);
    }

    static generateField(percentage) {
        const field = new Array(rowNum).fill().map(() => Array(colNum));

        for (let y = 0 ; y < rowNum; y++) {
            for (let x = 0; x < colNum; x++) {
                const prob = Math.random();
                field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }

        // Set the "hat" location : object
        const hatLocation = {
            x: Math.floor(Math.random() * colNum),
            y: Math.floor(Math.random() * rowNum)
        };

        //Make sure the "hat" is not at the starting point 
        while (hatLocation.x == 0 && hatLocation.y == 0) {
            hatLocation.x = Math.floor(Math.random() * colNum);
            hatLocation.y = Math.floor(Math.random() * rowNum);
        }

        field[hatLocation.y][hatLocation.x] = hat;
        return field;
    }
}


//Task 5 
//Create an instance of Field Class Object
const myField = new Field(Field.generateField(0.3));
myField.runGame();