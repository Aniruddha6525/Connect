// Simple API helper for the frontend. Uses Vite env var VITE_API_BASE if set.
const API_BASE = import.meta.env.VITE_API_BASE || '';

function buildUrl(path, params) {
  const url = new URL((API_BASE + path), window.location.origin);
  if (params) {
    Object.keys(params).forEach((k) => {
      if (params[k] !== undefined && params[k] !== null) url.searchParams.append(k, params[k]);
    });
  }
  return url.toString().replace(window.location.origin, '');
}

async function request(method, path, { params, body, headers } = {}) {
  const url = buildUrl(path, params);
  const opts = { method, headers: { 'Content-Type': 'application/json', ...(headers || {}) } };
  if (body !== undefined) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    let json;
    try { json = JSON.parse(text); } catch(e) { json = { error: text || res.statusText }; }
    const err = new Error(json.error || `Request failed: ${res.status}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return res.json().catch(() => null);
}

export const api = {
  get: (path, opts) => request('GET', path, opts),
  post: (path, opts) => request('POST', path, opts),
  put: (path, opts) => request('PUT', path, opts),
  del: (path, opts) => request('DELETE', path, opts),
};

export default api;
