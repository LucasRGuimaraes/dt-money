import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model, Server } from 'miragejs';
import { App } from './App';

createServer({

  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Salário',
          type: 'deposit',
          category: 'dinheirinho do trampo hihi',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00')  
        },
        {
          id: 2,
          title: 'Cartão de crédito',
          type: 'withdraw',
          category: 'dinheirinho indo embora :(',
          amount: 2300,
          createdAt: new Date('2021-02-14 10:00:00')  
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api'
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);