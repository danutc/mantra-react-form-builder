import customWidgetsProcessor from '../libs/custom_elements/customWidgets'
import elements from '../libs/form_elements.js'

var buildForm = (form_fields) => {
  let finalForm = finalForm || {}
  var schema = {
    type: 'object',
    properties: {}
  }

  var ui = {}
  var globWidgets = {}
  let parents = []; 

  for (var key in form_fields) {
    let element = form_fields[key]

    // if element is array, push to stack 
    if (element['ui']['ui:widget'] == 'array') {

    }

    ui[key] = element['ui']
    schema['properties'][key] = element['def']

    // becareful, can override the other one
    if (element['ui']) {
      var widgets = element['widget']

      var widgetName = element['ui']['ui:widget']
      var widgetCollection = widgets ? elements[widgetName]['widget'] : {}

      globWidgets = _.extend(globWidgets, widgets, widgetCollection)
    }
  }

  finalForm['schema'] = schema
  finalForm['ui'] = ui
  finalForm['widgets'] = globWidgets

  return finalForm
}

var computeFinalForm = (LocalState) => {
  var finalForm = LocalState.get('FINAL_FORM_ENTITY')

  var form_fields = customWidgetsProcessor(LocalState.get('FORM_FIELDS'))

  finalForm = buildForm(form_fields)

  return finalForm
}

export default { computeFinalForm }
