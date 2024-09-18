import { ContactFormData } from "@/lib/schemas/contactSchema";

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyyqZM3Mf28262FF9GFsEdp6uutAN50bfspJkPl-DXIOM0K4O-uQY_eaAXXi3gRv53_/exec";

export async function submitContactForm(
  formData: ContactFormData
): Promise<void> {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    throw new Error("Erreur lors de l'envoi du message");
  }
}
