const { MongoClient } = require("mongodb");
const config = {
  url:
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
};

module.exports = () =>
  new Promise((resolve, reject) => {
    MongoClient.connect(
      config.url,
      { useNewUrlParser: true },
      (err, mongoConnection) =>
        err
          ? reject(err)
          : resolve({
              client: mongoConnection.db(config.dbName),
              closeConnectionFn: () =>
                setTimeout(() => {
                  mongoConnection.close();
                }, 1000),
              mongoConnection,
            })
    );
  });
