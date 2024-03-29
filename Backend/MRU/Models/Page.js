class Page {
    constructor(id, content) {
        this.id = id;
        this.content = content;
        this.lastAccessed = Date.now(); // Track last accessed time
    }
}

module.exports = Page;
