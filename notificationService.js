const { messaging } = require("./config/firebase.js");


const sendNotification = async (to, notification, data) => {
  try {

    
    let message;

    console.log('data :::',data);
    
    if(data.call != null) {
        message = {
            data: {
              title: notification.title,
              body: notification.body,
              data: JSON.stringify(data.call.invoice), // Serialize nested objects to strings
              
              type: data.type,
              priority: data.priority
            },
            token: to,
            android: {
              priority: 'high'
            }
          };
    } else if(data.redirect == "VideoCall") {
      message = {
          data: data, // Convert all data to JSON string
          token: to,
          android: { priority: 'high' },
      };
    } else {
       message = {
            data: data, // Convert all data to JSON string
            token: to,
            android: { priority: 'high' },
            
          };
    }
    

     
      console.log('message Data ::::::',message);
    const response = await messaging.send(message);
    console.log(response, "check sendddd nnnnnnnnnnnnnn")

} catch (error) {
    console.log(error);
}


};

module.exports = { sendNotification };
