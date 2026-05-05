import { Breadcrumb } from "./Breadcrumb";
import heroFort from "@/assets/hero-fort.jpg";

export function PageBanner({
  title, subtitle, crumbs, image,
}: { title: string; subtitle?: string; crumbs: { label: string; to?: string }[]; image?: string }) {
  return (
    <section className="relative h-[42vh] min-h-[300px] w-full overflow-hidden">
      <img
        src={image ?? heroFort}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="container-prose relative z-10 h-full flex flex-col justify-end pb-10 text-primary-foreground">
        <Breadcrumb items={crumbs} />
        <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-primary-foreground/85">{subtitle}</p>}
      </div>
    </section>
  );
}
