import PageHero from "@/components/ui/PageHero";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { COLLEGE_NAME, CONTACT_EMAIL, CONTACT_PHONE, GOOGLE_MAPS_EMBED_URL, HOD_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Department of Zoology at GDC Siddipet.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We are here to answer your academic inquiries and support your educational journey"
      />

      <div className="section-container section-padding">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading font-bold text-3xl text-govt-text mb-6">Get In Touch</h2>
              <p className="text-govt-muted leading-relaxed mb-8 max-w-xl">
                For admissions, academic inquiries, research collaborations, or general information, 
                please reach out to us using the contact details below. Our working hours are from 
                10:00 AM to 4:30 PM (Monday to Saturday).
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Address */}
              <div className="card-static p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Visit Us</h3>
                <address className="not-italic text-sm text-govt-muted leading-relaxed">
                  Department of Zoology<br />
                  {COLLEGE_NAME}<br />
                  Siddipet District, Telangana<br />
                  PIN - 502103, India
                </address>
              </div>

              {/* Contact */}
              <div className="card-static p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Phone size={24} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Contact Info</h3>
                <div className="text-sm text-govt-muted leading-relaxed space-y-1">
                  <a href={`tel:${CONTACT_PHONE}`} className="block hover:text-primary transition-colors">{CONTACT_PHONE}</a>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="block hover:text-primary transition-colors">{CONTACT_EMAIL}</a>
                </div>
              </div>
            </div>

            {/* HoD Contact Specific */}
            <div className="bg-neutral-bg border border-govt-border p-6 rounded-xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-govt-text">Head of the Department</h4>
                <p className="text-sm text-govt-muted mt-1">
                  For official matters and collaborations, you may contact the HoD directly at <a href={`mailto:${HOD_EMAIL}`} className="text-primary hover:underline">{HOD_EMAIL}</a>
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="card-static p-2 h-[450px] lg:h-full min-h-[450px]">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "0.5rem" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location of GDC Siddipet"
                className="bg-neutral-bg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
