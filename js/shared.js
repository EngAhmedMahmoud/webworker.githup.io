"use strict"
if ("serviceWorker" in navigator) {
    //register serviceWorker
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./../serviceWorker.js")
            .then((reg) => {
                console.log("Service is registered");
            })
            .catch((error) => {
                console.log(`${error}`)
            })
    });
}