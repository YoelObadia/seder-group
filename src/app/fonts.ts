import { Montserrat, Heebo } from "next/font/google";

export const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
});

export const heebo = Heebo({
    subsets: ["hebrew", "latin"],
    variable: "--font-heebo",
    display: "swap",
});
