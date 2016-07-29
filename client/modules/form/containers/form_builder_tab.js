import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core'
import FormBuilderTab from '../components/form_builder_tab.jsx'
import customWidgetsProcessor from '../libs/custom_elements/customWidgets'
import React from 'react'

var schema = {
  type: 'object',
  required: ['title'],
  properties: {
  }
}

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  if (!LocalState.get('FORM_FIELDS')) {
    LocalState.set('FORM_FIELDS', {})
  }

  let customWidgets = customWidgetsProcessor(LocalState.get('FORM_FIELDS'));
  
  onData(null, {
    formFields: customWidgets
  });
  
};

export const depsMapper = (context, actions) => {
  return ({
    changeOrder: actions.form_builder_tab.changeOrder,
    context: () => context
  })}

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(FormBuilderTab)
