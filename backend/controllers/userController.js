import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const passCheck = new RegExp('^[a-zA-Z0-9]{5,}$');
// @desc auth user and get token
// @route post request to api/users/login
// @public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //check password match
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      //IMPORTANT: this is where we generate the token for the session
      token: generateToken(user._id),
    });
  } else {
    //unauthorized
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

// @desc get user profile
// @route GET
// @private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found...');
  }
});

// @desc update user profile
// @route PUT
// @private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  //check password validity
  if (req.body.password && !passCheck.test(req.body.password)) {
    res.status(400);
    throw new Error('Invalid Password - needs to be at least 5 characters');
  }

  if (user) {
    {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      //if password was changed, update it accordingly
      if (req.body.password) {
        user.password = req.body.password;
      }
    }

    //save redefined user entry to database
    const updatedUser = await user.save();
    //send a json response used as action.payload in frontend
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      //IMPORTANT: this is where we generate the token for the session
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found...');
  }
});

// @desc Register a new user
// @route POST /api/users
// @public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already Exists');
  }

  //check password validity
  if (!passCheck.test(req.body.password)) {
    res.status(400);
    throw new Error('Invalid Password - needs to be at least 5 characters');
  }

  //dont need to set isAdmin, set to false by default
  const user = await User.create({
    name,
    email,
    password,
  });

  //if user registration was successful
  if (user) {
    //something was created
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export { authUser, registerUser, getUserProfile, updateUserProfile };
