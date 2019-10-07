const sql = require("mssql");

var config = {
	user: "sa",
	password: "P@ssw0rd",
	server: "127.0.0.1",
	database: "hellofood"
};

const query = () => {
	return new Promise((resolve, reject) => {
		sql.connect(config, function (err) {

			if (err) console.log(err);

			// create Request object
			var request = new sql.Request();

			// query to the database and get the records
			request.query('select * from StoreInfo', function (err, recordset) {

				if (err) { console.dir(err); reject(err); }
				else { resolve(recordset) };
				console.dir("====  Exec myFunction3 finish ====");
			});
		});
	});
};

module.exports = {
	getStoreInfo: query
};
