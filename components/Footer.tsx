export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bgDark text-white/70 text-sm py-6 text-center mt-20">
      <p>
        © {new Date().getFullYear()} Hajari Minerals. All rights reserved.
      </p>
    </footer>
  );
}
