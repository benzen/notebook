var Schema = require("mongoose").Schema;


var user = new Schema({
  auth_type:String,
  auth_id: String,
  name:String,
  profile:String
});
exports = user;

"id SERIAL PRIMARY KEY, auth_type text, auth_id text, name text, profile text);","user"