import SkillContent from "../contents/SkillContent";

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen w-full flex flex-col md:flex-row justify-center md:justify-evenly items-center px-4 md:px-8 lg:px-16 pt-20 md:pt-16 gap-8 md:gap-12 lg:gap-16"
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
