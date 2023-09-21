const express = require("express");
const customerRoutes = express.Router();

const customers = require("../db/customers");

customerRoutes.get("/", (req, res) => {
  res.send(customers);
});

customerRoutes.post("/", (req, res) => {
  const newCustomer = req.body;
  customers.push(newCustomer);

  res.status(201).json(newCustomer);
});

customerRoutes.put("/:username", (req, res) => {
  const username = req.params.username;
  const updatedCustomer = req.body;

  const customerIndex = customers.findIndex(
    (customer) => customer.username === username
  );

  if (customerIndex === -1) {
    return res.status(404).json({ message: "Kunde blev ikke fundet" });
  }

  customers[customerIndex] = updatedCustomer;
  res.json(updatedCustomer);
});

customerRoutes.delete("/:username", (req, res) => {
  const username = req.params.username;

  const customerIndex = customers.findIndex(
    (customer) => customer.username === username
  );

  // if (customerIndex === -1) {
  //   return res.status(404).json({ message: "Kunde blev ikke fundet" });
  // }

  // customers.splice(customerIndex, 1);
  // res.json({ message: "Kunde slettet" });
});

module.exports = customerRoutes;
