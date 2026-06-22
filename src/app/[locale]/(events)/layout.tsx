export default function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-events text-black">
            <main className="w-full h-full">
                {children}
            </main>
        </div>
    );
}
