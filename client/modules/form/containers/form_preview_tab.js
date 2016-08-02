import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core'
import customWidgetsProcessor from '../libs/custom_elements/customWidgets'
import React from 'react'
import FormPreviewTab from '../components/form_preview_tab.jsx'
import elements from '../libs/form_elements.js'

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState, Utils} = context()

  let finalForm = LocalState.get('FINAL_FORM_ENTITY')
  finalForm = Utils.computeFinalForm(LocalState)
  console.log('final form');
  console.log(JSON.stringify(finalForm))

  LocalState.set('FINAL_FORM_ENTITY', finalForm)
  let finalFormWithWidgets = customWidgetsProcessor(finalForm)

  onData(null, {form: finalFormWithWidgets})
}

export const depsMapper = (context, actions) => ({
  context: () => context
})

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(FormPreviewTab)
