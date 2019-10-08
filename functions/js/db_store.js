const db = require("./db.js");
const sql = require("mssql");

const query = () => {
  return new Promise((resolve, reject) => {
    sql.connect(db.config, function(err) {
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
      var command = "select * from StoreInfo";

      // query to the database and get the records
      request.query(command, function(err, recordset) {
        if (err) {
          console.dir(err);
          reject(err);
        } else {
          resolve(recordset);
        }
      });
    });
  });
};

module.exports = {
  getStoreInfo: query
};
