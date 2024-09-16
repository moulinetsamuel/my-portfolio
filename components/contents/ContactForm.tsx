import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactForm() {
  return (
    <form className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>
        <Input id="name" placeholder="Votre nom" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="votre@email.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Votre message" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="attachment">Pièce jointe</Label>
        <Input id="attachment" type="file" />
      </div>
      <Button type="submit">Envoyer</Button>
    </form>
  );
}
