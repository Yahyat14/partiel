import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";

const fallbackProducts = [
  {
    _id: "demo-coffee",
    name: "Café Éthiopie Yirgacheffe",
    description: "Café de spécialité aux notes florales, torréfaction claire.",
    price: 14.5,
    category: "coffee",
    quantity: 24,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=900&auto=format&fit=crop",
  },
  {
    _id: "demo-mug",
    name: "Mug céramique grès",
    description: "Pièce artisanale émaillée à la main, parfaite pour latte ou filtre.",
    price: 24,
    category: "ceramic",
    quantity: 12,
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=900&auto=format&fit=crop",
  },
  {
    _id: "demo-accessory",
    name: "Tote bag Coffee Arts",
    description: "Coton biologique épais, graphisme exclusif café et céramique.",
    price: 15,
    category: "accessories",
    quantity: 60,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=900&auto=format&fit=crop",
  },
];

const fallbackWorkshops = [
  {
    _id: "demo-pottery",
    title: "Peinture sur céramique",
    description: "Créez votre mug, choisissez vos couleurs, nous nous occupons de la cuisson.",
    date: new Date(Date.now() + 4 * 86400000).toISOString(),
    time: "14:00",
    price: 49,
    capacity: 8,
    maxParticipants: 8,
    registrations: [],
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=900&auto=format&fit=crop",
  },
  {
    _id: "demo-barista",
    title: "Initiation barista",
    description: "Extraction espresso, méthodes douces et dégustation de cafés de spécialité.",
    date: new Date(Date.now() + 7 * 86400000).toISOString(),
    time: "16:00",
    price: 45,
    capacity: 6,
    maxParticipants: 6,
    registrations: [],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=900&auto=format&fit=crop",
  },
];

const fallbackPosts = [
  {
    _id: "demo-blog",
    title: "L'art du café et de la céramique",
    excerpt: "Pourquoi ces deux gestes artisanaux se répondent si naturellement.",
    content: "Coffee Arts Paris réunit le temps long de la céramique et la précision du café de spécialité.",
    category: "coffee",
    authorName: "Coffee Arts",
    image: "https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=900&auto=format&fit=crop",
  },
];

const getList = async (path, key, fallback) => {
  try {
    const { data } = await api.get(path);
    return key ? data[key] || fallback : data;
  } catch {
    return fallback;
  }
};

const formatDate = (value) =>
  value ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(value)) : "À venir";

export const Boutique = () => {
  const [products, setProducts] = useState(fallbackProducts);
  const [category, setCategory] = useState("all");
  const [message, setMessage] = useState("");
  const { items, addItem, updateQuantity, removeItem, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    getList("/products?limit=50", "products", fallbackProducts).then(setProducts);
  }, []);

  const filtered = category === "all" ? products : products.filter((p) => p.category === category);
  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const checkout = async () => {
    if (!isAuthenticated()) {
      setMessage("Connectez-vous dans l'espace client pour simuler la commande.");
      return;
    }

    try {
      await api.post("/orders", {
        items: items.map((item) => ({ productId: item._id, quantity: item.quantity })),
        paymentMethod: "card",
        shippingAddress: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          address: "Paiement simulé",
          city: "Paris",
          postalCode: "75003",
          country: "France",
        },
      });
      clearCart();
      setMessage("Commande simulée avec succès. Elle apparaît dans votre espace client et côté admin.");
    } catch (error) {
      setMessage(error.response?.data?.error || "Impossible de créer la commande.");
    }
  };

  return (
    <main className="page-surface">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Boutique</p>
          <h1>Cafés, céramiques et objets du quotidien</h1>
          <p>Affichage produits, catégories, détails, panier et paiement simulé.</p>
        </div>

        <div className="filter-row">
          {["all", "coffee", "ceramic", "accessories"].map((item) => (
            <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)} type="button">
              {item === "all" ? "Tout" : item}
            </button>
          ))}
        </div>

        <div className="shop-layout">
          <section className="product-grid">
            {filtered.map((product) => (
              <article className="shop-card" key={product._id}>
                <Link to={`/boutique/${product._id}`}>
                  <img src={product.image} alt="" />
                </Link>
                <span>{product.category}</span>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-row">
                  <strong>{Number(product.price).toFixed(2)} €</strong>
                  <button type="button" onClick={() => addItem(product)}>Ajouter</button>
                </div>
              </article>
            ))}
          </section>

          <aside className="checkout-panel">
            <h2>Panier</h2>
            {items.length === 0 ? (
              <p>Votre panier est vide.</p>
            ) : (
              items.map((item) => (
                <div className="cart-line" key={item._id}>
                  <span>{item.name}</span>
                  <div>
                    <button type="button" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                    <strong>{item.quantity}</strong>
                    <button type="button" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    <button type="button" onClick={() => removeItem(item._id)}>×</button>
                  </div>
                </div>
              ))
            )}
            <div className="cart-total">Total : {total.toFixed(2)} €</div>
            <button className="btn btn-primary" type="button" onClick={checkout} disabled={!items.length}>
              Paiement simulé
            </button>
            {message && <p className="form-message">{message}</p>}
          </aside>
        </div>
      </div>
    </main>
  );
};

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => setProduct(fallbackProducts.find((item) => item._id === id) || fallbackProducts[0]));
  }, [id]);

  if (!product) return <main className="page-surface"><div className="container">Chargement...</div></main>;

  return (
    <main className="page-surface">
      <div className="container detail-layout">
        <img src={product.image} alt="" />
        <div>
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <strong className="detail-price">{Number(product.price).toFixed(2)} €</strong>
          <button className="btn btn-primary" type="button" onClick={() => addItem(product)}>Ajouter au panier</button>
        </div>
      </div>
    </main>
  );
};

