const p = new SimplePeer({
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
        url: 'turn:turn.bistri.com:80',
        credential: 'homeo',
        username: 'homeo'
      },
      {
        url: 'turn:turn.anyfirewall.com:443?transport=tcp',
        credential: 'webrtc',
        username: 'webrtc'
      }
    ],
  }
})

p.on('error', err => console.log('error', err))

p.on('signal', data => {
  console.log('SIGNAL', JSON.stringify(data))

  document.querySelector('#outgoing').textContent = JSON.stringify(data)
})

document.getElementById('login').addEventListener('submit', ev => {
  ev.preventDefault()
  var val = document.querySelector('#incoming').value
  p.signal(JSON.parse(val))
})

document.getElementById('message').addEventListener('submit', ev => {
  ev.preventDefault()
  var val = document.getElementById('text').value
  var texts = document.getElementById('data')
  var node = document.createElement('div')
  node.innerText = val;
  node.style.color = 'blue'
  texts.appendChild(node)
  p.send(val)

})

p.on('connect', () => {
  console.log('CONNECT')
  p.send('whatever' + Math.random())
})

p.on('data', data => {
  console.log('data: ' + data)
  var texts = document.getElementById('data')
  var node = document.createElement('div')
  node.innerText = data;
  node.style.color = 'green'
  texts.appendChild(node)
})