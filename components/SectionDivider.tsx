export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="flex w-full max-w-7xl items-center px-4">
        <div className="h-px grow bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="mx-4">
          <svg
            className="size-6 text-primary"
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
        <div className="h-px grow bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>
    </div>
  );
}
