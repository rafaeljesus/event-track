export default () => {
  return {
    'event': 'purchases',
    'status': 'received',
    'context': {
      'ip': '24.5.68.47',
      'locale': 'en-US',
      'os': {
        'name': 'Netscape',
        'version': '5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like ecko) Chrome/47.0.2526.106 Safari/537.36'
      }
    },
    'properties': {
      'quantity': 5,
      'url': '/v1/purchases/123456',
      'item': {
        '_id': '20150101123457',
        'price': 100
      },
      'user': {
        '_id': '20150101123458',
        'name': 'Rafael Jesus'
      }
    },
    'createdAt': '2015-09-24T15:46:51.778Z'
  }
}
