import * as React from "react"
import { useEffect } from "react"
import { ClipboardListIcon, PlusIcon } from '@heroicons/react/solid';
import Button from '../components/Button';
import Orders from '../components/Orders';
import ordersApi from '../redux/apis/orders.api';
import { navigate } from 'gatsby';
import { useAuth } from '../core/hooks';

const IndexPage = () => {
  const { data = [], refetch } = ordersApi.useGetTodayOrdersQuery();
  const [deleteOrder, deleteOrderResult] = ordersApi.useLazyDeleteOrderQuery();
  const { user } = useAuth();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (deleteOrderResult.isSuccess) {
      refetch();
    }
  }, [deleteOrderResult]);

  const onMakeOrder = () => {
    navigate('/order/new');
  };

  return (
    <main>
      <p className='text-black text-3xl sm:text-5xl'>Good morning, {user?.name ?? 'John Doe'}</p>
      <p className='text-gray-500 text-2xl sm:text-3xl mt-1 sm:mt-2'>Today's orders</p>

      <div className='flex mt-3 sm:mt-5'>
        <Button className='mr-3' color='primary' onClick={() => navigate('/summary')}>
          <ClipboardListIcon className='h-5 mr-1 cursor-pointer' />
          Summary
        </Button>

        <Button className='items-center hidden sm:flex' color='primary' onClick={onMakeOrder}>
          <PlusIcon className='h-5 mr-1 cursor-pointer' />
          Make Order
        </Button>
      </div>

      <Orders orders={data} onDelete={({ id }) => deleteOrder(id)} />

      <Button
        color='primary'
        className='rounded-full fixed bottom-0 right-0 m-5 shadow-lg sm:hidden'
        onClick={onMakeOrder}
      >
        <PlusIcon className='h-5 mr-1 cursor-pointer' />
        Make Order
      </Button>
    </main>
  )
}

export default IndexPage
