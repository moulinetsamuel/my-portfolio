"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Ici, vous enverriez normalement les données du formulaire à votre serveur
    // Pour l'instant, nous allons simplement simuler une soumission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Message envoyé !",
      description:
        "Merci pour votre message. Je vous répondrai dès que possible.",
    });

    setIsSubmitting(false);
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>
        <Input
          id="name"
          name="name"
          placeholder="Votre nom - Entreprise"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="votre@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Votre message"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="attachment">Pièce jointe (optionnel)</Label>
        <Input
          id="attachment"
          name="attachment"
          type="file"
          accept=".pdf,.doc,.docx"
          placeholder=".pdf, .doc, .docx"
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "Envoyer"}
      </Button>
    </form>
  );
}
