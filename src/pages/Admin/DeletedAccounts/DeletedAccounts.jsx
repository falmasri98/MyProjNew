import React from 'react';
import "./DeletedAccounts.css";

import DataTable from '../../../components/DataTable/DataTable';

export default function DeletedAccounts({ deletedAccounts }) {
  console.log(deletedAccounts)
  return (
    <div className='deleted-accounts__container'>
      <h4 className='fw-bold mb-5'>Deleted Accounts</h4>
      {deletedAccounts && <DataTable users={deletedAccounts} deletedAccounts />}
    </div>
  )
}
