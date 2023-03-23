var express = require("express");

const fs = require('fs')
const JsonToObject = JSON.parse(fs.readFileSync('./public/data/data.json', 'utf-8'))

var app = express();

var router = express.Router();


/**************************************************** */

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/** ************************************************* */

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/node_modules'));

/** ************************************************* */

// view engine setup

var swig = require('swig');

app.set('views', __dirname + '/views');

var swig = new swig.Swig();

app.engine('html', swig.renderFile);

app.set('view engine', 'html');

/************************************************************** */

router.use(function(req, res, next) {

    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');

    console.log("/" + req.method);

    next();
});

router.get("/", function(req, res) {

  res.send("Bonjour tout le monde");

})


app.use("/", router);

app.listen(3000 || 8080, function() {
    console.log('Example app listening on port !')
  })


// clients

router.get("/add_fiche_client", function(req, res) {
    res.render('add_fiche_client');
  })
  

router.post("/add_fiche_client", urlencodedParser, function(req, res) {
    const jsonData = fs.readFileSync("./public/data/data.json", "utf-8");
  
    // Analyser les données JSON en un objet JavaScript
    const data = JSON.parse(jsonData);
    const newData = {
      id: Math.floor(Math.random()*1000),
      nom: req.body.nom,
      prenom: req.body.prenom,
      numero: req.body.numero,
      date_de_naissance: req.body.date_de_naissance
    }
    console.log(newData);
    
  
    data.data_clients.push(newData);
  
    const newDataObject = JSON.stringify(data);
  
      // Écrire les données JSON mises à jour dans le fichier
    fs.writeFileSync("./public/data/data.json", newDataObject);
    // res.render('add_fiche_client')
    res.redirect('/listing_clients');
  
  })

router.get("/listing_clients", function(req, res) {
  
  
    var  clients = JsonToObject["data_clients"];
  
    
      res.render('listing_clients', { clients: clients });
  })


  router.get("/supp_client/:id", function(req, res) {
    const idclient = parseInt(req.params.id)
    const clients = JsonToObject["data_clients"];

    const index = clients.findIndex(p => p.id === idclient);
  
    if (index !== -1) {
      clients.splice(index, 1);
     
      const newDataObject = JSON.stringify(JsonToObject);
      console.log(newDataObject);
      fs.writeFileSync('./public/data/data.json', newDataObject);
    }
  
    res.redirect('/listing_clients');
  });
  

  router.get('/edit_fiche_client/:idclient', function(req, res) {
    const idclient = parseInt(req.params.idclient);
    const clients = JsonToObject["data_clients"];
    
    // Chercher l'objet clientesseur correspondant à l'ID donné
    const client = clients.find(p => p.id === idclient);
    
    res.render('edit_fiche_client', { client: client });
  });
  
  router.post('/edit_fiche_client/:idclient', urlencodedParser, function(req, res) {
    const idclient = parseInt(req.params.idclient);
    const clients = JsonToObject["data_clients"];
    
    // Chercher l'objet clientesseur correspondant à l'ID donné
    const client = clients.find(p => p.id === idclient);
    
    // Mettre à jour les données du clientesseur
    client.nom = req.body.nom;
    client.prenom = req.body.prenom;
    client.numero = req.body.numero,
    client.date_de_naissance = req.body.date_de_naissance
    
    // Enregistrer les modifications dans le fichier JSON
    const newDataObject = JSON.stringify(JsonToObject);
    fs.writeFileSync('./public/data/data.json', newDataObject);
    
    res.redirect('/listing_clients');
  });




  // logements

router.get("/add_fiche_logement", function(req, res) {
    res.render('add_fiche_logement');
  })
  

router.post("/add_fiche_logement", urlencodedParser, function(req, res) {
    const jsonData = fs.readFileSync("./public/data/data.json", "utf-8");
  
    // Analyser les données JSON en un objet JavaScript
    const data = JSON.parse(jsonData);
    const newData = {
      id: Math.floor(Math.random()*1000),
      nom_comune: req.body.nom_comune,
      quartier: req.body.quartier,
      adresse: req.body.adresse,
      surface: req.body.surface,
      loyer: req.body.loyer
    }
    console.log(newData);
    
  
    data.data_logements.push(newData);
  
    const newDataObject = JSON.stringify(data);
  
      // Écrire les données JSON mises à jour dans le fichier
    fs.writeFileSync("./public/data/data.json", newDataObject);
    // res.render('add_fiche_logement')
    res.redirect('/listing_logements');
  
  })

router.get("/listing_logements", function(req, res) {
  
  
    var  logements = JsonToObject["data_logements"];
  
    
      res.render('listing_logements', { logements: logements });
  })


  router.get("/supp_logement/:id", function(req, res) {
    const idlogement = parseInt(req.params.id)
    const logements = JsonToObject["data_logements"];

    const index = logements.findIndex(p => p.id === idlogement);
  
    if (index !== -1) {
      logements.splice(index, 1);
     
      const newDataObject = JSON.stringify(JsonToObject);
      console.log(newDataObject);
      fs.writeFileSync('./public/data/data.json', newDataObject);
    }
  
    res.redirect('/listing_logements');
  });
  

  router.get('/edit_fiche_logement/:idlogement', function(req, res) {
    const idlogement = parseInt(req.params.idlogement);
    const logements = JsonToObject["data_logements"];
    
    // Chercher l'objet logementesseur correspondant à l'ID donné
    const logement = logements.find(p => p.id === idlogement);
    
    res.render('edit_fiche_logement', { logement: logement });
  });
  
  router.post('/edit_fiche_logement/:idlogement', urlencodedParser, function(req, res) {
    const idlogement = parseInt(req.params.idlogement);
    const logements = JsonToObject["data_logements"];
    
    // Chercher l'objet logementesseur correspondant à l'ID donné
    const logement = logements.find(p => p.id === idlogement);
    
    // Mettre à jour les données du logementesseur
    logement.nom_comune = req.body.nom_comune,
    logement.quartier = req.body.quartier,
    logement.adresse = req.body.adresse,
    logement.surface = req.body.surface,
    logement.loyer = req.body.loyer
    
    // Enregistrer les modifications dans le fichier JSON
    const newDataObject = JSON.stringify(JsonToObject);
    fs.writeFileSync('./public/data/data.json', newDataObject);
    
    res.redirect('/listing_logements');
  });


// logement en fonction du client


router.get("/search_logements_clients", function(req, res) {
  
  
    var  logements = JsonToObject["data_logements"];
  
    
      res.render('search_logements_clients', { logements: logements });
  })

  router.post("/search_logements_clients", function(req, res) {
  

    const clients = JsonToObject["data_clients"];
    const idclient = parseInt(req.body.idclient);
    console.log(idclient);
    const client = clients.find(p => p.id === idclient);
    
  
    res.render('search_logements_clients');
      res.redirect('/listing_logements_clients', { client : client  });
  })




router.get("/listing_logements_clients", function(req, res) {
  
  
  
    
      res.render('listing_logements_clients');
  })