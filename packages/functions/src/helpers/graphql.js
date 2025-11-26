/**
 *
 * @param obj
 * @returns {{}|*|(*|{})[]}
 */
export function normalizeGraphQLResponse(obj) {
  if (obj == null) return obj;

  if (Array.isArray(obj)) return obj.map(normalizeGraphQLResponse);

  if (typeof obj === 'object') {
    if (Array.isArray(obj.nodes)) return obj.nodes.map(deepUnwrap);
    if (Array.isArray(obj.edges)) return obj.edges.map(e => deepUnwrap(e?.node));
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === '__typename') continue;
      out[k] = normalizeGraphQLResponse(v);
    }
    return out;
  }

  return obj;
}
