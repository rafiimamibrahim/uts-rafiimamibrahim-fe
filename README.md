Event Model Management System
Deskripsi Proyek
Event Model Management System adalah aplikasi berbasis web yang dirancang untuk memudahkan penyelenggaraan acara fashion atau peragaan busana dengan fitur lengkap untuk mengelola kategori, peserta, penyelenggara, dan event. Sistem ini juga menyediakan relasi antara berbagai entitas untuk memastikan alur kerja yang efisien dan terpadu.

Fitur Utama
Manajemen Event:

Membuat dan mengelola event (acara) yang berhubungan dengan peragaan busana atau fashion show.
Setiap event terhubung dengan model (peserta) dan penyelenggara acara.
Manajemen Kategori:

Kategori acara (misalnya, Fashion Show, Photoshoot, Workshop).
Setiap event dapat memiliki kategori yang berbeda untuk membedakan jenis acara yang diselenggarakan.
Manajemen Peserta (Model):

Mendaftarkan dan mengelola profil peserta yang terlibat dalam acara.
Peserta bisa berupa model, fashion designer, atau pelatih.
Manajemen Penyelenggara:

Mengelola informasi penyelenggara acara.
Penyelenggara bertanggung jawab atas pengaturan event, peserta, dan pelaksanaan acara.
Relasi Antar Entitas:

Event terhubung dengan Penyelenggara yang membuat acara.
Peserta (Model) terhubung ke Event melalui kategori acara yang spesifik.
Kategori digunakan untuk mengelompokkan jenis event dan mengatur skenario yang berbeda untuk setiap acara.
Relasi Antar Entitas
1. Event
Relasi ke Kategori: Setiap event memiliki satu kategori yang menunjukkan jenis acara.
Relasi ke Penyelenggara: Setiap event dikelola oleh satu penyelenggara.
Relasi ke Peserta: Event dapat memiliki banyak peserta (model, fashion designer, atau pengajar).
2. Kategori
Relasi ke Event: Kategori digunakan untuk mengelompokkan event ke dalam jenis-jenis acara seperti peragaan busana, photoshoot, atau workshop.
3. Peserta
Relasi ke Event: Peserta (model) dapat terdaftar di satu atau lebih event.
Relasi ke Kategori: Peserta bisa berpartisipasi dalam event yang memiliki kategori spesifik, seperti peragaan busana atau photoshoot.
4. Penyelenggara
Relasi ke Event: Setiap penyelenggara bertanggung jawab atas beberapa event.
Relasi ke Peserta: Penyelenggara memiliki kendali atas siapa yang diundang atau dipilih sebagai peserta di setiap event.