const express = require('express')
var con1 = require("./src/db/conn");

const app = express()
const port =  process.env.port || 3000
const path = require('path') ;

var JSAlert = require("js-alert");
var alert =  require('alert') ;
//const exphbs = require('express-handlebars');

const Registration =  require("./src/db/user_model");
const Campaign =  require("./src/db/camp_model");
const Joincamp =  require("./src/db/liscamp_model");

const static_path = path.join(__dirname)
 
//console.log(static_path) 
var use11 = null 
var mycamps = null
var allcamps = null 
var showcamps = null
var myreg = null 
app.use(express.static(__dirname))
app.use(express.static(__dirname+ "/html1"))
app.use(express.json() )
app.use(express.urlencoded({extended:false}))

app.set("views engine","hbs")


app.get('/', (req, res) => {
	
	res.render("login.hbs") ;
} )

app.get('/login', (req, res) => {
	
	res.render("logfin.hbs") ;
} )

app.get('/signup', (req, res) => {
	
	res.render("logfin.hbs") ;
} )

app.post('/signup', async (req, res) => {
	
	try {
		
	const passwd = req.body.password ;
	const cpasswd = req.body.cpassword ;

	
	if( passwd === cpasswd ){

		try {
		
		//res.send(myobj)
		var newuser = new Registration();
		newuser.username	= 	req.body.username ;
		newuser.email		=	req.body.email1 ;
		newuser.password	= 	req.body.password ;
		newuser.fname		= 	req.body.fname ;
		newuser.mname		= 	req.body.mname ;
		newuser.lname		=	req.body.lname;
		newuser.gender		=	req.body.gender;
		newuser.contactno	= 	req.body.contactno;
		newuser.address		= 	req.body.address;
		newuser.pincode		= 	req.body.pincode ;
		newuser.bloodgroup	= 	req.body.bloodgroup;
		newuser.birthdate	=	req.body.birthdate

		//res.send(newuser)

		await newuser.save() ;
		
		res.render("logfin.hbs",newuser);

		} catch (error) {
			alert("username/email/phoneno is already exist or filled all fields");
			res.redirect("/signup")
		}
		
	}
	else{
		alert("password not matches");
		res.redirect("/signup")
	}

	} catch (error) { 
		res.status(400).send(error) ;
	}
} )

app.post("/main",async (req,res) => {

	try {
		const email11 = req.body.email ;
		const password = req.body.password ;
		

		const useremail = await Registration.findOne({email: email11})
		
		use11 = useremail 
		//console.log(useremail) ;

		if(useremail.password === password){

			allcamps =  await Campaign.find().limit(10);
			mycamps =  await Campaign.find({username:use11.username}); 
			console.log(mycamps,allcamps)


			res.status(201).render("main.hbs",{	useremail,
												listcam : mycamps,
												listall :allcamps,
												showdiv : "join"})
		}
		else{
			alert("Invalid login details");
			res.redirect('/login')
		}
	} catch (error) {

		alert("Invalid login details");
		res.redirect('/login')
	}

})

app.post('/createcamp', async (req, res) => {

		try {	

			//console.log("yes", use11) ; 
		var newcamp = new Campaign();

		newcamp.username	= 	use11.username ;
		newcamp.campname	=	req.body.campname ;
		newcamp.date		= 	req.body.dateofcamp ;
		newcamp.start_time	= 	req.body.starttime ;
		newcamp.maxmemb		= 	req.body.maxmemb ;
		newcamp.address		=	req.body.Address;
		newcamp.long1		=	19;
		newcamp.lat1		= 	19;
		newcamp.payment_status	=  req.body.campname;
		newcamp.regmemb  	= 0 ;
		newcamp.approvation		=  req.body.campname ;
 
		//console.log(newcamp, useremail)
		//res.send(newcamp)
		const useremail = use11 ;
		console.log(newcamp)
		await newcamp.save() ;

		allcamps =  await Campaign.find().limit(10);
		mycamps =  await Campaign.find({username:use11.username}); 
		
		res.render("main.hbs",{	useremail,
			listcam : mycamps,
			listall :allcamps,
			showdiv : "create"});
			
		} catch (error) {
			alert("Campname already exists");
			res.render("login.hbs" ,{	useremail,
				listcam : mycamps,
				listall :allcamps,
				showdiv : "create"});
		}
			
} )

