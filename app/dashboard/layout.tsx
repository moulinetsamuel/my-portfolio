import DashboardNav from '@/components/dashboard/DashboardNav';

export default function Component({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
