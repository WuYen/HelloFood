const db = require("./db.js");
const sql = require("mssql");

const query = () => {
    return new Promise((resolve, reject) => {
        sql.connect(db.config, function (err) {
            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();
            var command = "select * from StoreInfo where Status <> 'D'";

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
        console.dir("===========db_store add===========");
        console.dir(store);
        sql.connect(db.config, function (err) {
            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();
            var command = "insert into StoreInfo([Name],[Address],[Phone])"
            command += "values("
            command += "'" + store.name + "', "
            command += "'" + store.address + "', "
            command += "'" + store.phone + "'"
            command += ") SELECT SCOPE_IDENTITY() as sid";
            console.dir("insert command: " + command);
            // query to the database and get the records
            request.query(command, function (err, result) {
                if (err) {
                    console.dir(err);
                    reject(err);
                } else {
                    console.dir("===========Success add===========");
                    console.dir(result.rowsAffected);
                    resolve(result);
                }
            });
        });
    });
};

const update = (store) => {
    return new Promise((resolve, reject) => {
        console.dir("===========db_store update===========");
        console.dir(store);
        sql.connect(db.config, function (err) {
            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();
            var command = "update StoreInfo set"
            command += " Name=N'" + store.name + "',"
            command += " Address=N'" + store.address + "',"
            command += " Phone=N'" + store.phone + "',"
            command += " UpdatedDate=GetDate()"
            command += " WHERE SID=" + store.sid;
            console.dir("update command: "+command);
            // query to the database and get the records
            request.query(command, function (err, result) {
                if (err) {
                    console.dir(err);
                    reject(err);
                } else {
                    console.dir("===========update Success===========");
                    console.dir(result.rowsAffected);
                    resolve(result);
                }
            });
        });
    });
};

const remove = (store) => {
    return new Promise((resolve, reject) => {
        console.dir("===========db_store remove===========");
        console.dir(store);
        sql.connect(db.config, function (err) {
            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();
            var command = "update StoreInfo set"
            command += " Status='D',"
            command += " UpdatedDate=GetDate()"
            command += " WHERE SID=" + store.SID;

            // query to the database and get the records
            request.query(command, function (err, result) {
                if (err) {
                    console.dir(err);
                    reject(err);
                } else {
                    console.dir("===========Success remove===========");
                    console.dir(result.rowsAffected);
                    resolve(result);
                }
            });
        });
    });
};

module.exports = {
    getStore: query,
    addStore: add,
    updateStore: update,
    removeStore: remove
};
