var db = require("./Db.js").db;6

var controlTables = {
  "subject":[
    { "code":"F1",
      "competence":"Lire des textes variés",
      "subject":"Lecture",
      "active":"true" },
    { "code":"F2",
      "competence":"Écrire des textes variés",
      "subject":"Écriture",
      "active":"true",
      "criterion": [
        "Idées",
        "Organisation",
        "Syntaxe et ponctuation",
        "Vocabulaire",
        "Orthographe" ] },
    { "code":"F3",
      "competence":"Écrire des textes variés",
      "subject":"Dictée",
      "active":"true" },
    { "code":"F4",
      "competence":"Communiquer oralement",
      "subject":"Communication orale",
      "active":"true" },
    { "code":"M1",
      "competence":"Exécuter des situations-problèmes mathématiques",
      "subject":"Situations problèmes",
      "active":"true" },
    { "code":"M2",
      "competence":"Raisonner à l'aide de concepts et de processus mathémathiques",
      "subject":"Raisonnement mathématiques",
      "active":"true" },
    { "code":"S1",
      "competence":"Sciences et technologies",
      "subject":"Sciences et technologies",
      "active":"true" },
    { "code":"GHEC1",
      "competence":"Géographie, histoire et éducation à la citoyenneté",
      "subject":"Géographie, histoire et éducation à la citoyenneté",
      "active":"true" },
    { "code":"AP1",
      "competence":"Création d'oeuvres plastiques",
      "subject":"Création",
      "active":"true" },
    { "code":"AP2",
      "competence":"Apprécier des oeuvres artistiques",
      "subject":"Apprécier",
      "active":"true" },
    { "code":"ECR1",
      "competence":"Éthique et culture religieuse",
      "subject":"Éthique et culture religieuse",
      "active":"true" }
  ],
  "steps":[
    {code:1, description:"Étape 1"},
    {code:2, description:"Étape 2"},
    {code:3, description:"Étape 3"}
  ]};

exports.asJson = function( request, response ){
  response.json(  controlTables );
}
