import { Link } from 'react-router-dom';
import { useCosmetic } from '../context/cosmeticlab';

const HomeCosmeticLab = () => {
  const { language } = useCosmetic();
  const english = language === 'en';
  return (
    <main>
      <section className="home-container">
        <div className="home-content">
          <span className="badge">{english ? 'Beauty, made personal' : 'Belleza hecha para ti'}</span>
          <h1>{english ? <>Makeup that feels<br /><em>like your skin.</em></> : <>Maquillaje que se siente<br /><em>como tu piel.</em></>}</h1>
          <p>{english ? 'Curated makeup and skincare essentials that bring out your glow, from your first ritual to your final touch.' : 'Esenciales de maquillaje y cuidado facial que realzan tu brillo, desde el primer paso de tu rutina hasta el ultimo toque.'}</p>
          <div className="home-buttons">
            <Link to="/productos" className="btn-primary">{english ? 'Explore collection' : 'Explorar coleccion'} <span>→</span></Link>
            <a href="#nosotros" className="btn-secondary">{english ? 'Our philosophy' : 'Nuestra filosofia'}</a>
          </div>
        </div>
        <div className="home-image"><img src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1000&q=85" alt={english ? 'Makeup and skincare products' : 'Productos de maquillaje y cuidado facial'} /><span className="image-note">01 / 04<br /><small>{english ? 'The daily glow' : 'El brillo de cada dia'}</small></span></div>
      </section>

      <section className="brand-strip"><span>{english ? 'Thoughtful formulas' : 'Formulas conscientes'}</span><span>{english ? 'Cruelty-free beauty' : 'Belleza sin crueldad'}</span><span>{english ? 'Made for every ritual' : 'Para cada ritual'}</span></section>

      <section className="about-section" id="nosotros">
        <div className="section-kicker">02 — {english ? 'Our purpose' : 'Nuestro proposito'}</div>
        <div className="about-grid">
          <h2>{english ? <>Beauty should be a<br /><em>moment of care.</em></> : <>La belleza tambien es<br /><em>un momento de cuidado.</em></>}</h2>
          <div className="about-image"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85" alt={english ? 'Blonde model wearing makeup' : 'Modelo rubia con maquillaje'} /></div>
          <div><p>{english ? 'CosmeticLAB is a beauty company created to make makeup and skincare feel more intentional, approachable and joyful. We choose formulas that respect your skin and products that fit naturally into your routine.' : 'CosmeticLAB es una empresa de belleza creada para hacer del maquillaje y el cuidado de la piel una experiencia mas consciente, cercana y alegre. Elegimos formulas que respetan tu piel y productos que se integran naturalmente a tu rutina.'}</p><Link to="/productos" className="text-link">{english ? 'Discover our products →' : 'Conoce nuestros productos →'}</Link></div>
        </div>
      </section>

      <section className="contact-section" id="contacto">
        <div><div className="section-kicker">03 — {english ? 'Stay in touch' : 'Hablemos'}</div><h2>{english ? 'Your ritual, our care.' : 'Tu ritual, nuestro cuidado.'}</h2><p>{english ? 'Questions about your skin or a product? Our beauty team is ready to help.' : 'Tienes dudas sobre tu piel o algun producto? Nuestro equipo de belleza esta listo para ayudarte.'}</p></div>
        <div className="contact-details"><div className="contact-info"><a href="mailto:hola@cosmeticlab.com">hola@cosmeticlab.com</a><a href="tel:+573001234567">+57 300 123 4567</a><span>{english ? 'Mon–Fri · 9:00–18:00' : 'Lun–Vie · 9:00–18:00'}</span></div><div className="social-links"><a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><span className="social-icon">◎</span><span>Instagram</span></a><a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><span className="social-icon social-letter">f</span><span>Facebook</span></a><a href="https://www.tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><span className="social-icon">♪</span><span>TikTok</span></a></div></div>
      </section>
    </main>
  );
};

export default HomeCosmeticLab;