//require express
const express = require("express");
const app = express();//insert all express toll in app variable
//database connection
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'NRP20330',
    database : 'project'
  });
try{
connection.query('show tables', (error, results)=> {
    if (error) throw error;
    console.log(results);
});
}
catch(error){
    console.log(error);
}

Port = 4000;  //localhost port where your data gone

app.set("view engine",'ejs');//set views engen for rendering html and css pages
const path = require('path');
app.set('views',path.join(__dirname,'/views'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//link css file
app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.render("index.ejs")
});

app.get('/stu_signup', (req, res) => {
    res.render('stu_signup.ejs');
});

// Redirect if someone tries to access `/stu_signup.ejs` directly
app.get('/stu_signup.ejs', (req, res) => {
    res.redirect('/stu_signup');
});


//insertting student signup information

let q = "INSERT INTO student(username,user_id,mobile_no,email,password) Values(?,?,?,?,?)";

app.post('/stu_signup', (req, res) => {
    

    
    const{
        username,user_id,
        mobile_no,
        email,password
    } = req.body;

    const query = q;
    const values = [
        username,user_id,
        mobile_no,
        email,password
    ];
       
    try{
        connection.query(query,values, (error,results)=> {
            if (error) throw error;
            console.log('Data inserted successfully:', results);
            console.log('Create Student Profile Sucessfully');
            res.render("stu_profile.ejs"); // Redirect to the signup page after inserting data

        });
        }
        catch(error){
            console.log('Error inserting data:', error);
        }
});
// Teacher signup form
app.get('/t_signup', (req, res) => {
    res.render('t_signup.ejs');
});

app.get('/t_signup.ejs',(req,res)=>{
    res.render('t_signup');
})



let p = "INSERT INTO teacher(username,teacher_id,mobile_no,email,password) VALUES(?,?,?,?,?)"
app.post('/admin_signup', (req, res) => {
    const{
        username,teacher_id,
        mobile_no,email,password
    } = req.body;
   const query = p;

    const values = [
        username,teacher_id,
        mobile_no,email,password
    ];

    try{
        connection.query(query,values, (error,results)=> {
            if (error) throw error;
            console.log('Data inserted successfully:', results);
            console.log('Creat Teacher Profile Sucessfully');
            res.render('t_profile'); // Redirect to the signup page after inserting data

        });
        }
        catch(error){
            console.log('Error inserting data:', error);
        }

});
// user complaint
app.get('/stu_profile', (req, res) => {
    res.render('stu_profile.ejs'); // Assuming `stu_profile.ejs` is your profile page template
});
app.get('/stu_profile.ejs',(req,res)=>{
    res.render('stu_profile.ejs');
});

let comp="INSERT INTO stu_complaint (username, course, email, roll_no, mobile_no, department, faculty_name, faculty_email, complaint_title, complaint_text)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


//create rout using post method (Data server pe retrive krne ke liye)
app.post('/stu_profile',(req,res)=>{
   

    const {
        username, course, 
        email, roll_no,
         mobile_no, 
         department, 
         faculty_name, 
         faculty_email, 
         complaint_title, 
         complaint_text
    }  = req.body;
    

    const query = comp;

    const values = [
        username, 
        course, 
        email, 
        roll_no,
        mobile_no, 
        department, 
        faculty_name, 
        faculty_email, 
        complaint_title, 
        complaint_text
    ];

    try{
        connection.query(query,values, (error,results)=> {
            if (error) throw error;
            console.log('Data inserted successfully:', results);
            console.log('Complaint Submeted Sucessfully');
            res.redirect("/stu_profile?submited=true")
        });
        }
        catch(error){
            console.log('Error inserting data:', error);
        }
});

// Home page
app.get('/home',(req,res)=>{
    res.render('index.ejs');
})

// fetching all user application

app.post('/t_profile',(req,res)=>{
    let q = 'Select * from stu_complaint '
    try{
        connection.query(q,(error,result)=>{
            if (error) throw error;
            const stu_complaint = result.length > 0 ? result : []; 
            res.render('t_profile',{stu_complaint});
        })
    }
    catch(error){
        console.log("something went wrong");
    }
})

//call server
app.listen(Port,()=>{
    console.log(`App is Running on Port ${Port} `);
})