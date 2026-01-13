export default function BusinessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[var(--color-business)] text-white">
            {/* Specific Business Header styling or structure can go here */}
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
