export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0f172a] text-white">
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
