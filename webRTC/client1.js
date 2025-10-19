let offer = { type: "offer", sdp: "v=0\r\no=- 251579710661161347 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:845872997 1 udp 2113937151 1e38f17a-9c23-4fc0-a12d-e96f2137b11e.local 59871 typ host generation 0 network-cost 999\r\na=ice-ufrag:GKMr\r\na=ice-pwd:MVZe91gdY/RCOQCg4oG1Sc3J\r\na=ice-options:trickle\r\na=fingerprint:sha-256 59:62:B5:4C:5E:C6:B6:A8:AF:9B:C2:34:C1:E0:69:29:C2:A4:64:A2:64:3E:C8:27:C6:A6:CE:9B:2D:23:34:4D\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n" };
const lc = new RTCPeerConnection();
lc.ondatachannel = (e) => {
    lc.dc = e.channel;
    lc.dc.onmessage = (e) => {
        console.log(e.data);
    }
    lc.dc.onopen = (e) => {
        console.log("connection opened");
    }
}
// very important
lc.onicecandidate = (e) => {
    console.log("New candidate!", JSON.stringify(lc.localDescription));
};
lc.setRemoteDescription(offer).then((a) => {
    console.log("offer set");
});
lc.createAnswer().then((a) => {
    lc.setLocalDescription(a).then((a) => {
        console.log("answer created");
    });
});