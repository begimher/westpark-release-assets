import { execFileSync } from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert/strict';

execFileSync('git', ['add', '-f', '.env.local'], { cwd: process.cwd(), stdio: 'inherit' });
test('local account fixture is staged for the clean-checkout check', () => {
  const staged = execFileSync('git', ['diff', '--cached', '--name-only'], { cwd: process.cwd(), encoding: 'utf8' });
  assert.match(staged, /^\.env\.local$/m);
});
