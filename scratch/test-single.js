async function run() {
  try {
    const res = await fetch("https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=800&auto=format&fit=crop", { method: 'HEAD' });
    console.log("STATUS:", res.status);
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}
run();
