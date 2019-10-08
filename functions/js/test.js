//示範在模組內使用 mssql 並且回傳 promise

const sql = require("mssql");

const query = () => {
  return new Promise((resolve, reject) => {
    sql.connect(config, function(err) {
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query("select * from StoreInfo", function(err, recordset) {
        if (err) {
          console.dir(err);
          reject(err);
        } else {
          resolve(recordset);
        }
        console.dir("====  Exec myFunction3 finish ====");
      });
    });
  });
};

module.exports = {
  getStoreInfo: query
};

//原始呼叫寫法
// const sql = require("mssql");
// app.get("/api/getstore", function (req, res) {
//   sql.connect({
//     user: "sa",
//     password: "P@ssw0rd",
//     server: "127.0.0.1",
//     database: "hellofood"
//   }).then(pool => {
//     // Query
//     return (
//       pool
//         .request()
//         //.input("input_parameter", sql.Int, value)
//         .query("select * from StoreInfo") // where id = @input_parameter
//     );
//   }).then(result => {
//     console.dir(result);
//     sql.close();
//     res.json(result.recordsets);
//   }).catch(err => {
//     // ... error checks
//     sql.close();
//     res.json("Error");
//   });
// });
