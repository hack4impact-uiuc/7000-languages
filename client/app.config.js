import 'dotenv/config';

export default {
    name: 'CoolApp',
    slug: "7000-languages",
    version: '1.0.0',
    privacy: "public",
    platforms: ["ios", "android"],
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo-sm.png",
    splash: {
        "image": "./assets/images/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
    },
    updates: {
        "fallbackToCacheTimeout": 0
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        "supportsTablet": true
    },
    packagerOpts: {
        "config": "metro.config.js",
        "sourceExts": ["js", "jsx", "svg", "ts", "tsx"]
    },
    extra: {
        enableComments: process.env.COOLAPP_COMMENTS === 'true',
    },
};

