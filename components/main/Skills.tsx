import SkillContent from '@/components/contents/SkillContent';

export default function Skills() {
  return (
    <section
      id="skills"
      className="flex min-h-screen w-full flex-col items-center justify-evenly px-4 md:flex-row md:justify-evenly md:px-8 lg:px-16"
    >
      <h2 className="text-center text-2xl font-bold md:text-3xl lg:text-4xl">
        Compétences techniques
      </h2>
      <div className="h-[60vh] w-full max-w-4xl md:h-[70vh]">
        <SkillContent />
      </div>
    </section>
  );
}
