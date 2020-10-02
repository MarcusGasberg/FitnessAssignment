const { Mongoose } = require("mongoose");

var mongoose = require("mongoose");

var uri = "mongodb://localhost:27017/fitness-db";
if (process.env.NODE_ENV === "production") {
  uri = process.env.MONGODB_URI;
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected: ${msg}`);
    callback();
  });
};

process.on("SIGUR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});

process.on("SIGINT", () => {
  gracefulShutdown("App termination", () => {
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  gracefulShutdown("Heroku app shutdown", () => {
    process.exit(0);
  });
});
