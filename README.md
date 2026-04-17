## Author

Nama: Windriew Aeron  
NIM: 535250168

---

# Backend Programming - Gacha System

## Base URL

http://localhost:5000/api

---

## Endpoint

### 1. Melakukan Gacha

**Endpoint:**

POST /gacha

**Deskripsi:**  
Endpoint ini digunakan untuk melakukan gacha atau undian hadiah. Sistem akan mengecek batas maksimal gacha harian (5 kali per user), menentukan hasil secara acak (menang atau tidak), serta memastikan hadiah yang diberikan tidak melebihi kuota yang tersedia. Semua hasil gacha akan disimpan ke database sebagai riwayat.

**Request Body:**

```json
{
  "userId": "user1"
}

Response (Menang):
{
  "message": "Selamat!",
  "prize": "Pulsa 50k"
}
Response (Tidak Menang):
{
  "message": "Maaf, belum beruntung",
  "prize": null
}
Response (Limit Tercapai):
{
  "message": "Batas gacha harian sudah tercapai"
}

2. Melihat Riwayat Gacha

Endpoint:
GET /history/:userId

Deskripsi:
Endpoint ini digunakan untuk melihat riwayat gacha yang telah dilakukan oleh user tertentu. Data yang ditampilkan mencakup userId, hadiah yang didapat (atau null jika tidak menang), serta waktu gacha dilakukan.

Parameter:

| Parameter | Tipe   | Deskripsi           |
| --------- | ------ | ------------------- |
| userId    | string | ID user yang dicari |

Response
[
  {
    "userId": "user1",
    "prize": "Pulsa 50k",
    "createdAt": "2026-04-17T12:00:00.000Z"
  }
]

3. Melihat Sisa Kuota Hadiah

Endpoint:
GET /prizes

Deskripsi:
Endpoint ini digunakan untuk melihat daftar hadiah beserta sisa kuota yang masih tersedia.

Response:
[
  {
    "name": "Pulsa 50k",
    "remaining": 498
  }
]

4. Melihat Daftar Pemenang

Endpoint:
GET /winners

Deskripsi:
Endpoint ini digunakan untuk melihat daftar user yang berhasil memenangkan hadiah. Nama user akan disamarkan (masking) untuk menjaga privasi.

Response:
[
  {
    "user": "u***1",
    "prize": "Pulsa 50k"
  }
]

Data Hadiah

Hadiah pada sistem ini tidak disimpan dalam database, melainkan didefinisikan langsung di dalam kode sebagai berikut:
[
  { "name": "Emas 10 gram", "quota": 1 },
  { "name": "Smartphone X", "quota": 5 },
  { "name": "Smartwatch Y", "quota": 10 },
  { "name": "Voucher 100k", "quota": 100 },
  { "name": "Pulsa 50k", "quota": 500 }
]

Keterangan:

quota adalah jumlah maksimal hadiah yang bisa dimenangkan
Jika kuota habis, hadiah tidak akan diberikan lagi

Mekanisme Sistem
1. User mengirim request ke endpoint /gacha
2. Sistem mengecek jumlah percobaan user pada hari yang sama
3. Jika belum mencapai 5 kali:
   Sistem menentukan hasil secara acak (menang atau tidak)
   Jika menang:
     Sistem memilih hadiah yang masih tersedia (kuota belum habis)
4. Hasil gacha disimpan ke database
5. Jika limit tercapai, request akan ditolak

Database

Menggunakan MongoDB dengan collection:

gachas → menyimpan histori percobaan user

Contoh data:
{
  "userId": "user1",
  "prize": "Pulsa 50k",
  "createdAt": "2026-04-17T12:00:00.000Z"
}

Teknologi
-Node.js
-Express.js
-MongoDB
-Mongoose

Fitur Utama
-Limit maksimal 5 kali gacha per hari per user
-Sistem gacha dengan hasil acak (menang / tidak)
-Validasi kuota hadiah
-Penyimpanan histori ke database
-Menampilkan sisa kuota hadiah
-Menampilkan daftar pemenang dengan nama tersamarkan
```
