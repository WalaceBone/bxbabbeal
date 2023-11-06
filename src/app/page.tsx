// pages/index.tsx
import dynamic from 'next/dynamic';

const CsvReaderPage = dynamic(() => import('./csv.client'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function Home() {
  return (
    <div>
      <h1>BxB By Abbeal</h1>
      <CsvReaderPage />
    </div>
  );
}
