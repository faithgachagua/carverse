import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <Logo />
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#8f8778]">
          Premium cars, trusted deals. Every listing on Carverse is inspected,
          verified, and backed by our support team.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-2 text-xs text-[#6f6858]">
          <span>© {new Date().getFullYear()} Carverse Motors Ltd.</span>
          <span>Nairobi, Kenya</span>
          <span>Quality assured · Verified listings</span>
        </div>
      </div>
    </footer>
  );
}
