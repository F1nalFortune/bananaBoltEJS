var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var Post = new Schema({
  name: { type: String, required: true},
    comment: {type: String, required: true},
    updated_at: Date
});

mongoose.model( 'Post', Post );
mongoose.connect( 'mongodb://localhost/posts' );
