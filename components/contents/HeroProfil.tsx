import Image from "next/image";

export default function HeroProfil() {
  return (
    <div className="mb-8 flex flex-col items-center justify-center md:mb-0 md:items-start">
      <div className="relative mb-5 size-48 md:size-64">
        <Image
          src="/images/samuel-moulinet.jpg"
          alt="Samuel Moulinet"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-full object-cover"
          priority
          style={{ objectPosition: "center 20%" }}
        />
      </div>

      <p className="mb-2 text-lg font-bold md:mb-4 md:text-xl">
        Samuel Moulinet
      </p>
      <p className="mb-1 text-sm md:mb-2 md:text-base">30 ans</p>
      <p className="text-sm md:text-base">Nantes, France</p>
    </div>
  );
}
