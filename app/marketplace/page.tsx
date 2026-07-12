import Navbar from "@/components/layout/Navbar";

export default function MarketplacePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-32 text-white">
        <section className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-purple-400">
            WheelzInMotion Marketplace
          </p>

          <h1 className="mt-5 text-5xl font-black uppercase md:text-7xl">
            Buy. Sell. Upgrade.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-300">
            A simple place to buy tech products, sell your devices, and upgrade
            your setup.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-purple-500/30 bg-zinc-950 p-8 text-left">
              <h2 className="text-3xl font-black text-purple-400">
                Buy Products
              </h2>
              <p className="mt-4 text-zinc-300">
                Custom PCs, parts, laptops, phones, tablets, consoles, drones,
                and accessories will be listed here.
              </p>
              <p className="mt-6 text-sm font-bold uppercase tracking-widest text-zinc-500">
                Listings coming soon
              </p>
            </div>

            <div className="rounded-3xl border border-purple-500/30 bg-zinc-950 p-8 text-left">
              <h2 className="text-3xl font-black text-purple-400">
                Sell Your Tech
              </h2>
              <p className="mt-4 text-zinc-300">
                Customers will be able to submit phones, computers, consoles,
                tablets, parts, and more for sale or trade-in.
              </p>
              <p className="mt-6 text-sm font-bold uppercase tracking-widest text-zinc-500">
                Sell form coming soon
              </p>
            </div>
          </div>

          <div className="mt-12">
            <a
              href="/contact"
              className="rounded-full bg-purple-600 px-10 py-4 font-bold text-white transition hover:bg-purple-500"
            >
              Contact WheelzInMotion
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
