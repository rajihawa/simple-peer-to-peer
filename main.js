const p = new SimplePeer({
  initiator: location.hash === '#1',
  trickle: false,
  config: {
    iceServers: [
      {
        urls: "stun.l.google.com:19302"
      },
      {
        urls: "stun.voiparound.com"
      },
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