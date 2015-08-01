var path = require('path');

//cargar modelo ORM
var Sequelize = require('sequelize');

//usar bbdd Sqlite
var sequelize = new Sequelize(null, null, null,
							{dialect: "sqlite", storage: "quiz.sqlite"}
						);

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz;//exportar definicion de la tabla quiz

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
	//then ejecuta el manejador una vez creada la tabla
	//se ha cambiado de sucess a then ya que utilizamos una libreria de sequelize
	//distinta
	Quiz.count().then(function(count){
		if(count===0){//la tabla se inicializa solo si esta vacia
			Quiz.create({ pregunta: "Capital de Italia",
					      respuesta: "Roma"
					  }).then(function(){console.log("Base de datos inicializada")});
		}
	});

});
