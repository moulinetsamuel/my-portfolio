import ContactForm from "@/components/contents/ContactForm";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <section
      id="contact"
      className="flex min-h-screen w-full flex-col justify-between"
    >
      <div className="flex grow flex-col items-center px-4 pt-16">
        <h2 className="py-12 text-center text-4xl font-bold">Contactez-moi</h2>
        <div className="w-full max-w-md">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </section>
  );
}
