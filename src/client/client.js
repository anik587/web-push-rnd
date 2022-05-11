
const publicVapidKey = 'BMsDYGKP1WjjOKF-HrnfCzKneOlMLETzP6YGzLPZBOq_HkM0WU1p_Ksjw3kfb5wUdUSesueoCt3DnmLPH0sJcEs';
const privateKey = 'zeYp3thE5gGhunXcSeq-sp8Zm_b5fM55L6TovbWiXno';  

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}   


async function send(){
    //register service worker
    const register = await navigator.serviceWorker.register('/service.js', {
        scope: '/'
    });


    //register push
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,

        //public vapid key
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
   
    //Send push notification
    await fetch("/subscribe-to", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
}

//check if the serveice worker can work in the current browser
if('serviceWorker' in navigator){
    send();
}
 