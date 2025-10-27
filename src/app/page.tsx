export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bgDark">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-white">
          Hajari Minerals
        </h1>
        <p className="text-white/60 mt-4 text-base max-w-md">
          If you see dark background + centered text + nice spacing,
          Tailwind is working.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <button className="bg-white text-bgDark text-sm font-medium px-5 py-3 rounded-lg hover:bg-stone hover:text-bgDark transition">
            Primary CTA
          </button>
          <button className="border border-white/30 text-white text-sm font-medium px-5 py-3 rounded-lg hover:border-white transition">
            Secondary
          </button>
        </div>
      </div>
    </main>
  );
}
