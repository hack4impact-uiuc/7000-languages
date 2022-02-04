export default ({ config }) => {
    console.log(config.name); // prints 'My App'
    return {
        ...config,
        extra: {
            "apiUrl": "http://localhost:9000"
        }
    };
};