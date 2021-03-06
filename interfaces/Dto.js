'use strict';

/**
 * Data transfer object is meant to transfer data to models from database connections.
 * This is interface all consumer of data from database should depend on.
 */
class Dto {
    #success = false;
    #length = -1;
    #data = null;

    get success() {
        return this.#success;
    }

    set success( value ) {
        this.#success = value;
    }

    get length() {
        return this.#length;
    }

    set length( value ) {
        this.#length = value;
    }

    get data() {
        return this.#data;
    }

    set data( value ) {
        this.#data = value;
    }
}

class DtoProvider {
    static getDTO() {
        return new Dto();
    }
}

module.exports = DtoProvider;
