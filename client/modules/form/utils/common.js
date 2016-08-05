import customWidgetsProcessor from '../libs/custom_elements/customWidgets'
import elements from '../libs/form_elements.js'

let objSchema = {
  type: 'object',
  properties: {}
};

let arraySchema = {
  type: 'array',
  title: ' ',
  items: {
    ...objSchema
  }
};

let convertEleToArr = (element) => {
  let array = Object.assign({}, element, {
    type: 'array',
    title: ' ',
    items: {
      type: 'object',
      properties: {}
    }
  });

  return array;
}

let convertEleToObj = (element) => {
  let obj = Object.assign({}, element, {
    type: 'object',
    properties: {}
  });

  return obj;
}

let convertElement = (e, parents, key) => {
  let obj = null
  if (e && e['ui'] && e['ui']['ui:widget'] == 'array') {
    let depth = e['def']['ext'] ? e['def']['ext']['depth'] : 0;
    obj = {key: key, type: 'array', depth: depth}
    e['def'] = convertEleToArr(e['def'])
  } else if (e['def']['type'] == 'object') {
    let depth = e['def']['ext'] ? e['def']['ext']['depth'] : 0;
    obj = {key: key, type: 'object', depth: depth} 
    e['def'] = convertEleToObj(e['def'])
  } 
  
  if (obj) parents.push(obj)
}

let buildTree = (key, ele, parents, scheme, ui) => {
  // if no depth, then push to 
  if (ele['def']['ext'] == null || ele['def']['ext']['depth'] == 0) {
    scheme[key] = ele['def'];
    ui[key] = ele['ui'];
  } else {
  
    // now jump from the top of the tree to the correct node. at this moment, the parent already have 
    // the information of the parent node 
    let s = scheme; 

    for (let node of parents) {

      // we need to prevent the current node is also the array, 

      // because it is already pushed to the stack but does not  actually
      // populate to the tree, then we dont jump 
      if (node['key'] == key) break; 

      // jump to the deadend in order to prepare for the next element
      if (node['type'] == 'object') {
        s = s[node['key']]['properties']
      } else if (node['type'] == 'array') {
        s = s[node['key']]['items']['properties']
      }
    }

    // push the current container. 
    // if element is the container, jump to the end point in order to let the next 
    // one inserted. 
    // if element is not container, stay in the current position 
    if (ele['def']['type'] == 'array') {
      s[key] = arraySchema; 
    } else if (ele['def']['type'] == 'object') {
      s[key] = objSchema;
    } else {
      // now safely and nicely insert the element
      s[key] = ele['def']
    }
  }
}

let buildForm = (form_fields) => {
  let finalForm = finalForm || {}
  let schema = {}

  let ui = {}
  let globWidgets = {}
  let parents = []

  for (let key in form_fields) {
    let element = form_fields[key];

    let depth = element['def']['ext'] ? element['def']['ext']['depth'] : 0;
    
    // check if there is the change in the depth, if the depth is decrease, then pointer
    // moved to the previous level, thus remove the last parent 
    let parent_no = parents.length;  
    let distance = parent_no - depth; 

    for (let i = 0; i < distance; i ++) {
      parents.pop();
    }

    convertElement(element, parents, key);
    buildTree(key, element, parents, schema, ui);    
  }

  console.log('... final schema ... ')
  console.log(schema)

  // console.log('... final ui ...')
  // console.log(ui)

  finalForm['schema'] = { type: 'object', properties: { ...schema } }
  finalForm['ui'] = {}
  finalForm['widgets'] = {}

  return finalForm
}

let computeFinalForm = (LocalState) => {
  let finalForm = LocalState.get('FORM:FINAL_FORM_ENTITY')

  let form_fields = customWidgetsProcessor(LocalState.get('FORM:FORM_FIELDS'))

  finalForm = buildForm(form_fields)

  return finalForm
}

export default {computeFinalForm}
