import Navbar from "@/components/layout/Navbar";

export default function PCBuilderPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-32 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-5xl font-black uppercase md:text-7xl">
            PC Builder
          </h1>

          <p className="mt-6 text-xl text-zinc-300">
            This is where customers will build their custom PC and submit their
            request directly to WheelzInMotion.
          </p>

          <div className="mt-12 rounded-3xl border border-purple-500/30 bg-zinc-950 p-10">
            <p className="text-purple-400 font-bold uppercase tracking-wider">
              Coming Soon
            </p>
          </div>
        </div>
      </main>
    </>
  );
}