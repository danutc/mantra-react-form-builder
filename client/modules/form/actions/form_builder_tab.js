export default {
  changeOrder: ({LocalState}, order) => {
    console.log('... change order ...')
    let form_fields = LocalState.get('FORM_FIELDS')
    let selected = LocalState.get('FORM:SELECTED_ELEMENT')

    console.log('selected ')

    console.log(selected)

    console.log(order)

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
          return fields;
        }

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
      LocalState.set('FORM_FIELDS', form_fields)
    }
  }
}
