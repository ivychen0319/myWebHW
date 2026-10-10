var express = require('express');
var fs=require('fs');
const path = require('path');
const port = 1031
var app = express();
// app.use('/vd', express.static('public'));
app.use(express.static('public'));

app.set('view engine', 'ejs');


app.listen(port, function() {
    console.log(`範例伺服器啟動, port: ${port}`);
   })
   

app.get('/about', (req, res) => {
    res.render('about', req.query);
   });

app.get('/video', (req, res) => {
    res.render('video', req.query);
   });

app.get('/team', (req, res) => {
    res.render('team', req.query);
   });

app.get('/place', (req, res) => {
    res.render('place', req.query);
   });

app.get('/class', (req, res) => {
    res.render('class', req.query);
   });

app.get('/reserve', (req, res) => {
    res.render('reserve', req.query);
   });  

   app.get('/reserve2', (req, res) => {
      res.render('reserve2', req.query);
     }); 

app.get('/login2', (req, res) => {
    res.render('login3', req.query);
   });

app.get('/login', (req, res) => {
    res.render('login2', req.query);
   });



app.get('/textupload', (req, res) => {
    res.render('textupload', req.query);
   });




app.get('/sendMSG', (req, res) => {
	var nodemailer = require('nodemailer');
	var tp = nodemailer.createTransport({
		service:'Gmail',
		auth:{
			user: 'mail',
 			pass: 'Password'
		}
	});
	var options = {
		to: 'mail', //收件者
		cc:req.query.email,
		subject: '您在 登峰教育機構 '+req.query.place+' 預約 '+req.query.datetime+' 的試聽', // 主旨
		html: '** 本郵件由系統自動發送，請勿直接回覆 **<br><br>'+req.query.name+'，您好！已經收到您的試聽預約，以下為您的預約資訊：<br>試聽日期與時間：'+req.query.datetime+'<br>試聽項目：'+req.query.item+"<br>試聽地點："+req.query.place, //嵌入 html 的內文
	   };
	   //發送信件方法
	   tp.sendMail(options, (error, info) => {
		if(error) { console.log(error);
		} else { console.log(' 訊息發送: ' + info.response);
		}
		
	   });

	   res.render('reserve', req.query);
   })


   app.use(express.urlencoded({extended: true}));
   app.use(express.json());



   var bodyParser = require('body-parser');
   app.use( bodyParser.urlencoded({ extended: false }));
   app.use( bodyParser.json() );
   

   const multer = require('multer');
const e = require('express');
   var storage = multer.diskStorage({
      destination: 'uploads',
      filename: function (req, file, callback) {
      //   req.body = req.body;
      callback(null, "1");
      // fs.renameSync('./uploads/'+file.originalname,'./applicants/'+req.body.account);
  }
  });
  var upload = multer({ storage : storage }).array('fileUpload')
   


   app.post('/upload',  function (req, res, next) {
      upload(req,res, function(err) {
         if (err) {
            return  console.log(err);
            } 
            fs.renameSync('./uploads/'+"1",'./public/uploads/'+req.body.account);
            // res.send(req.file.originalname + '檔案上傳完成');
            req.body = req.body;
            //由於設定了enctype='multipart/form-data'，這裡使用multer的req.body能獲取文字域的值，將multer裡的req.body賦給當前的req.body
            try {
               fs.writeFileSync('applicants/'+req.body.account+'.json', JSON.stringify(req.body));
               } catch (err) { console.log('儲存錯誤 '+req.body.account+'.json');}
               // res.send(req.body.name+' 歡迎您的應徵.請靜候通知');
               res.render('login3', req.query);
            console.log(req.body.account+req.body.name+"註冊成功");
            next();
            });
     
            
     }) 





   // app.post('/upload', function(req,res) {
   //  const formData = req.body;
   //     upload(req,res,function(err) {
   //  //    if(err) {
   //  //        return res.send(file.originalname + '檔案上傳失敗');
   //  //    }
   //  //    res.send(req.file.originalname + '檔案上傳完成');
   //     });

   //     try {
   //      fs.writeFileSync('applicants/'+req.body.name+'.json', JSON.stringify(req.body));
   //      } catch (err) { console.log('儲存錯誤 '+req.body.name+'.json');}
   //      // res.send(req.body.name+' 歡迎您的應徵.請靜候通知');
   //      res.render('login3', req.query);
   // })
   
   
   


   app.get('/showAPs', function(req,res) {
	var datapath='applicants/';
	var fnames = { files : [] };
	fs.readdir(datapath, function(err, file){
	if (err) {console.log('Could not open applicants folder!'); return}
	file.forEach(function(file, index){
	var aFile = path.join(datapath, file);
	var fArray = {}; fArray['file_name']=aFile;
	fnames.files.push(fArray);
	});
	var appdata = { applicants : [] };
	fnames.files.forEach( (item) => {
	const itemdata = fs.readFileSync(item.file_name);
	appdata.applicants.push(JSON.parse(itemdata));
	});
	res.render('showAPs', appdata);
	});
   })

// app.post('/login3',  function (req, res) {
//    var datapath='applicants/';
//    var fnames = { files : [] };
//    fs.readdir(datapath, function(err, file){
// 	if (err) {console.log('Could not open applicants folder!'); return}
// 	file.forEach(function(file, index){
// 	var aFile = path.join(datapath, file);
// 	var fArray = {}; fArray['file_name']=aFile;
// 	fnames.files.push(fArray);
// 	});
// 	var appdata = { applicants : [] };
// 	fnames.files.forEach( (item) => {
// 	const itemdata = fs.readFileSync(item.account);
// 	appdata.applicants.push(JSON.parse(itemdata));
// 	});
// 	res.render('login5', appdata);
// 	});
//    });

   // app.post('/login3',  function (req, res) {
   //       const empdata = fs.readFileSync('applicants/'+req.body.account+'.json');
   //    // }catch (err) { console.log('登入錯誤 ');}
   //       res.render('login5', JSON.parse(empdata));
   //    })
         // account.files.forEach( (item) => {
         // req.body = req.body;
         // // try{
         //    const empdata = fs.readFileSync(req.body.account);
         // // }catch (err) { console.log('登入錯誤 ');}
         //    res.render('login5', JSON.parse(empdata));
         // });
           


      //   app.post('/login3', function(req,res) {
      //    try {
      //    fs.writeFileSync('applicants/'+req.body.account+'.json', JSON.stringify(req.body));
      //    } catch (err) { console.log('儲存錯誤 '+req.body.account+'.json');}
      //    res.send(req.body.account+' 歡迎您的應徵.請靜候通知');
      // }) 
      

      // app.post('/login3',  function (req, res) {
      //    var account = { files : [] };
      //    account.files.forEach( (item) => {
      //    req.body = req.body;
      //    // try{
      //       const empdata = fs.readFileSync('applicants/'+req.body.account+'.json');
      //    // }catch (err) { console.log('登入錯誤 ');}
      //       res.render('login5', JSON.parse(empdata));
      //    });
      //      });