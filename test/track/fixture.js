'use strict'

module.exports = () => {
  return {
    channel: 'browser',
    event: 'purchases',
    context: {
      ip: '1.1.1.1',
      url: 'https://api.app/v1/purchases/321',
      user: {
        _id: '23442',
        email: 'Rafael Jesus'
      }
    },
    properties: {
      _id: '23423412',
      onSale: true,
      price: 10,
      currency: '$',
      quantity: 3
    }
  }
}
