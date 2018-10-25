import EmberObject, { computed } from "@ember/object";
import { camelize } from '@ember/string';

const EMForm = EmberObject.extend({
  fields: null,
  valid: computed('fields.@each.valid', function() {
    const fields = this.get('fields');
    if (!fields) return true;
    const valid = fields.every(x => !!x.get('valid'));
    return valid;
  }),
  validate() {
    if (this.get('valid') === undefined) {
      throw 'You must use this._super(...arguments) in "init()" when making Forms';
    }

    for (let index = 0; index < this.fields.length; index++) {
      const field = this.fields[index];
      field.validate('form');
    }
  },
  errors: computed('fields.@each.errors', function () {
    return [].concat.apply([], this.fields.map(x => x.get('errors')));
  }),
  values: computed('fields.@each.value', function() {
    return this.get('fields').map(x => {
      let propName = camelize(x.label || x.name);
      return JSON.stringify({
        [propName]: x.checked || x.value
      });
    }).join('&');
  })
});

const EMField = EmberObject.extend({
  type: null,
  value: null,
  validators: null,

  init() {
    this._super(...arguments);

    let type = this.get('type');
    if (!type) {
      this.set('type', 'text');
    }

    let value = this.get('value');
    if (!value) {
      this.set('value', '');
    }
  },
  errors: computed('validators.@each.{valid,message}', function () {
    const validators = this.get('validators');

    if (!validators) return [];

    return validators.filter(x => !x.get('valid')).map(x => x.message);
  }),
  valid: computed('validators.@each.valid', function() {
    const validators = this.get('validators');
    if (!validators) return true;
    const valid = validators.every(x => !!x.get('valid'));
    return valid;
  }),
  validate(trigger) {
    const validators = this.get('validators');

    if (validators && validators.length) {
      for (let index = 0; index < validators.length; index++) {
        const validator = validators[index];

        // always allow form triggered validation (usually on-submit)
        if (validator.triggers.includes(trigger) || trigger === 'form') {
          validator.validate(this.value);
        }
      }
    }
  }
});

export {
  EMForm, EMField
};
