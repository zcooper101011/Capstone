import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import { Customer, Inventory, MenuItems, MenuType, Orders, Rooms, Users, UserType } from './Inerfaces/Database';


var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
dotenv.config();

const bcrypt = require('bcrypt')
const app: Express = express();
const port = process.env.PORT?.toString() || '5000';

const mysql = require('mysql2');

const con = mysql.createPool({
  host: "istwebclass.org",
  user: "zcooper2_zcooper2_capstone",
  password: "Zack101011",
  database: "zcooper2_Capstone"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Inserting a new rooms
app.post('/rooms', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { roomNumber, roomDescription } = req.body

  var sqlins = "INSERT INTO Rooms (RoomNumber, RoomDescription ) VALUES(?, ?)";
  var inserts = [roomNumber, roomDescription];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record inserted");
    res.json({ message: 'success' })
  });
});

// Updating a new rooms
app.patch('/rooms', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { roomNumber, roomDescription, roomId } = req.body

  var sqlins = "UPDATE Rooms SET RoomNumber=?, RoomDescription=? WHERE RoomId=? ";
  var inserts = [roomNumber, roomDescription, roomId];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record updated");
    res.json({ message: 'success' })
  });
});

// Delete rooms
app.delete('/rooms', function (req, res,) {
  console.log('request headers right here ---->', req.headers);
  const { roomid } = req.headers

  var sqlins = "DELETE FROM Reservations WHERE RoomId = ?";
  var inserts = [roomid];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record deleted");
  });

  sqlins = "DELETE FROM Rooms WHERE RoomId = ?";
  inserts = [roomid];

  sql = mysql.format(sqlins, inserts);
  console.log("sql", sql)

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record deleted");
    res.json({ message: 'success' })
  });
});

// Inserting customers
app.post('/customers', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { customerFirstName, customerLastName, customerEmail, customerPassword } = req.body

  var sqlins = "INSERT INTO Customer (CustomerFirstName, CustomerLastName, CustomerEmail, CustomerPassword ) VALUES(?, ?, ?, ?)";
  var inserts = [customerFirstName, customerLastName, customerEmail, customerPassword];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record inserted");
    res.json({ message: 'success' })
  });
});

// Update customers
app.patch('/customers', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { customerFirstName, customerLastName, customerEmail, customerPassword, customerId } = req.body

  var sqlins = "UPDATE Customer SET CustomerFirstName=?, CustomerLastName=?, CustomerEmail=?, CustomerPassword=? WHERE CustomerId=?";
  var inserts = [customerFirstName, customerLastName, customerEmail, customerPassword, customerId];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record updated");
    res.json({ message: 'success' })
  });
});

// Delete customers
app.delete('/customers', function (req, res,) {
  console.log('request headers right here ---->', req.headers);
  const { customerid } = req.headers

  var sqlins = "DELETE FROM Orders WHERE CustomerId = ?";
  var inserts = [customerid];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record deleted");
  });

  sqlins = "DELETE FROM Customer WHERE CustomerId = ?";
  inserts = [customerid];

  sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record deleted");
    res.json({ message: 'success' })
  });
});

// Inserting a new user
app.post('/users', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { userFirstName, userLastName, userEmail, userPassword, username, userTypeId } = req.body

  var saltRounds = 10;
  var theHashedPw = '';
  bcrypt.hash(userPassword, saltRounds, function (err: any, hashedUserPassword: any) {
    if (err) {
      console.log("Bad");
      return
    } else {
      theHashedPw = hashedUserPassword;
      console.log("Password 1: " + theHashedPw);


      var sqlins = "INSERT INTO Users (UserFirstName, UserLastName, UserName, UserEmail, UserPassword, UserTypeId ) VALUES(?, ?, ?, ?, ?, ?)";
      var inserts = [userFirstName, userLastName, username, userEmail, hashedUserPassword, userTypeId];

      var sql = mysql.format(sqlins, inserts);

      con.execute(sql, function (err: any) {
        if (err) throw err;
        console.log("1 record inserted");
        res.json({ message: 'success' })
      });


    }
  })
});

