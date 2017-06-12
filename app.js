var socket = new WebSocket('ws://192.168.1.233:8001/ws');
var quill = new Quill('#editor', {
    theme: 'snow'
});

socket.onopen = function() {
    console.log('connected');
};

socket.onmessage = function(message) {
    var data = message.data; 
    console.log(data);
    quill.updateContents(JSON.parse(data));
};

quill.on('text-change',  function(delta, oldDelta, source) {
    if (source === 'user') {
        socket.send(JSON.stringify(delta));
    }
});
