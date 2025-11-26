import {readFileSync} from 'fs';

/**
 *
 * @param path
 * @returns {string}
 */
export function loadGraphQL(path) {
  return readFileSync('./src/graphql' + path, 'utf8');
}

/**
 *
 * @param obj
 * @returns {{}|*|(*|{})[]}
 */
export function normalizeGraphQLResponse(obj) {
  if (obj == null) return obj;

  if (Array.isArray(obj)) return obj.map(normalizeGraphQLResponse);

  if (typeof obj === 'object') {
    if (Array.isArray(obj.nodes)) return obj.nodes.map(normalizeGraphQLResponse);
    if (Array.isArray(obj.edges)) return obj.edges.map(e => normalizeGraphQLResponse(e?.node));
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === '__typename') continue;
      out[k] = normalizeGraphQLResponse(v);
    }
    return out;
  }

  return obj;
}