// Update a new user
app.patch('/users', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { userFirstName, userLastName, userEmail, userPassword, username, userTypeId, userId } = req.body

  var saltRounds = 10;
  var theHashedPw = '';
  bcrypt.hash(userPassword, saltRounds, function (err: any, hashedUserPassword: any) {
    if (err) {
      console.log("Bad");
      return
    } else {
      theHashedPw = hashedUserPassword;
      console.log("Password 1: " + theHashedPw);

      var sqlins = "UPDATE Users SET UserFirstName=?, UserLastName=?, UserName=?, UserEmail=?, UserPassword=?, UserTypeId=? WHERE UserId=?";
      var inserts = [userFirstName, userLastName, username, userEmail, hashedUserPassword, userTypeId, userId];

      var sql = mysql.format(sqlins, inserts);

      con.execute(sql, function (err: any) {
        if (err) throw err;
        console.log("1 record updated");
        res.json({ message: 'success' })
      });
    }
  });
});

// Delete users
app.delete('/users', function (req, res,) {
  console.log('request headers right here ---->', req.headers);
  const { userid } = req.headers

  var sqlins = "DELETE FROM Users WHERE UserId = ?";
  var inserts = [userid];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record deleted");
    res.json({ message: 'success' })
  });
});

// Inserting Inventory Items
app.post('/inventory', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { inventoryName, inventoryDescription, inventoryQuantity } = req.body

  var sqlins = "INSERT INTO Inventory (InventoryName, InventoryDescription, InventoryQuantity) VALUES(?, ?, ?)";
  var inserts = [inventoryName, inventoryDescription, inventoryQuantity];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record inserted");
    res.json({ message: 'success' })
  });
});

// Update Inventory Items
app.patch('/inventory', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { inventoryName, inventoryDescription, inventoryQuantity, inventoryId } = req.body

  var sqlins = "UPDATE Inventory SET InventoryName=?, InventoryDescription=?, InventoryQuantity=? WHERE InventoryId=?";
  var inserts = [inventoryName, inventoryDescription, inventoryQuantity, inventoryId];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record updated");
    res.json({ message: 'success' })
  });
});

// Delete Inventory
app.delete('/inventory', function (req, res,) {
  console.log('request headers right here ---->', req.headers);
  const { inventoryid } = req.headers

  var sqlins = "DELETE FROM Inventory WHERE InventoryId = ?";
  var inserts = [inventoryid];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record deleted");
    res.json({ message: 'success' })
  });
});

// Inserting Reservations
app.post('/reservations', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { userId, startTime, roomId } = req.body

  var sqlins = "INSERT INTO Reservations (UserId, StartTime, RoomId) VALUES(?, ?, ?)";
  var inserts = [userId, startTime, roomId];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record inserted");
    res.json({ message: 'success' })
  });
});

// Updating Reservations
app.patch('/reservations', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { userId, startTime, roomId, reservationId } = req.body

  var sqlins = " UPDATE Reservations SET UserId=?, StartTime=?, RoomId=? WHERE ReservationId=?";
  var inserts = [userId, startTime, roomId, reservationId];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record updated");
    res.json({ message: 'success' })
  });
});

// Delete Reservations
app.delete('/reservations', function (req, res,) {
  console.log('request headers right here ---->', req.headers);
  const { reservationid } = req.headers

  var sqlins = "DELETE FROM Reservations WHERE ReservationId = ?";
  var inserts = [reservationid];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record deleted");
    res.json({ message: 'success' })
  });
});

// Inserting Menu Types
app.post('/menutypes', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { menuTypeName, menuTypeDescription } = req.body

  var sqlins = "INSERT INTO MenuTypes (MenuTypeName, MenuTypeDescription) VALUES(?, ?)";
  var inserts = [menuTypeName, menuTypeDescription];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record inserted");
    res.json({ message: 'success' })
  });
});

