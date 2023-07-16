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
                data?.visitorId || "visitorIdCustom",
                data?.eventData || "eventDataCustom"
            );
        };
        Vue.provide("SEND_EVENT_CUSTOM", customSendEvent);
    },
};

// by convention, composable function names start with "use"
export function useMouse() {
    // state encapsulated and managed by the composable
    const x = ref(0);
    const y = ref(0);
    const sendEvent = inject("SEND_EVENT_CUSTOM");

    // a composable can update its managed state over time.
    function update(event) {
        sendEvent({
            tag: "mouse",
            event_type: "mousemove",
            x: event.pageX,
            y: event.pageY,
        });
    }

    // a composable can also hook into its owner component's
    // lifecycle to setup and teardown side effects.
    onMounted(() => window.addEventListener("mousemove", update));
    onUnmounted(() => window.removeEventListener("mousemove", update));

    // expose managed state as return value
    return { x, y };
}
