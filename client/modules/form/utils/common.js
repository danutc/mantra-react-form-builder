import customWidgetsProcessor from '../libs/custom_elements/customWidgets'
import elements from '../libs/form_elements.js'

var convertEleToArr = (element) => {
  let array = Object.assign({}, element, {type: 'array', items: []})
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
    if (element && element['ui'] && element['ui']['ui:widget'] == 'array') {
      parents.push(key)
    }

    // after clean the stack 
    // if array, generate the array type to the tree 
    if (element && element['ui'] && element['ui']['ui:widget'] == 'array') {
      let arr = convertEleToArr(element['def'])
      element['def'] = arr
    }

    // now find on the stack, if current have depth, then
    // push to the tree based on the stack
    // if no ext, then out of the BIG parent, clear the stack
    if (!element['ui'] || element['ui']['ui:widget'] != 'array') {
      if (element['def']['ext'] == null) {
        parents = []
      } else {
        if (element['def']['ext']['depth']) {
          // now if the depth is less than the current length of the stack 
          // then remove the outstanding of the stack, cos element already goes out of 
          // those parents 
          let depth = element['def']['ext']['depth']
          let p = depth - parents.length

          for (let i = 0; i < p; i++) {
            parents.pop()
          }
        }

        // build the dot notation based on depth again (just to make sure ...lol ...)
        let dotNotation = parents.join('.')
        let n = schema

        // do  the jump 
        for (let node of parents) {
          n = n['properties'];
          n = n[node]
        }

        console.log('n ...');
        console.log(n);

        // travel to the node finish, then push to the array the element
        if (n) {
          n['items'] = n['items'] || [] 
          n['items'].push(element['def'])
        }
      }
    } else {
      schema['properties'][key] = element['def']
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

  console.log('... schema ... ')
  console.log(JSON.stringify(schema))

  finalForm['schema'] = {}
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
