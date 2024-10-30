

const Sequencer = require('./index.js')
const sequencer = new Sequencer()

const wait = t => new Promise(r => setTimeout(r,t))

const test1 = async () => {
  console.log('return values: ')

  const n = 3
  const func = async n => n

  for(let i = n;i;i--){
    sequencer.run(() => func(i)).then(v => console.log(v))
  }
}

const test2 = async () => {
  console.log('sequencialization: ')

  const n = 3
  const func = n => {
    return wait(1000+ Math.random() * 5000)
      .then(() => console.log(n))
  }

  for(let i = n;i;i--){
    sequencer.run(() => func(i))
  }
}

const test3 = async () => {

  console.log('namespace: ')

  const n = 3
  const func = (namespace, n) => {
    return wait(1000+ Math.random() * 5000)
      .then(() => console.log(`${namespace}: ${n}`))
  }

  for(let i = n;i;i--){
    sequencer.run(() => func('asdf', i), 'asdf')
    sequencer.run(() => func('ASDF', i), 'ASDF')
  }

}


// test1()
// test2()
test3()
