const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const request = require( 'supertest' );
const app = require( '../../app' );


describe( "Not found", function () {
    it( "returns not found 404 message", function ( done ) {

        // Act
        request( app )
            .get( '/not-exist' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 404 );
                assert( response.body.type === "not found" );
                done()
            } );
    } );
} );

describe( "Server error", function () {
    it( "returns server error 500 message", function ( done ) {

        // Act
        request( app )
            .get( '/error' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 500 );
                assert( response.body.type === 'app error' );
                done();
            } );
    } );
} );

describe( "App requests", function () {
    it( "/ route get", function ( done ) {

        // Act
        request( app )
            .get( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home get response' );
                done();
            } );
    } );

    it( "/ route post", function ( done ) {

        // Act
        request( app )
            .post( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home post response' );
                done();
            } );
    } );

    it( "/ route patch", function ( done ) {

        // Act
        request( app )
            .patch( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home patch response' );
                done();
            } );
    } );

    it( "/ route delete", function ( done ) {

        // Act
        request( app )
            .delete( '/' )
            .end( ( err, response ) => {
                if ( err ) return;

                // Assert
                assert( response.status === 200 );
                assert( response.body.message === 'home delete response' );
                done();
            } );
    } );
} );