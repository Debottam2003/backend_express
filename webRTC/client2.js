const lc = new RTCPeerConnection();
const dc = lc.createDataChannel("channel");
dc.onmessage = (e) => {
    console.log(e.data);
};
dc.onopen = (e) => {
    console.log("connection opened");
};
// very important
lc.onicecandidate = (e) => {
    console.log("New candidate!", JSON.stringify(lc.localDescription));
};
lc.createOffer()
    .then((o) => lc.setLocalDescription(o))
    .then((a) => {
        console.log("set successfully!");
    });

let answer = {
    type: "answer",
    sdp: "v=0\r\no=- 1758386846618930103 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:457613800 1 udp 2113937151 8aa9d247-7f3b-46eb-a0ac-84822e32d380.local 51637 typ host generation 0 network-cost 999\r\na=candidate:2680644850 1 udp 2113939711 4ee27c06-86f4-458e-9d88-f71f1a961c74.local 51638 typ host generation 0 network-cost 999\r\na=ice-ufrag:SQik\r\na=ice-pwd:FaXYjbLx6lvSW3b6oabzJycq\r\na=ice-options:trickle\r\na=fingerprint:sha-256 8F:90:D2:04:53:52:30:BF:9D:AE:8F:3E:EC:05:09:AD:2B:9B:42:B6:5A:1D:1C:B2:7F:CB:68:3F:7A:5E:E7:99\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
};

lc.setRemoteDescription(answer).then((a) => {
    console.log("answer set");
});

