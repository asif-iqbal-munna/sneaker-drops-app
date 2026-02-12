
import './App.css'
import { useDropSocket } from './hooks/useDrops'
import DashboardDrops from './features/dashboard/DashboardDrops'
import { Suspense } from 'react'
import type { IDrop, IUser, PromiseProps } from './types/types';
import UserSelection from './features/dashboard/UserSelection';
import { DropsSkeleton } from './features/dashboard/DropCardSkeleton';
import { Skeleton } from './components/ui/skeleton';


const fetchDrops = async (): Promise<PromiseProps<IDrop>> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/drops`);

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}


const fetchUsers = async (): Promise<PromiseProps<IUser>> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users`);

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

function App() {
  useDropSocket()
  const getDropsData = fetchDrops()
  const getUsersData = fetchUsers()
  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Sneaker Drops</h1>
          <Suspense fallback={<Skeleton className="h-10 w-48" />}>
            <UserSelection getUsersData={getUsersData} />
          </Suspense>
        </div>
        <Suspense fallback={<DropsSkeleton count={6} />}>
          <DashboardDrops getDropsData={getDropsData} />
        </Suspense>
      </div>
    </main>
  )
}

export default App
