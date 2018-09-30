import EmberObject from '@ember/object';
import EmvalidMixin from 'emvalid/mixins/emvalid';
import { module, test } from 'qunit';

module('Unit | Mixin | emvalid', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let EmvalidObject = EmberObject.extend(EmvalidMixin);
    let subject = EmvalidObject.create();
    assert.ok(subject);
  });
});
