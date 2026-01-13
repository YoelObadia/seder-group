export default function MusicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[var(--color-music)] text-white pb-24">
            {/* pb-24 ensures content isn't hidden by the fixed player */}
            <main className="w-full">
                {children}
            </main>
        </div>
    );
}
