import React, { useState, useEffect } from 'react';
import { 
  Shirt, 
  Laptop, 
  Home as HomeIcon, 
  Sparkles, 
  Compass, 
  Flame, 
  SlidersHorizontal, 
  RefreshCw,
  Truck,
  ShieldCheck,
  Headphones,
  Undo2
} from 'lucide-react';

// Data & Types
import { PRODUCTS } from './productsData';
import { CartItem, Product, Order } from './types';

// Components
import Header from './components/Header';
import PromoSlider from './components/PromoSlider';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProfileDrawer from './components/ProfileDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import AIConcierge from './components/AIConcierge';

export default function App() {
  // Locale State (Defaulting to Somali as requested by user's prompt)
  const [lang, setLang] = useState<'so' | 'en'>('so');

  // E-commerce States (Saves to client storage for persistence)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('soma_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('soma_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('soma_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // UI States
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'fashion' | 'electronics' | 'home' | 'beauty'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<number>(250);
  const [sortBy, setSortBy] = useState<'popular' | 'low-high' | 'high-low'>('popular');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  // Active Modals & Triggers States
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Calculations Coupon checkout pass-down
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountCode, setDiscountCode] = useState('');

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('soma_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('soma_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('soma_orders', JSON.stringify(orders));
  }, [orders]);

  // CATEGORY LIST DEFINITION WITH TRANSLATIONAL NAMES
  const categoriesDef = [
    { id: 'all' as const, name: 'Dhammaan', nameEn: 'All Products', icon: <Compass className="h-5 w-5" /> },
    { id: 'fashion' as const, name: 'Dharka & Kabaha', nameEn: 'Fashion & Shoes', icon: <Shirt className="h-5 w-5" /> },
    { id: 'electronics' as const, name: 'Elektaroonigga', nameEn: 'Electronics', icon: <Laptop className="h-5 w-5" /> },
    { id: 'home' as const, name: 'Agabka Guriga', nameEn: 'Home & Kitchen', icon: <HomeIcon className="h-5 w-5" /> },
    { id: 'beauty' as const, name: 'Quruxda', nameEn: 'Beauty & Cosmetics', icon: <Sparkles className="h-5 w-5" /> },
  ];

  // CART HANDLERS
  const handleAddToCart = (product: Product, color?: string, size?: string) => {
    const finalColor = color || product.options?.colors?.[0] || '';
    const finalSize = size || product.options?.sizes?.[0] || '';

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === finalColor &&
          item.selectedSize === finalSize
      );

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id &&
          item.selectedColor === finalColor &&
          item.selectedSize === finalSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1, selectedColor: finalColor, selectedSize: finalSize }];
      }
    });

    // Toggle feedback
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, q: number, color?: string, size?: string) => {
    if (q <= 0) {
      handleRemoveCartItem(productId, color, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedColor === color &&
        item.selectedSize === size
          ? { ...item, quantity: q }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product);
    // Remove from wishlist
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
  };

  // WISHLIST HANDLERS
  const handleWishlistToggle = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // FILTER LOGIC
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchPrice = product.price <= priceRange;
    const matchRating = ratingFilter ? product.rating >= ratingFilter : true;
    
    // Search fields across Somali & English
    const q = searchQuery.toLowerCase();
    const matchSearch =
      product.name.toLowerCase().includes(q) ||
      product.nameSo.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.descriptionSo.toLowerCase().includes(q) ||
      product.tags.some((t) => t.toLowerCase().includes(q));

    return matchCategory && matchPrice && matchRating && matchSearch;
  }).sort((a, b) => {
    if (sortBy === 'low-high') return a.price - b.price;
    if (sortBy === 'high-low') return b.price - a.price;
    return b.rating - a.rating; // Popular default
  });

  const clearFilters = () => {
    setPriceRange(250);
    setRatingFilter(null);
    setSortBy('popular');
    setSearchQuery('');
  };

  const handleLaunchCheckout = (discountVal: number, code: string) => {
    setDiscountAmount(discountVal);
    setDiscountCode(code);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col text-gray-800 font-sans">
      
      {/* 1. STICKY DENSE HEADER */}
      <Header
        lang={lang}
        setLang={setLang}
        cart={cart}
        wishlist={wishlist}
        setIsCartOpen={setIsCartOpen}
        setIsWishlistOpen={setIsWishlistOpen}
        setIsProfileOpen={setIsProfileOpen}
        onSearch={setSearchQuery}
      />

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* 2. PROMOTIONAL HERO AD SLIDER */}
        <PromoSlider
          lang={lang}
          onExplore={(cat) => setSelectedCategory(cat)}
          openAiChat={() => setIsAiOpen(true)}
        />

        {/* 3. CIRCULAR CATEGORY LIST SELECTORS */}
        <section className="space-y-3 shrink-0">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-550 flex items-center gap-1">
              <Flame className="h-4.5 w-4.5 text-orange-600 animate-pulse" />
              {lang === 'so' ? 'Kala bixi Qaybaha' : 'Browse Category Hubs'}
            </h3>
            <span className="text-[10px] font-mono text-gray-400">Total {PRODUCTS.length} curated products</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {categoriesDef.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const prodCount = cat.id === 'all' 
                ? PRODUCTS.length 
                : PRODUCTS.filter(p => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  id={`cat-pill-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold cursor-pointer transition-all shrink-0 ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-500/10 scale-102 font-bold'
                      : 'bg-white text-gray-600 border border-gray-150 hover:border-gray-300 hover:bg-gray-100/30'
                  }`}
                >
                  {cat.icon}
                  <span>{lang === 'so' ? cat.name : cat.nameEn}</span>
                  <span className={`text-[10px] rounded-full px-1.5 py-0.5 leading-none font-bold ${
                    isActive ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {prodCount}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. MAIN STORE GRID AND SIDEBAR LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* A. FILTERING UTILITIES SIDEBAR (DESKTOP) */}
          <aside className="bg-white p-5 border border-gray-100 rounded-2xl space-y-5 hidden lg:block sticky top-24 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-extrabold text-gray-900 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                <SlidersHorizontal className="h-4 w-4 text-orange-600" />
                {lang === 'so' ? 'Sifeeyaha' : 'Filter Products'}
              </span>
              <button
                id="clear-filters-sidebar"
                onClick={clearFilters}
                className="text-[10px] font-bold text-orange-600 hover:text-orange-500 cursor-pointer flex items-center gap-1"
                title="Reset filters"
              >
                <Undo2 className="h-3 w-3" />
                <span>{lang === 'so' ? 'Nadiifi' : 'Reset'}</span>
              </button>
            </div>

            {/* PRICE RANGE FILTER */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-gray-700">{lang === 'so' ? 'Qiimaha ugu sarreeya' : 'Max Price'}</span>
                <span className="font-mono font-bold text-orange-600">${priceRange}</span>
              </div>
              <input
                id="price-range-slider"
                type="range"
                min="10"
                max="250"
                step="5"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer h-1 bg-gray-100 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-gray-405 font-mono">
                <span>$10</span>
                <span>$250</span>
              </div>
            </div>

            {/* SORTING METHOD */}
            <div className="space-y-2 pt-3 border-t border-gray-55">
              <label className="block text-xs font-semibold text-gray-700">{lang === 'so' ? 'U habaynta' : 'Sorting Option'}</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-orange-500"
              >
                <option value="popular">{lang === 'so' ? 'Qiimaynta Sare (Popular)' : 'Model Popularity'}</option>
                <option value="low-high">{lang === 'so' ? 'Qiimaha koowaad (Cheap first)' : 'Price: Low to High'}</option>
                <option value="high-low">{lang === 'so' ? 'Qiimaha sareeya (Luxury first)' : 'Price: High to Low'}</option>
              </select>
            </div>

            {/* MIN RATING BLOCK */}
            <div className="space-y-2 pt-3 border-t border-gray-55">
              <span className="block text-xs font-semibold text-gray-700">{lang === 'so' ? 'Xiddigaha ugu hooseeya' : 'Minimum Rating'}</span>
              <div className="flex flex-col gap-1.5">
                {[4, 4.5, 4.8].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setRatingFilter(ratingFilter === stars ? null : stars)}
                    className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-xl border text-left cursor-pointer transition-colors ${
                      ratingFilter === stars
                        ? 'border-orange-500 bg-orange-50 text-orange-700 font-bold'
                        : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50 text-gray-650'
                    }`}
                  >
                    <span>★ {stars}+</span>
                    <span className="text-[10px] text-gray-400">({PRODUCTS.filter(p => p.rating >= stars).length} items)</span>
                  </button>
                ))}
              </div>
            </div>

            {/* MIN ADVERTISEMENT BOX */}
            <div className="p-4 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-2xl text-white space-y-2.5 shadow-xs">
              <span className="font-extrabold text-xs block uppercase tracking-widest leading-none">🎁 CODES: NABAD55</span>
              <p className="text-[10px] text-orange-100 leading-tight">
                {lang === 'so' 
                  ? 'Geli kuubanka dambiisha si aad u tijaabiso 50% qiimo-dhimista.' 
                  : 'Enter "NABAD50" to simulate a 50% discount on entire e-commerce transactions.'}
              </p>
            </div>
          </aside>

          {/* B. CURATED PRODUCT LIST GRID COMPONENT */}
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center justify-between text-xs text-gray-400 leading-none">
              <span>
                {lang === 'so' 
                  ? `${filteredProducts.length} Alaab ayaa laga helay qaybtan` 
                  : `Showing ${filteredProducts.length} matching products`}
              </span>
              <span className="font-mono">{selectedCategory.toUpperCase()} HUB ACTIVE</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-white border border-gray-100 rounded-3xl flex flex-col items-center justify-center gap-3">
                <Compass className="h-10 w-10 text-gray-300 animate-spin" />
                <p className="text-sm font-semibold text-gray-800">
                  {lang === 'so' ? 'Wax alaab ah lama helin!' : 'No matching results found'}
                </p>
                <button
                  id="reset-search-grid"
                  onClick={clearFilters}
                  className="text-xs font-bold text-orange-600 hover:underline cursor-pointer"
                >
                  {lang === 'so' ? 'Dib u eeg dhammaan alaabada' : 'Reset search filter'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const isWish = wishlist.some((item) => item.id === product.id);
                  const isAdd = cart.some((item) => item.product.id === product.id);

                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      lang={lang}
                      isWishlisted={isWish}
                      isAdded={isAdd}
                      onWishlistToggle={() => handleWishlistToggle(product)}
                      onAddToCart={() => handleAddToCart(product)}
                      onQuickView={() => setActiveProduct(product)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 5. BRAND ASSURANCE BANNER SECTION */}
      <section className="bg-gray-900 border-t border-gray-800 mt-12 py-10 text-white select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Truck className="h-6 w-6 text-orange-500 animate-bounce" />
            <h5 className="font-bold text-xs">{lang === 'so' ? 'Rarid Bilaash ah' : 'Free Shipping'}</h5>
            <p className="text-[10px] text-gray-400 max-w-xs">{lang === 'so' ? 'Dalabyada ka sarreeya $50' : 'On all orders above $50'}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-orange-500" />
            <h5 className="font-bold text-xs">{lang === 'so' ? '100% Original' : 'Billion Original'}</h5>
            <p className="text-[10px] text-gray-400 max-w-xs">{lang === 'so' ? 'Si toos ah shirkadaha waddaniga' : 'Sourced direct from global brands'}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RefreshCw className="h-6 w-6 text-orange-500" />
            <h5 className="font-bold text-xs">{lang === 'so' ? 'Beddelaad 7 Cisho' : '7 Days Returns'}</h5>
            <p className="text-[10px] text-gray-400 max-w-xs">{lang === 'so' ? 'Haddii ay wax ciladoobaan' : 'No-hassle item exchange policy'}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Headphones className="h-6 w-6 text-orange-500" />
            <h5 className="font-bold text-xs">{lang === 'so' ? '24/7 Kaalmo Dhab ah' : 'Client Care 24/7'}</h5>
            <p className="text-[10px] text-gray-400 max-w-xs">{lang === 'so' ? 'La hadal Caawiyahayaga AI dhib la\'aan' : 'Dedicated support via AI Shopper'}</p>
          </div>
        </div>
      </section>

      {/* 6. MODALS SCREEN CASTS DRAWERS */}

      {/* PRODUCT DETAILED MODAL */}
      {activeProduct && (
        <ProductDetailsModal
          product={activeProduct}
          lang={lang}
          onClose={() => setActiveProduct(null)}
          isWishlisted={wishlist.some((item) => item.id === activeProduct.id)}
          onWishlistToggle={() => handleWishlistToggle(activeProduct)}
          onAddToCart={(col, sz) => handleAddToCart(activeProduct, col, sz)}
          isAdded={cart.some((item) => item.product.id === activeProduct.id)}
        />
      )}

      {/* SLIDE-IN CART DRAWER */}
      <CartDrawer
        lang={lang}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleLaunchCheckout}
      />

      {/* SECURE CHECKOUT MODAL FLOW */}
      {isCheckoutOpen && (
        <CheckoutModal
          lang={lang}
          cart={cart}
          discountAmount={discountAmount}
          discountCode={discountCode}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={handleOrderSuccess}
          clearCart={() => setCart([])}
        />
      )}

      {/* USER PROFILE DRAWER */}
      <ProfileDrawer
        lang={lang}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        orders={orders}
      />

      {/* WISHLIST DRAWER OVERLAY */}
      <WishlistDrawer
        lang={lang}
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={(id) => setWishlist((prev) => prev.filter((item) => item.id !== id))}
        onMoveToCart={handleMoveToCart}
      />

      {/* LOVELY FLOATING AI ASSISTANT CONCIERGE CHATBOX */}
      <AIConcierge
        lang={lang}
        isOpen={isAiOpen}
        setIsOpen={setIsAiOpen}
        onAddToCartDirect={(p) => handleAddToCart(p)}
        cartProductIds={cart.map((item) => item.product.id)}
      />

      {/* FOOTER METADATA */}
      <footer className="bg-gray-950 text-gray-600 text-[11px] py-4 text-center border-t border-gray-900 leading-none">
        <p>© 2026 SomaMarket. {lang === 'so' ? 'Dhammaan xuquuqda waa ilaaliyan.' : 'All simulation rights reserved.'}</p>
      </footer>

    </div>
  );
}
