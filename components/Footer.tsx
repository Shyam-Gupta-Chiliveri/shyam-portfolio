import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8 sm:px-10 lg:px-16">
      <p className="text-center text-[13px] text-muted">Designed &amp; Built by {profile.name}</p>
    </footer>
  );
}
