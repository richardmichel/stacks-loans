import User from "../User/schema";

// Create a new user
export function createUser(username, callback) {
  const newUser = new User({
    username,
  });
  newUser.save((error) => {
    if (error) {
      console.log(error);
      callback(error, true);
    }
    console.log("User saved correctly!");
    callback(newUser);
  });
}

// Update an user.
export function updateUser(id, username, callback) {
  const updatedUser = {
    username,
  };
  User.update({ id }, updatedUser, (error, affected) => {
    if (error) {
      console.log(error);
      callback(error, true);
    }
    console.log("User updated correctly!");
    callback(affected);
  });
}

// Find all users...
export function findAllUsers(callback) {
  User.find({}, (error, users) => {
    if (error) {
      console.log(error);
      return false;
    }
    console.log(users);
    callback(users);
  });
}

// Find a single user by id...
export function findById(id, callback) {
  User.findById({ id }, (error, post) => {
    if (error) {
      console.log(error);
      return false;
    }
    console.log(post);
    callback(post);
  });
}
