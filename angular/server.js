const express = require("express");
const path = require("path");

class App {

    app;

    constructor(){
        this.app = express();
        this.configuration();
    }

    /**
     * Method to configure the server,
     * If we didn't configure the port into the environment
     * variables it takes the default port 3000
     */
    configuration() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "dist/market")));
        this.app.get('/*', function(req,res) {
            res.sendFile(path.join(__dirname + "/dist/market/index.html"));
        });
    }

    /**
     * Used to start the server
     */
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server is listening ${this.app.get("port")} port.`);
        });
    }
}

const server = new App(); // Create server instance
server.start(); // Execute the server
