import { getTranslations, getMessages } from 'next-intl/server';
import { HeroSection } from '@/components/ui/HeroSection';
import { VisionSection } from '@/components/home/VisionSection';
import { FounderSection } from '@/components/home/FounderSection';
import { GatewaySection } from '@/components/home/GatewaySection';

export default async function HomePage() {
    // Fetch translations on the server
    const t = await getTranslations('HomePage');
    const mainDict = await getMessages();

    return (
        <div className="min-h-screen bg-black text-white">
            {/* 
         Section 1: Hero 
         Using Coded Environment (WaveCanvas) for procedural "Liquid Silk" effect.
      */}
            <HeroSection
                dict={mainDict}
                theme="dark"
                codedEnvironment={true}
            />

            {/* 
         Section 2: Vision (Philosophie)
      */}
            <VisionSection dict={mainDict} />

            {/* 
         Section 3: Founder 
      */}
            <FounderSection dict={mainDict} />

            {/* 
         Section 4: The Gateway 
      */}
            <div className="relative z-10">
                <div className="text-center py-10 bg-black">
                    {/* Access nested properties safely, though mainDict is typed as AbstractIntlMessages */}
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">{(mainDict as any)?.home?.gateway?.title || "Choisir une verticale"}</h2>
                </div>
                <GatewaySection dict={mainDict} />
            </div>
        </div>
    );
}
