const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-3">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#DBBDD5] border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 rounded-full blur-[3px] opacity-75 border-4 border-[#DBBDD5] border-t-transparent animate-ping"></div>
      </div>

      <p className="text-sm font-semibold text-center animate-text-glow">
        Translating...
      </p>
    </div>
  );
};

export default Loader;
