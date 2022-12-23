const express = require("express");
const cartRouter = express.Router();
const conn = require("../db/conn");


// Add to cart api
cartRouter.post("/addtocart", (req, res) => {
  // console.log(req.body);

  const { item, price } = req.body;

  if (!item || !price) {
    res.status(422).json("please fill all the required data");
    return;
  }

  try {
    conn.query("SELECT * FROM cart WHERE item = ?", item, (err, data) => {
      if (data.length) {
        res.status(422).json("User already exists");
      } else {
        conn.query(
          "INSERT INTO cart SET ?",
          { item, price },
          (err, data) => {
            if (err) {
              res.status(422).json(err);
            } else {
              res.status(201).json({
                message : "success",
                data : req.body
              });
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(422).json("error :", err);
  }
});

// Get cart items
cartRouter.get('/getcartitems', (req, res) => {
    conn.query('SELECT * FROM cart', (err, data) => {
        if(err){
            res.status(422).json("No data available");
        }
        else{
            res.status(201).json(data);
        }
    });
});

// delete item from cart
cartRouter.delete('/deletefromcart/:id', (req, res) => {
    const {id} = req.params;
    conn.query("DELETE FROM cart WHERE id = ?", id, (err, data) => {
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

// cartRouter.get('/profile/:id', (req, res) => {
//     const {id} = req.params;
//     conn.query("SELECT * FROM users WHERE id = ?", id, (err, data) => {
//         if(err){
//             res.status(422).json(err);
//         }
//         else{
//             res.status(201).json({
//                 message : "SUCCESS",
//                 data : data
//             })
//         }
//     } );
// });


module.exports = cartRouter;
