import * as immutable from "immutable";
import * as _ from "lodash";

// -----------------------------------------------------------------------------------------
// #region Private Methods
// -----------------------------------------------------------------------------------------

export namespace CollectionUtils {

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
    export function equalsBy<T, V>(
        selector: (element: T) => V,
        array1: Array<T> | immutable.List<any> | undefined,
        array2: Array<T> | immutable.List<any> | undefined
    ) {
        if (array1 == null) {
            return array2 == null;
        }

        if (array2 == null) {
            return false;
        }

        if (length(array1) !== length(array2)) {
            return false;
        }

        const hasDifferingValues =
            array1.some(
                (s: T) => !array2.some((ss: T) => selector(s) === selector(ss))
            ) ||
            array2.some(
                (s: T) => !array1.some((ss: T) => selector(s) === selector(ss))
            );

        return !hasDifferingValues;
    };

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
    export function hasValues(
        ...collections: Array<any[] | immutable.List<any> | undefined>
    ): boolean {
        let hasValues = false;
        collections.forEach((collection: any[] | immutable.List<any> | undefined) => {
            if (!isEmpty(collection)) {
                hasValues = true;
            }
        });
        return hasValues;
    };

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
    export function isEmpty(
        ...collections: Array<any[] | immutable.List<any> | undefined>
    ): boolean {
        let isEmpty = true;

        collections.forEach((collection: any[] | immutable.List<any> | undefined) => {
            if (collection == null) {
                return;
            }
            if (collection instanceof immutable.List) {
                const collectionList = collection as immutable.List<any>;
                if (collectionList.size !== 0) {
                    isEmpty = false;
                }
            } else {
                const collectionArray = collection as any[];
                if (collectionArray.length !== 0) {
                    isEmpty = false;
                }
            }
        });

        return isEmpty;
    };

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
    export function isNotEmpty(
        ...collections: Array<any[] | immutable.List<any> | undefined>
    ): boolean {
        return !isEmpty(...collections);
    };

    /**
     * Utility function to get the length of a collection
     * when the collection might be either a List or an Array
     * @param arr the collection
     * @returns number the length of the collection
     */
    export function length(arr: Array<any> | immutable.List<any>): number {
        if (arr == null) {
            return -1;
        }

        if (arr instanceof immutable.List) {
            return (arr as immutable.List<any>).size;
        }

        return (arr as Array<any>).length;
    };

    /**
     * Removes a supplied element by index
     * @param source original array
     * @param index array index to remove
     */
    export function removeElementAt<T>(source: Array<T>, index: number): Array<T> {
        if (index < 0 || index > source.length) {
            return source;
        }

        const newArr = [...source];
        newArr.splice(index, 1);
        return newArr;
    };

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
    export function replaceElementAt<T>(
        source: Array<T>,
        index: number,
        value: T
    ): Array<T> {
        if (source.length === 0 || index < 0) {
            return source;
        }
        if (source.length === 1) {
            return [value];
        }

        if (index === source.length - 1) {
            return [...source.slice(0, index), value];
        }

        return [...source.slice(0, index), value, ...source.slice(index + 1)];
    };

    export function first<T>(array: Array<T> | null | undefined): T | undefined { // Using 'Array' since 'List' is imported from Immutable library
        return _.head(array);
    }

    export function flattenDeep<T>(array: _.ListOfRecursiveArraysOrValues<T> | null | undefined): T[] {
        return _.flattenDeep(array);
    }

    export function sample<T>(
        collection: Array<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined // Using 'Array' since 'List' is imported from Immutable library
    ): T | undefined {
        return _.sample(collection);
    }

    export function sampleSize<T>(
        collection: Array<T> | _.Dictionary<T> | _.NumericDictionary<T> | null | undefined, // Using 'Array' since 'List' is imported from Immutable library
        n?: number
    ): T[] {
        return _.sampleSize(collection, n);
    }

    export function take<T>(
        array: Array<T> | null | undefined, // Using 'Array' since 'List' is imported from Immutable library
        n?: number
    ): T[] {
        return _.take(array, n);
    }
}

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
