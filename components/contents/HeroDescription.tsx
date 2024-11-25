export default function HeroDescription() {
  return (
    <div className="flex max-w-xl flex-col items-center justify-center text-center md:items-start md:text-left lg:max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold text-primary md:mb-8 md:text-4xl lg:mb-10 lg:text-5xl">
        Samuel Moulinet - Développeur Full Stack
      </h1>
      <div className="flex flex-col gap-3 text-sm md:text-base">
        <p>
          Hey, je m&rsquo;appelle Samuel et je suis un développeur Full-Stack tout juste
          diplômé de l&rsquo;école O&rsquo;clock.
        </p>
        <p>
          Je suis passionné par le développement web, avec une préférence pour le
          back-end.
        </p>
        <p>
          Je suis à la recherche d&rsquo;une entreprise qui me permettra de mettre en
          pratique mes compétences et d&rsquo;en apprendre de nouvelles.
        </p>
      </div>
    </div>
  );
}
