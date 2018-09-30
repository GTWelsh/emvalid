import EmberObject, { observer, computed } from "@ember/object";
import { camelize } from '@ember/string';
import { A } from '@ember/array';

const EMForm = EmberObject.extend({
  init() {
    this._super(...arguments);

    this.setProperties({
      valid: true
    });
  },
  validate() {
    if (this.get('valid') === undefined) {
      throw 'You must use this._super(...arguments) in "init()" when making Forms';
    }

    let valid = true;
    for (let index = 0; index < this.fields.length; index++) {
      const field = this.fields[index];
      const fieldValid = field.validate('form');
      if (!fieldValid) {
        valid = false;
      }
    }

    return valid;
  },
  watchForFieldChanges: observer('fields.@each.valid', function () {
    const fields = this.get('fields');
    if (!fields) {
      return;
    }

    this.set('valid', fields.every(x => x.valid));
  }),
  errors: computed('fields.@each.errorsComputed', function () {
    return [].concat.apply([], this.fields.map(x => x.errors));
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
  type: 'text',
  value: '',

  init() {
    this._super(...arguments);

    this.setProperties({
      errors: [],
      valid: true
    });
  },
  errorsComputed: computed('errors.[]', function () {
    return this.get('errors');
  }),
  validate(trigger) {
    const validators = this.get('validators');

    let fieldValid = true;
    let validatorRan = false;

    if (validators && validators.length) {
      for (let index = 0; index < validators.length; index++) {
        const validator = validators[index];

        // always allow form triggered validation (usually on-submit)
        if (validator.triggers.includes(trigger) || trigger === 'form') {
          validatorRan = true;
          const message = validator.validate(this.value);
          const indexOfErrors = this.errors.map(x => x.validator).indexOf(validator);
          if (indexOfErrors !== -1) {
            this.errors.removeAt(indexOfErrors);
          }
          if (message) {
            fieldValid = false;
            A(this.errors).pushObject({
              validator,
              message
            });
          }
        }
      }
    }

    // if validator ran, we can trust the result
    if (validatorRan) {
      this.set('valid', fieldValid);
      return fieldValid;
    }

    // if no validator ran, return current status
    return this.valid;
  }
});

export {
  EMForm, EMField
};
