

export function connectionFromArray(data, args) {
  return connectionFromArraySlice(data, args, {sliceStart: 0, arrayLength: data.length})
}

export function connectionFromPromisedArray(dataPromise, args) {

  return dataPromise.then(data => connectionFromArray(data, args));
}

export function connectionFromArraySlice(arraySlice, args, meta) {

  const { after, before, first, last } = args;
  const { sliceStart, arrayLength } = meta;
  const sliceEnd = sliceStart + arraySlice.length;
  const beforeOffset = getOffsetWithDefault(before, arrayLength);
  const afterOffset = getOffsetWithDefault(after, -1);

  let startOffset = Math.max(sliceStart - 1, afterOffset, -1) + 1;
  let endOffset = Math.min(sliceEnd, beforeOffset, arrayLength);

  if(typeof first === 'number') {
    if(first < 0) {
      throw new Error('Argument "first" must be a non-negative interger');
    }
    endOffset = Math.min(endOffset,startOffset + first);
  }

  if (typeof last === 'number') {
    if(last < 0) {
      throw new Error('Argument "last" must be a non-negative interger')
    }
    startOffset = Math.max( startOffset, endOffset - last);
  }

  const slice = arraySlice.slice(
    Math.max(startOffset - sliceStart, 0),
    arraySlice.length - (sliceEnd - endOffset)
  );

  const edges = slice.map((value, index) => ({
    cursor: offsetToCursor(startOffset + index),
    node: value,
  }));

  const firstEdge = edges[0];
  const lastEdge = edges[edges.length - 1];
  const lowerBound = after ? (afterOffset + 1) : 0;
  const upperBound = before ? beforeOffset : arrayLength;
  return {
    edges,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : null,
      endCursor: lastEdge ? lastEdge.cursor : null,
      hasPreviousPage:
        typeof last === 'number' ? startOffset > lowerBound : false,
      hasNextPage:
        typeof first === 'number' ? endOffset < upperBound : false
    }
  };
}

export function getOffsetWithDefault(cursor, defaultOffset) {
  if(typeof cursor !== 'string') {
    return defaultOffset
  }
  const offset = cursorToOffset(cursor);
  return isNaN(offset) ? defaultOffset : offset;
}

const PREFIX = 'arrayconnection:';

export function offsetToCursor(offset) {
  return PREFIX + offset
}

export function cursorToOffset(cursor) {
  return parseInt(cursor.substring(PREFIX.length), 10)
}
