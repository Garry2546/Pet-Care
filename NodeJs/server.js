var express = require("express");
var app = express();
var msql = require("mysql");
var fileuploader = require("express-fileupload");
var path = require("path");

const { table } = require("console");
app.use(express.static(path.join(__dirname, 'public')))
app.use(fileuploader());

app.listen(2546, function () {
    console.log("server started...")
})
app.get("/index", function (req, resp) {
    var fullpath = path.join(__dirname, "public", "index.html")
    resp.sendFile(fullpath);

})
app.get("/signup.html", function (req, resp) {
    var fullpath = path.join(__dirname, "public", "signup.html")
    resp.sendFile(fullpath);
})
// app.get("/index", function (req, resp) {
//     var fullpath = path.join(__dirname, "public", "index.html")
//     resp.sendFile(fullpath);
// })

dbconfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "web-project"
}
app.use(express.urlencoded({ extended: true }))
var dbref = msql.createConnection(dbconfig);
dbref.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else
        console.log("congratss database connected successfully...");
})

app.get("/signup-process", function (req, resp) {
    console.log(req.query);
    rad = req.query.z;
    data = [req.query.x, req.query.y, req.query.z,1];
    data_check = [req.query.x];

    dbref.query("select * from user where email=?", data_check, function (err, table) {
        if (err){
            console.log(err);
        }
            if (table.length == 1){
            resp.send("email already exists");
        }
    })

    dbref.query("insert into user values(?,?,?,?,current_date())", data, function (err, table) {
        if (err){
            console.log(err);
        }
            else {

            resp.send("Thank you for Signing In");
        }


    })
})
app.get("/login-process", function (req, resp) {

    console.log(req.query);

    dataA = [req.query.x, req.query.y];
    dbref.query("select * from user where email=? and password=?", dataA, function (err, table) {
        if (err)
            console.log(err.sqlMessage);
        else if (table.length == 1) {
            if (table[0].type == "Care-taker"|| table[0].type=="Client" ) {
                resp.send("0");
            }
            else
                resp.send("1");
        }
        else
            resp.send("invalid email id or password");
    })

})

app.post("/save-profile", function (req, resp) {
    console.log(req.body);
    var des = path.join(__dirname, "public", "uploads", req.files.pic.name);
    req.files.pic.mv(des, function (err) {
        if (err)
            console.log(err);
        else
            console.log("pic uploaded successfully in folder");
    })
    var mail = req.body.txtEmail;
    var name = req.body.txtName;
    var mob = req.body.txtcontact;
    var cty = req.body.txtCity;
    var state = req.body.txtState;
    var pin = req.body.txtPin;
    var proof = req.body.txtProof;
    var ad = req.body.txtAddress;
    var pet = req.body.txtPets;
    var pic = req.files.pic.name;
   var data = [mail, name, mob, ad, cty, state, pin, proof, pic, pet];
    var data_check=[mail];
    dbref.query("select * from tableprofile where emailid=?",data_check,function(err,table){
        if(err)
        console.log(err);
        else if(table.length==1) 
        {
            resp.send("email already exists...");
        }
    })

    dbref.query("insert into tableprofile values(?,?,?,?,?,?,?,?,?,?)", data, function (err) {
        if (err)
            console.log(err);
        else
            console.log("everything sent to the database....");
        resp.send("data sent");
    })
})
app.post("/update-profile", function (req, resp) {
    console.log(req.body);
    var fileName
    if (req.files != null) {
        fileName = req.files.pic.name;
        var des = process.cwd() + "/public/uploads/" + fileName;
        req.files.pic.mv(des, function (err) {
            if (err)
                console.log(err);
            else
                console.log("pic uploaded successfully in folder");
        })
    }
    else
    fileName = req.body.hdn;//this is cauz when we want to keep the same pic in update it gives error so this is the solution
    var mail = req.body.txtEmail;
    var name = req.body.txtName;
    var mob = req.body.txtcontact;
    var cty = req.body.txtCity;
    var state = req.body.txtState;
    var pin = req.body.txtPin;
    var proof = req.body.txtProof;
    var ad = req.body.txtAddress;
    var pet = req.body.txtPets;

    data = [name, mob, ad, cty, state, pin, proof, fileName, pet, mail];

    dbref.query("update tableprofile set cname=?,contact=?,address=?,city=?,state=?,pin=?,proof=?,pic=?,pets=? where emailid=?", data, function (err, result) {
        if (err)
            console.log(err);
        else if (result.affectedRows == 1)
            resp.send("Data Updated");
        else
            resp.send("Invalid emailid/password");
    })
})
app.get("/search-profile", function (req, resp) {
    var dataAry = [req.query.email];
    dbref.query("select * from tableprofile where emailid=?", dataAry, function (err, table) {
        console.log(table);
        if (err)
            resp.send(err.sqlMessage);
        else
            resp.send(table);

    })
})
app.get("/admin", function (req, resp) {
    var fullpath = path.join(__dirname, "public", "dash-admin.html")
    resp.sendFile(fullpath);

})

