import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Orders from './modules/orders/Orders';
import './main.css';
import { Provider } from 'react-redux';
import getStore from '@/common/utils/store';
import Root from '@/common/components/Root';
import OrderDetail from '@/modules/orderDetail/OrderDetail';
import Summary from '@/modules/summary/Summary';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [{
      path: '/',
      element: <Orders />
    }, {
      path: '/order/new',
      element: <OrderDetail />,
      loader: () => ({ isEdit: false, id: undefined })
    }, {
      path: '/order/:id',
      element: <OrderDetail />,
      loader: ({ params }) => ({ isEdit: true, id: params.id })
    }, {
      path: '/summary',
      element: <Summary />
    }]
  }
]);

const Main = () => {
  const { store, persistor } = getStore();

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Main />);
