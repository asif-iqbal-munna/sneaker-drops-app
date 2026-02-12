
import './App.css'
import { useDropSocket } from './hooks/useDrops'
import DashboardDrops from './features/dashboard/DashboardDrops'
import { Suspense } from 'react'
import type { IDrop } from './types/types';

type PromiseProps = {
  data: IDrop[],
  success: boolean,
  message: string
} 

const fetchDrops = async (): Promise<PromiseProps> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/drops`);

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}


function App() {
  useDropSocket()
  const getDropsData = fetchDrops()
  return (
    <Suspense fallback={<>Loading...</>}>
      <DashboardDrops getDropsData={getDropsData} />
    </Suspense>
  )
}

export default App
