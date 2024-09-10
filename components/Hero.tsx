import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="about-me"
      className="h-screen w-full flex px-20 items-center justify-center"
    >
      <div className="h-full w-full flex flex-col gap-3 justify-center m-auto text-start">
        <h1 className="text-5xl font-bold mb-10 text-primary   ">
          Développeur Full Stack
        </h1>
        <p>
          Hey, je m&rsquo;appelle Samuel et je suis un développeur junior tous
          juste diplomé de l&rsquo;école O&rsquo;clock.
        </p>
        <p>
          Je suis passionné par le développement web, avec une préference pour
          le back-end.
        </p>
        <p>
          Je suis à la recherche d&rsquo;une entreprise qui me permettra de
          mettre en pratique mes compétences et d&rsquo;en apprendre de
          nouvelles.
        </p>
      </div>
      <div className="flex h-full w-full justify-center items-center gap-5">
        <div className="flex flex-col">
          <Image
            src="/images/samuel-moulinet.jpg"
            alt="Samuel Moulinet"
            width={300}
            height={300}
            className="rounded-2xl mb-5"
          />
          <p className="font-bold mb-4 ">Moulinet Samuel</p>
          <p className="mb-2">30 ans</p>
          <p className="">Nantes, France</p>
        </div>
      </div>
    </section>
  );
}
