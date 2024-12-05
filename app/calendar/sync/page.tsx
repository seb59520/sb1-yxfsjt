import { redirect } from 'next/navigation';

export default function CalendarSyncPage({
  searchParams,
}: {
  searchParams: { code?: string; error?: string };
}) {
  const { code, error } = searchParams;

  if (error) {
    // Handle error case
    redirect('/?sync-error=' + error);
  }

  if (code) {
    // Handle successful authorization
    redirect('/?sync-success=true');
  }

  // If no code or error, redirect to home
  redirect('/');
}