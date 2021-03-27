import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Comment from "../models/comment.js";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    userName,
    userIcon,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ userName });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (existingUsername)
      return res.status(400).json({ message: "Username already taken" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      userName,
      name: `${firstName} ${lastName}`,
      userIcon,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      {
        expiresIn: 86400,
      }
    );

    res.status(200).send({
      id: result._id,
      email,
      token,
    });
  } catch (error) {
    console.error({ message: error });
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).send({
      id: existingUser._id,
      email: existingUser.email,
      token,
    });
  } catch (error) {
    console.log("sign in error: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.log("get user error:", error);
    res.status(500).json({ message: "Something Went Wrong [getUser]" });
  }
};

export const likeMovie = async (req, res) => {
  const { id } = req.params;
  const movie = req.body;
  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    for (let i in user.likes) {
      if (user?.likes[i]?.id === movie?.id)
        return res.status(409).json({ message: "Movie already liked" });
    }

    user.likes = [...user.likes, movie];
    await user.save();
    res.status(200).json({ message: "Movie Liked!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong [like movie]" });
  }
};

export const addComment = async (req, res) => {
  const comment = req.body;
  const movie = req.params;

  try {
    const user = await User.findById(comment.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const result = await Comment.create(req.body);

    const comments = await Comment.find();

    const singleMovieComments = comments.filter(
      (obj) => obj.movieId === movie.id
    );

    res.status(200).json({ comments: singleMovieComments, result: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong [addComment]" });
  }
};

export const getComments = async (req, res) => {
  const movie = req.params;

  try {
    const comments = await Comment.find();

    const singleMovieComments = comments.filter(
      (obj) => obj.movieId === movie.id
    );

    res.status(200).send(singleMovieComments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong [getComments]" });
  }
};
