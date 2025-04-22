"use strict";

(function () {

    window.addEventListener("load", init);
    function init() {
        let deleteButton = qs("button");
        deleteButton.addEventListener("click", function (e) {
            deleteGame(e.currentTarget.getAttribute("id"));
        });
    }

    function deleteGame(gameId) {
        console.log(gameId);
        fetch("/games/delete/" + gameId, {
            method: "DELETE"
        })
            .then(checkStatus)
            .then(reload)
            .catch(alert);
    }

    function reload() {
        location.replace("/games/all");
    }

    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }

    function id(idName) {
        return document.getElementById(idName);
    }

    function qs(cssSelector) {
        return document.querySelector(cssSelector);
    }
})();