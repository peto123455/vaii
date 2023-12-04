export class User {
    id: String | null;
    email: String | null;
    permLevel: Number | null;
    rank: String | null;

    constructor(id: String | null, email: String | null, permLevel: Number | null, rank: String | null) {
        this.id = id;
        this.email = email;
        this.permLevel = permLevel;
        this.rank = rank;
    }

    reset() {
        this.id = null;
        this.email = null;
        this.permLevel = null;
        this.rank = null;
    }
}