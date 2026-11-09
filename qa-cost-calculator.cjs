const assert = require('node:assert/strict');

(async () => {
  const { calculateStudyCost } = await import('./src/utils/costCalculator.js').catch(async () => {
    return import('./src/utils/costCalculator.ts');
  }).catch(async () => {
    return import('./server/cost-calculator.mjs');
  });

  // Test S1 Al-Azhar default
  const res1 = calculateStudyCost({
    program: 's1-azhar',
    accommodation: 'asrama-elwafa',
    lifestyle: 'standar',
    exchangeRateEgp: 320,
  });

  assert.equal(res1.tuitionFeeIdr, 0, 'Al-Azhar formal tuition must be Rp 0 (Free)');
  assert.ok(res1.monthlyLivingIdr > 0, 'Monthly living cost must be calculated');
  assert.ok(res1.initialCostIdr > 0, 'Initial preparation cost must be calculated');
  assert.ok(res1.monthlyLivingEgp > 0, 'EGP conversion must be present');
  assert.equal(res1.firstYearTotalIdr, res1.initialCostIdr + (res1.monthlyLivingIdr * 12));

  // Test Ma'had Bu'uts with free dorm
  const res2 = calculateStudyCost({
    program: 'mahad-buuts',
    accommodation: 'asrama-buuts',
    lifestyle: 'mandiri',
    exchangeRateEgp: 320,
  });

  assert.equal(res2.tuitionFeeIdr, 0, 'Ma\'had formal tuition must be Rp 0');
  assert.equal(res2.accommodationMonthlyIdr, 0, 'Asrama Bu\'uts must be Rp 0');
  assert.ok(res2.monthlyLivingIdr < res1.monthlyLivingIdr, 'Mandiri with free dorm must be cheaper than private dorm');

  console.log('Cost Calculator TDD: PASS');
})().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
