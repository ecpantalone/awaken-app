import React from 'react';
import './App.css';
import request from 'request';

// these need to go into an .env file and be gitignored
const mailchimpAPIKey = "8fafccb0cfb8611bfce849556072f354-us18";
const mailchimpURI = "https://usX.api.mailchimp.com/3.0/";

function seeLists() {
  const data = {
    //email_address: email,
    //status: 'subscribed',
  };

  // const LIST_ID = 'xxxxxx';
  const mailchimpAPIKey = '8fafccb0cfb8611bfce849556072f354-us18';

  let myHeaders = new Headers();
  myHeaders.append("Cookie", "_mcid=1.1ebcc928d439d2d3d9b1ee09a070b504.fbf36732a11449a3cbe72c71f552661db989f91e30f901f9e5eb6eb113c3df30; _AVESTA_ENVIRONMENT=prod; ak_bmsc=7090114ADD245215D752E2F223F96451B81960450A2A00005361BC5E6FF57F44~plWtUB+g1oWcsgztwiLllQSFiYSssU6CA5H0pCwUIi5XnSIj1DDLLVnVpmcjHeUK4hY27LySDYAER4kk9KsF14yIgFyUPkusAPZVwfVTbnVVppIzXobfxDmEvosZ1JrXF6CId5wcgeS1IYPlULSuRfY7I9yUm3rPzb8d8k/fkYz2oQEeekS4JliyiDt0vN47QuzA1DEukDeC+A6OTiZJBUvBCar2l5z7RDSTdwR68/uWs=; bm_sv=375624244E9C920A256E360D5FFF5F3C~hTi1J+aFqHItm5P7/YwVJcufhpAfgq3ITq2hse6UIqldnnL5BrBVcCCjjaAEaHjojUTGfghYCewGOTiic1wDOZorLYlqUx8xqCr7iW+oPil7x1i5gR8ifSRpPuojW1SwiN/hKnBkIziJFG3WSvnedrxgwgI92sVx6ZHejHE5OV4=");
  
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch({mailchimpURI} + "templates?apikey=" + {mailchimpAPIKey}, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
