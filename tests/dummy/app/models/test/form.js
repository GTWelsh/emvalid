import { NumericValidator, RequiredValidator, MaxLengthValidator, MinLengthValidator } from 'emvalid/validators/emvalid';
import { EMField, EMForm } from 'emvalid/models/emvalid';

const nameField = EMField.create({
  value: '',
  label: 'Name',
  type: 'text',
  class: 'test-class',
  validators: [
    RequiredValidator.create({
      triggers: ['change'],
      message: 'Please enter a name'
    }),
    MinLengthValidator.create({
      triggers: ['key-up'],
      minLength: 3,
      message: 'Please ensure inputs are 3 characters or more'
    }),
    NumericValidator.create({
      triggers: ['key-up'],
      message: 'Only use numbers.'
    })
  ]
});

const passwordField = EMField.create({
  value: '',
  label: 'Password',
  type: 'password',
  class: 'password-class',
  validators: [
    RequiredValidator.create({
      triggers: ['key-up'],
      message: 'Please enter a password'
    }),
    MaxLengthValidator.create({
      triggers: ['key-up'],
      maxLength: 3,
      message: 'Please ensure passwords are 3 characters or less'
    })
  ]
});

const otherField = EMField.create({ label: 'Other' });
const someField = EMField.create({ label: 'Some' });

export default EMForm.extend({
  init() {
    this._super(...arguments);

    this.setProperties({
      // nameField, reference fields here to use individually
      fields: [
        nameField,
        passwordField,
        otherField,
        someField
      ]
    });
  }
});
