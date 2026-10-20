import { FileText, Download } from 'lucide-react';

const docs = [
  { name: 'inspection-report.pdf', vehicle: 'Toyota Land Cruiser VX', size: '2.4 MB', date: 'May 12, 2024' },
  { name: 'service-history.pdf', vehicle: 'BMW X5 xDrive30d', size: '1.1 MB', date: 'Apr 24, 2024' },
  { name: 'photo_01.jpg', vehicle: 'Mercedes-Benz GLE 300d', size: '1.3 MB', date: 'Apr 20, 2024' },
];

export default function MemberDocuments() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-2xl font-medium text-[#f2ede4]">Documents</h1>
      <p className="mt-1 text-sm text-[#8f8778]">Files shared with you across your conversations.</p>

      <div className="mt-6 overflow-hidden rounded-xl border border-ink-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-850 text-xs uppercase tracking-wide text-[#8f8778]">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Vehicle</th>
              <th className="px-4 py-3 font-medium">Size</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.name} className="border-t border-ink-700 hover:bg-ink-850">
                <td className="flex items-center gap-2 px-4 py-3 text-[#f2ede4]">
                  <FileText size={15} className="text-gold-500" /> {d.name}
                </td>
                <td className="px-4 py-3 text-[#8f8778]">{d.vehicle}</td>
                <td className="px-4 py-3 text-[#8f8778]">{d.size}</td>
                <td className="px-4 py-3 text-[#8f8778]">{d.date}</td>
                <td className="px-4 py-3"><Download size={15} className="text-[#8f8778] hover:text-gold-500" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
