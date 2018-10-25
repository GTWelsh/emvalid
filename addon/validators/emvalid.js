import EmberObject from "@ember/object";

const MaxLengthValidator = EmberObject.extend({
  valid: true,
  validate(input) {
    if (!this.maxLength) {
      this.set('valid', true);
      return;
    }

    const valid = !input || input.length <= this.maxLength;

    this.set('valid', valid);
  }
});

const MinLengthValidator = EmberObject.extend({
  valid: true,
  validate(input) {
    if (!this.minLength) {
      this.set('valid', true);
      return;
    }

    const valid = !input || input.length >= this.minLength;

    this.set('valid', valid);
  }
});

const RegexValidator = EmberObject.extend({
  valid: true,
  validate(input) {
    if (!this.pattern) {
      this.set('valid', true);
      return;
    }

    if (this.allowEmpty && !input) {
      this.set('valid', true);
      return;
    }

    let valid = input.search(this.pattern) !== -1;

    this.set('valid', valid);
  }
});

const NumericValidator = RegexValidator.extend({
  valid: true,
  init() {
    this._super(...arguments);

    this.pattern = /^\d+$/;
    this.allowEmpty = true;
  }
});

const RequiredValidator = EmberObject.extend({
  valid: true,
  validate(input) {
    const valid = !!input;

    this.set('valid', valid);
  }
});

export {
  MaxLengthValidator,
  MinLengthValidator,
  RequiredValidator,
  RegexValidator,
  NumericValidator
};
