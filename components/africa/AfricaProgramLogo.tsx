import Image from "next/image";
import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";

const sizeClasses = {
  header:
    "h-16 w-auto sm:h-20 md:h-24 lg:h-[6.5rem] xl:h-28 max-w-[min(100%,24rem)]",
  footer:
    "h-9 w-auto sm:h-10 md:h-11 max-w-[min(100%,14rem)] lg:max-w-[min(100%,16rem)]",
} as const;

type LogoVariant = keyof typeof sizeClasses;

/**
 * Africa Program lockup asset in `public/assets`.
 */
export function AfricaProgramLogo({
  variant = "header",
}: {
  variant?: LogoVariant;
}) {
  const sizesAttr =
    variant === "footer"
      ? "(max-width: 640px) 200px, 260px"
      : "(max-width: 640px) 300px, (max-width: 1024px) 380px, 460px";

  return (
    <Link
      href={africaRoutes.home}
      className="group flex shrink-0 items-center outline-none transition-opacity duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
      aria-label="Real Life Research Institute — Africa Program — Home"
    >
      <Image
        src="/assets/RLRL-AP-Logo.png"
        alt="Real Life Research Institute — Africa Program"
        width={1600}
        height={900}
        priority={variant === "header"}
        quality={95}
        sizes={sizesAttr}
        className={sizeClasses[variant]}
      />
    </Link>
  );
}
