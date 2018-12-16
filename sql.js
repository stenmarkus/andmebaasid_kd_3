var mssql = require('mssql');

var config = {
    user: 'test2',
    password: 'test2',
    server: '127.0.0.1',
    //port: 1433, // Should not set this when connecting to a named instance
    database: 'pinterest_new',
    connectionTimeout: 5000,
    
    options: {
        encrypt: false, // vaja kui Azure vms pilvebaasi külge ühendada
        instanceName: 'SQLEXPRESS01'
    }
}

var pool; // Koht, mis salvestab yhenduse info

(async function() {
    try {
        pool = await mssql.connect(config);

        console.log('Connected to DB');
    } catch (err) {
        // Log errors
        console.log('ERROr: ' + err);
    }
})()

exports.querySql = function(query, onData, onError) {
    try {
        //console.log('Getting data for: ' + query);

        pool.request()
            //.input('id', mssql.Int, id)
            .query(query)
            .then(result => {
                // data returns:
                //   data.recordsets.length
                //   data.recordsets[0].length
                //   data.recordset
                //   data.returnValue
                //   data.output
                //   data.rowsAffected
                
                if (onData !== undefined)
                    onData(result);
            })
            .catch(error => {
                if (onError !== undefined)
                    onError(error);
            });
    } catch (err) {
        // Log errors
        if (onError !== undefined)
            onError(err);
    }
}

exports.querySqlWithParams = function(query, params, onData, onError) {
    try {
        var request = pool.request();

        // Kui parameetrid on kaasa antud, siis lisame need (eeldame, et on sisend-parameetrid)
        if (typeof(params) !== 'undefined')
        {
            params.forEach(element => {
                //console.log('adding param ' + element.name);

                request.input(element.name, element.type, element.value);
            });
        }
        request
            .query(query)
            .then(result => {
                // data returns:
                //   data.recordsets.length
                //   data.recordsets[0].length
                //   data.recordset
                //   data.returnValue
                //   data.output
                //   data.rowsAffected
                
                if (onData !== undefined)
                    onData(result);
            })
            .catch(error => {
                if (onError !== undefined)
                    onError(error);
            });
    } catch (err) {
        // Log errors
        if (onError !== undefined)
            onError(err);
    }
}

exports.execute = function(procedureName, params, onData, onError) {
    try {
        var request = pool.request();

        // Kui parameetrid on kaasa antud, siis lisame need (eeldame, et on sisend-parameetrid)
        if (typeof(params) !== 'undefined')
        {
            params.forEach(element => {
                //console.log('adding param ' + element.name);

                request.input(element.name, element.type, element.value);
            });
        }
        request
            .execute(procedureName)
            .then(result => {
                // data returns:
                //   data.recordsets.length
                //   data.recordsets[0].length
                //   data.recordset
                //   data.returnValue
                //   data.output
                //   data.rowsAffected
                
                if (onData !== undefined)
                    onData(result);
            })
            .catch(error => {
                if (onError !== undefined)
                    onError(error);
            });
    } catch (err) {
        // Log errors
        if (onError !== undefined)
            onError(err);
    }
}

mssql.on('error', err => {
    console.log('Error with MSSQL: ' + err);
})