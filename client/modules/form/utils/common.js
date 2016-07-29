import customWidgetsProcessor from '../libs/custom_elements/customWidgets'
import elements from '../libs/form_elements.js'

var computeFinalForm = (LocalState) => {
  var finalForm = LocalState.get('FINAL_FORM_ENTITY')

  finalForm = finalForm || {}

  var form_fields = customWidgetsProcessor(LocalState.get('FORM_FIELDS'))
  var schema = {
    type: 'object',
    properties: {}
  }

  var ui = {}
  var globWidgets = {}

  for (var key in form_fields) {
    ui[key] = form_fields[key]['ui']
    schema['properties'][key] = form_fields[key]['def']

    // becareful, can override the other one
    if (form_fields[key]['ui']) {
      var widgets = form_fields[key]['widget'];

      var widgetName = form_fields[key]['ui']['ui:widget']
      var widgetCollection = widgets ? elements[widgetName]['widget'] : {}

      globWidgets = _.extend(globWidgets, widgets, widgetCollection)
    }
  }

  finalForm['schema'] = schema
  finalForm['ui'] = ui
  finalForm['widgets'] = globWidgets

  return finalForm
}

export default {
computeFinalForm}
