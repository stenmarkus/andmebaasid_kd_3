var sql = require('./sql');

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

exports.index = function(req, res) {
	res.send('<h1>Hello</h1>');
};

exports.apiIndex = function(req, res) {
    var vm = {                          // vm = View Model
        title: 'Kodutöö nr 3',
        api: [
            { name: 'Emaili järgi otsimine(1. päring)', url: '/api/email' },         
            { name: 'Kasutajate piltide nägemine(2. päring)', url: '/api/pics' },
            { name: 'Kasutajate kommentaaride pikkused(3. päring)', url: '/api/comlen' }
	    ]
    };
    
    res.render('api-index', vm);
};


exports.email = function(req, res) {
    var query = "select * from users where email = 'cwellman5@tmall.com'";
    

    var result = sql.querySql(query, function(data) {
        if (data !== undefined)
        {
            console.log('DATA rowsAffected: ' + data.rowsAffected);
            res.send(data.recordset);
        }
    }, function(err) {
        console.log('ERROR: ' + err);
        res.status(500).send('ERROR: ' + err);
    });
};

exports.pics = function(req, res) {
    var query = 'select name,  pins.media from users INNER JOIN pins ON users.id = pins.creator_id' ;
    
    var result = sql.querySql(query, function(data) {
        if (data !== undefined)
        {
            console.log('DATA rowsAffected: ' + data.rowsAffected);
            res.send(data.recordset);
        }
    }, function(err) {
        console.log('ERROR: ' + err);
        res.status(500).send('ERROR: ' + err);
    });
};

exports.comlen = function(req, res) {
    var username = '';

    // If there's an ID passed along
    
    
    var query = 'select name AS kasutaja, count(comments.content) AS kommentaaride_arv,  avg(len(comments.content)) AS kesk_kommentaari_tahemarkide_arv   from users INNER JOIN comments ON users.id = comments.commenter_id GROUP BY users.name';
    
    var result = sql.querySql(query, function(data) {
        if (data !== undefined)
        {
            console.log('DATA rowsAffected: ' + data.rowsAffected);
            res.send(data.recordset);
        }
    }, function(err) {
        console.log('ERROR: ' + err);
        res.status(500).send('ERROR: ' + err);
    });
};


exports.default = function(req, res) {
	res.status(404).send('Invalid route');
};