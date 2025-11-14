const guests = require("../models/manageguests");
const managehotel = require("../models/managehotel");
const rooms = require("../models/managerooms");

exports.gethome = (req,res,next)=>{
  managehotel.gethotelinfo().then(([[data]])=>{
    const hoteldata = data;
    rooms.getrooms().then(([roomdata])=>{
      res.render('home',{isloggedin:req.session.isloggedin,useremail: req.session.useremail,hoteldata:hoteldata,roomdata:roomdata});
    });
})
}

exports.book = (req,res,next)=>{
  managehotel.gethotelinfo().then(([[data]])=>{
    const hoteldata = data;
    if(hoteldata.onlinebooking==='off'){
      return res.redirect('/404');
    }
    guests.fetchdetails(req.session.useremail).then(([[data]])=>{
      const id = req.params.id;
      res.render('booking',{isloggedin:req.session.isloggedin,useremail: req.session.useremail,user:data,hoteldata:hoteldata,roomid:id});
    })
  })
  
  
}


exports.contactus = (req,res,next)=>{
  managehotel.gethotelinfo().then(([[data]])=>{
    const hoteldata = data;
    res.render('contact',{isloggedin:req.session.isloggedin,useremail: req.session.useremail,hoteldata:hoteldata});
  })
}

exports.getrooms = (req,res,next)=>{

  managehotel.gethotelinfo().then(([[data]])=>{
    const hoteldata = data;
    rooms.getrooms().then(([roomdata])=>{
      res.render('rooms',{isloggedin:req.session.isloggedin,useremail: req.session.useremail,hoteldata:hoteldata,roomdata:roomdata});
    });
})
}

exports.getroominfo = (req,res,next)=>{
  const room_id = req.params.room_id;
  managehotel.gethotelinfo().then(([[data]])=>{
    const hoteldata = data;
    rooms.getroombyid(room_id).then(([[roomdata]])=>{
      res.render('roominfo',{isloggedin:req.session.isloggedin,useremail: req.session.useremail,hoteldata:hoteldata,roomdata:roomdata});
    });
})
}