export default function SectionDivider() {
  return (
    <div className="py-16 md:py-24 lg:py-32 flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-7xl px-4 flex items-center">
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="mx-4">
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>
    </div>
  );
}
