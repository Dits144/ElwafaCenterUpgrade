const assert = require('node:assert/strict');
const path = require('node:path');

(async () => {
  const { INBOX_TEMPLATES, applyTemplate } = await import('./src/utils/inboxTemplates.js').catch(async () => {
    // If not compiled yet, test via ts or module import
    return import('./server/inbox-templates.mjs');
  });

  assert.ok(Array.isArray(INBOX_TEMPLATES), 'INBOX_TEMPLATES must be an array');
  assert.ok(INBOX_TEMPLATES.length >= 4, 'Must have at least 4 default templates');

  const inquiry = {
    name: 'Ahmad Faiz',
    subject: 'Pendaftaran S1 Al-Azhar',
    phone: '08123456789',
    due: '2026-11-15'
  };

  const template = INBOX_TEMPLATES[0];
  const applied = applyTemplate(template.text, inquiry, 'Ustadz Ridwan');

  assert.ok(applied.includes('Ahmad Faiz'), 'Must replace {nama} with inquiry name');
  assert.ok(applied.includes('Ustadz Ridwan'), 'Must replace {admin} with admin name');
  assert.ok(!applied.includes('{nama}'), 'No unreplaced {nama} placeholder');
  assert.ok(!applied.includes('{admin}'), 'No unreplaced {admin} placeholder');

  // Test fallback when fields are blank
  const blankInquiry = { name: '', subject: '', phone: '', due: '' };
  const blankApplied = applyTemplate(template.text, blankInquiry, '');
  assert.ok(!blankApplied.includes('{nama}'), 'Fallback applied for empty name');
  assert.ok(!blankApplied.includes('{admin}'), 'Fallback applied for empty admin');

  console.log('Inbox Quick-Reply Templates TDD: PASS');
})().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
