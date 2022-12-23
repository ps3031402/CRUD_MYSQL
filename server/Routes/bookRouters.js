const express = require("express");
const bookRouter = express.Router();
const conn = require("../db/conn");


// insert book
bookRouter.post("/insertbook", (req, res) => {
  // console.log(req.body);

  const { title, author, price } = req.body;

  if (!title || !author || !price) {
    res.status(422).json("please fill all the required data");
    return;
  }

  try {
    conn.query("SELECT * FROM books WHERE title = ?", title, (err, data) => {
      if (data.length) {
        res.status(422).json("Book already exists");
      } else {
        conn.query(
          "INSERT INTO books SET ?",
          { title, author, price },
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

// Get books data
bookRouter.get('/getbooks', (req, res) => {
    conn.query('SELECT * FROM books', (err, data) => {
        if(err){
            res.status(422).json("No data available");
        }
        else{
            res.status(201).json(data);
        }
    });
});

// delete book
bookRouter.delete('/deletebook/:id', (req, res) => {
    const {id} = req.params;
    conn.query("DELETE FROM books WHERE id = ?", id, (err, data) => {
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

// get single book profile
bookRouter.get('/bookprofile/:id', (req, res) => {
    const {id} = req.params;
    conn.query("SELECT * FROM books WHERE id = ?", id, (err, data) => {
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

// update book details api
bookRouter.patch('/updatebook/:id', (req, res) => {
    const {id} = req.params;
    const data = req.body;
    console.log(data);

    conn.query("UPDATE books SET ? WHERE id = ?", [data, id], (err, result) => {
        if(err){
            res.status(422).json({error : err});
        }
        else{
            res.status(201).json(result);
        }
    });
});
module.exports = bookRouter;
