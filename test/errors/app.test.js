'use strict';
const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( 'supertest' );
const app = require( '../../app' );


describe( "Errors/app", function () {
    it( "/not-exist returns 'not_found' 404", function ( done ) {

        // Act
        request( app )
            .get( '/not-exist' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 404 );
                assert( response.body.error === "not_found" );
                done()
            } );
    } );

    if ( process.env?.DB_CONN !== "none" ) {
        it( "/users?first_name=Not_exist returns 'record_not_found' 404", function ( done ) {

            // Act
            request( app )
                .get( '/users?first_name=Not_exist' )
                .end( ( err, response ) => {
                    if ( err ) return;

                    // Assert
                    assert( response.status === 200 );
                    assert.deepStrictEqual( response.body.error, "record_not_found" );
                    done();
                } );
        } );
    }
} );

describe( "Errors/app", function () {
    it( "/error returns 'application_error' 500", function ( done ) {

        // Act
        request( app )
            .get( '/error' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 500 );
                assert.deepStrictEqual( response.body.error, 'application_error' );
                done();
            } );
    } );
} );
