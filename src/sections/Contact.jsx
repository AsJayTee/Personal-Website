import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/ContactExperience";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [messageStatus, setMessageStatus] = useState({
    type: '', // 'success' or 'error'
    text: ''
  });

  // Check if user is on desktop (xl breakpoint and above)
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear messages when user starts typing
    if (messageStatus.text) {
      setMessageStatus({ type: '', text: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessageStatus({ type: '', text: '' }); // Clear any previous messages

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Reset form and show success message
      setForm({ name: "", email: "", message: "" });
      setMessageStatus({
        type: 'success',
        text: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!'
      });

      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setMessageStatus({ type: '', text: '' });
      }, 5000);

    } catch (error) {
      console.error("EmailJS Error:", error);
      setMessageStatus({
        type: 'error',
        text: 'Oops! Something went wrong. Please try again or reach out to me directly.'
      });

      // Auto-clear error message after 8 seconds
      setTimeout(() => {
        setMessageStatus({ type: '', text: '' });
      }, 8000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get In Touch"
          sub="Things You Can Do 📬"
        />
        <div className="grid-12-cols mt-16">
          <div className={isDesktop ? "xl:col-span-5" : "col-span-1"}>
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="David Smith"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="youremail@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Say Something Nice :)"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" disabled={loading}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                  </div>
                </button>
              </form>
            </div>
          </div>
          
          {isDesktop && (
            <div className="xl:col-span-7 min-h-96">
              <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
                <ContactExperience />
              </div>
            </div>
          )}
        </div>

        {/* Status Message Popup */}
        {messageStatus.text && (
          <div className={`message-popup ${messageStatus.type === 'success' ? 'message-popup-success' : 'message-popup-error'}`}>
            <div className="message-popup-content">
              <div className="message-popup-icon">
                {messageStatus.type === 'success' ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="message-popup-text">
                <p>{messageStatus.text}</p>
              </div>
              <button 
                onClick={() => setMessageStatus({ type: '', text: '' })}
                className="message-popup-close"
                aria-label="Close notification"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;