[andculturecode-javascript-core](../README.md) › [DoTryConfig](dotryconfig.md)

# Interface: DoTryConfig

## Hierarchy

* **DoTryConfig**

## Index

### Properties

* [defaultErrorHandler](dotryconfig.md#optional-defaulterrorhandler)

## Properties

### `Optional` defaultErrorHandler

• **defaultErrorHandler**? : *[CatchResultHandler](../README.md#catchresulthandler)‹any›*

Defined in clients/andculture/kevinbusch-AndcultureCode.JavaScript.Core/src/interfaces/do-try-config.ts:10

A default handler that will always run on error, if configured,
even if a `catch()` does not exist in the call chain.
This is useful for adding default error handling in the
development environment, such as `console.error(err)`.
