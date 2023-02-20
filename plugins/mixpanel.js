import Mixpanel from 'mixpanel';

const mixpanel = Mixpanel.init('e613a6e1f301b9b34075f3d8358cc205');

export default (context, inject) => {
    inject('mixpanel', mixpanel);
};
