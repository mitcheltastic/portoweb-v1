export default function ContactSection() {
  return (
    <section id="contact" className="mt-24">
      <h2 className="text-2xl font-bold text-lightest-slate mb-6">Get In Touch</h2>
      <p className="text-slate mb-4">
        Have a question, a project in mind, or just want to say hi? I’m always open to new opportunities and conversations.
      </p>
      <a
        href="mailto:mitch.affandi22@gmail.com"
        className="inline-block border border-accent text-accent px-6 py-2 rounded hover:bg-accent hover:text-white transition-colors"
      >
        Say Hello
      </a>
    </section>
  );
}
