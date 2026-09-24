import { useState } from 'react';
import { useCosmetic } from '../context/cosmeticlab';

export const mockProducts = [
  { id: 1, name: 'Serum Hidratante Plus', category: 'Cuidado Facial', price: 45.00, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=85' },
  { id: 2, name: 'Crema Corporal Nutritiva', category: 'Cuidado Corporal', price: 32.00, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=85' },
  { id: 3, name: 'Kit Esencial Dia', category: 'Cuidado Facial', price: 85.00, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=85' },
  { id: 4, name: 'Labial Velvet Nude', category: 'Maquillaje', price: 24.00, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=85' },
  { id: 5, name: 'Paleta Soft Glow', category: 'Maquillaje', price: 39.00, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=85' },
  { id: 6, name: 'Protector Solar SPF 50', category: 'Cuidado Facial', price: 29.00, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=85' }
];

const ProductosCosmeticLab = () => {
  const { addToCart, language } = useCosmetic();
  const [filtro, setFiltro] = useState('Todos');
  const [orden, setOrden] = useState('featured');
  const visibleProducts = mockProducts
    .filter((product) => filtro === 'Todos' || product.category === filtro)
    .sort((a, b) => orden === 'price-low' ? a.price - b.price : orden === 'price-high' ? b.price - a.price : a.id - b.id);
  const categories = language === 'es' ? ['Todos', 'Cuidado Facial', 'Cuidado Corporal', 'Maquillaje'] : ['All', 'Skincare', 'Body care', 'Makeup'];
  const categoryValue = (label: string) => ({ All: 'Todos', Skincare: 'Cuidado Facial', 'Body care': 'Cuidado Corporal', Makeup: 'Maquillaje' }[label] || label);

  return (
    <div className="productos-container">
      <aside className="sidebar">
        <h3><span className="filter-icon">⌁</span> {language === 'es' ? 'Categorias' : 'Categories'}</h3>
        <ul className="category-list">
          {categories.map((category) => <li key={category} className={filtro === categoryValue(category) ? 'active' : ''} onClick={() => setFiltro(categoryValue(category))}>{category}</li>)}
        </ul>
      </aside>
      
      <main className="product-main">
        <div className="product-header">
          <span>{visibleProducts.length} {language === 'es' ? 'productos encontrados' : 'products found'}</span>
          <select className="sort-select" value={orden} onChange={(event) => setOrden(event.target.value)}>
            <option value="featured">{language === 'es' ? 'Destacados' : 'Featured'}</option>
            <option value="price-low">{language === 'es' ? 'Precio menor' : 'Lowest price'}</option>
            <option value="price-high">{language === 'es' ? 'Precio mayor' : 'Highest price'}</option>
          </select>
        </div>
        
        <div className="grid-productos">
          {visibleProducts.map((prod) => (
            <div key={prod.id} className="product-card">
              <div className="img-container">
                <img src={prod.image} alt={prod.name} />
              </div>
              <div className="info-container">
                <span className="cat-label">{prod.category}</span>
                <h4>{prod.name}</h4>
                <div className="price-row">
                  <span className="price">${prod.price.toFixed(2)}</span>
                  <button className="btn-cart" onClick={() => addToCart(prod)} aria-label={`Agregar ${prod.name}`}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductosCosmeticLab;