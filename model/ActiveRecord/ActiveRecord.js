'use strict';

/**
 * This is base class for all model classes.
 * This class provides database clients and few basic functions.
 */
const Db = require( '../../db' );
const lib = require( './lib/lib' );

class ActiveRecord {
    constructor( tableName, idColumnName ) {
        this._recordName = this.constructor.name;
        this._className = new.target.name;
        this._sqlQueryRunner = Db.getSqlQueryRunner();
        this._sqlTransactionQueryArrayRunner = Db.getSqlTransactionQueryArrayRunner();
        this._tableName = tableName || this._className + "s";
        this._idName = idColumnName || ( new.target.name + "_id" );
    }

    /**
     * Finds data by its id
     * @param id
     * @return {Promise<*>}
     */
    async findById( id ) {
        // Build query
        const query = lib._findByIdQueryBuilder( this, id );

        // Query database
        return await this._sqlQueryRunner( query );
    }

    /**
     * Finds one random data
     * @return {Promise<*>}
     */
    async findOne() {
        // Build query
        const query = lib._findOneQueryBuilder( this );

        // Query database
        return await this._sqlQueryRunner( query );
    }

    /**
     * Finds last updated 10 records.
     * @return {Promise<null>}
     */
    async findLastTen() {
        // Build query
        const query = lib._findLastTenQueryBuilder( this );

        // Query database
        return await this._sqlQueryRunner( query );
    }

    /**
     * Saves the data
     * @param object
     * @return {Promise<*>}
     */
    async save( object ) {
        // Build query
        const query = lib._saveQueryBuilder( this, object );

        // Query database
        return await this._sqlQueryRunner( query );
    }

    /**
     * Update data
     * @param record_id
     * @param updatedObject
     * @return {Promise<*>}
     */
    async update( record_id, updatedObject ) {
        // Build query
        const query = lib._updateQueryBuilder( this, record_id, updatedObject );

        // Query database
        return await this._sqlQueryRunner( query );
    }

    /**
     * Delete data by id
     * @param record_id
     * @return {Promise<*>}
     */
    async delete( record_id ) {
        // Build query
        const query = lib._deleteQueryBuilder( this, record_id );

        // Query database
        return await this._sqlQueryRunner( query );
    }
}

module.exports = ActiveRecord;
