const app = require("./app");

require("dotenv").config();

var port;
const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
    port = (process.env.PORT || 80);
} else if (env === 'development') {
    port = 4044;
} else {
    port = 4054;
}

app.listen(port, '::', () => console.log(`Server on stage ${env} listening on port ${port}`));