export const Ateliers = () => {
  const [workshops, setWorkshops] = useState(fallbackWorkshops);
  const [message, setMessage] = useState("");
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    getList("/workshops?limit=50", "workshops", fallbackWorkshops).then(setWorkshops);
  }, []);

  const reserve = async (workshopId) => {
    if (!isAuthenticated()) {
      setMessage("Connectez-vous dans l'espace client pour réserver un atelier.");
      return;
    }
    try {
      await api.post("/reservations", { workshopId, quantity: 1, participants: [] });
      setMessage("Réservation enregistrée. Elle est visible dans votre espace client et côté admin.");
    } catch (error) {
      setMessage(error.response?.data?.error || "Réservation impossible.");
    }
  };

  return (
    <main className="page-surface">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Ateliers</p>
          <h1>Créer autour du café et de la céramique</h1>
          <p>Liste des ateliers, prix, places disponibles, dates et réservation.</p>
        </div>
        {message && <p className="form-message">{message}</p>}
        <div className="content-grid">
          {workshops.map((workshop) => {
            const taken = workshop.registrations?.length || 0;
            const available = (workshop.maxParticipants || workshop.capacity || 0) - taken;
            return (
              <article className="shop-card" key={workshop._id}>
                <img src={workshop.image} alt="" />
                <span>{formatDate(workshop.date)} · {workshop.time}</span>
                <h2>{workshop.title}</h2>
                <p>{workshop.description}</p>
                <p>{Math.max(available, 0)} place(s) disponible(s)</p>
                <div className="card-row">
                  <strong>{Number(workshop.price || 0).toFixed(2)} €</strong>
                  <button type="button" onClick={() => reserve(workshop._id)}>Réserver</button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export const Blog = () => {
  const [posts, setPosts] = useState(fallbackPosts);

  useEffect(() => {
    getList("/blog", null, fallbackPosts).then((data) => setPosts(Array.isArray(data) ? data : data.blogs || fallbackPosts));
  }, []);

  return (
    <main className="page-surface">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Blog</p>
          <h1>Journal café, céramique et atelier</h1>
        </div>
        <div className="content-grid">
          {posts.map((post) => (
            <article className="shop-card" key={post._id}>
              <img src={post.image} alt="" />
              <span>{post.category}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt || post.content?.slice(0, 160)}</p>
              <small>Par {post.authorName || "Coffee Arts"}</small>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export const About = () => (
  <main className="page-surface">
    <div className="container about-layout">
      <div>
        <p className="eyebrow">À propos</p>
        <h1>Un atelier-café au cœur de Paris</h1>
        <p>Coffee Arts Paris rassemble café de spécialité, céramique, ateliers et boutique. Le projet met en avant le geste artisanal, les matières naturelles et une expérience client chaleureuse.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1100&auto=format&fit=crop" alt="" />
    </div>
  </main>
);

export const Events = () => (
  <main className="page-surface">
    <div className="container">
      <div className="page-heading">
        <p className="eyebrow">Événements</p>
        <h1>Dégustations, pop-ups et moments créatifs</h1>
        <p>Les événements sont gérés comme des rendez-vous éditoriaux : masterclass, lancements de collections et rencontres avec artisans.</p>
      </div>
    </div>
  </main>
);

export const Contact = () => {
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    try {
      await api.post("/contact", form);
      setMessage("Message envoyé et enregistré en base de données.");
      event.currentTarget.reset();
    } catch (error) {
      setMessage(error.response?.data?.error || "Le message n'a pas pu être envoyé.");
    }
  };

  return (
    <main className="page-surface">
      <div className="container form-layout">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Écrivez-nous</h1>
          <p>25 boulevard du Temple, 75003 Paris · coffeeartsparis@gmail.com</p>
        </div>
        <form className="app-form" onSubmit={submit}>
          <input name="name" placeholder="Nom" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="subject" placeholder="Objet" required />
          <textarea name="message" placeholder="Message" required />
          <button className="btn btn-primary" type="submit">Envoyer</button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </main>
  );
};

export const Account = () => {
  const { user, login, register, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) return;
    api.get("/orders").then(({ data }) => setOrders(data)).catch(() => setOrders([]));
    api.get("/reservations").then(({ data }) => setReservations(data)).catch(() => setReservations([]));
  }, [isAuthenticated, user]);

  const handleLogin = async (event, admin = false) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const result = admin ? await useAuthStore.getState().adminLogin(form.email, form.password) : await login(form.email, form.password);
    setMessage(result.success ? "Connexion réussie." : result.error);
    if (result.success && admin) {
      navigate("/admin");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const result = await register(form.firstName, form.lastName, form.email, form.password, form.confirmPassword);
    setMessage(result.success ? "Compte créé." : result.error);
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    try {
      await api.put("/users/profile", form);
      setMessage("Profil mis à jour.");
    } catch {
      setMessage("Mise à jour impossible.");
    }
  };

  return (
    <main className="page-surface">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Espace client</p>
          <h1>Compte, commandes et réservations</h1>
          <p>Comptes test : admin@coffeeartsparis.fr / adminpassword</p>
        </div>
        {message && <p className="form-message">{message}</p>}

        {!isAuthenticated() ? (
          <div className="auth-grid">
            <form className="app-form" onSubmit={(event) => handleLogin(event)}>
              <h2>Connexion client</h2>
              <input name="email" type="email" placeholder="Email" required />
              <input name="password" type="password" placeholder="Mot de passe" required />
              <button className="btn btn-primary" type="submit">Se connecter</button>
            </form>
            <form className="app-form" onSubmit={handleRegister}>
              <h2>Inscription</h2>
              <input name="firstName" placeholder="Prénom" required />
              <input name="lastName" placeholder="Nom" required />
              <input name="email" type="email" placeholder="Email" required />
              <input name="password" type="password" placeholder="Mot de passe" required />
              <input name="confirmPassword" type="password" placeholder="Confirmation" required />
              <button className="btn btn-primary" type="submit">Créer le compte</button>
            </form>
            <form className="app-form" onSubmit={(event) => handleLogin(event, true)}>
              <h2>Connexion admin</h2>
              <input name="email" type="email" defaultValue="admin@coffeeartsparis.fr" required />
              <input name="password" type="password" defaultValue="adminpassword" required />
              <button className="btn btn-primary" type="submit">Se connecter admin</button>
            </form>
          </div>
        ) : (
          <div className="dashboard-grid">
            <section className="admin-card">
              <h2>Bonjour {user?.firstName}</h2>
              <p>{user?.email} · {user?.role}</p>
              <button className="btn btn-primary" type="button" onClick={logout}>Déconnexion</button>
            </section>
            <form className="app-form" onSubmit={updateProfile}>
              <h2>Modifier le profil</h2>
              <input name="firstName" defaultValue={user?.firstName || ""} placeholder="Prénom" />
              <input name="lastName" defaultValue={user?.lastName || ""} placeholder="Nom" />
              <input name="phone" placeholder="Téléphone" />
              <input name="address" placeholder="Adresse" />
              <button className="btn btn-primary" type="submit">Enregistrer</button>
            </form>
            <section className="admin-card">
              <h2>Commandes</h2>
              {orders.map((order) => <p key={order._id}>{order.orderNumber} · {order.total} € · {order.status}</p>)}
              {!orders.length && <p>Aucune commande.</p>}
            </section>
            <section className="admin-card">
              <h2>Réservations</h2>
              {reservations.map((reservation) => <p key={reservation._id}>{reservation.reservationNumber} · {reservation.status}</p>)}
              {!reservations.length && <p>Aucune réservation.</p>}
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

const initialAdminForm = {
  name: "",
  title: "",
  description: "",
  price: "",
  category: "coffee",
  image: "",
  quantity: 10,
  date: "",
  time: "14:00",
  capacity: 8,
};

export const AdminDashboard = () => {
  const { user, isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [products, setProducts] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(initialAdminForm);

  const loadAdmin = async () => {
    try {
      const [statsRes, productsRes, workshopsRes, ordersRes, reservationsRes, contactsRes, usersRes, blogRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/products?limit=100"),
        api.get("/workshops?limit=100"),
        api.get("/orders"),
        api.get("/reservations"),
        api.get("/contact"),
        api.get("/users"),
        api.get("/blog"),
      ]);
      setStats(statsRes.data);
      setProducts(productsRes.data.products || []);
      setWorkshops(workshopsRes.data.workshops || []);
      setOrders(ordersRes.data || []);
      setReservations(reservationsRes.data || []);
      setContacts(contactsRes.data.contacts || []);
      setUsers(usersRes.data.users || []);
      setBlogs(Array.isArray(blogRes.data) ? blogRes.data : blogRes.data.blogs || []);
    } catch (error) {
      setMessage(error.response?.data?.error || "Connectez-vous en admin pour charger le dashboard.");
    }
  };

  useEffect(() => {
    if (isAdmin()) loadAdmin();
    if (!isAdmin() && user?.role === "admin") {
      navigate("/admin");
    }
  }, [user]);

  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submitProduct = async (event) => {
    event.preventDefault();
    await api.post("/products", {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      image: form.image,
      quantity: Number(form.quantity),
    });
    setMessage("Produit ajouté.");
    setForm(initialAdminForm);
    loadAdmin();
  };

  const submitWorkshop = async (event) => {
    event.preventDefault();
    await api.post("/workshops", {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      category: form.category === "coffee" ? "barista" : "ceramic",
      image: form.image,
      date: form.date || new Date().toISOString(),
      time: form.time,
      capacity: Number(form.capacity),
      maxParticipants: Number(form.capacity),
    });
    setMessage("Atelier ajouté.");
    setForm(initialAdminForm);
    loadAdmin();
  };

  const submitBlog = async (event) => {
    event.preventDefault();
    await api.post("/blog", {
      title: form.title,
      slug: form.title.toLowerCase().replaceAll(" ", "-"),
      content: form.description,
      excerpt: form.description.slice(0, 130),
      category: "coffee",
      image: form.image,
      authorName: user?.firstName || "Admin",
    });
    setMessage("Article ajouté.");
    setForm(initialAdminForm);
    loadAdmin();
  };

  const remove = async (path) => {
    await api.delete(path);
    setMessage("Élément supprimé/désactivé.");
    loadAdmin();
  };

  const uploadToCloudinary = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const { data } = await api.get("/admin/cloudinary-config");
    if (!data.cloudName || !data.uploadPreset) {
      setMessage("Configurez CLOUDINARY_CLOUD_NAME et CLOUDINARY_UPLOAD_PRESET dans .env.");
      return;
    }
    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", data.uploadPreset);
    const response = await fetch(`https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`, {
      method: "POST",
      body,
    });
    const result = await response.json();
    setForm((current) => ({ ...current, image: result.secure_url || current.image }));
  };

  if (!isAdmin()) {
    return (
      <main className="page-surface">
        <div className="container page-heading">
          <p className="eyebrow">Administration</p>
          <h1>Connexion admin requise</h1>
          <p>Connectez-vous depuis l'espace client avec admin@coffeeartsparis.fr / adminpassword.</p>
          <Link className="btn btn-primary" to="/espace-client">Aller à l'espace client</Link>
        </div>
      </main>
    );
  }

  const statItems = [
    ["Produits", stats.products],
    ["Ateliers", stats.workshops],
    ["Commandes", stats.orders],
    ["Réservations", stats.reservations],
    ["Messages", stats.contacts],
    ["Utilisateurs", stats.users],
    ["CA simulé", `${stats.revenue || 0} €`],
  ];

  return (
    <main className="page-surface">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Administration</p>
          <h1>Dashboard Coffee Arts</h1>
          <p>Statistiques réelles récupérées depuis les endpoints API.</p>
        </div>
        {message && <p className="form-message">{message}</p>}
        <div className="stats-grid">
          {statItems.map(([label, value]) => <div className="stat-card" key={label}><span>{label}</span><strong>{value ?? 0}</strong></div>)}
        </div>

        <div className="admin-forms">
          <form className="app-form" onSubmit={submitProduct}>
            <h2>Ajouter un produit</h2>
            <input name="name" value={form.name} onChange={updateForm} placeholder="Nom produit" required />
            <textarea name="description" value={form.description} onChange={updateForm} placeholder="Description" required />
            <input name="price" value={form.price} onChange={updateForm} placeholder="Prix" required />
            <select name="category" value={form.category} onChange={updateForm}>
              <option value="coffee">coffee</option>
              <option value="ceramic">ceramic</option>
              <option value="accessories">accessories</option>
            </select>
            <input name="image" value={form.image} onChange={updateForm} placeholder="URL image / Cloudinary" />
            <input type="file" accept="image/*" onChange={uploadToCloudinary} />
            <button className="btn btn-primary" type="submit">Ajouter</button>
          </form>

          <form className="app-form" onSubmit={submitWorkshop}>
            <h2>Ajouter un atelier</h2>
            <input name="title" value={form.title} onChange={updateForm} placeholder="Titre atelier" required />
            <textarea name="description" value={form.description} onChange={updateForm} placeholder="Description" required />
            <input name="price" value={form.price} onChange={updateForm} placeholder="Prix" required />
            <input name="date" type="date" value={form.date} onChange={updateForm} />
            <input name="time" value={form.time} onChange={updateForm} placeholder="Horaire" />
            <input name="capacity" value={form.capacity} onChange={updateForm} placeholder="Places" />
            <input name="image" value={form.image} onChange={updateForm} placeholder="URL image / Cloudinary" />
            <button className="btn btn-primary" type="submit">Ajouter</button>
          </form>

          <form className="app-form" onSubmit={submitBlog}>
            <h2>Ajouter un article</h2>
            <input name="title" value={form.title} onChange={updateForm} placeholder="Titre article" required />
            <textarea name="description" value={form.description} onChange={updateForm} placeholder="Contenu" required />
            <input name="image" value={form.image} onChange={updateForm} placeholder="URL image" />
            <button className="btn btn-primary" type="submit">Publier</button>
          </form>
        </div>

        <AdminList title="Produits" items={products} render={(item) => `${item.name} · ${item.price} €`} onDelete={(item) => remove(`/products/${item._id}`)} />
        <AdminList title="Ateliers" items={workshops} render={(item) => `${item.title} · ${formatDate(item.date)} · ${item.price} €`} onDelete={(item) => remove(`/workshops/${item._id}`)} />
        <AdminList title="Commandes" items={orders} render={(item) => `${item.orderNumber} · ${item.total} € · ${item.paymentStatus}`} />
        <AdminList title="Réservations" items={reservations} render={(item) => `${item.reservationNumber} · ${item.status}`} />
        <AdminList title="Messages contact" items={contacts} render={(item) => `${item.name} · ${item.subject} · ${item.status}`} />
        <AdminList title="Articles blog" items={blogs} render={(item) => item.title} onDelete={(item) => remove(`/blog/${item._id}`)} />
        <AdminList title="Utilisateurs" items={users} render={(item) => `${item.firstName} ${item.lastName} · ${item.email} · ${item.role}`} />
      </div>
    </main>
  );
};

const AdminList = ({ title, items, render, onDelete }) => (
  <section className="admin-table">
    <h2>{title}</h2>
    {items.length === 0 ? (
      <p>Aucune donnée.</p>
    ) : (
      items.map((item) => (
        <div className="admin-row" key={item._id}>
          <span>{render(item)}</span>
          {onDelete && <button type="button" onClick={() => onDelete(item)}>Supprimer</button>}
        </div>
      ))
    )}
  </section>
);
