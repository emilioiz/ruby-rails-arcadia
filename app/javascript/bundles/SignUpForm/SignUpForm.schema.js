// #=============================================
// #DO NOT DELETE THIS FILE
// #Save as reference for future functionality
// #=============================================

export const schema = {
  basicInfo: {
    fields: [{ label: 'Name', id: 'name', widget: 'input' }],
    nextForm: 'userType'
  },
  userType: {
    fields: [{ label: 'I am the...', id: 'userType', options: [], widget: 'dropdown' }],
    prevForm: 'basicInfo'
  }
}