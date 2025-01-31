const getInitialTheme = () => {
    if(localStorage.getItem("theme")) {
        return localStorage.getItem("theme") === "dark"
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export default getInitialTheme