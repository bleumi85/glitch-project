const axios = require("axios");

module.exports = (router) => {
    router.get("/", getAll);

    // Return the router
    return router;
}

function getAll(req, res, next) {
    axios.get("https://jsonplaceholder.typicode.com/users")
        .then(function (response) {
            res.json(response.data)
        }).catch(function (error) {
            res.json("Error occured!")
        })
}
