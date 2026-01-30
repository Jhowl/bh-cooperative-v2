import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 pb-16 pt-12">
      <div className="mx-auto w-full max-w-none px-6 sm:px-8">{children}</div>
    </div>
  );
}
