import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);

      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, type: "contact" }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        console.error("Backend error:", responseData);
        throw new Error(responseData.error || "Failed to send message");
      }

      toast({
        title: "Success",
        description: "Message sent successfully",
        className: "border-primary bg-black text-white",
      });

      form.reset();

    } catch (error: any) {
      console.error("Submit error:", error);

      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel glow-border p-8 md:p-10 rounded-3xl"
    >
      <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <div>
          <label className="block text-sm text-gray-400 mb-2">Your Name</label>
          <input
            {...form.register("name")}
            type="text"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Email</label>
          <input
            {...form.register("email")}
            type="email"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Message</label>
          <textarea
            {...form.register("message")}
            rows={5}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
          />
          {form.formState.errors.message && (
            <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-black font-bold py-4 rounded-xl flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Send Message <Send size={18} />
            </>
          )}
        </button>

      </form>
    </motion.div>
  );
}
