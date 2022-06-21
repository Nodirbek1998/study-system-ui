
// prettier-ignore
const Examples = () => import('@/examples/examples.vue');
const ExamplesDetails = () => import('@/examples/examples-details.vue');
const ExamplesUpdate = () => import('@/examples/examples-update.vue');
const ExamplesAnswer = () => import('@/examples-answer/examples-answer.vue');
const ExamplesAnswerUpdate = () => import('@/examples-answer/examples-answer-update.vue');
const ExamplesAnswerView = () => import('@/examples-answer/examples-answer-details.vue');

export default [

  {
    path: 'examples/',
    name: 'Examples',
    component: Examples,
  },
  {
    path: 'examples/create',
    name: 'ExamplesCreate',
    component: ExamplesUpdate,
  },
  {
    path: 'examples/:examplesId/edit',
    name: 'ExamplesEdit',
    component: ExamplesUpdate,
  },
  {
    path: 'examples/:examplesId/view',
    name: 'ExamplesView',
    component: ExamplesDetails,
  },

  {
    path: 'examples/answer/',
    name: 'ExamplesAnswer',
    component: ExamplesAnswer,
  },
  {
    path: 'examples/answer/create',
    name: 'ExamplesAnswerCreate',
    component: ExamplesAnswerUpdate,
  },
  {
    path: 'examples/answer/:examplesAnswerId/edit',
    name: 'ExamplesAnswerEdit',
    component: ExamplesAnswerUpdate,
  },
  {
    path: 'examples/answer/:examplesAnswerId/view',
    name: 'ExamplesAnswerView',
    component: ExamplesAnswerView,
  },
]
