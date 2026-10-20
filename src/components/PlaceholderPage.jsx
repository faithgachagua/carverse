export default function PlaceholderPage({ title, description, icon: Icon }) {
  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-2xl font-medium text-[#f2ede4]">{title}</h1>
      <p className="mt-1 text-sm text-[#8f8778]">{description}</p>

      <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-600 bg-ink-850 py-20 text-center">
        {Icon && <Icon className="mb-3 text-[#6f6858]" size={30} />}
        <p className="text-sm text-[#8f8778]">This section is being prepared.</p>
      </div>
    </div>
  );
}
