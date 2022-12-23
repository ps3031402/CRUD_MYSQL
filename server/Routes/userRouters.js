const express = require("express");
const userRouter = express.Router();
const conn = require("../db/conn");


// Register User
userRouter.post("/create", (req, res) => {
  // console.log(req.body);

  const { name, email, age, mobile, work, add, desc } = req.body;

  if (!name || !email || !age || !mobile || !work || !add) {
    res.status(422).json("please fill all the required data");
  }

  try {
    conn.query("SELECT * FROM users WHERE email = ?", email, (err, data) => {
      if (data.length) {
        res.status(422).json("User already exists");
      } else {
        conn.query(
          "INSERT INTO users SET ?",
          { name, email, age, mobile, work, add, desc },
          (err, data) => {
            if (err) {
              res.status(422).json(err);
            } else {
              res.status(201).json(req.body);
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(422).json("error :", err);
  }
});

// Get users data
userRouter.get('/getusers', (req, res) => {
    conn.query('SELECT * FROM users', (err, data) => {
        if(err){
            res.status(422).json("No data available");
        }
        else{
            res.status(201).json(data);
        }
    });
});

// delete user
userRouter.delete('/deleteuser/:id', (req, res) => {
    const {id} = req.params;
    conn.query("DELETE FROM users WHERE id = ?", id, (err, data) => {
        if(err){
            res.status(422).json(err);
        }
        else{
            res.status(201).json({
                message : "deleted successfully",
                data : data
            })
        }
    } );
});

// get single user profile
userRouter.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    conn.query("SELECT * FROM users WHERE id = ?", id, (err, data) => {
        if(err){
            res.status(422).json(err);
        }
        else{
            res.status(201).json({
                message : "SUCCESS",
                data : data
            })
        }
    } );
});

// update user api
userRouter.patch('/updateuser/:id', (req, res) => {
    const {id} = req.params;
    const data = req.body;
    console.log(data);

    conn.query("UPDATE users SET ? WHERE id = ?", [data, id], (err, result) => {
        if(err){
            res.status(422).json({error : err});
        }
        else{
            res.status(201).json(result);
        }
    });
});
module.exports = userRouter;
