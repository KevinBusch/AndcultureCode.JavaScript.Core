[andculturecode-javascript-core](../README.md) › [ServiceResponse](serviceresponse.md)

# Interface: ServiceResponse <**T**>

## Type parameters

▪ **T**

## Hierarchy

* **ServiceResponse**

## Index

### Properties

* [result](serviceresponse.md#optional-result)
* [resultObject](serviceresponse.md#optional-resultobject)
* [resultObjects](serviceresponse.md#optional-resultobjects)
* [results](serviceresponse.md#optional-results)
* [rowCount](serviceresponse.md#rowcount)
* [status](serviceresponse.md#status)

## Properties

### `Optional` result

• **result**? : *[ResultRecord](../classes/resultrecord.md)‹T›*

Defined in clients/andculture/kevinbusch-AndcultureCode.JavaScript.Core/src/interfaces/service-response.ts:8

Result object containing detailed response information,
such as; errors, result data, etc...

___

### `Optional` resultObject

• **resultObject**? : *T*

Defined in clients/andculture/kevinbusch-AndcultureCode.JavaScript.Core/src/interfaces/service-response.ts:14

Convenience property to read result's nested record

___

### `Optional` resultObjects

• **resultObjects**? : *T[]*

Defined in clients/andculture/kevinbusch-AndcultureCode.JavaScript.Core/src/interfaces/service-response.ts:15

___

### `Optional` results

• **results**? : *[ResultRecord](../classes/resultrecord.md)‹T[]›*

Defined in clients/andculture/kevinbusch-AndcultureCode.JavaScript.Core/src/interfaces/service-response.ts:9

___

###  rowCount

• **rowCount**: *number*

Defined in clients/andculture/kevinbusch-AndcultureCode.JavaScript.Core/src/interfaces/service-response.ts:22

Totoal possible records available for the initial service request. If greater
than total results in this response, additional pages of results can be
requested from the API

___

###  status

• **status**: *number*

Defined in clients/andculture/kevinbusch-AndcultureCode.JavaScript.Core/src/interfaces/service-response.ts:27

HTTP status code of the response
