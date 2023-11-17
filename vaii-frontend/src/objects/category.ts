export class Category {
    id: String;
    name: String;
    theoryHours: Number;
    driveHours: Number;
    description: String;
    price: Number;

    constructor(id: String,
        name: String,
        theoryHours: Number,
        driveHours: Number,
        description: String,
        price: Number) {
            this.id = id;
            this.name = name;
            this.theoryHours = theoryHours;
            this.driveHours = driveHours;
            this.description = description;
            this.price = price;
        }
}