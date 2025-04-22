"use strict";
(function () {

    window.addEventListener("load", init);
    function init() {
        //  loadGames();

        let newButton = id("new-game-btn");
        newButton.addEventListener("click", function () {
            id("form-popup").style.display = "block";
        });

        let saveButton = id("save-game");
        saveButton.addEventListener("click", function (e) {
            e.preventDefault();
            submitForm();
        });

        let closeButton = id("cancel-btn");
        closeButton.addEventListener("click", function (e) {
            id("form-container").reset();
            id("form-popup").style.display = "none";
        });

        let deleteButtons = qsa(".delete-game");
        for (let index = 0; index < deleteButtons.length; index++) {
            const element = deleteButtons[index];
            element.addEventListener("click", function (e) {
                let myId = e.currentTarget.getAttribute("id");
                deleteGame(e.currentTarget.getAttribute("id"));
            });

        }

    }

    function submitForm() {
        let params = new FormData(id("form-container")); // pass in entire form tag
        let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
        fetch("/games/add", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: jsonBody,
        })
            .then(checkStatus)
            .then(reload)
            .catch(alert);
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
        location.reload();
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

    function qsa(className) {
        return document.querySelectorAll(className);
    }


    /**
     * THE FUNCTIONS BELOW ARE FOR USING VANILLA JAVASCRIPT. 
     * I DID NOT TEST THEM.
     * MESS AROUND WITH THEM AND FIND OUT!
     */

    function loadGames() {
        let gamesDiv = document.getElementById("items-container");
        fetch("/games/all")
            .then(checkStatus)
            .then((response) => {
                for (const item of response) {
                    addGame(gamesDiv, item);
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }

    function addGame(gamesDiv, gameObject) {
        let article = document.createElement("article");
        let itemDiv = document.createElement("div");

        let heading = document.createElement("h3");
        heading.appendChild(document.createTextNode(gameObject.id + ":" + gameObject.name));

        let year = document.createElement("p");
        year.appendChild(document.createTextNode(gameObject.release_year));

        let platform = document.createElement("p");
        platform.appendChild(document.createTextNode("Platform:" + gameObject.platform));

        let platformLink = document.createElement("a");
        platformLink.href = "/games/?attribute=platform&value=" + gameObject.platform;
        platformLink.textContent = gameObject.platform;

        let genre = document.createElement("p");
        genre.appendChild(document.createTextNode("Genre:" + gameObject.genre));

        let publisher = document.createElement("p");
        publisher.appendChild(document.createTextNode("Publisher:" + gameObject.publisher))

        let gameDetailsLink = document.createElement("a");
        gameDetailsLink.href = "/games/" + gameObject.id;
        gameDetailsLink.textContent = View;

        itemDiv.appendChild(heading);
        itemDiv.appendChild(year);
        itemDiv.appendChild(platform);
        itemDiv.appendChild(platformLink);
        itemDiv.appendChild(genre);
        itemDiv.appendChild(publisher);
        itemDiv.appendChild(gameDetailsLink);

        itemDiv.classList.add("text")
        article.classList.add("item");

        article.appendChild(itemDiv);
        gamesDiv.appendChild(article);

    }
})();