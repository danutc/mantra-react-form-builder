export default {
  buildForm({LocalState, Utils}) {
    let form_fields = LocalState.get('FORM_FIELDS')
    let final_fields = {}
    if (form_fields) {

      // remove the fakelement 
      for (let k in form_fields) {
        if (k.indexOf('FAKE_ELEMENT_') == -1) {
          final_fields[k] = form_fields[k]
        }
      }
    }

    LocalState.set('FORM_FIELDS', final_fields)

    let finalForm = Utils.computeFinalForm(LocalState)
    LocalState.set('FINAL_FORM_ENTITY', finalForm)
  },
  saveFromEditor({LocalState}, type, value) {
    var FINAL_FORM_ENTITY = LocalState.get('FINAL_FORM_ENTITY')
    FINAL_FORM_ENTITY[type] = `(${value})`

    LocalState.set('FINAL_FORM_ENTITY', FINAL_FORM_ENTITY)
  },
  saveForm({LocalState}) {
    var FINAL_FORM_ENTITY = LocalState.get('FINAL_FORM_ENTITY')
    console.log(FINAL_FORM_ENTITY)
    alert(FINAL_FORM_ENTITY)
  },
  clearForm({LocalState}) {
    if (confirm('Are you sure you want to clear all the fields ?')) {
      LocalState.set('FORM_FIELDS', {})
    }
  }
}
