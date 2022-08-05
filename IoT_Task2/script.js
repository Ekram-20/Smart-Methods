// ---------- Speech Recognition ---------

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ar';
recognition.interimResults = true;

let speechToText;
startButton = document.querySelector('#start');

startButton.addEventListener('click', function () {
    try {
        recognition.start();
    } catch (error) {
        console.log("It`s recording now") // if click while it`s working
    }
});

recognition.onstart = function () {
    startButton.style.backgroundColor = '#8ad1c0'; 
    startButton.innerHTML = 'تحدث';
};

recognition.onspeechend = function () {
    startButton.style.backgroundColor = '#292345';
    startButton.innerHTML = 'ابدأ التحدث';    
    recognition.stop();
    moveMotor()
};

recognition.onresult = function (event) {
    speechToText = event.results[0][0].transcript;
    document.querySelector('p').innerHTML = speechToText;
};


// ----------Talk to Arduino Code---------

if (!"serial" in navigator) {
    console.log('The Web Serial API is not supported.');    
    System.exit(1);    
}

let writer; // will send the date to arduino code
let isConnected = false; // check if web connected to Arduino
connectButton = document.querySelector('#connect');

// connect with web
connectButton.addEventListener('click', async function () {

    // only filter Arduino devices  
    const filters = [
        { usbVendorId: 0x2341, usbProductId: 0x0043 },
        { usbVendorId: 0x2341, usbProductId: 0x0001 }
    ];

    try {
        const port = await navigator.serial.requestPort({ filters }); // select port 
        await port.open({ baudRate: 115200 }); // wait openning the port        
        writer = port.writable.getWriter();
        isConnected = true;

    }
    catch (error) {
        console.log(error); // The user didn't select a port.
    }
});

// after ending recognation, send the action to arduino code
async function moveMotor() {

    if (!isConnected) {
        alert("you must connect to the usb in order to use this.");
        return;
    }

    let actions = speechToText.split(" ");
    for (let action of actions)      
        await writer.write(`${action}@`); 
}


















// let isConnectted = false;
// let port;
// let writer;
// var target_id;
// const enc = new TextEncoder();

// async function onChangespeech() {
//   if (!isConnectted) {
//     alert("you must connect to the usb in order to use this.");
//     return;
//   }

//   try {
//     const commandlist = content;
//     const commandSplit = commandlist.split(" ")
//     const command = commandSplit.slice(-1);
//     const computerText = `${command}@`;
//     await writer.write(enc.encode(computerText));
//   } catch (e) {
//     console.log(e);
//   }
// }















// let isConnectted = false;
// let port;
// let writer;
// const enc = new TextEncoder();

// async function onChangeColor() {
//     if (!isConnectted) {
//         alert("you must connect to the usb in order to use this.");
//         return;
//     }
//     try {
//         const colorHex = document.getElementById("color-picker").value;
//         const colorRgb = hexToRgb(colorHex);
//         const computerText = `${colorRgb.r}-${colorRgb.g}-${colorRgb.b}@`;
//         await writer.write(enc.encode(computerText));
//     } catch (e) {
//         console.log(e);
//         alert("could not write color");
//     }
// }

// async function onConnectUsb() {
//     try {
//         const requestOptions = {
//             // Filter on devices with the Arduino USB vendor ID.
//             filters: [{ usbVendorId: 0x2341 }],
//         };

//         // Request an Arduino from the user.
//         port = await navigator.serial.requestPort(requestOptions);
//         await port.open({ baudrate: 115200 });
//         writer = port.writable.getWriter();
//         isConnectted = true;
//     } catch (e) {
//         console.log("err", e);
//     }
// }

