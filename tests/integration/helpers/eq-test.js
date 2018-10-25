import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | eq', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue1', '1234');
    this.set('inputValue2', '1234');

    await render(hbs`{{eq inputValue1 inputValue2}}`);

    assert.equal(this.element.textContent.trim(), 'true');
  });
});
