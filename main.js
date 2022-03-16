const peer = new SimplePeer({
  initiator: location.hash === '#1',
  trickle: false,
  config: {
    iceServers: [
      {
        url: 'turn:numb.viagenie.ca',
        credential: 'muazkh',
        username: 'webrtc@live.com'
      },
      {
        url: 'turn:192.158.29.39:3478?transport=udp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
      },
      {
        url: 'turn:192.158.29.39:3478?transport=tcp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
      },
      {
        url: 'turn:turn.anyfirewall.com:443?transport=tcp',
        credential: 'webrtc',
        username: 'webrtc'
      }
    ],
  }
})

peer.on('signal', function (data) {
  document.getElementById('my_token').textContent = JSON.stringify(data)
})

document.getElementById('login').addEventListener('submit', function (event) {
  event.preventDefault()
  var val = document.getElementById('peer_token').value
  peer.signal(JSON.parse(val))
})

document.getElementById('message').addEventListener('submit', function (event) {
  event.preventDefault()
  var val = document.getElementById('text').value
  var texts = document.getElementById('data')
  var node = document.createElement('div')
  node.innerText = val;
  node.style.color = 'blue'
  texts.appendChild(node)
  peer.send(val)
})

peer.on('connect', function () {
  peer.send('Connected!!!')
})

peer.on('data', function (data) {
  var texts = document.getElementById('data')
  var node = document.createElement('div')
  node.innerText = data;
  node.style.color = 'green'
  texts.appendChild(node)
})