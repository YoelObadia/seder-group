export default function UHNWILayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-(--color-uhnwi) text-black">
            <main className="w-full h-full">
                {children}
            </main>
        </div>
    );
}
