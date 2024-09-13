import Image from "next/image";

export default function HeroProfil() {
  return (
    <div className="flex flex-col justify-center items-start">
      <div className="relative w-64 h-64 mb-5">
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

      <p className="font-bold mb-4">Moulinet Samuel</p>
      <p className="mb-2">30 ans</p>
      <p className="">Nantes, France</p>
    </div>
  );
}
