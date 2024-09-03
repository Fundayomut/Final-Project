import React from 'react'
import AdminNav from './AdminNav'
import AdminWillkommenMessage from './AdminWillkommenMessage'

export const AdminHome = () => {
  return (
    <div>
        <div>
            <AdminNav/>
        </div>
        <div>
            <AdminWillkommenMessage/>
        </div>
    </div>
  )
}
