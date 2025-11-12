export function deepUnwrap(obj) {
  if (obj == null) return obj;

  if (Array.isArray(obj)) return obj.map(deepUnwrap);

  if (typeof obj === 'object') {
    if (Array.isArray(obj.nodes)) return obj.nodes.map(deepUnwrap);
    if (Array.isArray(obj.edges)) return obj.edges.map(e => deepUnwrap(e?.node));
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === '__typename') continue;
      out[k] = deepUnwrap(v);
    }
    return out;
  }

  return obj;
}
