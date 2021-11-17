'use strict';
const DatabaseFactory = require( '../../factory/databaseFactory' );
const lib = require( './lib/lib' );

/**
 * This is base class for all model classes.
 */
class ActiveRecord {
    constructor() {
        this._recordName = this.constructor.name;
        this._className = new.target.name;
        this._DatabaseFactory = DatabaseFactory;
        this._modelName = this._className;
    }

    /**
     * Finds record by its id
     * @param id
     * @return {Promise<*>}
     */
    async findById( id ) {
        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const record = await client.query( `
            SELECT *
            FROM ${ this._modelName }s
            WHERE ${ this._modelName }_id = '${ id }';
        ` );

        // Release client ( necessary )
        await client.release();

        // Return result
        return record;
    }

    /**
     * Finds one random record
     * @return {Promise<*>}
     */
    async findOne() {
        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const record = await client.query( `
            SELECT *
            FROM ${ this._modelName }s LIMIT 1;
        ` );

        // Release client ( necessary )
        await client.release();

        // Return result
        return record;
    }

    async save( object ) {
        // Deconstruct the received object
        let [ keys, prompt, values ] = lib._extractKeyPromptValueArrays( object );

        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const record = await client.query( {
            // name: `save-${ this._modelName }`,
            text: `INSERT INTO ${ this._modelName }s (${ keys.join( ', ' ) })
                   VALUES (${ prompt.join( ', ' ) }) RETURNING *`,
            values: values
        } );

        // Release client ( necessary )
        await client.release();

        // Return result
        return record;
    }

    async update( record_id, updatedObject ) {
        // Deconstruct the received object
        let [ keys, values ] = lib._extractUpdateKeysValues( updatedObject );

        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const record = await client.query( {
            // name: `update-${ this._modelName }`,
            text: `UPDATE ${ this._modelName }s
                   SET ${ keys.join( ', ' ) }
                   WHERE ${ this._modelName }_id=$1
                       RETURNING *`,
            values: [ record_id, ...values ]
        } );

        // Release client ( necessary )
        await client.release();

        // Return result
        return record;
    }

    async delete( record_id ) {

        // Get database client
        const client = await this._DatabaseFactory.getDbClient()

        // Query database
        const record = await client.query( {
            // name: `delete-${ this._modelName }`,
            text: `DELETE
                   FROM ${ this._modelName }s
                   WHERE ${ this._modelName }_id=$1
                       RETURNING *`,
            values: [ record_id ]
        } );

        // Release client ( necessary )
        await client.release();

        // Return result
        return record;
    }
}

module.exports = ActiveRecord;