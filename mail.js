var nodemailer = require('nodemailer');
	var tp = nodemailer.createTransport({
		service:'Gmail',
		auth:{
			user: 'a109221031@mail.shu.edu.tw',
 			pass: 'zpyuchigvybpulgj'
		}
	});
	var options = {
		to: 'a109221031@mail.shu.edu.tw', //收件者
		// cc:req.query.subscription,
		subject:'這是來自登峰教育機構的訊息', // 主旨
		html: '感謝您訂閱我們！我們會定期寄送相關活動給您！', //嵌入 html 的內文
	   };
	   //發送信件方法
	   tp.sendMail(options, (error, info) => {
		if(error) { console.log(error);
		} else { console.log(' 訊息發送: ' + info.response);
		}
		
	   });