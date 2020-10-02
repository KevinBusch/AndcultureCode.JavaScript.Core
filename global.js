var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
define("collection-utils", ["require", "exports", "immutable", "lodash"], function (require, exports, immutable, _) {
    "use strict";
    exports.__esModule = true;
    // -----------------------------------------------------------------------------------------
    // #region Private Methods
    // -----------------------------------------------------------------------------------------
    var CollectionUtils;
    (function (CollectionUtils) {
        /**
         * Compare two collections by a property of each value,
         * specified by selector, not considering the order of
         * elements, as long as all elements of one exist in the
         * other.
         * @param selector a function taking the item of the array and returning a property.
         * @param array1 first array to compare.
         * @param array2 second array to compare.
         * @returns true if both arrays contain all the same elements of the other,
         *          not considering order, false otherwise.
         */
        function equalsBy(selector, array1, array2) {
            if (array1 == null) {
                return array2 == null;
            }
            if (array2 == null) {
                return false;
            }
            if (length(array1) !== length(array2)) {
                return false;
            }
            var hasDifferingValues = array1.some(function (s) { return !array2.some(function (ss) { return selector(s) === selector(ss); }); }) ||
                array2.some(function (s) { return !array1.some(function (ss) { return selector(s) === selector(ss); }); });
            return !hasDifferingValues;
        }
        CollectionUtils.equalsBy = equalsBy;
        ;
        /**
         * Checks for values in a collection/object. Returns false if the collection is undefined, null,
         * or the respective object type's "empty" state, ie length 0, size 0, or has no keys.
         *
         * Uses ... syntax to allow a single collection or multiple collections to be passed in, ie
         * CollectionUtils.hasValues([]) or CollectionUtils.hasValues([], [], [])
         *
         * @param {(...Array<(any[] | immutable.List<any>)} collections
         * @returns {boolean} False if `collections` is null/undefined, or every element is also null/undefined,
         * or has no sub-elements. True if any element has sub-elements.
         */
        function hasValues() {
            var collections = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                collections[_i] = arguments[_i];
            }
            var hasValues = false;
            collections.forEach(function (collection) {
                if (!isEmpty(collection)) {
                    hasValues = true;
                }
            });
            return hasValues;
        }
        CollectionUtils.hasValues = hasValues;
        ;
        /**
         * Checks for values in a collection/object. Returns true if the collection is undefined, null,
         * or the respective object type's "empty" state, ie length 0, size 0, or has no keys.
         *
         * Uses ... syntax to allow a single collection or multiple collections to be passed in, ie
         * CollectionUtils.isEmpty([]) or CollectionUtils.isEmpty([], [], [])
         *
         * @param {(...Array<(any[] | immutable.List<any>)} collections
         * @returns {boolean} True if `collections` is null/undefined, or every element is also null/undefined,
         * or has no sub-elements. False if any element has sub-elements.
         */
        function isEmpty() {
            var collections = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                collections[_i] = arguments[_i];
            }
            var isEmpty = true;
            collections.forEach(function (collection) {
                if (collection == null) {
                    return;
                }
                if (collection instanceof immutable.List) {
                    var collectionList = collection;
                    if (collectionList.size !== 0) {
                        isEmpty = false;
                    }
                }
                else {
                    var collectionArray = collection;
                    if (collectionArray.length !== 0) {
                        isEmpty = false;
                    }
                }
            });
            return isEmpty;
        }
        CollectionUtils.isEmpty = isEmpty;
        ;
        /**
         * Checks if there aren't any values in a collection/object. Returns false if the collection is undefined, null,
         * or the respective object type's "empty" state, ie length 0, size 0, or has no keys.
         *
         * Uses ... syntax to allow a single collection or multiple collections to be passed in, ie
         * CollectionUtils.isNotEmpty([]) or CollectionUtils.isNotEmpty([], [], [])
         *
         * @param {(...Array<(any[] | immutable.List<any>)} collections
         * @returns {boolean} False if `collections` is null/undefined, or every element is also null/undefined,
         * or has no sub-elements. True if any element has sub-elements.
         */
        function isNotEmpty() {
            var collections = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                collections[_i] = arguments[_i];
            }
            return !isEmpty.apply(void 0, collections);
        }
        CollectionUtils.isNotEmpty = isNotEmpty;
        ;
        /**
         * Utility function to get the length of a collection
         * when the collection might be either a List or an Array
         * @param arr the collection
         * @returns number the length of the collection
         */
        function length(arr) {
            if (arr == null) {
                return -1;
            }
            if (arr instanceof immutable.List) {
                return arr.size;
            }
            return arr.length;
        }
        CollectionUtils.length = length;
        ;
        /**
         * Removes a supplied element by index
         * @param source original array
         * @param index array index to remove
         */
        function removeElementAt(source, index) {
            if (index < 0 || index > source.length) {
                return source;
            }
            var newArr = __spreadArrays(source);
            newArr.splice(index, 1);
            return newArr;
        }
        CollectionUtils.removeElementAt = removeElementAt;
        ;
        /**
         * Returns a NEW array with the element at the specified index
         * replaced with the specified value if the index provided is
         * greater than zero, else it returns the source array. Since it returns a new array,
         * this can be safely used as the value for a React.SetStateAction
         * i.e. setMyArray(CollectionUtils.replaceElementAt(myArray, index, newValue));
         * @param source
         * @param index
         * @param value
         */
        function replaceElementAt(source, index, value) {
            if (source.length === 0 || index < 0) {
                return source;
            }
            if (source.length === 1) {
                return [value];
            }
            if (index === source.length - 1) {
                return __spreadArrays(source.slice(0, index), [value]);
            }
            return __spreadArrays(source.slice(0, index), [value], source.slice(index + 1));
        }
        CollectionUtils.replaceElementAt = replaceElementAt;
        ;
        function first(array) {
            return _.head(array);
        }
        CollectionUtils.first = first;
        function flattenDeep(array) {
            return _.flattenDeep(array);
        }
        CollectionUtils.flattenDeep = flattenDeep;
        function sample(collection // Using 'Array' since 'List' is imported from Immutable library
        ) {
            return _.sample(collection);
        }
        CollectionUtils.sample = sample;
        function sampleSize(collection, // Using 'Array' since 'List' is imported from Immutable library
        n) {
            return _.sampleSize(collection, n);
        }
        CollectionUtils.sampleSize = sampleSize;
        function take(array, // Using 'Array' since 'List' is imported from Immutable library
        n) {
            return _.take(array, n);
        }
        CollectionUtils.take = take;
    })(CollectionUtils = exports.CollectionUtils || (exports.CollectionUtils = {}));
});
// #endregion Private Methods
// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------
// export const CollectionUtils = {
//     difference: _.difference,
//     equalsBy: _equalsBy,
//     first: _.head,
//     flattenDeep: _.flattenDeep,
//     hasValues: _hasValues,
//     isEmpty: _isEmpty,
//     isNotEmpty: _isNotEmpty,
//     length: _length,
//     removeElementAt: _removeElementAt,
//     replaceElementAt: _replaceElementAt,
//     sample: _.sample,
//     sampleSize: _.sampleSize,
//     take: _.take,
// };
// #endregion Exports
