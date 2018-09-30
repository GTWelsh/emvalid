emvalid
==============================================================================

Validation lib for EmberJS.

Better documentation coming soon...

Installation
------------------------------------------------------------------------------

```
ember install emvalid
```


Usage
------------------------------------------------------------------------------

Example

```javascript
// setting up the form
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
      // reference fields here (as-well!) to use individually
      fields: [
        nameField,
        passwordField,
        otherField,
        someField
      ]
      // field array is required for form level validation
    });
  }
});

```

```javascript

// route file
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

// import our form we setup
import Form from 'myapp/models/test/form';

// include the mixin for submit button level validation
import EMValidMixin from 'emvalid/mixins/emvalid';

export default Route.extend(EMValidMixin, {
  model() {
    return hash({
      form: Form.create()
    });
  }
});

```

```htmlbars
<p>Form Valid: {{model.form.valid}}</p>

{{#each model.form.fields as |field|}}
  {{emvalid-textbox field=field}}
{{/each}}

<hr>

<button {{action "validateForm" model.form}}>Submit</button>
```

The `EMValidMixin` contains the `validateForm` action.

You can use this many different ways, this is just one example.

Validators available:

- NumericValidator
- RequiredValidator (as seen in example)
- MinLengthValidator (as seen in example)
- MaxLengthValidator (as seen in example)
- RegexValidator (accepts a `pattern` option for some regex)

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone https://github.com/GTWelsh/emvalid`
* `cd emvalid`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
