import SkillContent from "../contents/SkillContent";

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen w-full flex flex-col justify-center items-center py-16 px-4"
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center">
        Compétences techniques
      </h2>
      <div className="w-full max-w-4xl h-[60vh] md:h-[70vh]">
        <SkillContent />
      </div>
    </section>
  );
}
