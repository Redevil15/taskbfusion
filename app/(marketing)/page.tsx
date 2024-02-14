import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2"
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ]
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-teal-100 text-teal-700 rounded-full uppercase"> {/* Cambiar el color de fondo y texto */}
          <Medal className="h-6 w-6 mr-2" />
          No 1 in Task Management
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-900 mb-6">TaskBFusion: Empowering Tasks.</h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          Propel Your Work.
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-500 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From corporate offices to home setups, your teams potential is boundless - unlock it all with TaskBoost.
        <br />
        <span className="text-sm italic">
          Note: This is a marketing page. At this time, the app does not accept premium payments. This feature will be available in the future.
        </span>

      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">
          Start Your TaskBoost Journey Now
        </Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
