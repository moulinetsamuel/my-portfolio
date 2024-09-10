export default function Projects() {
  return (
    <section
      id="projects"
      className="h-screen w-full flex px-20 items-center justify-center"
    >
      <h2 className="text-4xl font-bold">Projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        <div>
          <h3 className="text-2xl font-bold">Projet 1</h3>
          <p className="mt-5 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada, nunc nec aliquam lacinia, libero sapien lacinia eros, ac
            tincidunt felis erat nec leo. Nulla facilisi. Nullam auctor, odio
            eget ultricies interdum, nulla eros viverra nunc, nec ultricies
            justo risus vel risus.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">Projet 2</h3>
          <p className="mt-5 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada, nunc nec aliquam lacinia, libero sapien lacinia eros, ac
            tincidunt felis erat nec leo. Nulla facilisi. Nullam auctor, odio
            eget ultricies interdum, nulla eros viverra nunc, nec ultricies
            justo risus vel risus.
          </p>
        </div>
      </div>
    </section>
  );
}
