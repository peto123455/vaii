export class Topic {
    id: String;
    title: String;
    description: String;
    image: String;

    constructor(id: String,
        title: String,
        description: String,
        image: String) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.image = image;
        }
}