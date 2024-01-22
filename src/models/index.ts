export default [
  {
    name: 'userModel',
    model: require('./user').default,
  },
  {
    name: 'categoryModel',
    model: require('./category').default,
  },
  {
    name: 'productModel',
    model: require('./product').default,
  },
  {
    name: 'colorModel',
    model: require('./color').default,
  },
  {
    name: 'sizeModel',
    model: require('./size').default,
  },
  {
    name: 'messageModel',
    model: require('./message').default,
  },
  {
    name: 'conversationModel',
    model: require('./conversation').default,
  },
  {
    name: 'BlogModel',
    model: require('./blog').default,
  },
];
