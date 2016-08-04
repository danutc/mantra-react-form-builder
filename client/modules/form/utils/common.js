import customWidgetsProcessor from '../libs/custom_elements/customWidgets'
import elements from '../libs/form_elements.js'

var convertEleToArr = (element) => {
  let array = Object.assign({}, element, {'type': 'array', 'items': {}})
  return array
}

var buildForm = (form_fields) => {
  let finalForm = finalForm || {}
  var schema = {
    type: 'object',
    properties: {}
  }

  var ui = {}
  var globWidgets = {}
  let parents = []

  for (var key in form_fields) {
    let element = form_fields[key]

    // if element is array, push to stack
    // if array, generate the array type to the tree 
    if (element && element['ui'] && element['ui']['ui:widget'] == 'array') {
      console.log('push parent ..')
      parents.push(key)
      let arr = convertEleToArr(element['def'])
      element['def'] = arr
    }

    // now find on the stack, if current have depth, then
    // push to the tree based on the stack
    if (element['def']['ext'] == null) {
      schema['properties'][key] = element['def']
    } else {
      if (element['def']['ext']['depth']) {
        // now if the depth is less than the current length of the stack 
        // then remove the outstanding of the stack, cos element already goes out of 
        // those parents 
        let depth = element['def']['ext']['depth']
        let p = depth - parents.length

        for (let i = 0; i < p; i++) {
          console.log('pop parent ')
          parents.pop()
        }

        let n = schema

        // do  the jump and populate the parents
        console.log('parents .. ')
        console.log(parents)
        for (let node of parents) {
          if (n['properties']) {

            if (Object.keys(n['properties'][node]).length == 0) {
              n['properties'][node] = {'type': 'array',  'items': {}}
            }
            
            n = n['properties'][node]
          } else if (n['items']) {
            n['items'] = {'type': 'object',  'properties': {}}

            if (n['items']['properties'][node] == null || Object.keys(n['items']['properties'][node]).length == 0) {
              n['items']['properties'][node] = {'type': 'array',  'items': {}}
            }

            n = n['items']['properties'][node]
          }
        }

        // travel to the node finish, then push to the array the element
        console.log('n ')
        console.log(n)
        if (n && element['def']['type'] != 'array') {
          if (Object.keys(n['items']).length == 0) {
            n['items'] = {type: 'object', properties: {}}
          }

          n['items']['properties'][key] = element['def']
        }
      }
    }

    ui[key] = element['ui']

    // becareful, can override the other one
    if (element['ui']) {
      var widgets = element['widget']

      var widgetName = element['ui']['ui:widget']
      var widgetCollection = widgets ? elements[widgetName]['widget'] : {}

      globWidgets = _.extend(globWidgets, widgets, widgetCollection)
    }
  }

  console.log('... final schema ... ')
  console.log((schema))

  finalForm['schema'] = schema
  finalForm['ui'] = {}
  finalForm['widgets'] = {}

  return finalForm
}

var computeFinalForm = (LocalState) => {
  var finalForm = LocalState.get('FORM:FINAL_FORM_ENTITY')

  var form_fields = customWidgetsProcessor(LocalState.get('FORM:FORM_FIELDS'))

  finalForm = buildForm(form_fields)

  return finalForm
}

export default { computeFinalForm}
