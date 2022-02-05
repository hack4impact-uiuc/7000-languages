export default ({ config }) => {
    return {
        ...config,
        extra: {
            "developmentApiPort": "3000"
        }
    };
};