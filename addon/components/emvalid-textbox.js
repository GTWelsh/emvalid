import Component from '@ember/component';
import layout from '../templates/components/emvalid-textbox';
import emvalidMixin from 'emvalid/mixins/emvalid';

export default Component.extend(emvalidMixin, {
  layout
});
