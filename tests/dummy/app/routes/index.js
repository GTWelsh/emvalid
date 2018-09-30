
import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import Form from 'dummy/models/test/form';
import EMValidMixin from 'emvalid/mixins/emvalid';

export default Route.extend(EMValidMixin, {
  model() {
    return hash({
      form: Form.create()
    });
  }
});
