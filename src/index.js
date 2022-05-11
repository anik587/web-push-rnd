//Express
const express = require('express');
//web-push
const webpush = require('web-push');

//body-parser
const bodyParser = require('body-parser');

//path
const path = require('path');

//using express 
const app = express();


//using bodyparser
app.use(bodyParser.json());


const publicVapidKey = 'BMsDYGKP1WjjOKF-HrnfCzKneOlMLETzP6YGzLPZBOq_HkM0WU1p_Ksjw3kfb5wUdUSesueoCt3DnmLPH0sJcEs';
const privateVapidKey = 'zeYp3thE5gGhunXcSeq-sp8Zm_b5fM55L6TovbWiXno';

//setting vapid keys details
webpush.setVapidDetails('mailto:mercymeave@section.com', publicVapidKey,privateVapidKey);

//subscribe route
app.post('/subscribe-to', (req, res)=>{
    //get push subscription object from the request
    console.log('ssss')
    const subscription = req.body;
    console.log(subscription)
    //send status 201 for the request
    res.status(201).json({})

    //create paylod: specified the detals of the push notification
    const payload = JSON.stringify({title: 'Section.io Push Notification' });
    console.log(subscription.endpoint)
    //pass the object into sendNotification fucntion and catch any error
    webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
   
});





app.use(express.static(path.join(__dirname, "client")));

const port = 3000;
app.listen(port, ()=>{
    console.log(`server started on ${port}`)
});