// Updating Menu Types
app.patch('/menutypes', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { menuTypeName, menuTypeDescription, menuTypeId } = req.body

  var sqlins = "UPDATE MenuTypes SET MenuTypeName=?, MenuTypeDescription=? WHERE MenuTypeId=?";
  var inserts = [menuTypeName, menuTypeDescription, menuTypeId];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record updated");
    res.json({ message: 'success' })
  });
});

// Delete Menu Types
app.delete('/menutypes', function (req, res,) {
  console.log('request headers right here ---->', req.headers);
  const { menutypeid } = req.headers

  var sqlins = "DELETE FROM MenuItems WHERE MenuTypeId = ?";
  var inserts = [menutypeid];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record deleted");
  });

  sqlins = "DELETE FROM MenuTypes WHERE MenuTypeId = ?";
  inserts = [menutypeid];

  sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record deleted");
    res.json({ message: 'success' })
  });
});

// Inserting Menu Items
app.post('/menuitems', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { menuTypeId, menuItemName, menuItemPrice, menuItemDescription } = req.body

  var sqlins = "INSERT INTO MenuItems (MenuTypeId, MenuItemName, MenuItemPrice, MenuItemDescription) VALUES(?, ?, ?, ?)";
  var inserts = [menuTypeId, menuItemName, menuItemPrice, menuItemDescription];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record inserted");
    res.json({ message: 'success' })
  });
});

// Update Menu Items
app.patch('/menuitems', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { menuTypeId, menuItemName, menuItemPrice, menuItemDescription, menuItemId } = req.body

  var sqlins = "UPDATE MenuItems SET MenuTypeId=?, MenuItemName=?, MenuItemPrice=?, MenuItemDescription=? WHERE MenuItemId=?";
  var inserts = [menuTypeId, menuItemName, menuItemPrice, menuItemDescription, menuItemId];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record updated");
    res.json({ message: 'success' })
  });
});

// Delete Menu items
app.delete('/menuitems', function (req, res,) {
  console.log('request headers right here ---->', req.headers);
  const { menuitemid } = req.headers

  var sqlins = "DELETE FROM MenuItems WHERE MenuItemId = ?";
  var inserts = [menuitemid];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record deleted");
    res.json({ message: 'success' })
  });
});

// Insert all orders
app.post('/orders', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { userId, customerId, order } = req.body

  let sqlins = "INSERT INTO Orders (UserId, CustomerId, OrderDateTime) VALUES(?, ?, ?)";
  let inserts = [userId, customerId, new Date().toISOString()];

  let sql = mysql.format(sqlins, inserts);
  con.execute(sql, function (err: any, results: any) {
    console.log(results)
    if (err) throw err;
    console.log("1 record inserted");
    for (let menuItem of order) {
      let sqlins = "INSERT INTO OrderDetails (OrderId, MenuItemId, OrderDetailQuantity, OrderDetailPriceCharged) VALUES(?, ?, ?, ?)";
      let inserts = [results.insertId, menuItem.MenuItemId, 1, menuItem.MenuItemPrice];

      let sql = mysql.format(sqlins, inserts);
      con.execute(sql, function (err: any) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    }
  });
  res.json({ message: 'success' })
});

// Delete orders
app.delete('/order', function (req, res,) {
  console.log('request headers right here ---->', req.headers);
  const { orderid } = req.headers

  var sqlins = "DELETE FROM Orders WHERE OrderId = ?";
  var inserts = [orderid];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record deleted");
    res.json({ message: 'success' })
  });
});

// Insert all usertypes
app.post('/usertypes', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { typeName, typeDescription, typePermissions } = req.body

  var sqlins = "INSERT INTO UserTypes (TypeName, TypeDescription, TypePermissions) VALUES(?, ?, ?)";
  var inserts = [typeName, typeDescription, typePermissions];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record inserted");
    res.json({ message: 'success' })
  });
});

