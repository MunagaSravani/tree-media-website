const https = require('https');

const projects = [
  {
    title: "Midnight Echoes — Indie Short Drama",
    slug: "midnight-echoes-indie-short",
    coverImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    title: "Aura Atelier — Lookbook & Digital Campaign",
    slug: "aura-atelier-lookbook-campaign",
    coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    title: "City Lights Pulse — Artist Music Video",
    slug: "city-lights-pulse-music-video",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    title: "The Horizon of Silence — Nordic Thriller",
    slug: "horizon-of-silence-nordic-thriller",
    coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    title: "Solstice Reverie — Luxury Brand Showcase",
    slug: "solstice-reverie-luxury-brand-showcase",
    coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop"
    ]
  }
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, error: e.message });
    });
  });
}

async function run() {
  for (const p of projects) {
    console.log(`=== ${p.title} ===`);
    const coverRes = await checkUrl(p.coverImage);
    console.log(`Cover: [${coverRes.status}] ${p.coverImage}`);
    for (let i = 0; i < p.images.length; i++) {
      const imgRes = await checkUrl(p.images[i]);
      console.log(`Still #${i+1}: [${imgRes.status}] ${p.images[i]}`);
    }
  }
}

run();
