import Mixpanel from 'mixpanel';
import { MIXPANEL_TOKEN } from "~/assets/js/constants";


const mixpanel = Mixpanel.init(MIXPANEL_TOKEN);

export default (context, inject) => {
    inject('mixpanel', mixpanel);
};
