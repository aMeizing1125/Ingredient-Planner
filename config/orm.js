//Require connection.js
var connection = require("./connection.js");

//Global functions---------------------------------------------------------------------
function printZQuestionMarks(num) {
   var arr = [];

   for (var i = 0; i < num; i++) {
      arr.push("?");
   }

   return arr.toString();
}

//question marks para el query 
function objToSql(ob) {
   var arr = [];

   for (var key in ob) {
      var value = ob[key];

      if (Object.hasOwnProperty.call(ob, key)) {

         if (typeof value === "string" && value.indexOf(" ") >= 0) {
            value = "'" + value + "'";
         }

         arr.push(key + "=" + value);
      }
   }

   return arr.toString();
}

//------------------------------------------------------------------------------------


var orm = {
   selectAll: function (tableName, callback) {
      var queryString = "SELECT * FROM " + tableName + ";";
      connection.query(queryString, function(err, result) {
         if(err) {
            throw err;
         }
         callback(result);
      });
   },
   selectWhere: function(tableName, uid, callback){
       var queryString = ("SELECT * FROM " + tableName + " WHERE uid = '" + uid + "';");

       connection.query(queryString, function(err, result){
           if(err){
               throw err;
           }
           callback(result);
       });
   },
   customInsert: function(queryString){
      connection.query(queryString, function(err, result){
         if(err){
            throw err;
         }
         console.log("custom query worked");
      })
   },
   customSelect: function(queryString, callback){
      connection.query(queryString, function(err, result){
         if(err){
            throw err
         }
         callback(result);
      })
   } 
};

module.exports = orm;