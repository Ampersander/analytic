import ua from "ua-parser-js";
import { WebAnalyticsSDKFactory } from "./webAnalyticsSDKFactory";
// request-ip : Get real client IP address in Node.js

const sdkFactory = new WebAnalyticsSDKFactory();

function trackerExpress({ APP_ID, APP_SECRET, SERVICE = "backend" }) {
    const sdk = sdkFactory.createSDK(APP_ID, APP_SECRET);

    return (req, res, next) => {
        const collectedUserData = {
            ip: req.ip,
            user_agent: req.headers["user-agent"],
            ...ua(req.headers["user-agent"]),
            referer: req.headers.referer,
            lang: req.acceptsLanguages()[0],
        };

        req.sendTrackingEvent = (data) => {
            sdk.trackEvent(
                data?.eventType || "eventTypeCustom",
                data?.tag || "tagCustom",
                (data.eventData = {
                    ...data,
                    ...collectedUserData,
                })
            );
        };

        next();
    };
}

export default trackerExpress;
