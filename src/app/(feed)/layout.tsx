import { Navbar } from "@/components/navbar/navbar";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav>
        <Navbar />
      </nav>
      {children}
    </section>
  );
}
