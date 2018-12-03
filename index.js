const fromIter = iter => (start, sink) => {
  if (start !== 0) return;
  const iterator = typeof Symbol !== 'undefined' && iter[Symbol.iterator]
    ? iter[Symbol.iterator]()
    : iter;
  let value, done, disposed, draining;
  sink(0, t => {
    if (disposed || done) return;
    if (t === 1) {
      while (draining = !draining) {
        ({ done, value } = iterator.next());
        done ? sink(2) : sink(1, value);
      }
    }
    if (t === 2) disposed = true;
  });
};

module.exports = fromIter;
