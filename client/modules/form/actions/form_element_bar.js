import elements from '../libs/form_elements.js'

export default {
  addElementToPlayground({LocalState}, element) {
    if (!element || !elements[element]) {
      return LocalState.set('CANNOT_ADD_ELEMENT_TO_PLAYGROUND', 'This element is not available')
    }

    // now setting the nested here 
    var seed = new Date().getTime()

    let selected = LocalState.get('FORM:SELECTED_ELEMENT')

    let form_fields = LocalState.get('FORM:FORM_FIELDS')

    // find position 
    let idx = 0
    for (let k in form_fields) {
      if (k == selected) {
        break
      }

      idx++
    }

    // convert object into array
    let arr = []
    for (let k in form_fields) {
      let obj = {}
      obj[k] = form_fields[k]
      arr.push(obj)
    }

    LocalState.set('CANNOT_ADD_ELEMENT_TO_PLAYGROUND', null)
    let pos = 0

    if (selected) {
      pos = idx + 1
    } else {
      pos = arr.length
    }

    if (element == 'array') {
      let o = {}
      o['Array_' + seed] = elements[element]
      arr.splice(pos, 0, o)
    } else {
      let o = {}
      o['Input_' + seed] = elements[element]
      arr.splice(pos, 0, o)
    }

    // convert back the arr into obj
    let fields = {}
    for (let e of arr) {
      fields = Object.assign(fields, e)
    }
  
    LocalState.set('FORM:FORM_FIELDS', fields)
  }

}
