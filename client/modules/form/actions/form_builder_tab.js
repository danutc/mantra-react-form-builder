export default {
  changeOrder: ({LocalState}, order) => {
    console.log('... change order ...')
    let form_fields = LocalState.get('FORM_FIELDS')
    let selected = LocalState.get('FORM:SELECTED_ELEMENT')

    if (selected && order) {
      let reArrange = (fields, id, order) => {

        // first check the location of it
        let count = 0
        let idx = 0
        let tmpArr = []

        for (let k in fields) {
          let obj = {}
          obj[k] = fields[k]
          tmpArr.push(obj)

          if (k == id) {
            idx = count
          }

          count++
        }

        // do the swap 
        let nextPos = idx + order

        if (nextPos >= fields.length || nextPos < 0) {
          return fields
        }

        let ele = tmpArr[nextPos]
        let noMove = false

        let keys = Object.keys(ele)
        for (let k of keys) {
          if (k.indexOf('FAKE_ELEMENT_') != -1) {
            noMove = true
            break
          }
        }

        if (noMove) return fields

        let tmp = tmpArr[idx]
        tmpArr[idx] = tmpArr[nextPos]
        tmpArr[nextPos] = tmp

        // retore back to dictionary
        let f = {}
        for (let ele of tmpArr) {

          for (let key in ele) {
            f[key] = ele[key]
          }
        }

        return f
      }

      form_fields = reArrange(form_fields, selected, order)

      // fake adding new items in ordet to let the preview tab re-render 
      // mozilla form does not detect the change of the order, only on the element numbers
      // remember to buid the final form again in hte form_playgourn/buildForm in order 
      // to remove the last one FAKE ELEMENT
      let final_fields = {}
      if (form_fields) {

        // remove the fakelement 
        for (let k in form_fields) {
          if (k.indexOf('FAKE_ELEMENT_') == -1) {
            final_fields[k] = form_fields[k]
          }
        }
      }

      var seed = new Date().getTime()
      final_fields['FAKE_ELEMENT_' + seed] = {'def': {'type': 'string','title': 'Input'},'edit': false,'editSchema': {'type': 'object','title': 'General','properties': {'label': {'type': 'string','title': 'Label'},'class': {'type': 'string','title': 'Class'},'name': {'type': 'string','title': 'Name'},'defaultValue': {'type': 'string','title': 'Default Value'},'placeHolder': {'type': 'string','title': 'Place Holder'},'hint': {'type': 'string','title': 'Hint'}}}}

      LocalState.set('FORM_FIELDS', final_fields)
    }
  }
}
