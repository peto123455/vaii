export class User {
    id?: String;
    email?: String;
    permLevel?: Number;
    rank?: String;

    constructor(id?: String, email?: String, permLevel?: Number, rank?: String) {
        this.id = id;
        this.email = email;
        this.permLevel = permLevel;
        this.rank = rank;
    }

    reset() {
        this.id = undefined;
        this.email = undefined;
        this.permLevel = undefined;
        this.rank = undefined;
    }
}