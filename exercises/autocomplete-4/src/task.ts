import { isPromise, wait } from './utils/promise';
interface ICancellablePromise<T> extends PromiseLike<T> {
  cancelled: boolean;
}

/**
 * Given a generator function that yields one or more
 * promises, chain them together in sequence
 *
 * @param {any} genFn generator function that yields one or more promises
 * @return {undefined}
 */
export function task<T>(genFn: () => IterableIterator<any>): ICancellablePromise<T> {
  let p = new Promise<T>(resolve => {
    let it = genFn();
    let value: any;
    function nextStep(lastPromiseVal: any) {
      let itResult = it.next(lastPromiseVal);
      if (itResult.done && typeof itResult.value === 'undefined') {
        resolve(value as T);
        return;
      } else {
        value = itResult.value;
        if (isPromise(value)) {
          value.then((promiseResult: any) => {
            nextStep(promiseResult);
          });
        } else {
          nextStep(value);
        }
      }
    }
    nextStep(undefined); //this is just the first time ok to pass in
  }) as ICancellablePromise<T>;
  p.cancelled = false;
  return p;
}

task(function*() {
  let first = yield wait(500).then(() => 'First');
  console.log('first', first);
  let second = yield wait(500).then(() => 'second');
  console.log('second', second);
  let third = yield 'third';
  console.log('six', third);
}).then(lastVal => {
  console.log('------>', lastVal);
});
