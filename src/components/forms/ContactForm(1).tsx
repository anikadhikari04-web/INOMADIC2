import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useSendContactMessage } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const sendMessage = useSendContactMessage();
  
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
      await sendMessage.mutateAsync({
        data: {
          name: data.name,
          email: data.email,
          message: data.message
        }
      });
      
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
        variant: "default",
        className: "border-primary bg-black text-white",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email us directly.",
        variant: "destructive",
      });
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
            Your Name
          </label>
          <input
            {...form.register("name")}
            id="name"
            type="text"
            className={`w-full bg-black/50 border ${form.formState.errors.name ? 'border-destructive' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
            placeholder="John Doe"
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-sm text-destructive">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
            Email Address
          </label>
          <input
            {...form.register("email")}
            id="email"
            type="email"
            className={`w-full bg-black/50 border ${form.formState.errors.email ? 'border-destructive' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
            placeholder="john@example.com"
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
            Project Details
          </label>
          <textarea
            {...form.register("message")}
            id="message"
            rows={5}
            className={`w-full bg-black/50 border ${form.formState.errors.message ? 'border-destructive' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none`}
            placeholder="Tell us about your vision..."
          />
          {form.formState.errors.message && (
            <p className="mt-1 text-sm text-destructive">{form.formState.errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={sendMessage.isPending}
          className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {sendMessage.isPending ? (
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
