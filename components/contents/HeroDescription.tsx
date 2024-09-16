export default function HeroDescription() {
  return (
    <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-xl lg:max-w-2xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 lg:mb-10 text-primary">
        Développeur Full Stack
      </h1>
      <div className="flex flex-col gap-3 text-sm md:text-base">
        <p>
          Hey, je m&rsquo;appelle Samuel et je suis un développeur junior tout
          juste diplômé de l&rsquo;école O&rsquo;clock.
        </p>
        <p>
          Je suis passionné par le développement web, avec une préférence pour
          le back-end.
        </p>
        <p>
          Je suis à la recherche d&rsquo;une entreprise qui me permettra de
          mettre en pratique mes compétences et d&rsquo;en apprendre de
          nouvelles.
        </p>
      </div>
    </div>
  );
}
