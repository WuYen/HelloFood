const db = require("./db.js");
const sql = require("mssql");

const query = () => {
    return new Promise((resolve, reject) => {
        sql.connect(db.config, function (err) {
            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();
            var command = "select * from StoreInfo";

            // query to the database and get the records
            request.query(command, function (err, recordset) {
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

const add = (store) => {
    return new Promise((resolve, reject) => {
        console.dir("===========db_store===========");
        console.dir(store);
        sql.connect(db.config, function (err) {
            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();
            var command = "insert into StoreInfo([Name],[Address],[Phone],[Remark])"
            command += "values("
            command += "'" + store.name + "', "
            command += "'" + store.address + "', "
            command += "'" + store.phone + "', "
            command += "'" + store.remark + "'"
            command += ")";

            // query to the database and get the records
            request.query(command, function (err, result) {
                if (err) {
                    console.dir(err);
                    reject(err);
                } else {
                    console.dir("===========Success===========");
                    console.dir(result.rowsAffected);
                    resolve(result);
                }
            });
        });
    });
};

module.exports = {
    getStore: query,
    addStore: add
};