app.post("/findcamp",async (req,res) => {

	try {
		const useremail = use11 ;
		console.log(req.body.campid)

		if(!(req.body.campid == "")){
			var find1 =  await Campaign.findOne({campname:req.body.campid})
			allcamps = [find1]
		}
		else{
			allcamps =  await Campaign.find().limit(10);
		}
	

		res.render("main.hbs",{	useremail,
			listcam : mycamps,
			listall : allcamps ,
			showdiv : "join" });
			

	} catch (error) {
		console.log(error)
		alert("Campname not exists");
		allcamps =  await Campaign.find().limit(10);
		res.render("main.hbs",{	useremail,
			listcam : mycamps,
			listall :allcamps,
			showdiv : "join"});
	}

})

app.post("/joincamp",async (req,res) => {

	const useremail = use11 ;
	try {

		
		console.log(req.body.campid)

		var newjoin = new Joincamp() 

		newjoin.username = use11.username
		newjoin.join1	= {		username : use11.username ,
								campname : req.body.campid11
							}

		newjoin.campname 	= req.body.campid11
		newjoin.email		= use11.email
		newjoin.fname		= use11.fname
		newjoin.lname		= use11.lname
		newjoin.date 		= req.body.date11
		newjoin.status		= 	"not_done"

		console.log(newjoin,"camp")
		await newjoin.save() ;
		allcamps =  await Campaign.find().limit(10);

		res.render("main.hbs",{	useremail,
			listcam : mycamps,
			listall : allcamps,
			showdiv : "join" });
			

	} catch (error) {
		console.log(error)
		alert("You already join this campaign");
		res.render("main.hbs",{	useremail,
			listcam : mycamps,
			listall :allcamps,
			showdiv : "join" });
	}

})


app.post("/showcamp",async (req,res) => {

	const useremail = use11 ;
	try {

		showcamps =  await Joincamp.find({campname:req.body.camp22})
		console.log("showcamp is ",showcamps)

		res.render("main.hbs",{	useremail,
			listcam : mycamps,
			listall : allcamps ,
			listshow : showcamps,
			showdiv : "show"  });
			

	} catch (error) {
		console.log(error)
		alert("You already join this campaign");
		res.render("main.hbs",{	useremail,
			listcam : mycamps,
			listall :allcamps, 
			showdiv : "show"});
	}
	
})

app.post("/registered",async (req,res) => {

	const useremail = use11 ;
	try {
		
		myreg =  await Joincamp.find({username:use11.username})
		console.log("myreg is ",myreg)

		res.render("main.hbs",{	useremail,
			listcam : mycamps,
			listall : allcamps ,
			listreg : myreg,
			showdiv : "myjoin"  });
			

	} catch (error) {
		console.log(error)
		alert("You already join this campaign");
		res.render("main.hbs",{	useremail,
			listcam : mycamps,
			listall :allcamps, 
			showdiv : "myjoin"});
	}
	
})


app.post("/mark_done",async (req,res) => {

	const useremail = use11 ;
	try {
		const Object = {
			username : req.body.username ,
			campname : req.body.campname
		}
		const filter = { join1 : Object }
		const update = { status : 'done'}
		console.log(filter)
		
		var mark = await Joincamp.findOneAndUpdate(filter,update)
		
		console.log(mark)
		
		showcamps =  await Joincamp.find({campname:req.body.campname})
		console.log("showcamp is ",showcamps)

		res.render("main.hbs",{	useremail,
			listcam : mycamps,
			listall : allcamps ,
			listshow : showcamps,
			showdiv : "show"  });
			

	} catch (error) {
		console.log(error)
		alert("You already mark_done");
		res.render("main.hbs",{	useremail,
			listcam : mycamps,
			listall :allcamps, 
			showdiv : "myjoin"});
	}
	
})

app.get("/joincamp",async (req,res) => {

	res.render("main.hbs",{	useremail,
		listcam : mycamps,
		listall : allcamps ,
		showdiv : "myjoin"  });
		
})

app.get("/createcamp",async (req,res) => {

	res.render("main.hbs",{	useremail,
		listcam : mycamps,
		listall : allcamps ,
		showdiv : "myjoin"  });
		
})

app.get("/mark_done",async (req,res) => {
		
		showcamps =  await Joincamp.find({campname:req.body.campname})
		console.log("showcamp is ",showcamps)

		res.render("main.hbs",{	useremail,
			listcam : mycamps,
			listall : allcamps ,
			listshow : showcamps,
			showdiv : "show"  });
	
})


console.log(use11);


app.listen(port, () => console.log(`Example app listening on port port!`))
