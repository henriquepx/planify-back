

// how to make parallel-running async function run sequencially?
// this resolve a problem when something like findAndUpdate creates two entries when run almost parallel
// so, just chain them.

// timeout will determine how long should a namespace wait for command,
// before deleting it self
function Sequencer( timeout = 500 ) {

  let names = {}


  this.run = (func, namespace = 'default') => new Promise((r,j) => {

    // register namespace if it doesn't exists
    if(!names[namespace]){

      names[namespace] = {
        p: Promise.resolve(true),
        t: null
      }
    }

    // run, and remove one self
    names[namespace].p = names[namespace].p.then(() => {
      names[namespace].t && clearTimeout(names[namespace].t)
      return func()
        .then((res) => {
          r(res)
          names[namespace].t = setTimeout(() => delete names[namespace], timeout)
          return true
        })
        .catch((res) => {
          j(res)
          names[namespace].t = setTimeout(() => delete names[namespace], timeout)
          return true
        })
    })

  })

}

module.exports = Sequencer
