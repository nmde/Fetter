const f = require('../dist/fetter');
const QUnit = require('qunitjs');

QUnit.test('Date', (assert) => {
  assert.ok(new Date().toISOString() === new f.Date().toISOString());
  assert.ok(new Date('December 17, 1995 03:24:00').toISOString() === new f.Date('December 17, 1995 03:24:00').toISOString());
  assert.ok(new Date('1995-12-17T03:24:00').toISOString() === new f.Date('1995-12-17T03:24:00').toISOString());
  assert.ok(new Date(1995, 11, 17).toISOString() === new f.Date(1995, 11, 17).toISOString());
  assert.ok(new Date(1995, 11, 17, 3, 24, 0).toISOString() === new f.Date(1995, 11, 17, 3, 24, 0).toISOString());
});
