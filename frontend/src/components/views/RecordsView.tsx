
import RecordsSection from '../RecordsSection';
import StatStrip from '../StatStrip';

export default function RecordsView() {
  return (
    <div className="flex flex-col gap-10 pt-4 pb-20">
      <header>
        <h1 className="text-[44px] font-medium tracking-tight text-text-primary mb-2">Records Vault</h1>
        <p className="text-text-secondary text-base">Manage your health data uploads and device connections securely.</p>
      </header>
      <StatStrip />
      <RecordsSection />
    </div>
  );
}