app.get("/fetch-profile", function (req, resp) {
    
    dbref.query("select * from tableprofile ", function (err, table) {
        console.log(table); 
        if (err)
            resp.send(err.sqlMessage);
        else
            resp.send(table);//its for sending jason array

    })
})
app.get("/fetch-user", function (req, resp) {
    2
    dbref.query("select * from user", function (err, table) {
        console.log(table); 
        if (err)
            resp.send(err.sqlMessage);
        else
            resp.send(table);//its for sending jason array

    })
})
app.get("/block-user", function (req, resp) {
    data=[req.query.emailid];
    dbref.query("update user set status=0 where email=?",data, function (err, table) {
        console.log(table); 
        if (err)
            resp.send(err.sqlMessage);
        else
            resp.send(table);//its for sending jason array

    })
})
app.get("/unblock-user", function (req, resp) {
    data=[req.query.emailid];
    dbref.query("update user set status=1 where email=?",data, function (err, table) {
        console.log(table); 
        if (err)
            resp.send(err.sqlMessage);
        else
            resp.send(table);//its for sending jason array

    })
})
app.post("/save-caretaker", function (req, resp) {
    console.log(req.body);
    
    var mail = req.body.txtEmail;
    var name = req.body.txtName;
    var mob = req.body.txtContact;
    var cty = req.body.txtCity;
    var info=req.body.txtInfo
    var firm=req.body.txtFirm;
    var ad = req.body.txtAddress;
    var pet = req.body.pets.toString();
   var data = [mail, name, mob,firm, cty,ad, pet,info];
    var data_check=[mail];
    // dbref.query("select * from caretaker where emailid=?",data_check,function(err,table){
    //     if(err)
    //     console.log(err);
    //     if(table.length==1) 
        
    //         resp.send("email already exists...");
        
    // })

    dbref.query("insert into caretakers values(?,?,?,?,?,?,?,?)", data, function (err) {
        if (err)
            console.log(err);
        else
            console.log("everything sent to the database....");
        resp.send("data sent");
    })
})

app.post("/update-caretaker", function (req, resp) {
    console.log(req.body);
   
    var mail = req.body.txtEmail;
    var name = req.body.txtName;
    var mob = req.body.txtContact;
    var cty = req.body.txtCity;
    var info=req.body.txtInfo
    var firm=req.body.txtFirm;
    var ad = req.body.txtAddress;
    var pet = req.body.pets.toString();
   var data = [ name, mob,firm, cty,ad, pet,info,mail];

    dbref.query("update caretakers set name=?,contact=?,firmweb=?,city=?,address=?,pets=?,information=? where email=?",data,function(err,result){
        if(err)
        console.log(err);
        else if(result.affectedRows==1) 
        
            resp.send("data updated");
        else
        resp.send("invalid email");
        
    })

   
})
app.get("/search-caretaker", function (req, resp) {
    var dataAry = [req.query.email];
    dbref.query("select * from caretakers where email=?", dataAry, function (err, table) {
        console.log(table);
        if (err)
            resp.send(err.sqlMessage);
        else
            resp.send(table);

    })
})
app.get("/find-caretaker", function (req, resp) {
    var fullpath = path.join(__dirname, "public", "find-caretaker.html")
    resp.sendFile(fullpath);

})
app.get("/fetch-city",function(req,resp){
    dbref.query("select distinct city from caretakers",function(err,table){
        console.log(table);
        if (err)
            resp.send(err.sqlMessage);
        else
            resp.send(table);
    })
})

