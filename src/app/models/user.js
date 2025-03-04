const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  about: String,
  profileURL: String,
});

// Ensure only one instance of the model is created
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

// mongoose.models is an object that stores all the models created in the application.
// If a model named "users" already exists, it retrieves that existing model to avoid redefining it.
// mongoose.model("users", userSchema):

// If the "users" model does not exist, it creates a new Mongoose model named "users" using the userSchema.
// Logical OR (||) Operator:

// If the model already exists (mongoose.models.users is truthy), it returns the existing model.
// Otherwise, it creates and assigns a new model.
