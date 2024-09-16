import Image from "next/image";

export default function HeroProfil() {
  return (
    <div className="flex flex-col justify-center items-center md:items-start mb-8 md:mb-0">
      <div className="relative w-48 h-48 md:w-64 md:h-64 mb-5">
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

      <p className="font-bold mb-2 md:mb-4 text-lg md:text-xl">
        Moulinet Samuel
      </p>
      <p className="mb-1 md:mb-2 text-sm md:text-base">30 ans</p>
      <p className="text-sm md:text-base">Nantes, France</p>
    </div>
  );
}
