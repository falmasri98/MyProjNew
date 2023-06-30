import React from 'react';
import "./DeletedAccounts.css";

import DataTable from '../../../components/DataTable/DataTable';

export default function DeletedAccounts({ deletedAccounts }) {
  console.log(deletedAccounts)
  return (
    <div className='deleted-accounts__container'>
      <h4 className='fw-bold mb-5'>Deleted Accounts</h4>
      {deletedAccounts && deletedAccounts.length > 0 && <DataTable data={deletedAccounts} deletedAccounts />}
      {deletedAccounts?.length === 0 && <h3 className='w-100 text-center fw-bold'>There is no data to show</h3>}
    </div>
  )
}
