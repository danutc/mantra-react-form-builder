import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core'
import FormBuilderTab from '../components/form_builder_tab.jsx'
import customWidgetsProcessor from '../libs/custom_elements/customWidgets'
import React from 'react'

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  if (!LocalState.get('FORM:FORM_FIELDS')) {
    LocalState.set('FORM:FORM_FIELDS', {})
  }

  let customWidgets = customWidgetsProcessor(LocalState.get('FORM:FORM_FIELDS'));
  
  onData(null, {
    formFields: customWidgets
  });
  
};

export const depsMapper = (context, actions) => {
  return ({
    changeOrder: actions.form_builder_tab.changeOrder,
    changeDepth: actions.form_builder_tab.changeDepth,
    context: () => context
  })}

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(FormBuilderTab)
