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

