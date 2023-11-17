export class User {
    id?: String;
    email?: String;

    constructor(id?: String, email?: String) {
        this.id = id;
        this.email = email;
    }

    reset() {
        this.id = undefined;
        this.email = undefined;
    }
}