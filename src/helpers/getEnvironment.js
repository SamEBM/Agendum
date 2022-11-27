export const getEnvironment = () => {
    // import.meta.env;

    return {
        // ...import.meta.env
        VITE_API_URL: import.meta.env.VITE_API_URL
    }
}