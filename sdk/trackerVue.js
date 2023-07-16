import { WebAnalyticsSDKFactory } from "./webAnalyticsSDKFactory";

const eventListeners = {};

const sdkFactory = new WebAnalyticsSDKFactory();

export default {
    install(Vue, _options) {
        const sdk = sdkFactory.createSDK(_options.APP_ID);

        Vue.directive("tracker", {
            mounted(el, binding) {
                eventListeners[binding.value] = () => {
                    sdk.trackClick(binding.value);
                };
                el.addEventListener("click", eventListeners[binding.value]);
            },
            unmounted(el, binding) {
                el.removeEventListener("click", eventListeners[binding.value]);
                delete eventListeners[binding.value];
            },
        });

        const customSendEvent = (data) => {
            sdk.trackEvent(
                data?.eventType || "eventTypeCustom",
                data?.tag || "tagCustom",
                data?.eventData || "eventDataCustom"
            );
        };
        Vue.provide("SEND_EVENT_CUSTOM", customSendEvent);
    },
};
