export class Course {
    id: String;
    name: String;
    theoryHours: Number;
    driveHours: Number;
    description: String;
    price: Number;
    theoryHoursCompleted: Number;
    driveHoursCompleted: Number;
    paid: Number;
    completed: Boolean;
    email: String;

    constructor(id: String,
        name: String,
        theoryHours: Number,
        driveHours: Number,
        description: String,
        price: Number,
        theoryHoursCompleted: Number = 0,
        driveHoursCompleted: Number = 0,
        paid: Number = 0,
        completed: Boolean = false,
        email: String = "") {
            this.id = id;
            this.name = name;
            this.theoryHours = theoryHours;
            this.driveHours = driveHours;
            this.description = description;
            this.price = price;
            this.theoryHoursCompleted = theoryHoursCompleted;
            this.driveHoursCompleted = driveHoursCompleted;
            this.paid = paid;
            this.completed = completed;
            this.email = email;
        }
}