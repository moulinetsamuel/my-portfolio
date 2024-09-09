export default function Skills() {
  return (
    <section id="skills" className="h-screen w-full scroll-mt-20">
      <h2 className="text-4xl font-bold">Compétences</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        <div>
          <h3 className="text-2xl font-bold">Frontend</h3>
          <ul className="mt-5">
            <li className="text-lg">HTML5</li>
            <li className="text-lg">CSS3</li>
            <li className="text-lg">JavaScript</li>
            <li className="text-lg">React</li>
            <li className="text-lg">Next.js</li>
            <li className="text-lg">Tailwind CSS</li>
            <li className="text-lg">Chakra UI</li>
            <li className="text-lg">Framer Motion</li>
            <li className="text-lg">Radix UI</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold">Backend</h3>
          <ul className="mt-5">
            <li className="text-lg">Node.js</li>
            <li className="text-lg">Express</li>
            <li className="text-lg">MongoDB</li>
            <li className="text-lg">PostgreSQL</li>
            <li className="text-lg">GraphQL</li>
            <li className="text-lg">Apollo Client</li>
            <li className="text-lg">Apollo Server</li>
            <li className="text-lg">Prisma</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
