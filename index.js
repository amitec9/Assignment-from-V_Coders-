/*
Authour : - Amit kumar 
NodeJS -> create a json file of the students data (id, name, class, rollNo, age). Write all the APIs i.e GET, PUT, POST, DELETE.

1. get the list of all the students
2. get the list of a particular student
3. add a new student to the list
4. update the age of a particular student
5. delete a particular student based on the age
6. Filter the students based on the age. Let's say you want to filter the students whose age is greater than 20
7. write an api to get the average age of the students*/

const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const fread = fs.readFileSync("student.json");
const middleWare = function (req, res, next) {
  console.log(
    "url: " + req.url + " method: " + req.method + " Time : " + new Date()
  );
  next();
};
app.use(middleWare);
app.use(bodyParser.json());

function writeConfig(obj) {
  fs.writeFile(
    "student.json",
    JSON.stringify(obj, undefined, 2),
    function (err) {
      if (err) console.log(err);
    }
  );
}

var removeByAttr = function (arr, attr, value) {
  var i = arr.length;
  while (i--) {
    if (
      arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      arguments.length > 2 &&
      arr[i][attr] === value
    ) {
      arr.splice(i, 1);
    }
  }
  return arr;
};
app.get("/student", (req, res) => {
  //1. get the list of all the students
  try {
    res.json({
      status: true,
      data: JSON.parse(fread),
    });
  } catch (err) {
    console.log("Error ", err);
  }
});

app.get("/studentname", (req, res) => {
  //2. get the list of a particular student
  try {
    let querys = req.query;
    let data = JSON.parse(fread);
    let result = data.filter(
      (d) => d.name.toString() === querys.name.toString()
    );
    res.json({
      status: true,
      data: result,
    });
  } catch (err) {
    console.log("Error ", err);
  }
});

app.post("/student", (req, res) => {
  //3. add a new student to the list
  try {
    let body = req.body;
    let data = JSON.parse(fread);
    let ids = Math.max(...data.map((o) => o.id), 1) + 1;
    data.push({
      id: ids,
      name: body.name,
      class: body.class,
      rollNo: body.rollNo,
      age: body.age,
    });
    writeConfig(data);
    res.json({
      status: true,
      data: data,
    });
  } catch (err) {
    console.log("Error", err);
  }
});

app.put("/student/:id", (req, res) => {
  //4. update the age of a particular student
  try {
    let body = req.body.age;
    let ids = req.params.id;

    let data = JSON.parse(fread);
    //Find index of specific object using findIndex method.
    objIndex = data.findIndex((obj) => obj.id == ids);
    data[objIndex].age = Number(body);
    writeConfig(data);
    res.json({
      status: true,
      data: data,
    });
  } catch (err) {
    console.log("Error", err);
  }
});

app.delete("/student", (req, res) => {
  //5. delete a particular student based on the age
  try {
    let data = JSON.parse(fread);
    let result = removeByAttr(data, "age", req.body.age);
    writeConfig(result);
    res.json({
      status: true,
      data: result,
    });
  } catch (err) {
    console.log("Error", err);
  }
});

app.get("/studentFliter", (req, res) => {
  //6. Filter the students based on the age. Let's say you want to filter the students whose age is greater than 20
  try {
    let querys = req.query;
    let data = JSON.parse(fread);
    let result = data.filter((d) => d.age.toString() >= querys.age.toString());
    res.json({
      status: true,
      data: result,
    });
  } catch (err) {
    console.log("Error", err);
  }
});

app.get("/studentaverage", (req, res) => {
  // 7. write an api to get the average age of the students
  try {
    let data = JSON.parse(fread);
    let result = data;
    let avgs = result.reduce((ac, a) => a.age + ac, 0) / result.length;
    let ress = result.filter((d) => d.age.toString() === avgs.toString());
    let output = {
      studentAverageAge: avgs.toFixed(2),
      student: ress,
    };
    res.json({
      status: true,
      data: output,
    });
  } catch (err) {
    console.log("Error", err);
  }
});

app.listen(4000, () => {
  console.log(" Server is running : 4000");
});
