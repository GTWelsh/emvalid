import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    validateForm(form) {
      form.validate();
    },

    validateField(field, trigger) {
      field.validate(trigger);
    }
  }
});
