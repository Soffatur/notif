require('dotenv').config()
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json()); // biar bisa baca JSON dari POST

// Ganti ini dengan URL dan ANON_KEY Supabase kamu
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.SUPABASE_URL

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

app.get('/', (req, res) => {
    res.send('hello, welcome to my back')
})

// Endpoint POST untuk menyimpan data
app.post('/save', async (req, res) => {
  const { description, title, package } = req.body;

  // Simpan data ke tabel "users"
  const { data, error } = await supabase
    .from('notif')
    .insert([{ description, title, package }]);

  if (error) return res.status(500).send(error);
  res.send({ message: 'Data berhasil disimpan!', data });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
