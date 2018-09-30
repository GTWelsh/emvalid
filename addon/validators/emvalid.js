import EmberObject from "@ember/object";

const MaxLengthValidator = EmberObject.extend({
  validate(input) {
    if (!this.maxLength) {
      return null;
    }

    const valid = !input || input.length <= this.maxLength;

    if (!valid) {
      return this.getWithDefault('message', `This input must be ${this.maxLength} characters or less.`);
    }

    return null;
  }
});

const MinLengthValidator = EmberObject.extend({
  validate(input) {
    if (!this.minLength) {
      return null;
    }

    const valid = !input || input.length >= this.minLength;

    if (!valid) {
      return this.getWithDefault('message', `This input must be ${this.minLength} characters or more.`);
    }

    return null;
  }
});

const RegexValidator = EmberObject.extend({
  validate(input) {
    if (!this.pattern) {
      return null;
    }

    if (this.allowEmpty && !input) {
      return null;
    }

    const valid = input.search(this.pattern) !== -1;

    if (!valid) {
      return this.getWithDefault('message', `Input invalid.`);
    }

    return null;
  }
});

const NumericValidator = RegexValidator.extend({
  init() {
    this._super(...arguments);

    this.pattern = /^\d+$/;
    this.allowEmpty = true;
  }
});

const RequiredValidator = EmberObject.extend({
  validate(input) {
    const valid = !!input;

    if (!valid) {
      return this.getWithDefault('message', `This input is required.`);
    }

    return null;
  }
});

export {
  MaxLengthValidator,
  MinLengthValidator,
  RequiredValidator,
  RegexValidator,
  NumericValidator
};
