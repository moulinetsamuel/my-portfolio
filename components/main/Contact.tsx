import ContactForm from "../contents/ContactForm";
import Footer from "../Footer";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen w-full flex flex-col justify-between"
    >
      <div className="flex-grow flex flex-col items-center pt-16 px-4">
        <h2 className="text-4xl font-bold py-12 text-center">Contactez-moi</h2>
        <div className="w-full max-w-md">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </section>
  );
}