// Update all usertypes
app.patch('/usertypes', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { typeName, typeDescription, typePermissions, userTypeId } = req.body

  var sqlins = "UPDATE UserTypes SET TypeName=?, TypeDescription=?, TypePermissions=? WHERE UserTypeId=?";
  var inserts = [typeName, typeDescription, typePermissions, userTypeId];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record updated");
    res.json({ message: 'success' })
  });
});

// Delete usertypes
app.delete('/usertypes', function (req, res,) {
  console.log('request headers right here ---->', req.headers);
  const { usertypeid } = req.headers

  var sqlins = "DELETE FROM Users WHERE UserTypeId = ?";
  var inserts = [usertypeid];

  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record deleted");
  });

  sqlins = "DELETE FROM UserTypes WHERE UserTypeId = ?";
  inserts = [usertypeid];

  sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err: any) {
    if (err) throw err;
    console.log("1 record deleted");
    res.json({ message: 'success' })
  });
});

// login
app.post('/login', function (req, res,) {
  console.log('request body right here ---->', req.body);
  const { username, password } = req.body


  let sqlsel: any = 'select * from Users where UserName = ?';

  let inserts = [username]

  let sql = mysql.format(sqlsel, inserts);
  console.log("SQL: " + sql);
  con.query(sql, function (err: any, data: Users[]) {
    console.log("userdata", data)
    if (data.length > 0) {
      console.log("User Name Correct:");
      console.log(data[0].UserPassword);
      bcrypt.compare(password, data[0].UserPassword, function (err: any, passwordCorrect: any) {
        if (err) {
          throw err
        } else if (!passwordCorrect) {
          console.log("Password is incorrect")
        } else {
          console.log("Password correct")
          let sqlsel: any = 'select * from UserTypes where UserTypeId = ?';

          let inserts = [data[0].UserTypeId]

          let sql = mysql.format(sqlsel, inserts);
          con.query(sql, function (err: any, typeData: UserType[]) {
            console.log(typeData)
            const token = jwt.sign({ secretDecryptedData: { userId: data[0].UserId, permissions: typeData[0].TypePermissions.admin } }, "MY_SECRET_TOKEN", { expiresIn: "1h" });
            res.json({ token });
          })
        }
      })
    }
  })


});

app.post("/verify", async function (req, res) {
  const token = req.body.token;
  console.log('in verify', token)
  jwt.verify(token, "MY_SECRET_TOKEN", (err: any, decoded: any) => {
    if (err) {
      console.log('error', err)
      return res.status(401).send();
    }
    // can do something with the decoded data
    console.log('decoded', decoded)
    res.json({ decoded });
  });

});

