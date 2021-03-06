const users = require('../users.json');
const validator = require('validator');
const fs = require('fs');

// ---------------------------------------------------------------- //
// ------------------------ GET functions ------------------------- //
// ---------------------------------------------------------------- //

// Respond: send(users list)
const getAllUsers = (req,res) => res.send(users);

// Get user by id
const getUserById = (req,res) => {
  
  const {id} = req.params;
  
  // Validate that the id is a positive integer
  if(validator.isInt(id,{min:0})){
    let user = users.find((u)=> u.id === id);
    if(user)
      res.send(user);
    else 
      return res.status(400).json({error: 'User with that id does not exit in the database.'});
  }
  return res.status(400).json({error: 'Invalid id, id must be a positive integer.'});

}

// ---------------------------------------------------------------- //
// ------------------------ POST functions ------------------------ //
// ---------------------------------------------------------------- //

//  ---- Add new user ----
const addUser = (req,res) => {

  // Destructure new user's info
  const {id, name, isActive = true, cash = 0, credit = 0} = req.body;
  
  // Validate user's id
  if (!validator.isInt(id,{min:0})) return res.status(200).json({error: `The id must be a positive integer.`});

  // Find user in the database by id:
  let result = users.find( u => u.id === id);

  // Validations:
  if (!name || !id) return res.status(200).json({error: 'Please enter both an id and a name.'});
  if (name.length < 6 || !name.includes(' ')) return res.status(200).json({error: 'Name must include space and length bigger then 5'});
  if (result) return res.status(200).json({error: `User with this id: ${id} already exists in the database.`});
  
  const obj = { id, name, isActive, cash, credit }

  users.push(obj);
  fs.writeFile('users.json', JSON.stringify(users,null,2) , 'utf8', err => err? console.log(err) : null);
  
  return res.send(users);
}

// ---------------------------------------------------------------- //
// ------------------------ PUT functions ------------------------ //
// ---------------------------------------------------------------- //

// ---- Depositing money to user ----
const deposit = (req,res) => {

  // Get id from the parameters
  const {id} = req.params;

  // Destructure id and deposit value info
  const {value = 0 } = req.body;

  // Validate user's id
  if (!validator.isInt(id,{min:0})) return res.status(200).json({error: `The id must be a positive integer.`});

  // Validate deposit value
  if (!validator.isFloat(value,{min:0})) return res.status(200).json({error: `The deposit value must be a positive number.`});

  // Find user in the database by id:
  let result = users.find( u => u.id === id);

  // Notify if the user doesn't exist in the database
  if (!result) return res.status(200).json({error: 'User with that id does not exit in the database.'});

  result.cash += Number(value);

  users[users.findIndex( u => u.id === id)] = result;
  fs.writeFile('users.json', JSON.stringify(users,null,2) , 'utf8', err => err? console.log(err) : null);
  return res.send(users);

}

// withdraw cash
const withdraw = (req,res) => {

  // Get id from the parameters
  const {id} = req.params;

  // Destructure id and deposit value info
  const {value = 0 } = req.body;

  // Validate user's id
  if (!validator.isInt(id,{min:0})) return res.status(200).json({error: `The id must be a positive integer.`});

  // Validate withdraw value
  if (!validator.isFloat(value,{min:0})) return res.status(200).json({error: `Withdraw amount must be a positive number.`});

  // Find user in the database by id:
  let result = users.find( u => u.id === id);

  // Notify if the user doesn't exist in the database
  if (!result) return res.status(200).json({error: 'User with that id does not exit in the database.'});
  if (value > result.credit + result.cash) return res.status(200).json({error: 'Not enough credit.'});
  
  result.cash -= Number(value);
  users[users.findIndex( u => u.id === id)] = result;
  fs.writeFile('users.json', JSON.stringify(users,null,2) , 'utf8', err => err? console.log(err) : null);
  return res.send(users);
}

// update credit
const updateCredit = (req,res) => {
  // Get id from the parameters
  const {id} = req.params;

  // Destructure id and deposit value info
  const {value = 0 } = req.body;

  // Validate user's id
  if (!validator.isInt(id,{min:0})) return res.status(200).json({error: `The id must be a positive integer.`});

  // Validate deposit value
  if (!validator.isFloat(value,{min:0})) return res.status(200).json({error: `The credit value must be a non-negative number.`});

  // Find user in the database by id:
  let result = users.find( u => u.id === id);

  // Notify if the user doesn't exist in the database
  if (!result) return res.status(200).json({error: 'User with that id does not exit in the database.'});

  result.credit = Number(value);

  users[users.findIndex( u => u.id === id)] = result;
  fs.writeFile('users.json', JSON.stringify(users,null,2) , 'utf8', err => err? console.log(err) : null);
  return res.send(users);
}

// Transfer money
const transfer = (req,res) => {

  // Get both id from the parameters
  const {src , dst} = req.params;

  // Validate user's id
  if (!validator.isInt(src,{min:0}) || !validator.isInt(dst,{min:0}) ) return res.status(200).json({error: `Both id's must be positive integers.`});

  // Destructure id and deposit value info
  const {value = 0 } = req.body;
  
  // find both users:
  let source = users.find( u => u.id === src);
  let destination = users.find( u => u.id === dst);

  // validate transfer
  if(source.credit+source.cash < value) return res.status(200).json({error: `The first user has insufficient credit!`});

  // Apply tranfer action:
  source.cash -= Number(value);
  destination.cash += Number(value);
  
  // Update the changes to 'users' array
  users[users.findIndex( u => u.id === src)] = source;
  users[users.findIndex( u => u.id === dst)] = destination;

  // write to json file
  fs.writeFile('users.json', JSON.stringify(users,null,2) , 'utf8', err => err? console.log(err) : null);

  // return res.send(`Transfered ${value}$ from ${source.name} to ${destination.name}.`);
  return res.send(users);
}

// Remove user
const removeUser = (req,res) => {
  // Get id from the parameters
  const {id} = req.params;

  // Validate user's id
  if (!validator.isInt(id,{min:0})) return res.status(200).json({error: `The id must be a positive integer.`});

  // Find user in the database by id:
  let result = users.find( u => u.id === id);

  // Notify if the user doesn't exist in the database
  if (!result) return res.status(200).json({error: 'User with that id does not exit in the database.'});

  users.splice(users.findIndex( u => u.id === id),1)
  return res.send(users);
}

// export all module's functions
module.exports = {
  removeUser,
  transfer,
  updateCredit,
  withdraw,
  deposit,
  addUser,
  getUsers: getAllUsers,
  getUserById
}
