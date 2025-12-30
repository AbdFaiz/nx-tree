import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Apakah ini gratis?",
    a: "Ya, Nxtree memiliki paket 'Free Forever' yang mencakup fitur dasar yang cukup untuk kebutuhan personal Anda."
  },
  {
    q: "Bisakah saya pakai di Instagram/TikTok?",
    a: "Tentu saja! Nxtree dioptimalkan untuk dibuka di browser mobile seperti Instagram, TikTok, dan Twitter."
  },
  {
    q: "Bisakah saya ganti username nanti?",
    a: "Bisa. Anda dapat mengubah username Anda kapan saja melalui dashboard pengaturan profil."
  },
  {
    q: "Apakah ada analisis statistik pengunjung?",
    a: "Ada. Anda bisa memantau jumlah klik dan asal negara pengunjung secara real-time di dashboard."
  }
];

export function FAQ() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Punya pertanyaan?</h2>
          <p className="text-muted-foreground">Segala hal yang perlu Anda ketahui tentang Nx Tree.</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-6 bg-card/30">
              <AccordionTrigger className="hover:no-underline font-semibold text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}