// Getting all usertypes dropdown menu
app.get('/usertypes', function (req, res,) {
  console.log('request body right here ---->', req.body);

  var sqlins = "SELECT * FROM UserTypes";

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: UserType[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Getting all menu items
app.get('/menuitems', function (req, res,) {
  console.log('request body right here ---->', req.body);

  var sqlins = "SELECT * FROM MenuItems INNER JOIN MenuTypes ON MenuItems.MenuTypeId = MenuTypes.MenuTypeId";

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: MenuItems[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Getting all inventory
app.get('/inventory', function (req, res,) {
  console.log('request body right here ---->', req.body);

  var sqlins = "SELECT * FROM Inventory";

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: Inventory[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});


// Search customers
app.get('/customers/getLikeFirstName', function (req, res,) {
  console.log('request query right here ---->', req.query);

  var sqlins = `SELECT * FROM Customer WHERE CustomerFirstName LIKE "%${req.query.customerFirstName}%" `;

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: Customer[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Search inventory
app.get('/inventory/getLikeName', function (req, res,) {
  console.log('request query right here ---->', req.query);

  var sqlins = `SELECT * FROM Inventory WHERE InventoryName LIKE "%${req.query.inventoryName}%" `;

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: Inventory[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Search rooms
app.get('/rooms/getLikeNumber', function (req, res,) {
  console.log('request query right here ---->', req.query);

  var sqlins = `SELECT * FROM Rooms WHERE RoomNumber LIKE "%${req.query.roomNumber}%"`;

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: Rooms[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Search usertypes
app.get('/usertypes/getLikeName', function (req, res,) {
  console.log('request query right here ---->', req.query);

  var sqlins = `SELECT * FROM UserTypes WHERE TypeName LIKE "%${req.query.typeName}%"`;

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: UserType[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Search menu items
app.get('/menuitems/getLikeName', function (req, res,) {
  console.log('request query right here ---->', req.query);

  var sqlins = `SELECT * FROM MenuItems INNER JOIN MenuTypes ON MenuItems.MenuTypeId = MenuTypes.MenuTypeId WHERE MenuItems.MenuItemName LIKE "%${req.query.menuItemName}%" `;

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: MenuItems[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});


// Get by MenuTypeId
app.get('/menuitems/getByMenuTypeId', function (req, res,) {
  console.log('request query right here ---->', req.query);

  var sqlins = `SELECT * FROM MenuItems WHERE MenuItems.MenuTypeId = "${req.query.menuTypeId}" `;

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: MenuItems[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});


// Getting reservations
app.get('/reservations', function (req, res,) {
  console.log('request query right here ---->', req.query);

  var sqlins = `SELECT * FROM Reservations INNER JOIN Users ON Reservations.UserId = Users.UserId INNER JOIN Rooms ON Reservations.RoomId = Rooms.RoomId `;

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: any[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Search orders
app.get('/orders/getByDate', function (req, res,) {
  console.log('request query right here ---->', req.query);

  var sqlins = `SELECT * FROM Orders INNER JOIN Users ON Orders.UserId = Users.UserId INNER JOIN Customer ON Orders.CustomerId = Customer.CustomerId 
  WHERE DATE(Orders.OrderDateTime) = "${req.query.orderDate}" `;

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: any[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Search reservations
app.get('/reservations/getByDate', function (req, res,) {
  console.log('request query right here ---->', req.query);

  var sqlins = `SELECT * FROM Reservations INNER JOIN Users ON Reservations.UserId = Users.UserId INNER JOIN Rooms ON Reservations.RoomId = Rooms.RoomId 
  WHERE DATE(Reservations.StartTime) = "${req.query.date}" `;

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: any[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Getting all menutypes dropdown menu
app.get('/menutypes', function (req, res,) {

  var sqlins = "SELECT * FROM MenuTypes";

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: MenuType[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Search Users
app.get('/users/getLikeNames', function (req, res,) {
  console.log('request body right here ---->', req.body);

  var sqlins = `SELECT * FROM Users INNER JOIN UserTypes ON Users.UserTypeId = UserTypes.UserTypeId WHERE Users.UserName LIKE "%${req.query.username}%"`;

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: Users[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// search menutypes dropdown menu
app.get('/menutypes/getLikeName', function (req, res,) {

  var sqlins = `SELECT * FROM MenuTypes WHERE MenuTypeName LIKE "%${req.query.menuTypeName}%"`;

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: MenuType[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Getting all users 
app.get('/users', function (req, res,) {

  var sqlins = `SELECT * FROM Users INNER JOIN UserTypes ON Users.UserTypeId = UserTypes.UserTypeId`;

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: Users[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Getting all customers 
app.get('/customers', function (req, res,) {

  var sqlins = "SELECT * FROM Customer";

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: Customer[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Getting all Orders 
app.get('/orders', function (req, res,) {

  var sqlins = "SELECT * FROM Orders LEFT JOIN Users ON Orders.UserId = Users.UserId LEFT JOIN Customer ON Orders.CustomerId = Customer.CustomerId";

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: Orders[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

// Getting all rooms 
app.get('/rooms', function (req, res,) {

  var sqlins = "SELECT * FROM Rooms";

  var sql = mysql.format(sqlins);

  con.query(sql, function (err: any, data: Rooms[]) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});