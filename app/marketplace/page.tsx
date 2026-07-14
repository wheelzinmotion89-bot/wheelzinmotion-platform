import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Smartphone } from "lucide-react";

export default function MarketplacePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-32 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.45em] text-purple-400">
              WheelzInMotion Marketplace
            </p>

            <h1 className="mt-5 text-5xl font-black uppercase md:text-7xl">
              Buy. Sell. Upgrade.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              Product listings are coming soon. Customers can already submit
              technology they would like to sell.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <article className="rounded-3xl border border-purple-500/30 bg-zinc-950/80 p-8 shadow-[0_0_35px_rgba(147,51,234,.2)] md:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500 bg-black text-purple-400">
                <ShoppingBag size={34} />
              </div>

              <h2 className="mt-7 text-3xl font-black uppercase text-purple-400">
                Buy Products
              </h2>

              <p className="mt-5 text-lg leading-8 text-zinc-300">
                Computers, components, phones, tablets, consoles, laptops,
                accessories, and other technology will be available here.
              </p>

              <div className="mt-8 rounded-2xl border border-purple-500/20 bg-black p-6">
                <p className="font-bold uppercase tracking-widest text-zinc-400">
                  Inventory coming soon
                </p>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Products will be added when WheelzInMotion has inventory ready
                  for sale.
                </p>
              </div>
            </article>

            <article className="rounded-3xl border border-purple-500/30 bg-zinc-950/80 p-8 shadow-[0_0_35px_rgba(147,51,234,.2)] md:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500 bg-black text-purple-400">
                <Smartphone size={34} />
              </div>

              <h2 className="mt-7 text-3xl font-black uppercase text-purple-400">
                Sell Your Technology
              </h2>

              <p className="mt-5 text-lg leading-8 text-zinc-300">
                Submit computers, phones, tablets, consoles, components,
                drones, and other technology for review.
              </p>

              <Link
                href="/marketplace/sell"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-purple-600 px-8 py-4 font-bold transition hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(147,51,234,.7)]"
              >
                Submit an Item
                <ArrowRight size={20} />
              </Link>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}